const { getAllProductsDAL, addProductDal } = require("../data-access-layer/Product");

const servicegetAllProducts = async () => {
    const products = await getAllProductsDAL();
    return products;
};

const serviceaddProductDal = async (product_name, category_id, brand_id, description, price, quantity_available) => {
    const response = await addProductDal(product_name, category_id, brand_id, description, price, quantity_available);
    return response;
}

module.exports = {
    servicegetAllProducts,
    serviceaddProductDal
}