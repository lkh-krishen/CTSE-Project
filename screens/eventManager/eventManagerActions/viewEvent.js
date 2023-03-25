import { Button as Btn } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { db, auth } from "../../../firebase";
import { Button, Card, TextInput, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  collection,
  addDoc,
  query,
  where,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { DietStylesLocal } from "./LocalStyles";
import { DietMainStyles } from "./MainStyles";

const ViewEvent = ({ navigation, route }) => {
  const [validUser, setValidUser] = useState("");
  const event = route.params;

  useEffect(() => {
    setValidUser(route.params.eventUser == auth.currentUser.uid);
  }, []);

  let updateUser = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    try {
      await updateDoc(docRef, {
        myArray: arrayUnion(event.eventId),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const insertLabel = (labelValue, style) => (
    <Text style={style}>{labelValue}</Text>
  );

  const iconSetter = (iconName) => {
    return (
      //used to set icons in the tab bar
      <Icon color={"#138D75"} type="MaterialIcons" name={iconName} size={30} />
    );
  };

  const color = { color: "red", fontSize: 19 };
  const logger = () => {
    console.log("ee", validUser);
  };

  return (
    <Card style={DietMainStyles.cardContainer}>
      <Card.Content style={DietMainStyles.cardContentSmall}>
        <Text style={DietStylesLocal.cardTitle}>My event info</Text>
        <ScrollView style={DietMainStyles.scrollViewBasicStyle}>
          <View>
            <View style={DietStylesLocal.staticTextView}>
              <View style={{ flexDirection: "row", left: 5 }}>
                <Text style={DietStylesLocal.staticTextViewTitle}>
                  {event.eventName}
                </Text>
                <Text style={DietStylesLocal.staticTextViewAuthor}>
                  {" by " + event.eventUserName}
                </Text>
              </View>
              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                label={insertLabel("Description", DietStylesLocal.inputLabel)}
                placeholder="insert description"
                value={event.eventDesc}
                style={DietStylesLocal.inputField}
                maxLength={50}
                editable={false}
              />
            </View>
          </View>
        </ScrollView>
      </Card.Content>
      {!validUser ? (
        <Card.Actions style={DietMainStyles.cardActionsStyle}>
          <Button
            uppercase={false}
            style={DietMainStyles.buttonProceed}
            onPress={logger}
          >
            <Text style={DietMainStyles.text}>Remove from My events</Text>
          </Button>
        </Card.Actions>
      ) : (
        <Card.Actions style={DietMainStyles.cardActionsRowStyle}>
          <Button
            uppercase={false}
            style={DietMainStyles.buttonEdit}
            onPress={logger}
          >
            <Text style={DietMainStyles.text}>Edit</Text>
          </Button>
          <Button
            uppercase={false}
            style={DietMainStyles.buttonDelete}
            onPress={logger}
          >
            <Text style={DietMainStyles.text}>Delete</Text>
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
};

export default ViewEvent;
