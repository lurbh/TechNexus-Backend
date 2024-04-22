const categoryDAL = require("../data-access-layer/CategoriesDAL");

const serviceGetCategories = async () => {
    const categories = await categoryDAL.getAllCategoriesDAL();
    return categories;
} 

const serviceGetCategory = async (category_id) => {
    const category =  await categoryDAL.getCategoryDAL(category_id);
    return category;
} 

const serviceAddCategory = async (categoryForm) => {
    const response = await categoryDAL.addCategoryDAL(categoryForm);
    return response;
} 

const serviceUpdateCategory = async (categoryForm, category_id) => {
    const response = await categoryDAL.updateCategoryDAL(categoryForm, category_id);
    return response;
} 

const serviceDelCategory = async (category_id) => {
    const response = await categoryDAL.deleteCategoryDAL(category_id);
    return response;
} 

module.exports = {
    serviceGetCategories,
    serviceGetCategory,
    serviceAddCategory,
    serviceUpdateCategory,
    serviceDelCategory
}