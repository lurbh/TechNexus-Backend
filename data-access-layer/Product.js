const {createConnection} = require('mysql2/promise');

let connection;

async function main()
{
    connection = await createConnection({
        'host': process.env.DB_HOST,
        'user': process.env.DB_USER,
        'database': process.env.DB_NAME,
        'password': process.env.DB_PASSWORD
    })
}

const getAllProductsDAL = async () => {
    try {
        await main();
        let [products] = await connection.execute(`
            SELECT * FROM Products 
            INNER JOIN Categories ON Categories.category_id = Products.category_id 
            INNER JOIN Brands ON Brands.brand_id = Products.brand_id;
        `);
        return products;
    } catch (error) {
        console.log("Error getting all Customers", error)
    }
}

module.exports = {
    getAllProductsDAL,
}