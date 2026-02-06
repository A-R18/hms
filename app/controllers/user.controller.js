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
  fetchDcotorSpecialities,
  fetchDoctors,
  count,
  totalUsers,
  totalDoctors,
  fetchDoctorsBySpec,
  fetchPatientsByIds,
  fetchPatientById,
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
      role_ID: incomingData.rid,
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
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const incomingData = req.body;
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
        //another try looks suspicious, needs to be debugged/removed!
        const existingDoctor = await fetchExistingDoctor(tranx, id);

        const docData = {
          user_name: req?.body?.name ? incomingData.name : oldUserData.user_name,
          user_email: req?.body?.email ? incomingData.email : oldUserData.user_email,
          user_password: req?.body?.password ? hashedPass : oldUserData.password,
        };

        const docSpecData = {
          user_ID: oldUserData.id,
          spec_ID: req?.body?.spz_ID ? incomingData.spz_ID : null,
          contact: req?.body?.contact ? incomingData.contact : "not specified",
        };

        //transaction is saving users gen data first then doc data

        if (existingDoctor) {
          await updateOldDoc(tranx, id, docData);
          await updateSpecDoc(tranx, id, docSpecData);
          tranx.commit();
          return res.status(200).json({ message: "updated doctor data is :" });
        } else {
          //if doctor particulars are entered for first time:
          await updateOldDoc(tranx, id, docData);
          await regSpecDoc(tranx, docSpecData);
          tranx.commit();
          return res.status(200).json({ message: "updated doctor data is :" });
        }
      } catch (error) {
        tranx.rollback();
        return res.status(400).json({ error: error.message });
      }
    }
  } catch (error) {
    return res.status(501).json({ alert: "Didn't update!", error: error.message });
  }
};

const showUsers = async (req, res) => {
  try {
    const [{ count }] = await totalUsers;
    let page;
    const limit = 5;
    const firstPage = 1;
    const lastPage = Math.ceil(count / limit);
    console.log(lastPage);
    if (req.query.firstPage) {
      page = firstPage;
    } else if (req.query.lastPage) {
      page = lastPage;
    } else if (!req.query.page) {
      page = 1;
    } else if (req.query.page < 1 || req.query.page > lastPage) {
      return res.json("invalid page");
    } else if (req.query.page) {
      page = req.query.page;
    }
    const offset = (page - 1) * limit;
    console.log(offset);
    const allUsers = await fetchAllusers(limit, offset, "user");

    if (allUsers) {
      return res.status(200).json({ totalUsers: count, currentPage: page, allUsers });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const showDoctors = async (req, res) => {
  try {
    let page;
    const [{ count }] = await totalDoctors;
    console.log("total doctors are " + count);
    const limit = 5;
    const firstPage = 1;
    const lastPage = Math.ceil(count / limit);
    if (req.query.firstPage) {
      page = firstPage;
    } else if (req.query.lastPage) {
      page = lastPage;
    } else if (!req.query.page) {
      page = 1;
    } else if (req.query.page < 1 || req.query.page > lastPage) {
      return res.json("invalid page specified!");
    } else if (req.query.page) {
      page = req.query.page;
    }

    const offset = (page - 1) * limit;

    const allDoctors = await fetchDoctors("doctor", limit, offset);
    if (allDoctors.length === 0) {
      return res.status(400).json({ alert: "No doctors particulars registered yet!" });
    }
    return res.status(200).json({ totalDoctors: count, currentPage: page, allDoctors });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const showDoctorSpecialities = async (req, res) => {
  try {
    const specialitiesFetched = await fetchDcotorSpecialities();
    if (specialitiesFetched) {
      return res.status(200).json(specialitiesFetched);
    } else {
      return res.status(400).json({ message: "unable to fetch specialities" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const showDoctorsBySpeciality = async (req, res) => {
  try {
    const specID = req.query.spec_id;
    const doctorsFetchedBySpec = await fetchDoctorsBySpec(specID);
    return res.status(200).json(doctorsFetchedBySpec);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const showPatientById = async (req, res) => {
  try {
    const ptID = req.query.pt_id;
    const patientFetchedById = await fetchPatientById(ptID);
    return res.status(200).json(patientFetchedById);
  } catch (error) {
    return res.status(400).json({ error: error.message });
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
    return res.status(400).json({ message: "Deletion unsuccessfull!", error: error.message });
  }
};

const showSpecificUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userFetched = await showCurrentUser(id);
    if (userFetched) {
      return res.status(200).json(userFetched);
    }
  } catch (error) {
    return res.status(400).json({ error: "Didn't fetch!" }, error);
  }
};

module.exports = {
  registerUser,
  showUsers,
  updateUser,
  deleteUser,
  showSpecificUser,
  showDoctors,
  showDoctorSpecialities,
  showDoctorsBySpeciality,
  showPatientById
};
