var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burgers = require("../models/burger.js");
console.log(burgers)
// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/burgers");
});


// get route, edited to match sequelize
router.get("/burgers", function(req, res) {
  // replace old function with sequelize function
  console.log("hello, are you here")
  burgers.all(function(dbBurger){
      
      console.log(dbBurger, "line 20 ");
      // into the main index, updating the page
      var hbsObject = { burger: dbBurger };
      res.render("index", hbsObject);
    });
});

// post route to create burgers
router.post("/burgers/create", function(req, res) {
  // edited burger create to add in a burger_name
  burgers.create({
    burger_name: req.body.burger_name
  })
    // pass the result of our call
    .then(function(dbBurger) {
      // log the result to our terminal/bash window
      console.log(dbBurger);
      // redirect
      res.redirect("/");
    });
});

// put route to devour a burger
router.put("/burgers/update/:id", function(req, res) {
  // update one of the burgers
  burgers.update({
    devoured: true
  },
  {
    where: {
      id: req.params.id
    }
  }
  ).then(function(dbBurger) {
    res.json("/");
    console.log(dbBurger)
  });
});
// My Previous Code


// Create all our routes and set up logic within those routes where required.
// router.get("/", function(req, res) {
//   burgers.all(function(data) {
//     var hbsObject = {
//       burgers: data
//     };
//     console.log(hbsObject);
//     res.render("index", hbsObject);
//   });
// });

// router.post("/api/burgers", function(req, res) {
//   console.log(req.body, req.body.devoured)
//   burgers.create([
//     "burger_name", "devoured"
//   ], [
//     req.body.burger_name, req.body.devoured
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });

// router.put("/api/burger/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   burgers.update({
//     devoured: req.body.devoured
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// router.delete("/api/burger/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   burgers.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// Export routes for server.js to use.
module.exports = router;
