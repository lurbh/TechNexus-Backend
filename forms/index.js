const forms = require('forms');

const fields = forms.fields;
const validators = forms.validators;
const widgets = forms.widgets;

const bootstrapField = function (name, object) {
    if (!Array.isArray(object.widget.classes)) { object.widget.classes = []; }

    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }

    var validationclass = object.value && !object.error ? 'is-valid' : '';
    validationclass = object.error ? 'is-invalid' : validationclass;
    if (validationclass) {
        object.widget.classes.push(validationclass);
    }

    var label = object.labelHTML(name);
    var error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' : '';

    var widget = object.widget.toHTML(name, object);
    return '<div class="form-group">' + label + widget + error + '</div>';
};

const createProductForm = (categories,brands) => {
    // the object in the parameter
    // is the form definition
    return forms.create({
        'product_name': fields.string({
            required: true,
            errorAfterField: true,
        }),
        'price': fields.number({
            required: true,
            errorAfterField: true,
            widget: widgets.number(),
            validators: [validators.min(0)]
        }),
        'quantity_available': fields.number({
            required: true,
            errorAfterField: true,
            validators: [validators.min(0), validators.integer()]
        }),
        'description': fields.string({
            required: true,
            widget : widgets.textarea(),
            errorAfterField: true
        }),
        'category_id': fields.number({
            label: 'Category',
            required: true,
            errorAfterField: true,
            widget: widgets.select(), // use the select dropdown
            choices: categories
        }),
        'brand_id':fields.number({
            label: 'Brand',
            required: true,
            errorAfterField: true,
            widget: widgets.select(),
            choices: brands
        })
    })
}

module.exports = { createProductForm , bootstrapField};