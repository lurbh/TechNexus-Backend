const { getAllProductsDAL } = require("../data-access-layer/Product");

const servicegetAllProducts = async () => {
    const products = getAllProductsDAL();
    return products;
};

module.exports = {
    servicegetAllProducts,
}