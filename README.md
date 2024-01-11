# MapLibre React Native Setup

Follow the instructions in the [MapLibre React Native Getting Started Guide](https://github.com/maplibre/maplibre-react-native/blob/main/docs/GettingStarted.md).

**Note:** The setup for iOS might not be working as the patch has been added but not released in the master branch. It may be supported in future releases.

# Mapbox React Native Setup

1. Open an account and download a secret token with the `DOWNLOADS:READ` scope from [Mapbox](https://www.mapbox.com/). This token is used for downloading dependencies.

2. Install the package:

   ```bash
   npm i @rnmapbox/maps

3. Open app.json and add the Mapbox plugin at the end:
  ```json
     {
      "expo": {
        "plugins": [
          [
            "@rnmapbox/maps",
            {
              "RNMapboxMapsImpl": "mapbox",
              "RNMapboxMapsDownloadToken": "your_secret_token_from_mapbox"
            }
          ]
        ]
      }
    }
```

4. Create a [Baato](https://baato.io) account and obtain a Baato token

5. Bare minimum setup for App.js:
 ```javascript
  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, View } from 'react-native';
  import Mapbox from '@rnmapbox/maps';

//This is required beacuse we wont be using any mapbox service but now null cannot be set so this is the dummy token
  Mapbox.setAccessToken("pk.xxx");
  const baatoToken = 'your_baato_token';

  const styles = StyleSheet.create({
      page: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF',
      },
      map: {
          flex: 1,
          alignSelf: 'stretch',
      },
  });

    export default function App() {
        return (
            <View style={styles.page}>
                <Mapbox.MapView
                    styleURL={`https://api.baato.io/api/v1/styles/breeze?key=${baatoToken}`}
                    style={styles.map}
                    logoEnabled={false}
                    attributionEnabled={false}
                />
                <StatusBar style="auto" />
            </View>
        );
    }
```
**Note:** Remember to replace placeholder values such as "your_secret_token_from_mapbox" and "your_baato_token" with your actual tokens.

For above example to work you need to enable location permission for iOS and android both. You may edit info.plist with NSLocationWhenInUseUsageDescription for iOS.
Also this https://blog.logrocket.com/building-custom-maps-react-native-mapbox/ link can be useful too.

For building in ios you may encounter some issue if so, then remove builds, and re-add pod file with pod install. Open .xcworkspace and build from the xcode, in my case I need to do autofix from xcode in one specific case.
