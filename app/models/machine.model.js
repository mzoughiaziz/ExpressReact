module.exports = (sequelize, Sequelize) => {
  const Machine = sequelize.define("machine", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Machine;
};
