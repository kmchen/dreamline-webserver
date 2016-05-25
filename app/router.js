import express from 'express';
import Review  from './models/reviews';
import Constant from './constant';
import Superagent from 'SuperAgent';

import {GetToken, GetAuthURL} from './util/Oauth';

const cst = Constant;
const Router = express.Router();
const sa = Superagent;

// logger is a req loging middleware
function logger(req, res, next) {
  var today = new Date().toLocaleDateString('en-GB', {
          year  : 'numeric',
          month : 'numeric',
          day   : 'numeric',
          hour  : '2-digit',
          minute: '2-digit',
  }).split(', ').join(' ');
  console.log(today, req.method, req.originalUrl);
  next();
};

Router.use(logger);

// api/all/stats returns a collection of all airports stats ordered by review count
// each item in the collection should have:
// - Airport name
// - Reviews count  
Router.route('/all/stats')
  .get(function(req, res) {
    Review.aggregate([
      {$group: {_id: "$airport_name", review_count: {$sum: 1}}},
      {$sort: {review_count: -1}},
      {$project : { _id : 0 , airport_name: "$_id" , review_count : 1 }}],
      function(err, result) {
        if (err) {
          console.error('[Err] Fail to query /api/all/stats', err)
          res.status(cst.StatusBadRequest).json([]);
          return;
        }
        res.json(result);
      }
    );
  });

// api/[airport]/stats returns some stats for a specific  airport
// - Airport name
// - Reviews count  
// - Average overall_rating
// - count of recommendations “recommended”
Router.route('/:airport/stats')
  .get(function(req, res) {
    Review.aggregate([
      {$match: {  airport_name: req.params.airport}},
      {$group: {  _id: "$airport_name",
                  avg_overall_rating: { $avg: '$overall_rating' },
                  recommended_count: {$sum: { $cmp: [ "$recommended", 0 ]}},
                  review_count: {$sum: 1}}},
      {$project : { _id : 0 ,
                    airport_name: "$_id",
                    avg_overall_rating: 1,
                    recommended_count: 1,
                    review_count : 1 }}],
      function(err, results) {
        if (err) {
          console.error('[Err] Fail to query /api/'+ req.params.airport+'/stats', err);
          res.status(Constant.StatusBadRequest).json({});
          return;
        }
        if (results.length > 1) {
          console.log('[Err] More than one result found /api/'+ req.params.airport+'/stats', result);
          res.status(cst.InternalServerError).json({});
          return;
        }
        if (results.length == 0) {
          console.log('[Info] Query not found /api/'+ req.params.airport+'/stats');
          res.json({});
          return;
        }
        var r = results[0];
        r.avg_overall_rating = r.avg_overall_rating.toFixed(2);
        res.json(r);
      }
    );
  });

// api/[airport]/reviews returns a collection  of  reviews ordered by date 
// The latest review is  returned  as  first element 
// each review should have the following information:    
// - overall_rating  
// - recommendation
// - date
// - author_country
// - content
Router.route('/:airport/reviews')
  .get(function(req, res) {
    Review.aggregate([
      {$match: {  airport_name: req.params.airport}},
      {$sort: {date: -1}},
      {$project : { _id : 0 ,
                    date: 1,
                    content: 1,
                    author_country: 1,
                    recommended: 1,
                    overall_rating: 1}}],
      function(err, result) {
        if (err) {
          console.error('[Err] Fail to query /api/'+ req.params.airport+'/reviews', err);
          res.json([]);
          return;
        }
        res.json(result);
      }
    );
  });

// Send out for authorization login
Router.route('/login')
  .get(function(req, res) {
    let authURL = GetAuthURL();
    if (!authURL)
      res.status(cst.BadRequest).send('[Oauth] Invalid auth URL').end();
    res.json(authURL)
 });

const meta = new Meta();
// /api/callback?code=4/OjHR
Router.route('/callback')
  .get(function(req, res) {
    let code = req.query.code;
    let saveToken = (err, user) => {
      if(!err) {
        let m = meta.new({uuid: someUUID}, someType);
      }
    }
    if (code) {
      GetToken(code);
    }
    return;
 });

module.exports = Router;
