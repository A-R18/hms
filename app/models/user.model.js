const knex = require('knex')(require('../config/dbMod.js'));

const saveUser = (userData) => {
  return knex('users').insert(userData);
};

const fetchAllusers = () => {
  return knex('users').select('id as user_Id', 'user_name', 'user_email', 'user_password');
};

const fetchExistingUser = (userID) => {
  return knex('users').select('*').where({ id: userID }).first();
};

const updateOldUser = (userID, updatedData) => {
  return knex('users').where({ id: userID }).update(updatedData);
};

const deleteCurrentUser = (userID) => {
  return knex('users').where({ id: userID }).delete();
};

const showCurrentUser = (userID) => {
  return knex('users').select('*').where({ id: userID }).first();
};

module.exports = {
  saveUser,
  fetchAllusers,
  fetchExistingUser,
  updateOldUser,
  deleteCurrentUser,
  showCurrentUser,
};
