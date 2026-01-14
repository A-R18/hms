const knex = require("knex")(require("../config/dbMod.js"));
const {
  saveUser,
  fetchAllusers,
  fetchExistingUser,
  updateOldUser,
  deleteCurrentUser,
  showCurrentUser,
  fetchUserRole,
  updateOldDoc,
  regSpecDoc,
  updateSpecDoc,
  fetchExistingDoctor,
  fetchDoctors,
} = require("../models/user.model.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const incomingData = req.body;
    const hashedPass = await bcrypt.hash(incomingData.password, 10);
    const dataMatch = {
      user_name: incomingData.name,
      user_email: incomingData.email.trim(),
      user_password: hashedPass,
      role_ID: incomingData.rid
    };

    const userSubmitted = await saveUser(dataMatch);
    if (userSubmitted) {
      return res.status(200).json({ message: "User registered successfully!" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Didn't register", error: error });
  }
  return res.status(400).json({ error: "Unsuccessfull attempt" });
};

const updateUser = async (req, res) => {
  try {
    const tranx = await knex.transaction();
    const id = req.params.id;
    const oldUserData = await fetchExistingUser(id);
    const { role } = await fetchUserRole(oldUserData.role_ID);
    console.log(role);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    console.log("old user is :", oldUserData);
    const incomingData = req.body;
    console.log(incomingData);
    // console.log(incomingData);
    // console.log(oldUserData);
    let hashedPass;
    if (req?.body?.password) {
      hashedPass = await bcrypt.hash(incomingData.password, 10);
    }

    const dataMatch = {
      user_name: req?.body?.name ? incomingData.name : oldUserData.user_name,
      user_email: req?.body?.email ? incomingData.email : oldUserData.user_email,
      user_password: req?.body?.password ? hashedPass : oldUserData.password,
    };

    if (role !== "doctor") {
      const updatedUser = await updateOldUser(knex, id, dataMatch);
      if (updatedUser) {
        return res.status(200).json({ message: "Updated successfully!", data: dataMatch });
      }
    } else {

      try {
        const existingDoctor = await fetchExistingDoctor(tranx, id);
        console.log("existing doctor is :", existingDoctor);
        console.log("existing doctor is: ", existingDoctor, "req.body is", req.body);
        const docGenData = {
          user_name: req?.body?.name ? incomingData.name : oldUserData.user_name,
          user_email: req?.body?.email ? incomingData.email : oldUserData.user_email,
          user_password: req?.body?.password ? hashedPass : oldUserData.password,
        }
        const docSpecData = {
          user_ID: oldUserData.id,
          specialization: req?.body?.specialization ? incomingData.specialization : "not specified",
          contact: req?.body?.contact ? incomingData.contact : "not specified",
        }

        await updateOldDoc(tranx, id, docGenData);
        if (existingDoctor) {
          await updateSpecDoc(tranx, id, docSpecData);
        } else {
          await regSpecDoc(tranx, docSpecData);
        }
        tranx.commit();
        return res.status(200).json({ message: "updated doctor data is :", ...docGenData, ...docSpecData });
      } catch (error) {
        tranx.rollback();
        return res.status(400).json(error);
      }

    }
  } catch (error) {
    return res.status(400).json({ alert: "Didn't update!", error: error });
  }
};

const showUsers = async (req, res) => {
  try {
    const allUsers = await fetchAllusers();


    if (allUsers) {
      res.status(200).json(allUsers);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};


const showDoctors = async (req, res) => {
  try {
    const allDoctors = await fetchDoctors();


    if (allDoctors) {
      res.status(200).json(allDoctors);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await deleteCurrentUser(id);
    if (deleted) {
      return res.status(200).json({ alert: "Deleted successfully!" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Deletion unsuccessfull!" });
  }
};

const showSpecificUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userFetched = await showCurrentUser(id);
    // console.log(userFetched);
    if (userFetched) {
      return res.status(200).json(userFetched);
    }
  } catch (error) {
    return res.status(400).json({ error: "Didn't fetch!" }, error);
  }
};

module.exports = { registerUser, showUsers, updateUser, deleteUser, showSpecificUser, showDoctors };
