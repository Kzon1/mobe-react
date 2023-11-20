import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Database from "../database/Database";

export default function ObservationHome({navigation, route }) {
  const isFocused = useIsFocused();
  const [change,setChange] = useState(false);
  const [observations, setObservations] = useState();
  const myHike = route.params;
  const hikeId = myHike.id;
  const handleAdd = () => {
    navigation.navigate("Add Observation",hikeId);
  };

  const handleDelete = (id) => {
    Alert.alert("Confirmation", "Do you want to delete the observation", [
      {
        text: "Yes",
        onPress: () => {
          Database.deleteObservation(id);
          setChange(!change);
        },
      },
      { text: "No", onPress: () => console.log("no") },
    ]);
  };

  useEffect(() => {
    const fetchData = async () => {
     try {
      let observationList = await Database.getObservations(hikeId);
      setObservations(observationList);
     }catch (err) {
      console.log("error when fetching data from database")
    };
  };
  fetchData();
},[isFocused,change]);
  return (
    <View style={styles.container}>
      <View style={styles.part}>
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text
            style={[
              styles.title,
              { textAlign: "center", color: "white", paddingBottom: 2 },
            ]}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.part}>
      <FlatList
        data={observations}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <TouchableOpacity style={styles.box}>
              <Text style={styles.title}>{item.nameObservation}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.myButton, { backgroundColor: "#42dbcc" }]}
              onPress={() =>
                navigation.navigate("Edit Observation", item)
              }
            >
              <Text style={styles.titleButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.myButton, { backgroundColor: "#f54936" }]}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.titleButton}>Delete</Text>
            </TouchableOpacity>
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
  button: {
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
  part: {
    marginTop: 15,
    marginStart: 10,
    marginBottom: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  myButton: {
    height: 45,
    width: 80,
    marginLeft: 10,
    borderRadius: 9,
    paddingVertical: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleButton: {
    color: "#ffffff",
    fontSize: 17,
  },
  box: {
    width: 190,
    height: 45,
    backgroundColor: "#0ec796",
    paddingVertical: 10,
    color: "#ffffff",
    borderRadius: 10,
  },
});
