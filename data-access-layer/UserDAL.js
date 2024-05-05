const models = require("../models");

const getAllUsersDAL = async () => {
  try {
    const users = await models.User.fetchAll({
      withRelated: ["roles"],
    });
    return users;
  } catch (error) {
    console.log("Error getting Users", error);
  }
};

const getUserDAL = async (user_id) => {
  try {
    const user = await models.User.where({
      id: user_id,
    }).fetch({
      withRelated: ["roles"],
    });
    return user;
  } catch (error) {
    console.log("Error getting User", error);
  }
};

const getAllRolesDAL = async () => {
  try {
    const roles = await models.Role.fetchAll();
    return roles;
  } catch (error) {
    console.log("Error getting Role", error);
  }
};

const createUserDAL = async (userForm) => {
  try {
    const user = new models.User({
      username: userForm.data.username,
      password_hash: userForm.data.password,
      email: userForm.data.email,
      role_id: userForm.data.role_id,
    });
    await user.save();
    return user;
  } catch (error) {
    console.log("Error adding User", error);
  }
};

const updateUserDAL = async (userForm, user_id) => {
  try {
    const user = await models.User.where({
      id: user_id,
    }).fetch({
      require: true,
    });
    user.set({
      username: userForm.data.username,
      password_hash: userForm.data.password,
      email: userForm.data.email,
      role_id: userForm.data.role_id,
    });
    await user.save();
    return user;
  } catch (error) {
    console.log("Error updating User", error);
  }
};

const deleteUserDAL = async (user_id) => {
  try {
    const user = await models.User.where({
      id: user_id,
    }).fetch({
      require: true,
    });
    const name = user.get("username");
    await user.destroy();
    return name;
  } catch (error) {
    console.log("Error Deleting User", error);
  }
};

const getUserTypeDAL = async (type) => {
  try {
    const users = await models.User.where({
      role_id: type,
    }).fetchAll({
      require: true,
    });
    return users;
  } catch (error) {
    console.log("Error getting Users", error);
  }
};

const getUserLoginDAL = async (logininfo) => {
  try {
    let user = await models.User.where({
      email: logininfo,
    }).fetch({
      require: false,
    });
    if (!user)
      user = await models.User.where({
        username: logininfo,
      }).fetch({
        require: false,
      });
    return user;
  } catch (error) {
    console.log("Error getting User", error);
    // throw()
  }
};

module.exports = {
  getAllUsersDAL,
  getAllRolesDAL,
  createUserDAL,
  getUserDAL,
  updateUserDAL,
  deleteUserDAL,
  getUserTypeDAL,
  getUserLoginDAL,
};
