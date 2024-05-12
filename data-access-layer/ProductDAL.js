const models = require("../models");

const getAllProductsDAL = async () => {
  try {
    return await models.Product.fetchAll({
      withRelated: ["brands", "category"],
    });
  } catch (error) {
    console.log("Error getting Products", error);
    return null;
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
    return null;
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
    return null;
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
    console.log("Error updating Product", error);
    return null;
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
    return null;
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
    return null;
  }
};

const getAllCategoriesDAL = async () => {
  try {
    return await models.Category.fetchAll();
  } catch (error) {
    console.log("Error getting Categories", error);
    return null;
  }
};

const getAllBrandsDAL = async () => {
  try {
    return await models.Brand.fetchAll();
  } catch (error) {
    console.log("Error getting Brands", error);
    return null;
  }
};

const reduceQuantityDAL = async (product_id,amt) => {
    try
    {
        const product = await models.Product.where({
            id: product_id,
        }).fetch({
            require: true,
        });
        product.set({
            quantity_available : product.get('quantity_available') - amt
        });
        await product.save();
        return product;
    }
    catch (error)
    {
        console.log("Error updating Product", error);
        return null;
    }
}

const searchProductsDAL = async (searchForm) => {
    try {
        const queryBuilder = models.Product.collection();
        if (searchForm.data.name) {
            queryBuilder.where('product_name', 'like', "%" + searchForm.data.name + "%");
        }
        if (searchForm.data.minprice) {
            queryBuilder.where('price', '>=', searchForm.data.min_cost);
        }
        if (searchForm.data.maxprice) {
            queryBuilder.where('price', '<=', searchForm.data.max_cost);
        }
        console.log(searchForm.data.category, "CAT")
        if(searchForm.data.category.length !== 0)
        {
            queryBuilder.where('category_id', "in", searchForm.data.category);
        }
        console.log(searchForm.data.brand, "BRAND")
        if(searchForm.data.brand.length !== 0)
        {
            queryBuilder.where('brand_id', "in", searchForm.data.brand);
        }
        const products = await queryBuilder.fetch({
            withRelated: ["brands", "category"],
        });
        return products;
    } catch (error) {
        console.log("Error Finding Products", error);
        return null;
    }
} 

module.exports = {
  getAllProductsDAL,
  addProductDAL,
  editProductDAL,
  deleteProductDAL,
  getProductDAL,
  getMainCategoriesDAL,
  getAllBrandsDAL,
  getAllCategoriesDAL,
  reduceQuantityDAL,
  searchProductsDAL
};
