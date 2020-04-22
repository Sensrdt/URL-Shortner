const express = require('express');
const router = express.Router();
const validate = require('valid-url');
const configuration = require('config');

const DB = require('../model/storeUrlSchema');


function generate()
{
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var result = '';
    for (var i = 6; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


router.post('/shorten', async (req, res) => {

  const { longUrl } = req.body;
  
  const baseUrl = configuration.get('baseUrl');

  if (!validate.isUri(baseUrl)) {

    console.log({
      done : false,
      desc : 'Base Url is not valid'
    });


    return res.status(401).send({
      done : false,
      desc : 'Base Url is not valid'
    });

  }

  const urlCode = generate();

  if (validate.isUri(longUrl)) {
    try {
      let url = await DB.findOne({ longUrl });

      if (url) 
      {
        console.log(url);
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = new DB({
          long : longUrl,
          short : shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        console.log(url);
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});

module.exports = router;
