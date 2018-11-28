import BuildingModel from '../model/building';
import {Router} from 'express';
const router = Router();


router.get('/getTableData', async (req, res, next) => {
  console.log(req.query.source);
  try {
    let data = await BuildingModel.find({}).exec();
    let sourceData = [];
    for(let doc of data) {
      let obj = {};
      obj["name"] = doc["name"];
      obj["built_year"] = doc["built_year"];
      obj["description"] = doc["description"];
      obj["address"] = doc["address"];
      obj["district"] = doc["district"];
      obj["region"] = doc["region"];
      obj["types"] = doc["types"].join(",");
      obj["materials"] = doc["materials"].join(",");
      obj["location"] = doc["location"];
      obj = JSON.parse(JSON.stringify(obj));
      sourceData.push(obj);
    }
    return res.status(200).json({sourceData: sourceData});
  } catch (e) {
    return res.status(401).json({message: "get data from db failed!"});
  }
});

module.exports = router;
