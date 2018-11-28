const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buildingPartSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  description: String,
  has_material: Array,
  has_type: String,
  has_picture: Array,
});

/**
 * @desc构建表模型
 */
const BuildingPartModel = mongoose.model('building_part', buildingPartSchema, 'building_part');
module.exports = BuildingPartModel;
