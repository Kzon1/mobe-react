import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    ToastAndroid
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import Database from "../database/Database";
  import MyInput from "../shared/MyInput";
  
  export default function EditObservation({navigation, route }) {
    var observation = route.params;
    const id = observation.id;
    const [name, setName] = useState(observation.nameObservation);
    const [time, setTime] = useState(observation.dateTime);
    const [comments, setComments] = useState(observation.comment);
  
    const handleUpdate = () => {
      if (name === "" || time === "") {
        alert("Please fill all fields!");
      } else {
          Database.updateObservation(id,name, time, comments);
          ToastAndroid.show("Update successfully",ToastAndroid.SHORT);
          navigation.navigate("Home")
      }
    };
  
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.part}>
            <Text style={styles.title}>Observation</Text>
            <MyInput
              title="Bird"
              value={name}
              setValue={setName}
            />
          </View>
  
          <View style={styles.part}>
            <Text style={styles.title}>Time of observation</Text>
            <MyInput
              title="10:00 - 30/11/2023"
              value={time}
              setValue={setTime}
            />
          </View>
  
          <View style={styles.part}>
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
              placeholder="Description about the observation"
              multiline={true}
              value={comments}
              onChangeText={setComments}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text
              style={[
                styles.title,
                { textAlign: "center", color: "white", paddingBottom: 2 },
              ]}
            >
              Update
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
    button: {
      height: 43,
      width: 360,
      borderRadius: 15,
      paddingVertical: 10,
      backgroundColor: "#238DE4",
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
  });
  