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

// Update a Card by the id in the request
exports.update = (req, res) => {

  Card.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Card was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Card with id=${id}. Maybe Card was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Card with id=" + id
      });
    });

  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Card.destroy({
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Card was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete Card with id=${id}. Maybe Tutorial was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Card with id=" + id
          });
        });
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Card.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Numbers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Card.findAll({ where: { published: true } })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
  
};
