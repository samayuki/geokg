import BuildingModel from '../model/building';
import {Router} from 'express';
const router = Router();


router.get('/getMapPoint', async (req, res, next) => {
  try {
    let data = await BuildingModel.find({}, function (error) {
      if(error) {
        console.log('loading poi failed in DataBase.');
      }
    });
    let mapData = [];
    for(let doc of data) {
      let obj = {};
      obj["id"] = doc["_id"];
      obj["name"] = doc["name"];
      obj["location"] = doc["location"];
      obj = JSON.parse(JSON.stringify(obj));
      mapData.push(obj);
    }
    return res.status(200).json({mapData: mapData});
  } catch (e) {
    return res.status(401).json({message: "get data from db failed!"});
  }
});

router.get('/getBuildingByName', async (req, res, next) => {
  try {
    let name = req.query.name;
    let data = await BuildingModel.findOne({name: name}, function (error) {
      if(error) {
        console.log('loading building data failed in DataBase.');
      }
    });
    let obj = {};
    obj["name"] = data["name"];
    obj["built_year"] = data["built_year"];
    obj["description"] = data["description"];
    obj["address"] = data["address"];
    obj["district"] = data["district"];
    obj["region"] = data["region"];
    obj["types"] = data["types"].join(",");
    obj["materials"] = data["materials"].join(",");
    obj["location"] = data["location"];
    obj = JSON.parse(JSON.stringify(obj));
    return res.status(200).json({buildingData: obj});
  } catch (e) {
    return res.status(401).json({message: "get data from db failed!"});
  }
});


module.exports = router;
