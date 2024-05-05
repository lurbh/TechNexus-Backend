const models = require("../models");

const getAllRolesDAL = async () => {
  try {
    return await models.Role.fetchAll({
      require: true,
    });
  } catch (error) {
    console.log("Error getting Roles", error);
  }
};

const getRoleDAL = async (role_id) => {
  try {
    return await models.Role.where({
      id: role_id,
    }).fetch({
      require: true,
    });
  } catch (error) {
    console.log("Error getting Role", error);
  }
};

const addRoleDAL = async (roleForm) => {
  try {
    const role = new models.Role();
    const { ...roleData } = roleForm.data;
    role.set(roleData);
    await role.save();
    return role;
  } catch (error) {
    console.log("Error creating Role", error);
  }
};

const updateRoleDAL = async (roleForm, role_id) => {
  try {
    const role = await models.Role.where({
      id: role_id,
    }).fetch({
      require: true,
    });
    const { ...roleData } = roleForm.data;
    role.set(roleData);
    await role.save();
    return role;
  } catch (error) {
    console.log("Error updating Role", error);
  }
};

const deleteRoleDAL = async (role_id) => {
  try {
    const role = await models.Role.where({
      id: role_id,
    }).fetch({
      require: true,
    });
    const name = role.get("role_name");
    await role.destroy();
    return name;
  } catch (error) {
    console.log("Error Deleting Role", error);
  }
};

module.exports = {
  getAllRolesDAL,
  getRoleDAL,
  addRoleDAL,
  updateRoleDAL,
  deleteRoleDAL,
};
