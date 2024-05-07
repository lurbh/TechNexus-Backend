const express = require("express");
const router = express.Router();

const modelforms = require("../../forms");
const serviceLayer = require("../../service-layer/Product");
const DAL = require("../../data-access-layer/ProductDAL");

router.get("/", async function (req, res) {
  const products = await serviceLayer.serviceGetAllProducts();
  res.render("products/index", {
    products: products.toJSON(),
  });
});

router.get("/add-product", async function (req, res) {
  const allCategories = (await serviceLayer.serviceGetAllCategories()).map(
    (category) => [category.get("id"), category.get("category_name")],
  );
  const allBrands = (await serviceLayer.serviceGetAllBrands()).map((t) => [
    t.get("id"),
    t.get("brand_name"),
  ]);
  const productForm = modelforms.createProductForm(allCategories, allBrands);
  res.render("products/create", {
    form: productForm.toHTML(modelforms.bootstrapField),
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
  });
});

router.post("/add-product", async function (req, res) {
  const allCategories = (await serviceLayer.serviceGetAllCategories()).map(
    (category) => [category.get("id"), category.get("category_name")],
  );
  const allBrands = (await serviceLayer.serviceGetAllBrands()).map((t) => [
    t.get("id"),
    t.get("brand_name"),
  ]);
  const productForm = modelforms.createProductForm(allCategories, allBrands);
  productForm.handle(req, {
    success: async function (form) {
      const product = await serviceLayer.serviceAddProduct(form);
      req.flash(
        "success_messages",
        `New Product ${product.get("product_name")} has been created`,
      );
      res.redirect("/admin/products");
    },
    empty: function (form) {
      res.render("products/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
    error: function (form) {
      res.render("products/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
  });
});

router.get("/update-product/:product_id", async function (req, res) {
  const { product_id } = req.params;
  const product = await serviceLayer.serviceGetProduct(product_id);
  const allCategories = (await serviceLayer.serviceGetAllCategories()).map(
    (category) => [category.get("id"), category.get("category_name")],
  );
  const allBrands = (await serviceLayer.serviceGetAllBrands()).map((t) => [
    t.get("id"),
    t.get("brand_name"),
  ]);
  const productForm = modelforms.createProductForm(allCategories, allBrands);
  for (let field in productForm.fields) {
    productForm.fields[field].value = product.get(field);
  }
  res.render("products/update", {
    form: productForm.toHTML(modelforms.bootstrapField),
    product: product.toJSON(),
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
  });
});

router.post("/update-product/:product_id", async function (req, res) {
  const { product_id } = req.params;
  const product = await serviceLayer.serviceGetProduct(product_id);
  const allCategories = (await serviceLayer.serviceGetAllCategories()).map(
    (category) => [category.get("id"), category.get("category_name")],
  );
  const allBrands = (await serviceLayer.serviceGetAllBrands()).map((t) => [
    t.get("id"),
    t.get("brand_name"),
  ]);
  const productForm = modelforms.createProductForm(allCategories, allBrands);
  productForm.handle(req, {
    success: async function (form) {
      const product = await serviceLayer.serviceEditProduct(form, product_id);
      req.flash(
        "success_messages",
        `Product ${product.get("product_name")} has been Updated`,
      );
      res.redirect("/admin/products");
    },
    empty: function (form) {
      res.render("products/update", {
        form: form.toHTML(modelforms.bootstrapField),
        product: product.toJSON(),
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
      });
    },
    error: function (form) {
      res.render("products/update", {
        form: form.toHTML(modelforms.bootstrapField),
        product: product.toJSON(),
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
      });
    },
  });
});

router.get("/delete-product/:product_id", async function (req, res) {
  const { product_id } = req.params;
  const product = await serviceLayer.serviceGetProduct(product_id);

  res.render("products/delete", {
    product: product.toJSON(),
  });
});

router.post("/delete-product/:product_id", async function (req, res) {
  const { product_id } = req.params;
  const response = await serviceLayer.serviceDeleteProduct(product_id);
  req.flash("success_messages", `Product ${response} has been Deleted`);
  res.redirect("/admin/products");
});

module.exports = router;
