const db = require("../models");
const Card = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    //validate request
    if(!req.body.number) {
        res.status(400).send({
           message:"Create a card" 
        })

    }

     // Create a Tutorial
    const card = {
    title: req.body.number,
    initials: req.body.initials,
    action: req.body.action,
    name: req.body.name,
    image: req.body.image,
    published: req.body.published ? req.body.published : false
  };

    // Save Tutorial in the database
    Card.create(card)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating a card."
      });
    });

  
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const number= req.query.number;
    var condition = number ? { number: { [Op.like]: `%${number}%` } } : null;
  
    Tutorial.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retriving cards"
        });
      });
  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Card.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find card with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};
