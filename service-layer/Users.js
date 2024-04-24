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
    const user = await userDAL.createUserDAL(userForm);
    return user;
}

const serviceGetUser = async (user_id) => {
    const user = await userDAL.getUserDAL(user_id);
    return user;
}

const serviceUpdateUser = async (userForm, user_id) => {
    const user = await userDAL.updateUserDAL(userForm,user_id);
    return user;
}

const serviceDeleteUser = async (user_id) => {
    const user = await userDAL.deleteUserDAL(user_id);
    return user;
}

const serviceGetOnlyUserType = async (type) => {
    const users = await userDAL.getUserTypeDAL(type);
    return users;
}

const serviceGetUserLogin = async (logininfo) => {
    const user = await userDAL.getUserLoginDAL(logininfo);
    return user
}

module.exports = {
    serviceGetAllUsers,
    serviceGetAllRoles,
    serviceAddUser,
    serviceGetUser,
    serviceUpdateUser,
    serviceDeleteUser,
    serviceGetOnlyUserType,
    serviceGetUserLogin
}