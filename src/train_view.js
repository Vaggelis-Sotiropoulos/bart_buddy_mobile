import React from 'react';
import {View} from 'native-base';
import MapView from 'react-native-maps';
import styles from "./MapContainerStyles.js";
import Destination from './train_info.js';

// 'ffff33' = yellow = Pittsburg/Bay Point–SFO/Millbrae: && 

// '0099cc' = blue = Dublin/Pleasanton–Daly City:

// 'ff9933' = orange = Richmond–Warm Springs/South Fremont: 

// 'ff0000' = red = Richmond–Daly City/Millbrae:

//  Orange = Richmond–Warm Springs/South Fremont 

// beige =  Coliseum–Oakland Int'l Airport:

// "Daly City" and "0099cc" (blue)

// "Richmond"  "000000" or ff9933 (orange) or black

// "coliseum" =  "d5cfa3" (beige)

// "Oakland International Airport" = "000000" (black)

// "Millbrae" and "ffff33" = (yellow)

// "Warm Springs/South Fremont" and "000000" (black)
 
// dublin and "000000" (black)




// export default TrainView;

const TrainView = ({station_coordinates, route, color, destination}) => {
  	if (color === "0099cc"){
	    let direction
      if ( route === "Dublin/Pleasanton" ) {
        direction = "East";
      } else {
        direction = "West";
      }
    return (
	    <MapView.Marker 
	      coordinate={station_coordinates}
	      image={require('./train_images/blueTrain.png')}
	    >
        <MapView.Callout >
        <Destination Direction={direction} 
        Route={route} 
       
        time_to_next_station={'100 minutes'}  />
        </MapView.Callout>
	    </MapView.Marker>
	  );

    } else if (color === "ff9933")  {
      
      let direction
        if ( route === "Warm Springs/South Fremont" ) {
          direction = "South";
        } else {
          direction = "North";
        }

      return (
      <MapView.Marker 
        coordinate={station_coordinates}
        image={require('./train_images/orangeTrain.png')}
      >
      <MapView.Callout >
        <Destination Direction={direction} 
        Route={route} 
        time_to_next_station={'100 minutes'}  />
        </MapView.Callout>
      </MapView.Marker>
      );
  	} else if (color === "ffff33") {
      
      //this one is supposed to be for orange or black but unsure if I can figure the course now.
      let direction
        if ( route === "Millbrae" ) {
          direction = "South/ West";
        } else {
          direction = "North/ East";
        }


      return (
	    <MapView.Marker 
	      coordinate={station_coordinates}
	      image={require('./train_images/yellowTrain.png')}
	    >
	    <MapView.Callout >
        <Destination Direction={direction} 
        Route={route} 
        time_to_next_station={'100 minutes'}  />
        </MapView.Callout>
	    </MapView.Marker>
     );

   } else if (color === "d5cfa3") {
    
     let direction
      if ( route === "Coliseum" ) {
          direction = "East";
      } else {
          direction = "West";
      }

     return (
      <MapView.Marker 
        coordinate={station_coordinates}
        image={require('./train_images/beigeTrain.png')}
      >
      <MapView.Callout >
        <Destination Direction={direction} 
        Route={route} 
        time_to_next_station={'100 minutes'}  />
        </MapView.Callout>
      </MapView.Marker>
     );
   } else if ( color === "000000" ) {
       
      let direction;
     
        if ( route === "Richmond" ) {
          direction = "East";
          return (
            <MapView.Marker 
              coordinate={station_coordinates}
              image={require('./train_images/redTrain.png')}
            >
            <MapView.Callout >
              <Destination Direction={direction} 
              Route={route} 
              time_to_next_station={'100 minutes'}  />
              </MapView.Callout>
            </MapView.Marker>
           );

        } else if ( route === "Dublin/Pleasanton" ) {
          direction = "West";
          return (
            <MapView.Marker 
              coordinate={station_coordinates}
              image={require('./train_images/blueTrain.png')}
            >
            <MapView.Callout >
              <Destination Direction={direction} 
              Route={route} 
              time_to_next_station={'100 minutes'}  />
              </MapView.Callout>
            </MapView.Marker>
           );
        } else if ( route === "Pittsburg/Bay Point" ) {
          direction = "West";
          return (
            <MapView.Marker 
              coordinate={station_coordinates}
              image={require('./train_images/yellowTrain.png')}
            >
            <MapView.Callout >
              <Destination Direction={direction} 
              Route={route} 
              time_to_next_station={'100 minutes'}  />
              </MapView.Callout>
            </MapView.Marker>
           );
        } else if ( route === "Warm Springs/South Fremont") {
          direction = "West";
          return (
            <MapView.Marker 
              coordinate={station_coordinates}
              image={require('./train_images/orangeTrain.png')}
            >
            <MapView.Callout >
              <Destination Direction={direction} 
              Route={route} 
              time_to_next_station={'100 minutes'}  />
              </MapView.Callout>
            </MapView.Marker>
           );
        } else {


        return (
        <MapView.Marker 
          coordinate={station_coordinates}
          image={require('./train_images/redTrain.png')}
        >
        <MapView.Callout >
          <Destination Direction={direction} 
          Route={route} 
          time_to_next_station={'100 minutes'}  />
          </MapView.Callout>
        </MapView.Marker>
       );
      }
   }
}

export default TrainView;






