import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Button,
  Alert,
  TextInput,
  Platform,
  Linking,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DATA = [
  {
    id: 'gav_key',
    title: 'गावदेवी ढाबा ',
    ph_no: "+919768353340"
  },
  {
    id: 'raton_key',
    title: 'राशन भाकरी ',
    ph_no: "+919930265444"
  },
  {
    id: 'nitin_key',
    title: 'नितीन घुंगरू ',
    ph_no: "+918779150575"
  },
  {
    id: 'manu_key',
    title: 'मानू चिरड ',
    ph_no: "+919322985242"
  },
  {
    id: 'sharvari_key',
    title: 'शर्वरी करवले  ',
    ph_no: "+918451013187"
  },
];

const DataScreen = ({route}) => {
  const {customerName} = route.params;
  let cust_data = DATA.filter((item)=>{
    if (item.title == customerName){
      return true;
    }
    return false;
  });

  let ph_no = cust_data[0].ph_no;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [bhakariInput, setBhakariInput] = useState("");
  let bhakariBtn = null
  console.log(customerName)
  console.log(cust_data)
  console.log(ph_no)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const send_message = (btn = false) => {
    let message = null
    const onOkPress = () =>{
      console.log("OK");
      const url = `whatsapp://send?phone=${ph_no}&text=${encodeURIComponent(message)}`;
      Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('WhatsApp is not installed on this device.');
        }
      })
      .catch((err) => console.error('An error occurred', err));
      
    }

    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.toLocaleTimeString()}`;

    if (btn) {
      message = `${formattedDate} ==  ${bhakariInput} भाकरी `
    } else {
      message = `${formattedDate} ==  ${bhakariBtn} भाकरी`;
    }
    setBhakariInput("");

    Alert.alert(
      "Alert Title",
      message,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: onOkPress }
      ],
      { cancelable: false }
    );
  
  };

  const buttons = Array.from({ length: 12 }, (_, index) => (
    <TouchableOpacity
      key={index}
      className="m-2 p-2 bg-sky-400 w-20 items-center"
      onPress={() => {
        bhakariBtn = ((index + 1) * 5);
        send_message(false);
      }}
    >
      <Text className="text-4xl font-bold">{(index + 1) * 5}</Text>
      <Text className="text-lg"> भाकरी </Text>
    </TouchableOpacity>
  ));

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="">
      <Text>{customerName}</Text>
        <View className="p-5">
        <TouchableOpacity onPress={showDatepicker} className="bg-slate-400 p-3 m-1 rounded items-center">
            <Text className="text-xl font-bold">तारीख निवडा</Text>
          </TouchableOpacity>

        <TouchableOpacity onPress={showTimepicker} className="bg-slate-400 p-3 m-1 rounded items-center">
            <Text className="text-xl font-bold">वेळ निवडा</Text>
          </TouchableOpacity>

          <Text className="mt-5 text-xl">
            {`तारीख : ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.toLocaleTimeString()}`}
          </Text>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <View className="flex-row flex-wrap justify-center">
          {buttons}
        </View>
        <View>
          <TextInput
            className="bg-white text-center text-4xl border-2"
            value={bhakariInput}
            onChangeText={setBhakariInput}
            placeholder="भाकरी इथे टाका ..."
            keyboardType="numeric"
          />
          <TouchableOpacity
            onPress={() => {
              send_message(true);
            }}
            className="m-auto p-auto mt-5 mx-12 border-2 bg-green-500"
          >
            <Text className="p-5 text-4xl font-bold text-center text-zinc-900">
              मेसेज पाठवा
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DataScreen;
