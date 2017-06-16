
import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  View,
  Text,
  MapView,
  Dimensions,
  StatusBarIOS
} from 'react-native'
import { StackNavigator } from 'react-navigation';
const { width, height } = Dimensions.get('window')

import { Container } from 'native-base';

import MapContainer from './src/index';
import axios from 'axios';
import UseLocationButton from './components/uselocationbutton';
import ClosestStation from './components/closeststation';
import hardCodedDestinations from './components/destinations';
import stationList from './components/station_coordinates';
import StationsMenu from './components/stationsmenu';
import DestinationsMenu from './components/destinationsmenu';
import Users from './components/users'
import StationSelector from  './components/stationselector';
import RouteSelector from  './components/routeselector';
import ExperimentalButton from './components/example_button'
import BulletinList from './components/bulletinlist'
 
console.ignoredYellowBox = ['Warning: BackAndroid'];

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.75042,
        longitude: -122.22823,
        latitudeDelta: 0.4,
        longitudeDelta: 0.5
      },
      station: null,
      train: [],
      newRegion: null,
      lat: 0,
      long: 0,
      isLoading: false,
      currentStation: stationList[0],
      currentRoute: hardCodedDestinations[0],
      schedule: [{
        "minutes": "0",
        "destination": "nowhere"
      }],
      currentRouteChoices: hardCodedDestinations
    };
    this.updateRoute = this.updateRoute.bind(this);
    this.updateStation = this.updateStation.bind(this);
  }

  componentWillMount () {
    setInterval(() => {
      var theDate = new Date();
      var theSeconds = theDate.getSeconds();
      if (theSeconds !== 59 && theSeconds !== 0 && theSeconds !== 1) {
        axios.get('http://localhost:1337/api/getTheTrains')
          .then((response) => {
            this.setState({
              train: response.data,
            })
          })
          .catch((err) => {
            console.log('I am an errror: ', err)
          });
      }    
    }, 1000);
  }

  updateRoute(data) {
    this.setState({ currentRoute: data });
  }
  
  rendermap(lat, long) {
    this.setState({
      newRegion: {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.093,
        longitudeDelta: 0.092
      }
    })
  }

  updateStation(data) {
    console.log(this.state.region)
    let lat = JSON.parse(stationList[data].gtfs_latitude);
    let long = JSON.parse(stationList[data].gtfs_longitude);
    this.setState({
      currentStation: stationList[data]
    });
    
    this.rendermap(lat, long);
   
  }

  getSchedule(station) {
    let tempSchedule = []; 
    let tempRoutes = [];   
    axios.post('http://localhost:1337/api/schedule', station)   
    .then(    
      res => { if (Array.isArray(res.data)) {
          //alert("Array.isArray is true")
          tempSchedule = res.data;
          tempSchedule.forEach((cur) => {
            if (tempRoutes.indexOf(cur.destination) === -1) {
              tempRoutes.push(cur.destination);
            }
          });
          //alert("TEMPROUTES = " + tempRoutes);
          this.setState({   
            schedule: tempSchedule,
            currentRouteChoices: tempRoutes   
          });
        }
      })  
    .catch(err => {   
      throw err;    
    });   
  }   

  componentDidMount() {   
    setInterval(() => this.getSchedule(this.state.currentStation), 5000)
  }
  
  static navigationOptions = {
    title: 'BART Buddy',
  };

  render() {
    const { navigate } = this.props.navigation; 

    return (
      <View style={styles.container}>
        <MapContainer 
          region={this.state.region} 
          trainTime={this.state.train}
          name={this.state.currentStation}  
          render={this.rendermap.bind(this)}
          newPlace={this.state.newRegion}
          /> 
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center',}}>
          <StationSelector stationSelectHandler={this.updateStation} parentStation={this.state.currentStation.name}/>
          <Button onPress={() => navigate('Login')} title="Advisories" />
          <RouteSelector routeSelectHandler={this.updateRoute} parentRoute={this.state.currentRoute} routeChoices={this.state.currentRouteChoices}/>  
        </View>
        <BulletinList station={this.state.currentStation} route={this.state.currentRoute} schedule={this.state.schedule}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

});

AppRegistry.registerComponent('Main', () => Main);

