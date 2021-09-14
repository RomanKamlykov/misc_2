const { DataTypes } = require('sequelize');

const modelName = 'User';

const attributes = {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  real_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birth_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_agree: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  registeredAt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

const options = {
  timestamps: false,
};

module.exports = [modelName, attributes, options];
