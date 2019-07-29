var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
const Comment = require("../models/comment");
var middleware = require("../middleware"); //include index.js file

//index - show all campgrounds
router.get("/", function(req,res){
    
    //get all campgrounds from db
    
    Campground.find({}, function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});


//create route - add new campground to db
router.post("/", middleware.isLoggedIn,function(req,res){
	//added isLoggedIn to prevent not logged user to add new campgrounds
    //get data from form and addt to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
    var newCampground = {name: name, image: image,
						 description:desc, author:author};
    //create a new campground and save to db
    Campground.create(newCampground, function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            //redirect to campgrounds page
            res.redirect("/campgrounds");
        }
    });
    
});

//new route - show form to create new campground
router.get("/new",middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//show - show info about one campground
router.get("/:id",function(req, res) {
    
    //find the campground with selected id
    Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground){
          if(err){
              console.log(err);
          }  
          else{
              //show it
              res.render("campgrounds/show", {campground:foundCampground});
          }
    });
});

//edit campground

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
		Campground.findById(req.params.id, function(err, foundCampground){
			res.render("campgrounds/edit", {campground:foundCampground});
		});
});

//update campground

router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
	//find and update the correct campgrorund
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,
								 function(err,updatedCampground){
		//redirect
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
		
	});
	
	
});


//destroy campground

router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err, campgroundRemoved) => {
        if (err) {
            console.log(err);
        }
		//remove all the comments associated to the campground
        Comment.deleteMany( {_id: { $in: campgroundRemoved.comments } }, (err) => {
            if (err) {
                console.log(err);
            }
            res.redirect("/campgrounds");
        });
    });
});

module.exports = router;