const forms = require("forms");

const fields = forms.fields;
const validators = forms.validators;
const widgets = forms.widgets;

const bootstrapField = function (name, object) {
  if (!Array.isArray(object.widget.classes)) {
    object.widget.classes = [];
  }

  if (object.widget.classes.indexOf("form-control") === -1) {
    object.widget.classes.push("form-control");
  }

  var validationclass = object.value && !object.error ? "is-valid" : "";
  validationclass = object.error ? "is-invalid" : validationclass;
  if (validationclass) {
    object.widget.classes.push(validationclass);
  }

  var label = object.labelHTML(name);
  var error = object.error
    ? '<div class="invalid-feedback">' + object.error + "</div>"
    : "";

  var widget = object.widget.toHTML(name, object);
  return '<div class="form-group">' + label + widget + error + "</div>";
};

const createProductForm = (categories, brands) => {
  return forms.create({
    product_name: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.maxlength(255)],
    }),
    price: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.regexp(/^\d+(\.\d{1,2})?$/)],
    }),
    quantity_available: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.integer()],
    }),
    description: fields.string({
      required: true,
      widget: widgets.textarea(),
      errorAfterField: true,
    }),
    category_id: fields.number({
      label: "Category",
      required: true,
      errorAfterField: true,
      widget: widgets.select(),
      choices: categories,
    }),
    brand_id: fields.number({
      label: "Brand",
      required: true,
      errorAfterField: true,
      widget: widgets.select(),
      choices: brands,
    }),
    image_url: fields.string({
      widget: widgets.hidden(),
      validators: [validators.maxlength(255)],
    }),
  });
};

const createUserForm = (roles) => {
  return forms.create({
    email: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.maxlength(255)],
      cssClasses: {
        label: ["form-label"],
      },
    }),
    username: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.maxlength(255)],
      cssClasses: {
        label: ["form-label"],
      },
    }),
    role_id: fields.number({
      label: "Role",
      required: true,
      errorAfterField: true,
      widget: widgets.select(),
      choices: roles,
      cssClasses: {
        label: ["form-label"],
      },
    }),
    password: fields.password({
      required: true,
      errorAfterField: true,
      validators: [validators.maxlength(255)],
      cssClasses: {
        label: ["form-label"],
      },
    }),
    confirm_password: fields.password({
      required: true,
      errorAfterField: true,
      validators: [validators.maxlength(255)],
      cssClasses: {
        label: ["form-label"],
      },
      validators: [validators.matchField("password")],
    }),
  });
};

const createLoginForm = () => {
  return forms.create({
    email: fields.string({
      label: "Email or Username",
      required: true,
      errorAfterField: true,
      validators: [validators.maxlength(255)],
      cssClasses: {
        label: ["form-label"],
      },
    }),
    password: fields.password({
      required: true,
      errorAfterField: true,
      validators: [validators.maxlength(255)],
      cssClasses: {
        label: ["form-label"],
      },
    }),
  });
};

const createBrandForm = () => {
  return forms.create({
    brand_name: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.maxlength(255)],
    }),
    country_of_origin: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.maxlength(255)],
    }),
  });
};

const createRoleForm = () => {
  return forms.create({
    role_name: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.maxlength(255)],
    }),
  });
};

const createCategoryForm = (categories) => {
  return forms.create({
    category_name: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.maxlength(255)],
    }),
    parent_category_id: fields.number({
      label: "Parent Category",
      required: false,
      errorAfterField: true,
      widget: widgets.select(),
      choices: categories,
    }),
    category_img_url: fields.string({
      widget: widgets.hidden(),
      validators: [validators.maxlength(255)],
    }),
  });
};

const createReviewForm = (products, user) => {
  return forms.create({
    product_id: fields.number({
      label: "Product",
      required: true,
      errorAfterField: true,
      widget: widgets.select(),
      choices: products,
    }),
    user_id: fields.number({
      label: "User",
      required: true,
      errorAfterField: true,
      widget: widgets.select(),
      choices: user,
    }),
    rating: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.max(5)],
    }),
    review_text: fields.string({
      required: true,
      errorAfterField: true,
      widget: widgets.textarea(),
    }),
  });
};

const createNewsArticleForm = (user) => {
  return forms.create({
    title: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.maxlength(255)],
    }),
    content: fields.string({
      required: true,
      errorAfterField: true,
      widget: widgets.textarea(),
    }),
    author_id: fields.number({
      label: "User",
      required: true,
      errorAfterField: true,
      widget: widgets.select(),
      choices: user,
    }),
  });
};

const createCommentForm = (news_articles, user) => {
  return forms.create({
    article_id: fields.number({
      label: "News Article",
      required: true,
      errorAfterField: true,
      widget: widgets.select(),
      choices: news_articles,
    }),
    user_id: fields.number({
      label: "User",
      required: true,
      errorAfterField: true,
      widget: widgets.select(),
      choices: user,
    }),
    comment_text: fields.string({
      required: true,
      errorAfterField: true,
      widget: widgets.textarea(),
    }),
  });
};

const createOrderForm = (user, orderStatus) => {
  return forms.create({
    user_id: fields.number({
      label: "User",
      required: true,
      errorAfterField: true,
      widget: widgets.select(),
      choices: user,
    }),
    order_status_id: fields.number({
      label: "Order Status",
      required: true,
      errorAfterField: true,
      widget: widgets.select(),
      choices: orderStatus,
    }),
  });
};

const createOrderStatusForm = () => {
  return forms.create({
    status_name: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.maxlength(255)],
    }),
  });
};

const createOrderItemForm = (orders, products) => {
  return forms.create({
    order_id: fields.number({
      label: "Order ID",
      required: true,
      errorAfterField: true,
      widget: widgets.select(),
      choices: orders,
    }),
    product_id: fields.number({
      label: "Products",
      required: true,
      errorAfterField: true,
      widget: widgets.select(),
      choices: products,
    }),
    quantity: fields.number({
      required: true,
      errorAfterField: true,
      widget: widgets.number(),
      validators: [validators.min(0), validators.integer()],
    }),
    unit_price: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.regexp(/^\d+(\.\d{1,2})?$/)],
    }),
  });
};

const createCartItemForm = (users, products) => {
  return forms.create({
    user_id: fields.number({
      label: "User",
      required: true,
      errorAfterField: true,
      widget: widgets.select(),
      choices: users,
    }),
    product_id: fields.number({
      label: "Products",
      required: true,
      errorAfterField: true,
      widget: widgets.select(),
      choices: products,
    }),
    quantity: fields.number({
      required: true,
      errorAfterField: true,
      widget: widgets.number(),
      validators: [validators.min(0), validators.integer()],
    }),
  });
};

module.exports = {
  createProductForm,
  bootstrapField,
  createUserForm,
  createLoginForm,
  createBrandForm,
  createRoleForm,
  createCategoryForm,
  createReviewForm,
  createNewsArticleForm,
  createCommentForm,
  createOrderForm,
  createOrderStatusForm,
  createOrderItemForm,
  createCartItemForm,
};
