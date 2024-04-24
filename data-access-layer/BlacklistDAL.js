const { BlacklistedToken } = require('../models');

const getBlackListToken = async (refreshToken) => {
    return await BlacklistedToken.where({
        'token': refreshToken
    }).fetch({
        require: false
    });
}

const addBlackListTokenDAL = async (refreshToken) => {
    const token = new BlacklistedToken({
        'token': refreshToken
    });
    await token.save();
    return token;
}

module.exports = {
    getBlackListToken,
    addBlackListTokenDAL
}