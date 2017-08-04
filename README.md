# bart_buddy_mobile

A mobile client to interface with the bart_buddy GTFS server. This application takes real time train data and displays the BART trains in real time, texts users about delays and displays schedules for given routes. 

## Team

- Jonathon Bradshaw 
- Jackson Carter
- Greg Coffeng
- Vaggelis Sotiropoulos

## Usage

Bart-buddy is a new and exciting technology that allows users to see and plan their train routes according to real time data. 

## Requirements

- native-base ^2.1.5
- react 16.0.0-alpha.6
- react-native 0.44.3
- react-native-maps ^0.15.2
- react-native-menu ^0.21.

## Maps and React Native 
To render the trains on the map we use the real-time data provided by BART (GTFS: General Transit Feed Service). While connecting to this streaming data we were able to render trains in real time, as well as notfying any users of delays. 

This project requires several steps to load, you must be running node 6.10.0 or earlier, asnd Xcode 7.8.0 or later.

- Clone the repo down 
- Cd into the root directory 

1.) brew install watchman

2.) npm install 

3.) sudo gem install cocoapods

4.) cd ios 

5.) pod install 

You must then open  bart_buddy_mobile.xcworkspace

6.) open the AppDelegate.m file 
	
	1.) add @import GoogleMaps; before @implementation AppDelegate

	2.)  In - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions, add [ GMSServices provideAPIKey:@“API_KEY_HERE”];
     -you msut have an API key from google Maps IOS SDK


7.) go into node_modules/react-native/Libraries/NativeAnimation/RCTNativeAnimatedNodesManager.h
	
	-once this file is open change: #import <RCTValueAnimatedNode/RCTValueAnimatedNode.h> to "RCTValueAnimatedNode.h"

8.) react-native run-ios
 

