const { getConnection } = require("./sql");

let connection;

const createJWTUserDAL = async (email,hashedPassword) => {
    try {
        const connection = getConnection();
        let [jwtuser] = await connection.execute(`
            INSERT INTO JWTUser (email, password_hash)
            VALUES (?,?)
        `,[email,hashedPassword]);
        return jwtuser;
    } catch (error) {
        console.log("Error creating jwt user", error)
    }
}

const getJWTUserDAL = async (email) => {
    try {
        const connection = getConnection();
        let [jwtuser] = await connection.execute(`
            SELECT * FROM JWTUser WHERE email = ?
        `,[email]);
        return jwtuser;
    } catch (error) {
        console.log("Error getting jwt user", error)
    }
}

module.exports = {
    createJWTUserDAL,
    getJWTUserDAL
}