const brandDAL = require("../data-access-layer/BrandsDAL");

const serviceGetBrands = async () => {
  const brands = await brandDAL.getAllBrandsDAL();
  return brands;
};

const serviceGetBrand = async (brand_id) => {
  const brand = await brandDAL.getBrandDAL(brand_id);
  return brand;
};

const serviceAddBrand = async (brandForm) => {
  const response = await brandDAL.addBrandDAL(brandForm);
  return response;
};

const serviceUpdateBrand = async (brandForm, brand_id) => {
  const response = await brandDAL.updateBrandDAL(brandForm, brand_id);
  return response;
};

const serviceDelBrand = async (brand_id) => {
  const response = await brandDAL.deleteBrandDAL(brand_id);
  return response;
};

module.exports = {
  serviceGetBrands,
  serviceGetBrand,
  serviceAddBrand,
  serviceUpdateBrand,
  serviceDelBrand,
};
