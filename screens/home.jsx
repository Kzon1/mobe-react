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

export default function Home({ navigation }) {
  const [hikeObject, setHikeObject] = useState([]);
  const [change, setChange] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchData = async () => {
      try {
        Database.initDatabase();
        const hikeList = await Database.getHikes();
        setHikeObject(hikeList);
      } catch (err) {
        console.log("error while fetching database");
      }
    };
    fetchData();
  }, [isFocused, change]);

  const handleDelete = (id) => {
    Alert.alert("Confirmation", "Do you want to delete the hike", [
      {
        text: "Yes",
        onPress: () => {
          Database.deleteHike(id);
          setChange(!change);
        },
      },
      { text: "No", onPress: () => console.log("no") },
    ]);
  };

  const handleDeleteAll = () => {
    Alert.alert("Confirmation", "Do you want to delete all hikes", [
      {
        text: "Yes",
        onPress: () => {
          Database.deleteAllHike();
          setChange(!change);
        },
      },
      { text: "No", onPress: () => console.log("no") },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={hikeObject}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate("Edit Hike", item)}
            >
              <Text style={styles.title}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.myButton, { backgroundColor: "#42dbcc" }]}
              onPress={() => navigation.navigate("Observations", item)}
            >
              <Text style={styles.titleButton}>More</Text>
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

      <View>
        <TouchableOpacity
          style={[styles.myButton, styles.customButton]}
          onPress={handleDeleteAll}
        >
          <Text style={styles.titleButton}>Delete All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 15,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
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
  customButton:{
    backgroundColor: "#f54936",
    position: 'absolute',
     width: 100,
     marginBottom:10,
     right: 10,
     bottom: 0,
  }
});
