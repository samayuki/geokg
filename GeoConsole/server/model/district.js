const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const districtSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  belong_to: String
});

/**
 * @desc构建表模型
 */
const DistrictModel = mongoose.model('districts', districtSchema, 'districts');

module.exports = DistrictModel;
