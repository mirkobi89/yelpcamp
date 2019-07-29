var mongoose = require("mongoose")
var Campground = require("./models/campground")
var Comment = require("./models/comment")

var data = [
    {
        name: "cloud's rest",
        image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ipsum risus, lacinia mattis consectetur id, porttitor laoreet sem. Sed porttitor ipsum ligula, in vehicula ligula dictum in. Maecenas fermentum pharetra augue nec finibus. Morbi convallis erat consequat scelerisque dictum. Nunc massa diam, laoreet iaculis lectus vel, mattis iaculis magna. Aliquam in congue libero. Suspendisse pulvinar ornare neque, id iaculis dolor pulvinar egestas. Integer non malesuada augue."
    },
    {
        name: "desert mesa",
        image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ipsum risus, lacinia mattis consectetur id, porttitor laoreet sem. Sed porttitor ipsum ligula, in vehicula ligula dictum in. Maecenas fermentum pharetra augue nec finibus. Morbi convallis erat consequat scelerisque dictum. Nunc massa diam, laoreet iaculis lectus vel, mattis iaculis magna. Aliquam in congue libero. Suspendisse pulvinar ornare neque, id iaculis dolor pulvinar egestas. Integer non malesuada augue."
    },
    {
        name: "canyon floor",
        image:"https://farm4.staticflickr.com/3492/3823130660_0509aa841f.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ipsum risus, lacinia mattis consectetur id, porttitor laoreet sem. Sed porttitor ipsum ligula, in vehicula ligula dictum in. Maecenas fermentum pharetra augue nec finibus. Morbi convallis erat consequat scelerisque dictum. Nunc massa diam, laoreet iaculis lectus vel, mattis iaculis magna. Aliquam in congue libero. Suspendisse pulvinar ornare neque, id iaculis dolor pulvinar egestas. Integer non malesuada augue."
    }
    ]

function seedDB(){
    //remove all campgrounds
    
    Campground.deleteMany({}, function(err){
    // if(err){
    //     console.log(err)
    // }
    // else{
    //     console.log("removed campgrounds")
    //     //add a few campgrounds
    //     data.forEach(function(seed){
    //         Campground.create(seed, function(err,campground){
    //             if(err){
    //                 console.log(err)
    //             }
    //             else{
    //                 console.log("added a campground")
    //                 //create a comment
    //                 Comment.create(
    //                     {
    //                         text: "greeeeeat plaaaace!!!!",
    //                         author: "homer"
    //                     }, function(err, comment){
    //                         if(err){
    //                             console.log(err)
    //                         }
    //                         else{
    //                           campground.comments.push(comment)
    //                           campground.save()
    //                           console.log("created new comment")
    //                         }
    //                     })
    //             }
    //         })
    //     })
    // }
     });
}

module.exports = seedDB;

