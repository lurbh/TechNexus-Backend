const models = require("../models")

const getAllUsersDAL = async () => {
    try {
        const users = await models.User.fetchAll({
            withRelated:['roles']
        });
        return users;
    } catch (error) {
        console.log("Error getting User", error)
    }
}

const getUserDAL = async (user_id) => {
    try {
        const user = await models.User.where({
            'id': user_id
        }).fetch({
            withRelated:['roles']
        });
        return user;
    } catch (error) {
        console.log("Error getting User", error)
    }
}

const getAllRolesDAL = async () => {
    try {
        const roles = await models.Role.fetchAll();
    return roles;
    } catch (error) {
        console.log("Error getting Role", error)
    }
}

const createUserDAL = async (userForm) => {
    try {
        const user = new models.User({
            'username': userForm.data.username,
            'password_hash': userForm.data.password,
            'email': userForm.data.email,
            'role_id': 1
        });
        await user.save();
        return user;
    } catch (error) {
        console.log("Error adding User", error)
    }
    
}

const updateUserDAL = async (userForm,user_id) => {
    try {
        const user = await models.User.where({
            'id': user_id
        }).fetch({
            require: true
        });
        const {...userData} = userForm.data;
        user.set(productData);
        console.log(user);
        // await user.save();
        return user;
    } catch (error) {
        console.log("Error adding Product", error)
    }
}

module.exports = {
    getAllUsersDAL,
    getAllRolesDAL,
    createUserDAL,
    getUserDAL,
    updateUserDAL
}