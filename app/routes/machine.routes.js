module.exports = app => {
  const machine = require("../controllers/machine.controller.js");

  var router = require("express").Router();

  // Create a new Machine
  router.post("/", machine.create);

  // Retrieve all machine
  router.get("/", machine.findAll);

  // Retrieve all published machine
  router.get("/published", machine.findAllPublished);

  // Retrieve a single Machine with id
  router.get("/:id", machine.findOne);

  // Update a Machine with id
  router.put("/:id", machine.update);

  // Delete a Machine with id
  router.delete("/:id", machine.delete);

  // Delete all machine
  router.delete("/", machine.deleteAll);

  app.use('/api/machine', router);
};
