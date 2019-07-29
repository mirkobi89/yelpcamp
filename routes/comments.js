var express = require("express");
var router = express.Router({mergeParams:true});

var middleware = require("../middleware"); //include index.js file
//mergeParams
/*Preserve the req.params values from the parent router. 
If the parent and the child have conflicting param names,
the child’s value take precedence.*/

var Campground = require("../models/campground");
var Comment = require("../models/comment");

//============================
// comment routes 
//============================


//comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
             res.render("comments/new", {campground:campground});
        }
    });
   
});

//comments create
router.post("/", middleware.isLoggedIn, function(req,res){
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    //connect new comment to campground
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to campground show page
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });
});

//edit comment

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
	Comment.findById(req.params.comment_id, function(err,foundComment){
		if(err){
			res.redirect("back");
		}
		else{
			//NOTE: req.params.id is referred to the campground id
			//(see app.js routes)
			res.render("comments/edit",
					   {campground_id: req.params.id,
					   comment: foundComment});
		}
	});
	
});

//update comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,
							  req.body.comment,
							  function(err, updatedComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});


//destroy comment

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err, deletedComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

module.exports = router;