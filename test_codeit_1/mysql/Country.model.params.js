const { DataTypes } = require('sequelize');

const modelName = 'Country';

const attributes = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
};

const options = {
  timestamps: false,
};

module.exports = [modelName, attributes, options];
