const express = require("express");
const router =  express.Router();
const crypto = require('crypto');

const models = require('../../models');
const modelforms = require('../../forms');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

router.get('/', async function(req,res){
    const users = await models.User.fetchAll({
        withRelated:['roles']
    })
    console.log(users.toJSON());
    res.render('users/index', {
        users: users.toJSON()
    } );
})

// router.get('/register', async function(req,res){
//     const registerForm = modelforms.createRegistrationForm();
//     res.render('users/register', {
//         'form': registerForm.toHTML(modelforms.bootstrapField)
//     })
// })

// router.post('/register', (req, res) => {
//     const registerForm = modelforms.createRegistrationForm();
//     registerForm.handle(req, {
//         success: async (form) => {
//             const user = new models.User({
//                 'username': form.data.username,
//                 'password_hash': getHashedPassword(form.data.password),
//                 'email': form.data.email,
//                 'role_id': 1
//             });
//             await user.save();
//             req.flash("success_messages", "User signed up successfully!");
//             res.redirect('/admin/users/login')
//         },
//         'empty': (form) => {
//             res.render('users/register', {
//                 form: form.toHTML(modelforms.bootstrapField)
//             })
//         },
//         'error': (form) => {
//             res.render('users/register', {
//                 'form': form.toHTML(modelforms.bootstrapField)
//             })
//         }
//     })
// })

router.get('/login', (req,res)=>{
    const loginForm = modelforms.createLoginForm();
    res.render('users/login',{
        'form': loginForm.toHTML(modelforms.bootstrapField)
    })
})

router.post('/login', (req,res)=>{
    const loginForm = modelforms.createLoginForm();
    loginForm.handle(req, {
        'success': async (form) => {
            let user = await models.User.where({
                'email': form.data.email
            }).fetch({
               require:false}
            );

            if (!user) {
                req.flash("error_messages", "Sorry, the authentication details you provided does not work1.")
                res.redirect('/admin/users/login');
            } else {
                if (user.get('password_hash') === getHashedPassword(form.data.password)) {
                    req.session.user = {
                        id: user.get('id'),
                        username: user.get('username'),
                        email: user.get('email')
                    }
                    req.flash("success_messages", "Welcome back, " + user.get('username'));
                    res.redirect('/admin');
                } else {
                    req.flash("error_messages", "Sorry, the authentication details you provided does not work2.")
                    res.redirect('/admin/users/login')
                }
            }
        }, 'error': (form) => {
            req.flash("error_messages", "There are some problems logging you in. Please fill in the form again")
            res.render('users/login', {
                'form': form.toHTML(modelforms.bootstrapField)
            })
        }
    })
})

router.get('/logout', (req, res) => {
    req.session.user = null;
    req.flash('success_messages', "Goodbye");
    res.redirect('/admin/users/login');
})

module.exports = router;