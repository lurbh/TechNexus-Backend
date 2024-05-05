const models = require("../models");

const getAllCategoriesDAL = async () => {
  try {
    return await models.Category.fetchAll({
      withRelated: ["parentCategory"],
    });
  } catch (error) {
    console.log("Error getting Categories", error);
  }
};

const getCategoryDAL = async (category_id) => {
  try {
    return await models.Category.where({
      id: category_id,
    }).fetch({
      require: true,
    });
  } catch (error) {
    console.log("Error getting Category", error);
  }
};

const addCategoryDAL = async (categoryForm) => {
  try {
    const category = new models.Category();
    const { ...categoryData } = categoryForm.data;
    category.set(categoryData);
    await category.save();
    return category;
  } catch (error) {
    console.log("Error creating Category", error);
  }
};

const updateCategoryDAL = async (categoryForm, category_id) => {
  try {
    const category = await models.Category.where({
      id: category_id,
    }).fetch({
      require: true,
    });
    const { ...categoryData } = categoryForm.data;
    category.set(categoryData);
    await category.save();
    return category;
  } catch (error) {
    console.log("Error updating Category", error);
  }
};

const deleteCategoryDAL = async (category_id) => {
  try {
    const category = await models.Category.where({
      id: category_id,
    }).fetch({
      require: true,
    });
    const name = category.get("category_name");
    await category.destroy();
    return name;
  } catch (error) {
    console.log("Error Deleting Category", error);
  }
};

module.exports = {
  getAllCategoriesDAL,
  getCategoryDAL,
  addCategoryDAL,
  updateCategoryDAL,
  deleteCategoryDAL,
};
