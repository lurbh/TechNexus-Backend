const userDAL = require("../data-access-layer/UserDAL");

const serviceGetAllUsers = async () => {
    const users = await userDAL.getAllUsersDAL();
    return users;
}

const serviceGetAllRoles = async () => {
    const roles = await userDAL.getAllRolesDAL();
    return roles;
}

const serviceAddUser = async (userForm) => {
    const user = userDAL.createUserDAL(userForm);
    return user;
}

const serviceGetUser = async (user_id) => {
    const user = userDAL.getUserDAL(user_id);
    return user;
}

const serviceUpdateUser = async (userForm, user_id) => {
    const user = userDAL.updateUserDAL(userForm,user_id);
    return user;
}

module.exports = {
    serviceGetAllUsers,
    serviceGetAllRoles,
    serviceAddUser,
    serviceGetUser,
    serviceUpdateUser
}