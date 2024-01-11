import React, { useState } from "react";
import {View, Text, TouchableOpacity, Alert, LogBox} from 'react-native';
import Mapbox from '@rnmapbox/maps';
//id = {`${data[0].placeId}`}
// import POIDetail from "./POIDetail"; 
  const MarkerView = ({data, callBack}) => {
    const [selectM, setSelectM] = useState(false);

    if(data != null) {
    return(
        <Mapbox.PointAnnotation
            coordinate={[Number(data[0].centroid.lon), Number(data[0].centroid.lat)]}
            anchor={{x: 0, y: 0.5}}
            title={`${data[0].name}`}
            id="point_anon"
            ref={ref => (this.markerRef = ref)}
            onSelected = { e => {
              // console.log("selected");
              callBack(data[0]);
              setSelectM(true);
            }}
        >
            <View style={{
                height: 30,
                width: 30,
                backgroundColor: '#00cccc',
                borderRadius: 50,
                borderColor: '#fff',
                borderWidth: 3
            }} onLoad={() => this.markerRef.refresh()}/>
              {/* {setSelectM ? POIDetail( data[0]) : null} */}
            {/* <Mapbox.Callout
              title={`${data[0].name}`}
              style={{color: 'black'}}
            /> */}
            {/* <AnnotationContent title={ data[0].name}/> */}
        </Mapbox.PointAnnotation>
    )
          }
}

export default MarkerView;
