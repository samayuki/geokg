const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const regionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String
});

/**
 * @desc构建表模型
 */
const RegionModel = mongoose.model('region', regionSchema, 'region')

module.exports = RegionModel;
