const { getConnection } = require("./sql");


let connection;

const getAllProductsDAL = async () => {
    try {
        const connection = getConnection();
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

const getProductDAL = async (product_id) => {
    try {
        const connection = getConnection();
        let [product] = await connection.execute(`
            SELECT Products.*,Categories.category_name,Brands.brand_name FROM Products 
            INNER JOIN Categories ON Categories.category_id = Products.category_id 
            INNER JOIN Brands ON Brands.brand_id = Products.brand_id
            WHERE Products.product_id=?;
        `,[product_id]);
        return product[0];
    } catch (error) {
        console.log("Error getting Product", error)
    }
}

const addProductDAL = async (product_name, category_id, brand_id, description, price, quantity_available) => {
    try {
        const connection = getConnection();
        let response = await connection.execute(`
            INSERT INTO Products (product_name, category_id, brand_id, description, price, quantity_available)
            VALUES (?,?,?,?,?,?)
        `, [product_name, category_id, brand_id, description, price, quantity_available]);
        return response;
    } catch (error) {
        console.log("Error adding Product", error)
    }
}

const editProductDAL = async (product_name, category_id, brand_id, description, price, quantity_available,product_id) => {
    try {
        const connection = getConnection();
        let response = await connection.execute(`
            UPDATE Products SET product_name=?, category_id=?, brand_id=?, description=?, price=?, quantity_available=? WHERE product_id=?
        `, [product_name, category_id, brand_id, description, price, quantity_available,product_id]);
        return "Product Edited"
    } catch (error) {
        console.log("Error adding Product", error)
    }
}

const deleteProductDAL = async (product_id) => {
    try {
        const connection = getConnection();
        let response = await connection.execute(`
            DELETE FROM Products WHERE product_id=?
        `, [product_id]);
        return "Product Deleted"
    } catch (error) {
        console.log("Error Deleting Product", error)
    }
}

const searchProductDAL = async (product_name="", category_id=0, brand_id=0) => {
    try {
        const connection = getConnection();
        let queryArray = [];
        let searchquery = `WHERE `;
        if(product_name)
            queryArray.push(`Products.product_name LIKE '%${product_name}%'`);
        if(category_id)
            queryArray.push(`Products.category_id = ${category_id}`);
        if(brand_id)
            queryArray.push(`Products.brand_id = ${brand_id}`);
        for (let index = 0; index < queryArray.length; index++) {
            searchquery = searchquery + queryArray[index];
            if(index != queryArray.length - 1)
                searchquery = searchquery + " AND "
        }
        let [products] = await connection.execute(`
            SELECT Products.*,Categories.category_name,Brands.brand_name FROM Products 
            INNER JOIN Categories ON Categories.category_id = Products.category_id 
            INNER JOIN Brands ON Brands.brand_id = Products.brand_id
            ${searchquery};
        `);
        return products;
    } catch (error) {
        console.log("Error searching for Products", error)
    }
}

const getMainCategoriesDAL = async () => {
    try {
        const connection = getConnection();
        let [categories] = await connection.execute(`
            SELECT * FROM Categories WHERE parent_category_id is NULL;
        `);
        return categories;
    } catch (error) {
        console.log("Error getting Categories", error)
    }
}

const getAllCategoriesDAL = async () => {
    try {
        const connection = getConnection();
        let [categories] = await connection.execute(`
            SELECT * FROM Categories;
        `);
        return categories;
    } catch (error) {
        console.log("Error getting Categories", error)
    }
}

const getAllBrandsDAL = async () => {
    try {
        const connection = getConnection();
        let [brands] = await connection.execute(`
            SELECT * FROM Brands;
        `);
        return brands;
    } catch (error) {
        console.log("Error getting Brands", error)
    }
}

module.exports = {
    getAllProductsDAL,
    addProductDAL,
    editProductDAL,
    deleteProductDAL,
    getProductDAL,
    searchProductDAL,
    getMainCategoriesDAL,
    getAllBrandsDAL,
    getAllCategoriesDAL
}