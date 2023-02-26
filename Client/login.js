import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
export default function App({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async()=>{
    axios.post("http://192.168.0.107:5000/login",{email:email,password:password},{ headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }}).then((x)=>{
        if(x.status==200){
            navigation.navigate('Map')
        }

    }).catch(x=>{
        if(x.response.status == 400){
            alert("Wrong Credentials")
        }
    })
  }
  return (
    <>
    <View style={styles.container}>
      <Image style={styles.image} source={require("./build/Result-1.png")} /> 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <TouchableOpacity style={styles.loginBtn}>
        <Button onPress={login} style={styles.loginBtn} title="LOGIN"></Button> 
      </TouchableOpacity> 
    </View> 
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    width: 200,
    height: 200
  },
  inputView: {
    backgroundColor: `#f0ffff`,
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 20,
    marginBottom: 190,
    textAlign: 'center',
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#ffe4c4",
    
  }
});