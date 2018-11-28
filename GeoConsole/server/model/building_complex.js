const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buildingComplexSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  address: String,
  protect_level: String,
  current_situation: String,
  description: String,
  district: String,
  region: String,
  location: Object,
  has_part: Array,
  has_picture: Array,
});

/**
 * @desc构建表模型
 */
const BuildingComplexModel = mongoose.model('building_complex', buildingComplexSchema, 'building_complex');

module.exports = BuildingComplexModel;
