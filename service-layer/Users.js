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
    const user = await auserDAL.getUserDAL(user_id);
    return user;
}

const serviceUpdateUser = async (userForm, user_id) => {
    const user = await userDAL.updateUserDAL(userForm,user_id);
    return user;
}

const serviceDeleteUser = async (user_id) => {
    const user = await userDAL.DeleteUserDAL(user_id);
    return user;
}

const serviceGetOnlyUserType = async (type) => {
    const users = await userDAL.GetUserTypeDAL(type);
    console.log(users);
    return users;
}

module.exports = {
    serviceGetAllUsers,
    serviceGetAllRoles,
    serviceAddUser,
    serviceGetUser,
    serviceUpdateUser,
    serviceDeleteUser,
    serviceGetOnlyUserType
}