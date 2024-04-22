const express = require("express");
const router =  express.Router();

const models = require('../../models');
const modelforms = require('../../forms');
const serviceLayer = require('../../service-layer/Roles');

router.get('/', async function(req,res){
    const roles = await serviceLayer.serviceGetRoles();
    res.render('roles/index', {
        roles: roles.toJSON()
    } );
});

router.get('/add-role', async function(req,res){
    const roleForm = modelforms.createRoleForm();
    res.render('roles/create', {
        form: roleForm.toHTML(modelforms.bootstrapField),
    } );
});

router.post('/add-role', async function(req,res){
    const roleForm = modelforms.createRoleForm();
    roleForm.handle(req, {
        'success': async function(form) {
            const role = await serviceLayer.serviceAddRole(form);
            req.flash("success_messages", `New Role ${role.get('role_name')} has been created`)
            res.redirect("/admin/roles");
        },
        'empty': function(form) {
            res.render('roles/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        },
        'error': function(form) {
            res.render('roles/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        }
    })
});

router.get('/update-role/:role_id', async function(req,res){
    const { role_id } = req.params;
    const role = await serviceLayer.serviceGetRole(role_id);
    const roleForm = modelforms.createRoleForm();
    for(let field in roleForm.fields)
    {
        roleForm.fields[field].value = role.get(field);
    }
    res.render('roles/update', {
        form: roleForm.toHTML(modelforms.bootstrapField),
        'role': role.toJSON(),
    } );
});

router.post('/update-role/:role_id', async function(req,res){
    const { role_id } = req.params;
    const roleForm = modelforms.createRoleForm();
    roleForm.handle(req, {
        'success': async function(form) {
            const role = await serviceLayer.serviceUpdateRole(form,role_id);
            req.flash("success_messages", `Role ${role.get('role_name')} has been updated`)
            res.redirect("/admin/roles");
        },
        'empty': function(form) {
            res.render('roles/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        },
        'error': function(form) {
            res.render('roles/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        }
    })
});


router.get('/delete-role/:role_id', async function(req,res){
    const { role_id } = req.params;
    const role = await serviceLayer.serviceGetRole(role_id);
    res.render('roles/delete', {
        role: role.toJSON()
    } );
});

router.post('/delete-role/:role_id', async function(req,res){
    const { role_id } = req.params;
    const response = await serviceLayer.serviceDelRole(role_id);
    req.flash("success_messages", `Role ${response} has been Deleted`)
    res.redirect("/admin/roles");
});


module.exports = router;