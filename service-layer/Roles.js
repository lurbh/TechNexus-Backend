const roleDAL = require("../data-access-layer/RolesDAL");

const serviceGetRoles = async () => {
  const roles = await roleDAL.getAllRolesDAL();
  return roles;
};

const serviceGetRole = async (role_id) => {
  const role = await roleDAL.getRoleDAL(role_id);
  return role;
};

const serviceAddRole = async (roleForm) => {
  const response = await roleDAL.addRoleDAL(roleForm);
  return response;
};

const serviceUpdateRole = async (roleForm, role_id) => {
  const response = await roleDAL.updateRoleDAL(roleForm, role_id);
  return response;
};

const serviceDelRole = async (role_id) => {
  const response = await roleDAL.deleteRoleDAL(role_id);
  return response;
};

module.exports = {
  serviceGetRoles,
  serviceGetRole,
  serviceAddRole,
  serviceUpdateRole,
  serviceDelRole,
};
