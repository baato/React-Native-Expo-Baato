import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    FlatList,
    Text,
    View,
    Keyboard,
    Button,
    Touchable,
    TouchableHighlight,
    KeyboardAvoidingView,
    Alert
} from 'react-native';

const baatoToken = 'baato_token';
function SearchBar(props) {
    const [text, onChangeText] = useState('');
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    // const [isLoading, setLoading] = useState(true);
    // const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState([]);
  const SearchListRendrer = ({item}) => {
        return (<TouchableHighlight onPress={() => {
                    getItem(item);
                    setResult(null);
                }
            } underlayColor="white"><View>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemSub}>{item.address}</Text><View style={styles.separator} />
        </View></TouchableHighlight>);
    };
    const getItem = (item) => {
        props.onData(item);
        setResult([]);
        setRefreshFlatList(!refreshFlatlist);
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log(text)
            // Send Axios request here
        }, 1000)
        if (text.trim !== '') {
            fetch(`https://api.baato.io/api/v1/search?key=${baatoToken}&q=${text}&limit=20`)
                .then(response => response.json()
                    .then(data => {
                        setResult(data.data);
                    }).catch(error => {
                        console.error(error);
                    }))
        } else {
            console.log("Empty");
            setResult([]);
            setRefreshFlatList(!refreshFlatlist);
        }
        return () => clearTimeout(delayDebounceFn)
    }, [text]);
    return (
        <KeyboardAvoidingView style={result != null && result.length > 0 ? styles.detailContainer : styles.container}>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    placeholder='Search here ...'
                    value={text}
                />
            
            <FlatList
                contentContainerStyle={result != null && result.length > 0 ? {paddingBottom:  400} : {paddingBottom: 0}}
                data={result}
                extraData={refreshFlatlist}
                keyExtractor={({ placeId }) => placeId}
                renderItem={({ item }) => <SearchListRendrer item={item} />}
            // renderItem={({item}) => <View><Text style={styles.itemTitle}>{item.name}</Text>
            // <Text style={styles.itemSub}>{item.address}</Text><View style={styles.separator}/></View>}
            />
        </SafeAreaView>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    },
    container: {
        flex: 1,
        paddingTop: 22,
        paddingBottom: 22
    },
    detailContainer: {
        flexDirection: 'column',
        paddingBottom:  20
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
    },
    itemSub: {
        fontSize: 12,
        fontWeight: 'normal',
        padding: 10,
        marginBottom: 10
    },
    separator: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'grey'
    }

});

export default SearchBar;