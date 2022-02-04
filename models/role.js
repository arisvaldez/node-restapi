const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  role: {
    type: String,
    require: true,
  },
});

module.exports = model('Role', RoleSchema);
