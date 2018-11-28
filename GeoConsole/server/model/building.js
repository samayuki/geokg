const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buildingSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  built_year: String,
  address: String,
  built_people: String,
  description: String,
  exterior: String,
  structure: Object,
  has_type: Array,
  has_material: Array,
  layer: String,
  location: Object,
  has_part: Array,
  has_picture: Array,
});

/**
 * @desc构建表模型
 */
const BuildingModel = mongoose.model('building', buildingSchema, 'building');

module.exports = BuildingModel;
