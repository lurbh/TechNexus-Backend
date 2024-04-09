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
            SELECT Products.*,Categories.category_name,Brands.brand_name FROM Products 
            INNER JOIN Categories ON Categories.category_id = Products.category_id 
            INNER JOIN Brands ON Brands.brand_id = Products.brand_id;
        `);
        return products;
    } catch (error) {
        console.log("Error getting Products", error)
    }
}

const addProductDal = async (product_name, category_id, brand_id, description, price, quantity_available) => {
    try {
        await main();
        let response = await connection.execute(`
            INSERT INTO Products (product_name, category_id, brand_id, description, price, quantity_available)
            VALUES (?,?,?,?,?,?)
        `, [product_name, category_id, brand_id, description, price, quantity_available]);
        return "Product Added"
    } catch (error) {
        console.log("Error adding Product", error)
    }
}

module.exports = {
    getAllProductsDAL,
    addProductDal
}