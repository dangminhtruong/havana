const async = require('async');
const Category = require('../model/category');
const Bill = require('../model/bill');
var moment = require('moment');
const _ = require('lodash');

module.exports = (request, response) => {
	async.parallel(
		[
			//sunday
			function(callback) {
				Bill.find({ 
					createdOn : { 
						$gt :  moment().startOf('week'), 
						$lt :  moment().startOf('week').weekday(1)
					}
				},
				{
					total : 1
				})
					.exec((err, sunday) => {
						callback(null, sunday);
					});
			},
			//Monday
			function(callback) {
				Bill.find({ 
					createdOn : { 
						$gt :  moment().startOf('week').weekday(1), 
						$lt :  moment().startOf('week').weekday(2)
					}
				},
				{
					total : 1
				})
					.exec((err, monday) => {
						callback(null, monday);
					});
			},
			// TueDay
			function(callback) {
				Bill.find({ 
					createdOn : { 
						$gt :  moment().startOf('week').weekday(2), 
						$lt :  moment().startOf('week').weekday(3)
					}
				},
				{
					total : 1
				})
					.exec((err, tueDay) => {
						callback(null, tueDay);
					});
			},
			// WedDay
			function(callback) {
				Bill.find({ 
					createdOn : { 
						$gt :  moment().startOf('week').weekday(3), 
						$lt :  moment().startOf('week').weekday(4)
					}
				},
				{
					total : 1
				})
					.exec((err, wedDay) => {
						callback(null, wedDay);
					});
			},
			// ThuDay
			function(callback) {
				Bill.find({ 
					createdOn : { 
						$gt :  moment().startOf('week').weekday(4), 
						$lt :  moment().startOf('week').weekday(5)
					}
				},
				{
					total : 1
				})
					.exec((err, thuDay) => {
						callback(null, thuDay);
					});
			},
			// friDay
			function(callback) {
				Bill.find({ 
					createdOn : { 
						$gt :  moment().startOf('week').weekday(5), 
						$lt :  moment().startOf('week').weekday(6)
					}
				},
				{
					total : 1
				})
					.exec((err, friDay) => {
						callback(null, friDay);
					});
			},
			// satunDay
			function(callback) {
				Bill.find({ 
					createdOn : { 
						$gt :  moment().startOf('week').weekday(6), 
						$lt :  moment().startOf('week').weekday(7)
					}
				},
				{
					total : 1
				})
					.exec((err, satunDay) => {
						callback(null, satunDay);
					});
			},
		],
		function(err, results) {
			return response.json({
				sunday : _.sumBy(results[0], 'total'),
				monday : _.sumBy(results[1], 'total'),
				tueDay : _.sumBy(results[2], 'total'),
				weDay  : _.sumBy(results[3], 'total'),
				thuDay : _.sumBy(results[4], 'total'),
				friDay : _.sumBy(results[5], 'total'),
				satuDay : _.sumBy(results[6], 'total'),
			});
		}
	); 
};