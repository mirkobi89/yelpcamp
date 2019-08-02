//all the middleware goes here
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");
middlewareObj.checkCampgroundOwnership = function (req,res,next){
	//is user logged in
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			//back to the previous page
			res.redirect("back");
		}
		else{
			//does user own the campground?
			//NOTE: author is a mongoose object, loggedUser is a string so i 				must use .equals instead of ===
			var author = foundCampground.author.id;
			var loggedUser = req.user._id;
			if(author.equals(loggedUser)||req.user.isAdmin){
				next();
			}
			else{
				req.flash("error","Permission denied");
				//otherwise redirect
				res.redirect("back");
			}
		}
		});
	}
	//if not, redirect
	else{
		res.redirect("back");
	}
};

middlewareObj.checkCommentOwnership= function(req,res,next){
	//is user logged in
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			//back to the previous page
			res.redirect("back");
		}
		else{
			//does user own the comment?
			//NOTE: author is a mongoose object, loggedUser is a string so i 				must use .equals instead of ===
			var author = foundComment.author.id;
			var loggedUser = req.user._id;
			if(author.equals(loggedUser)||req.user.isAdmin){
				next();
			}
			else{
				req.flash("error","Permission denied");
				//otherwise redirect
				res.redirect("back");
			}
		}
		});
	}
	//if not, redirect
	else{
		res.redirect("back");
	}
};

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Pleas login first!");
	res.redirect("/login");
};

module.exports = middlewareObj;