const models = require("../models");

const getAllProductsDAL = async () => {
  try {
    return await models.Product.fetchAll({
      withRelated: ["brands", "category"],
    });
  } catch (error) {
    console.log("Error getting Products", error);
  }
};

const getProductDAL = async (product_id) => {
  try {
    return await models.Product.where({
      id: product_id,
    }).fetch({
      withRelated: ["brands", "category"],
    });
  } catch (error) {
    console.log("Error getting Product", error);
  }
};

const addProductDAL = async (productForm) => {
  try {
    const product = new models.Product();
    const { ...productData } = productForm.data;
    product.set(productData);
    await product.save();
    return product;
  } catch (error) {
    console.log("Error adding Product", error);
  }
};

const editProductDAL = async (productForm, product_id) => {
  try {
    const product = await models.Product.where({
      id: product_id,
    }).fetch({
      require: true,
    });
    const { ...productData } = productForm.data;
    product.set(productData);
    await product.save();
    return product;
  } catch (error) {
    console.log("Error adding Product", error);
  }
};

const deleteProductDAL = async (product_id) => {
  try {
    const product = await models.Product.where({
      id: product_id,
    }).fetch({
      require: true,
    });
    const name = product.get("product_name");
    await product.destroy();
    return name;
  } catch (error) {
    console.log("Error Deleting Product", error);
  }
};

const searchProductDAL = async (
  product_name = "",
  category_id = 0,
  brand_id = 0,
) => {
  try {
    const connection = getConnection();
    let queryArray = [];
    let searchquery = `WHERE `;
    if (product_name)
      queryArray.push(`Products.product_name LIKE '%${product_name}%'`);
    if (category_id) queryArray.push(`Products.category_id = ${category_id}`);
    if (brand_id) queryArray.push(`Products.brand_id = ${brand_id}`);
    for (let index = 0; index < queryArray.length; index++) {
      searchquery = searchquery + queryArray[index];
      if (index != queryArray.length - 1) searchquery = searchquery + " AND ";
    }
    let [products] = await connection.execute(`
            SELECT Products.*,Categories.category_name,Brands.brand_name FROM Products 
            INNER JOIN Categories ON Categories.category_id = Products.category_id 
            INNER JOIN Brands ON Brands.brand_id = Products.brand_id
            ${searchquery};
        `);
    return products;
  } catch (error) {
    console.log("Error searching for Products", error);
  }
};

const getMainCategoriesDAL = async () => {
  try {
    return await models.Category.where({
      parent_category_id: null,
    }).fetch({
      require: true,
    });
  } catch (error) {
    console.log("Error getting Categories", error);
  }
};

const getAllCategoriesDAL = async () => {
  try {
    return await models.Category.fetchAll();
  } catch (error) {
    console.log("Error getting Categories", error);
  }
};

const getAllBrandsDAL = async () => {
  try {
    return await models.Brand.fetchAll();
  } catch (error) {
    console.log("Error getting Brands", error);
  }
};

const sumProductsDAL = async () => {
  try {
    models.Product.where({
      category_id: 1,
    })
      .query()
      .sum("price as TotalPrice")
      .then((result) => {
        console.log(result[0]);
        const totalPrice = result[0].TotalPrice || 0;
        console.log("Total Price:", totalPrice);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {}
};

module.exports = {
  getAllProductsDAL,
  addProductDAL,
  editProductDAL,
  deleteProductDAL,
  getProductDAL,
  searchProductDAL,
  getMainCategoriesDAL,
  getAllBrandsDAL,
  getAllCategoriesDAL,
  sumProductsDAL,
};
