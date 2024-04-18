const JWTDAL = require("../data-access-layer/JWT");

const serviceCreateJWTUser = async (email,password_hash) => {
    const jwtuser = await JWTDAL.createJWTUserDAL(email,password_hash)
    return jwtuser;
};

const serviceGetJWTUser = async (email) => {
    const jwtuser = await JWTDAL.getJWTUserDAL(email)
    return jwtuser[0];
};

module.exports = {
    serviceCreateJWTUser,
    serviceGetJWTUser
}
