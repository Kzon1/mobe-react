import {
    StyleSheet,
    Text,
    View,
    TextInput,    
  } from "react-native";

  const MyInput = ({title,value,setValue,onPressInAction,status,numberType}) => {
    const handlePressIn = () => {
        if (onPressInAction) {
          onPressInAction();
        }
      };
    
    return (
        <TextInput style={[styles.input,status&&{width:150,textAlign:"center",marginStart:20}]}
                placeholder={title && title}
                value={value}
                onChangeText={setValue}
                onPressIn={handlePressIn}
                keyboardType={numberType&&"numeric"}/>
    )
  }

  const styles = StyleSheet.create({
    input:{
        width: 350,
        height: 40,
        borderWidth: 2,
        borderColor: '#238DE4',
        borderRadius:10,
        backgroundColor: '#ffffff',
        paddingStart:10,
    }
  });

  export default MyInput