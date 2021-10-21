module.exports = app => {
    const cards = require("../controllers/card.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Card
    router.post("/", cards.create);
  
    // Retrieve all Cards
    router.get("/", cards.findAll);
  
    // Retrieve all published Cards
    router.get("/published", cards.findAllPublished);
  
    // Retrieve a single Card with id
    router.get("/:id", cards.findOne);
  
    // Update a Card with id
    router.put("/:id", cards.update);
  
    // Delete a Card with id
    router.delete("/:id", cards.delete);
  
    // Delete all Cards
    router.delete("/", tutorials.deleteAll);
  
    app.use('/api/cards', router);
  };