const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  description: String,
});

/**
 * @desc构建表模型
 */
const TypeModel = mongoose.model('type', typeSchema, 'type');
module.exports = TypeModel;
