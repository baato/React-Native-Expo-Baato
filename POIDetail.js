import React from "react";
import {View, Text, StyleSheet, Button} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 42,
        backgroundColor: "#FFFFFF"
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        color: 'red'
    },
    itemSub: {
        fontSize: 16,
        fontWeight: 'normal',
        padding: 10,
        marginBottom: 10,
        color: 'tomato',
    },
    separator: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'grey'
    }

});
const POIDetail = ({data, callBack}) => {
    return(
        <View style = {styles.container}> 
            <Text style = {styles.itemTitle}>{data.name}</Text>
            <Text style = {styles.itemSub}>{data.address}</Text>
            <View backgroundColor = 'tomato' padding = {5}>
                <Button
                    onPress={callBack}
                    title="Show route"
                    color="#841584"
                    accessibilityLabel="This helps to generate route from user location"
                />
            </View>
        </View>
    )
}
export default POIDetail;