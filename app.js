var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
	flash = require("connect-flash"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
	User	= require("./models/user"),
    seedDB = require("./seeds");

//requiring routes    

	var commentRoutes = require("./routes/comments"),
		campgroundRoutes = require("./routes/campgrounds"),
		indexRoutes = require("./routes/index");
//seed the database
//seedDB(); 

mongoose.connect("mongodb://localhost/yelp_camp_4",
                    { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.use(express.static(__dirname+"/public"));
//required for edit and update post methods
app.use(methodOverride("_method"));

app.use(flash());

//passport config

app.use(require("express-session")({
	secret: "1234",
	resave: false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware called on every routes
app.use(function(req,res,next){
	//current user
	res.locals.currentUser = req.user;
	//flash messages
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/",indexRoutes);
//append "/camgrounds" to all the routes
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments/", commentRoutes);


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("The YelpCamp Server Has Started!");
});

		