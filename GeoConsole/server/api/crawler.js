import request from 'request'
import cheerio from 'cheerio'
import urlencode from 'urlencode'
import {Router} from 'express';
const router = Router();
router.get('/getCrawlerData', async (req, res, next) => {
  const qs = req.query.keyword;
  const url = `http://www.baike.com/wiki/${qs}`;
  try {
    await request(url, (response, error, body) => {
      if(!error && response.statusCode === 200) {
        console.log(body);
        return res.status(200).json({data: title});
      } else {
        console.log("crawler page: "+ url + " failed!");
        return res.status(404).json({message: "crawler page: "+ url + " failed!"});
      }
    })
  } catch (e) {
    console.log(e.message);
  }
});
module.exports = router;
