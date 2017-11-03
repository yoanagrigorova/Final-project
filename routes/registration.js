var express = require('express');
var router = express.Router();
var User = require('../public/javascripts/users.js');

router.post('/', function(req, res, next) {

    var name = req.body.name;
    var lastName = req.body.lastName;
    var mail = req.body.mail;
    var phone = req.body.phone;
    var password = req.body.password;
    var password2 = req.body.password2;

    console.log(name + " " + lastName + " " + mail + " " + phone + " " + password + " ");

    var db = req.db;
    var users = db.get("users");
    users.find({ mail: mail }).then(function(data) {
        if (data.length == 0) {
            if (password === password2) {

                try {
                var user = new User(name, lastName, mail, phone, password);
                users.insert(user);
                res.json({message: 'Successful registration!'}).redirect("/");
                }
                catch (err) {
                    res.json({message: err});
                }
            }
        } else {
            res.json({message: 'Email is already taken!'})
        }
    });
})

// router.get('/', function(req, res, next) {
//     // if (req.session.username)
//     //     res.redirect('/login');
//     // else
//     res.render('registration');
// });

module.exports = router;