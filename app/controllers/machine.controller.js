const db = require("../models");
const machine = db.machines;
const Op = db.Sequelize.Op;

// Create and Save a new machine
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a machine
  const machine = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save machine in the database
  machine.create(machine)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the machine."
      });
    });
};

// Retrieve all machines from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  machine.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving machines."
      });
    });
};

// Find a single machine with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  machine.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving machine with id=" + id
      });
    });
};

// Update a machine by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  machine.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "machine was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update machine with id=${id}. Maybe machine was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating machine with id=" + id
      });
    });
};

// Delete a machine with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  machine.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "machine was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete machine with id=${id}. Maybe machine was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete machine with id=" + id
      });
    });
};

// Delete all machines from the database.
exports.deleteAll = (req, res) => {
  machine.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} machines were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all machines."
      });
    });
};

// find all published machine
exports.findAllPublished = (req, res) => {
  machine.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving machines."
      });
    });
};
