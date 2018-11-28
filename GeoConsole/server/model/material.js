const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  description: String,
});

/**
 * @desc构建表模型
 */
const MaterialModel = mongoose.model('material', materialSchema, 'material');
module.exports = MaterialModel;
