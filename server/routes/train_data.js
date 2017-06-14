const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const ByteBuffer = require('bytebuffer');
const db = require('knex')(require('../../knexfile.js')); //change knexfile location accordingly
const config = require('config');
const env = require('dotenv').config();
const fetch = require('node-fetch');

var data;

setInterval(function() {  
  var d = new Date();
  var cur_seconds = d.toTimeString().split(' ')[0].split(':');
  cur_seconds = (+cur_seconds[0]) * 60 * 60 + (+cur_seconds[1]) * 60 + (+cur_seconds[2]);

  if (d.getDay() == 6 || d.getDay() == 0) {
    if (d.getDay() == 0) {
      db.select().table('gtfs_schedule').orderBy('id').then((trains) => {
        var arr = [];
        console.log('fullength: ', trains.length);

        var editStuff = trains.filter(function(item) {
          return (item.trip_id.slice(item.trip_id.length - 3) === 'SAT');
        });

        console.log('edited: ', editStuff.length);
        console.log('checkedit: ', editStuff[0]);

        for (var i = 0; i < editStuff.length - 1; i++) {
          //console.log('check docs: ', editStuff[i]);
          if (editStuff[i].trip_id === editStuff[i + 1].trip_id) {
            if (cur_seconds >= editStuff[i].arrival_time && cur_seconds < editStuff[i + 1].arrival_time) {
              arr.push([editStuff[i + 1].trip_id, (cur_seconds - editStuff[i].arrival_time) / (editStuff[i + 1].arrival_time - editStuff[i].arrival_time), editStuff[i].stop_id, editStuff[i + 1].stop_id, [editStuff[i].stop_lat, editStuff[i].stop_lon],
                [editStuff[i + 1].stop_lat, editStuff[i + 1].stop_lon]
              ]);
            }
          }
        }

        //var dist = Math.sqrt(Math.pow(arr[0][5][0] - arr[0][4][0], 2) + Math.pow(arr[0][5][1] - arr[0][4][1], 2));
        var finalLocations = [];

        for (var p = 0; p < arr.length; p++) {
          var toChange = [(arr[p][5][0] - arr[p][4][0]) * arr[p][1], (arr[p][5][1] - arr[p][4][1]) * arr[p][1]];
          var finalPoint = [Number(arr[p][4][0]) + Number(toChange[0]), Number(arr[p][4][1]) + Number(toChange[1])];
          finalLocations.push(finalPoint);
        }
        //res.send(JSON.stringify(finalLocations));
      });
    }
  } else {
    db.select().table('gtfs_schedule').orderBy('id').then((stuff) => {    
      //console.log('inside man');
      var arr = [];

      var editStuff = stuff.filter(function(item) {
        if (item.trip_id.slice(item.trip_id.length - 3) === 'SAT' || item.trip_id.slice(item.trip_id.length - 3) === 'SUN') {
          return false;
        }
        return true;
      });

      for (var i = 0; i < editStuff.length - 1; i++) {
        //console.log('check docs: ', editStuff[i]);
        if (editStuff[i].trip_id === editStuff[i + 1].trip_id) {
          if (cur_seconds >= editStuff[i].arrival_time && cur_seconds < editStuff[i + 1].arrival_time) {
            arr.push([editStuff[i + 1].trip_id, (cur_seconds - editStuff[i].arrival_time) / (editStuff[i + 1].arrival_time - editStuff[i].arrival_time), editStuff[i].stop_id, editStuff[i + 1].stop_id, [editStuff[i].stop_lat, editStuff[i].stop_lon],
              [editStuff[i + 1].stop_lat, editStuff[i + 1].stop_lon], editStuff[i].stop_headsign
            ]);
            for (var g = 0; g < editStuff.length; g++) {
              if (editStuff[g].trip_id === editStuff[i].trip_id && editStuff[g].stop_sequence === 1) {
                //console.log('yo yo yo yo in here');
                if (editStuff[g].hex_color !== null) {
                  arr[arr.length - 1].push(editStuff[g].hex_color);
                } else {
                  arr[arr.length - 1].push('000000');
                }
              }
            }
          }
        }
      }

      // var dist = Math.sqrt(Math.pow(arr[0][5][0] - arr[0][4][0], 2) + Math.pow(arr[0][5][1] - arr[0][4][1], 2));
      var finalLocations = [];

      for (var p = 0; p < arr.length; p++) {
        var toChange = [(arr[p][5][0] - arr[p][4][0]) * arr[p][1], (arr[p][5][1] - arr[p][4][1]) * arr[p][1]];
        var finalPoint = [Number(arr[p][4][0]) + Number(toChange[0]), Number(arr[p][4][1]) + Number(toChange[1]), arr[p][6], arr[p][7]];
        finalLocations.push(finalPoint);
      }

      //res.send(finalLocations);
      data = finalLocations;
      console.log('************** DATA ************ ', data);
    });
  }
}, 1000);

module.exports = data;
