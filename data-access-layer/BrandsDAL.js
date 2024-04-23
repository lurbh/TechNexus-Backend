const models = require("../models");

const getAllBrandsDAL = async () => {
    try {
        return await models.Brand.fetchAll({
            require: true
        });
    } catch (error) {
        console.log("Error getting Brands", error)
    }
}

const getBrandDAL = async (brands_id) => {
    try {
        return await models.Brand.where({
            'id': brands_id
        }).fetch({
            require: true
        });
    } catch (error) {
        console.log("Error getting Brand", error)
    }
}

const addBrandDAL = async (brandForm) => {
    try {
        const brand = new models.Brand();
        const {...brandData} = brandForm.data;
        brand.set(brandData);
        await brand.save();
        return brand;
    } catch (error) {
        console.log("Error creating Brand", error)
    }
}

const updateBrandDAL = async (brandForm, brands_id) => {
    try {
        const brand = await models.Brand.where({
            'id': brands_id
        }).fetch({
            require: true
        });
        const {...brandData} = brandForm.data;
        brand.set(brandData);
        await brand.save();
        return brand;
    } catch (error) {
        console.log("Error updating Brand", error)
    }
}

const deleteBrandDAL = async (brands_id) => {
    try {
        const brand = await models.Brand.where({
            'id': brands_id
        }).fetch({
            require: true
        });
        const name = brand.get('brand_name');
        await brand.destroy();
        return name;
    } catch (error) {
        console.log("Error Deleting Brand", error)
    }
}

module.exports = {
    getAllBrandsDAL,
    getBrandDAL,
    addBrandDAL,
    updateBrandDAL,
    deleteBrandDAL
}