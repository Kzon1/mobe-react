import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  ToastAndroid
} from "react-native";
import React, { useState, useEffect } from "react";
import MyInput from "../shared/MyInput";
import Database from "../database/Database";

export default function SearchHike() {
  const [search, setSearch] = useState("");
  const [hikeObject, setHikeObject] = useState([]);

  const handleSearchHike = async (searchString) => {
    const hikeList = await Database.searchHikes(searchString);
    setHikeObject(hikeList);
    if(hikeList.length === 0) {
      ToastAndroid.show("There is no matching hike",ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Field}>
        <MyInput title="Son Dong" value={search} setValue={setSearch} />
        <TouchableOpacity style={styles.button} onPress={() => handleSearchHike(search)}>
          <Text style={styles.title}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Field}>
        <Text style={styles.heading}>Result</Text>
        <FlatList
          data={hikeObject}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.box}>
                <Text style={styles.title}>{item.name}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Field: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  button: {
    marginTop: 20,
    height: 43,
    width: 360,
    borderRadius: 15,
    paddingVertical: 10,
    backgroundColor: "#238DE4",
  },
  title: {
    textAlign: "center",
    color: "white",
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: "500",
  },
  heading: {
    paddingBottom: 2,
    fontSize: 20,
    fontWeight: "500",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  box: {
    width: 370,
    height: 45,
    backgroundColor: "#0ec796",
    paddingVertical: 10,
    color: "#ffffff",
    borderRadius: 10,
  },
});
