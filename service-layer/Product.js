const res = require("express/lib/response");
const { getAllProductsDAL, addProductDAL, editProductDAL, deleteProductDAL, getProductDAL, searchProductDAL } = require("../data-access-layer/Product");

const serviceGetAllProducts = async () => {
    const products = await getAllProductsDAL();
    return products;
};

const serviceAddProduct = async (product_name, category_id, brand_id, description, price, quantity_available) => {
    const response = await addProductDAL(product_name, category_id, brand_id, description, price, quantity_available);
    return response;
}

const serviceEditProduct = async (product_name, category_id, brand_id, description, price, quantity_available,product_id) => {
    const response = await editProductDAL(product_name, category_id, brand_id, description, price, quantity_available,product_id);
    return response;
}

const serviceDeleteProduct = async (product_id) => {
    const response = await deleteProductDAL(product_id);
    return response;
}

const serviceGetProduct = async (product_id) => {
    const product = await getProductDAL(product_id);
    return product;
}

const serviceSearchProduct = async (product_name="", category_id=0, brand_id=0) => {
    const products = await searchProductDAL(product_name,category_id,brand_id);
    return products;
}

module.exports = {
    serviceGetAllProducts,
    serviceAddProduct,
    serviceEditProduct,
    serviceDeleteProduct,
    serviceGetProduct,
    serviceSearchProduct
}