const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middleware/adminAuth");

router.get("/admin/users", adminAuth,  (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {users});
    });
});

router.get("/admin/users/create", adminAuth, (req, res) => {
    res.render("admin/users/create")
});

router.post('/users/create', adminAuth, (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where:{
            email:email
        }
    }).then(user => {
        if(user == undefined){
            var hash = createPasswordHash(password);
            User.create({
                email,
                password: hash
            }).then(() => {
                 res.redirect("/admin/users");
            }).catch(() => {
                res.redirect("/admin/users");
            });
        }else{
             res.redirect("/admin/user/create");
        }
    });
});

router.get('/login', (req, res) => {
    res.render("admin/users/login");
});

router.post('/authenticate', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where:{
            email:email
        }
    }).then(user => {
        if(user != undefined){
            var correct = bcrypt.compareSync(password, user.password);
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                 res.redirect('/admin/articles');
            }else{
                res.redirect("/login");
            }
        }else{
             res.redirect("/login");
        }
    });

});

router.post('/users/delete', adminAuth, (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            User.destroy({
                where : {
                    id:id
                }
            }).then(() =>{
                res.redirect("/admin/users");
            })
        }else{
            res.redirect("/admin/users");
        }
    }else{
      res.redirect("/admin/users");  
    }
});

router.get("/admin/users/edit/:id", adminAuth, (req, res)=> {
   var id = req.params.id;
   User.findByPk(id).then(user => {
        if(user != null){
            res.render("admin/users/edit", { user})
        }else{
            res.redirect("/admin/users");
        }
   }).catch(err => {
        res.redirect("/admin/users");
   });
});

router.get('/logout', (req, res) => {
     req.session.user = undefined;
      res.redirect("/");
});

router.post("/user/update", adminAuth, (req, res)=> {
    var id = req.body.id;
    var password = req.body.password;

    var hash = createPasswordHash(password);

    User.update({
        password: hash
    }, {
        where: {
            id: id
        }
    }).then(() => {
         res.redirect("/admin/users");
    }).catch( err => {
         res.redirect("/admin/users");
    });
 });
 
 router.get('/logout', (req, res) => {
      req.session.user = undefined;
       res.redirect("/");
 });

 const createPasswordHash = password => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return hash;
 }
    
 




module.exports = router;