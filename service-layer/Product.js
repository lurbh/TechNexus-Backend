const res = require("express/lib/response");
const productDAL = require("../data-access-layer/Product");

const serviceGetAllProducts = async () => {
    const products = await productDAL.getAllProductsDAL();
    return products;
};

const serviceAddProduct = async (product_name, category_id, brand_id, description, price, quantity_available) => {
    const response = await productDAL.addProductDAL(product_name, category_id, brand_id, description, price, quantity_available);
    return response;
}

const serviceEditProduct = async (product_name, category_id, brand_id, description, price, quantity_available,product_id) => {
    const response = await productDAL.editProductDAL(product_name, category_id, brand_id, description, price, quantity_available,product_id);
    return response;
}

const serviceDeleteProduct = async (product_id) => {
    const response = await productDAL.deleteProductDAL(product_id);
    return response;
}

const serviceGetProduct = async (product_id) => {
    const product = await productDAL.getProductDAL(product_id);
    return product;
}

const serviceSearchProduct = async (product_name="", category_id=0, brand_id=0) => {
    const products = await productDAL.searchProductDAL(product_name,category_id,brand_id);
    return products;
}

const serviceGetMainCategories = async () => {
    const categories = await productDAL.getMainCategoriesDAL();
    return categories;
}

module.exports = {
    serviceGetAllProducts,
    serviceAddProduct,
    serviceEditProduct,
    serviceDeleteProduct,
    serviceGetProduct,
    serviceSearchProduct,
    serviceGetMainCategories
}