import BuildingModel from '../model/building';
import BuildingPartModel from '../model/buildingPart'
import MaterialModel from '../model/material'
import TypeModel from '../model/type'
import BuildingComplexModel from  '../model/building_complex'
import {Router} from 'express';
const router = Router();
const mongoose = require('mongoose');

// 插入单个
function insert(buildingList) {
  let entity = {};
  while (buildingList.length) {
    let currentBuilding = buildingList.shift();
    let id = mongoose.Types.ObjectId(currentBuilding.id);  // string转objectId
    if (currentBuilding.type === '建筑材料') {
      entity = new MaterialModel({
        _id: id,
        name: currentBuilding.name,
        description: currentBuilding.description
      });
    } else if (currentBuilding.type === '建筑类型') {
      entity = new TypeModel({
        _id: id,
        name: currentBuilding.name,
        description: currentBuilding.description
      });
    } else if (currentBuilding.type === '单体建筑') { // 单体建筑下可以有建筑构造
      let children = [];
      if (currentBuilding.has_part && currentBuilding.has_part.length > 0) {  // 有下层结构，获取下层的各objectId
        currentBuilding.has_part.forEach(function (item) {
          children.push(mongoose.Types.ObjectId(item.id));
          buildingList.push(item);
        });
      }
      entity = new BuildingModel({
        _id: id,
        name: currentBuilding.name,
        has_material: currentBuilding.materials,
        description: currentBuilding.description,
        built_year: currentBuilding.built_year,
        address: currentBuilding.address,
        built_people: currentBuilding.built_people,
        exterior: currentBuilding.exterior,
        structure: currentBuilding.structure,
        has_type: currentBuilding.has_type,
        layer: currentBuilding.layer,
        location: null,
        has_part: children,
        has_picture: currentBuilding.has_picture,
      });
    } else if (currentBuilding.type === '建筑群') {  // 建筑群下可以有子建筑群or单体建筑
      let children = [];
      if (currentBuilding.has_part && currentBuilding.has_part.length > 0) {  // 有下层结构，获取下层的各objectId
        currentBuilding.has_part.forEach(function (item) {
          children.push(mongoose.Types.ObjectId(item.id));
          buildingList.push(item);
        });
      }
      entity = new BuildingComplexModel({
        _id: id,
        name: currentBuilding.name,
        address: currentBuilding.address,
        protect_level: currentBuilding.protect_level,
        current_situation: currentBuilding.current_situation,
        description: currentBuilding.description,
        district: "",
        region: "",
        location: null,
        has_part: children,
        has_picture: currentBuilding.has_picture,
      });
    } else if (currentBuilding.type === '建筑构造') {
      entity = new BuildingPartModel({
        _id: id,
        name: currentBuilding.name,
        description: currentBuilding.description,
        has_material: currentBuilding.has_material,
        has_type: currentBuilding.has_type,
        has_picture: currentBuilding.has_picture,
      });
    }
  }

  entity.save(function (err, res) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log("Res: " + res);
    }
  });
}

router.get('/getFormData', async (req, res, next) => {
  let data = JSON.parse(req.query.treeData);
  // 将data放入mongoDB
  console.log(data);
  insert(data);
  console.log("新建成功");
});
module.exports = router;

