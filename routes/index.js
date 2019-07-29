var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req,res){
    res.render("landing");
});

//auth routes

//show register form
router.get("/register",function(req,res){
	res.render("register");
});

router.post("/register",function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password, function(err,user){
		if(err){
			req.flash("error",err.message);
			//print the message from the err obj (mongoose-passport package)
			return res.redirect("/register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success",
					  "Successfully signed up! Welcome "+req.body.username);
			res.redirect("/campgrounds");
		});
	});
});

//show login form

router.get("/login",function(req,res){
	//send to login.ejs message NOTE: see middleware
	//res.render("login", {message: req.flash("error")});
	res.render("login");
});

//login logic
//app.post("/login",middleware,callback)


router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req,res){
});


router.get("/logout",function(req,res){
	req.logout();
	req.flash("success", "logged you out");
	res.redirect("/campgrounds");
});

module.exports = router;