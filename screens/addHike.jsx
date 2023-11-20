import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ToastAndroid
} from "react-native";
import React, { useState, useEffect } from "react";
import { RadioButton, List } from "react-native-paper";
import MyInput from "../shared/MyInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import Database from "../database/Database";

export default function Add() {
  const [statusParking, setStatusParking] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState();
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [length, setLength] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("Low");
  const [description, setDescription] = useState("");
  const [statusList, setStatusList] = useState(false);

  const handleDateChange = (event, passedDate) => {
    setShow(Platform.OS === "ios");
    if (passedDate) {
      setSelectedDate(passedDate);
      const currentDate = new Date(passedDate);
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const stringDate = `${day}/${month}/${year}`;
      setDate(stringDate);
    }
  };

  const handlePressIn = () => {
    setShow(true);
  };

  const SelectDifficulty = (diff) => {
    setDifficultyLevel(diff);
    setStatusList(false);
  };

  const handleAdd = () => {
    if (
      name.trim() === "" ||
      location.trim() === "" ||
      date.trim() === "" ||
      statusParking.trim() === "" ||
      length.trim() === "" ||
      difficultyLevel.trim() === ""
    ) {
      Alert.alert("Error", "All required fields must be filled", [
        { text: "OK", onPress: () => console.log("error") },
      ]);
    } else {
      let String =
        "New hike will be added: \n" +
        `Name: ${name} \n` +
        `Location: ${location} \n` +
        `Date of the hike: ${date} \n` +
        `Parking available: ${statusParking} \n` +
        `Length of the hike: ${length} \n` +
        `Difficulty level: ${difficultyLevel}`;

      Alert.alert("Confirmation", String, [
        { text: "OK", onPress: () => addHike() },
        { text: "Close", onPress: () => console.log("close") },
      ]);
    }
  };

  const addHike = () => {
    Database.addHike(
      name,
      location,
      date,
      statusParking,
      length,
      difficultyLevel,
      description
    );
    setName("");
    setLocation("");
    setDate("");
    setLength("");
    setDifficultyLevel("Low");
    setDescription("");
    ToastAndroid.show('Add successfully', ToastAndroid.SHORT);
  };

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.part}>
          <Text style={styles.title}>Name of the hike</Text>
          <MyInput title="Son Dong" value={name} setValue={setName} />
        </View>

        <View style={styles.part}>
          <Text style={styles.title}>Location</Text>
          <MyInput title="Quang Binh" value={location} setValue={setLocation} />
        </View>

        <View style={styles.part}>
          <Text style={styles.title}>Date of the hike</Text>
          <MyInput
            title="11/11/2023"
            value={date}
            setValue={setDate}
            onPressInAction={handlePressIn}
          />

          {show && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View
          style={[
            styles.part,
            { display: "flex", flexDirection: "row", marginTop: 10 },
          ]}
        >
          <Text style={styles.title}>Parking status</Text>
          <View style={[styles.row, { bottom: 10, left: 15 }]}>
            <RadioButton.Item
              label="Yes"
              value="Yes"
              status={statusParking === "Yes" ? "checked" : "unchecked"}
              onPress={() => setStatusParking("Yes")}
            />
            <RadioButton.Item
              label="No"
              value="No"
              status={statusParking === "No" ? "checked" : "unchecked"}
              onPress={() => setStatusParking("No")}
            />
          </View>
        </View>

        <View style={styles.part}>
          <View style={styles.row}>
            <Text style={styles.title}>Length of the hike</Text>
            <MyInput
              title="100"
              value={length}
              setValue={setLength}
              status={true}
              numberType={true}
            />
          </View>
        </View>

        <View style={styles.listContainer}>
          <View style={styles.part}>
            <View style={styles.row}>
              <Text style={styles.title}>Difficulty level</Text>
              <TouchableOpacity
                onPress={() => setStatusList(!statusList)}
                style={{ width: 150, marginBottom: 5, height: 40 }}
              >
                <Text style={[styles.input, { marginStart: 52 }]}>
                  {difficultyLevel}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.part}>
            <Text style={styles.title}>Description</Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: 150,
                  width: 350,
                  textAlignVertical: "top",
                  textAlign: "start",
                },
              ]}
              placeholder="Description about the hike"
              multiline={true}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {statusList && (
            <List.Section style={styles.list}>
              <List.Item
                title="Low"
                onPress={() => SelectDifficulty("Low")}
                style={[
                  difficultyLevel === "Low" && {
                    backgroundColor: "#0ec796",
                  },
                  styles.line,
                ]}
                titleStyle={difficultyLevel === "Low" && { color: "white" }}
              />
              <List.Item
                title="Medium"
                onPress={() => SelectDifficulty("Medium")}
                style={[
                  difficultyLevel === "Medium" && {
                    backgroundColor: "#0ec796",
                  },
                  styles.line,
                ]}
                titleStyle={difficultyLevel === "Medium" && { color: "white" }}
              />
              <List.Item
                title="High"
                onPress={() => SelectDifficulty("High")}
                style={[
                  difficultyLevel === "High" && {
                    backgroundColor: "#0ec796",
                  },
                  styles.line,
                ]}
                titleStyle={difficultyLevel === "High" && { color: "white" }}
              />
            </List.Section>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={[styles.title, { textAlign: "center", color: "white",paddingBottom:2 }]}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 15,
    marginHorizontal: 20,
  },
  part: {
    marginBottom: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    textAlign: "auto",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    width: 150,
    height: 40,
    borderWidth: 2,
    borderColor: "#238DE4",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    paddingStart: 10,
    paddingVertical: 10,
    textAlign: "center",
    color: "gray",
  },
  line: {
    borderWidth: 1,
    borderColor: "#238DE4",
  },
  listContainer: {
    position: "relative",
    zIndex: 1,
  },
  list: {
    width: 150,
    position: "absolute",
    left: 187,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    zIndex: 2,
  },
  button: {
    height: 43,
    width: 360,
    borderRadius: 15,
    paddingVertical: 10,
    backgroundColor: "#238DE4",
  },
});
