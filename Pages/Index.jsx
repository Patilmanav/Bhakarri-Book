import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const DATA = [
  {
    id: 'gav_key',
    title: 'गावदेवी ढाबा ',
  },
  {
    id: 'raton_key',
    title: 'राशन भाकरी ',
  },
  {
    id: 'nitin_key',
    title: 'नितीन घुंगरू ',
  },
  {
    id: 'manu_key',
    title: 'मानू चिरड ',
  },
  {
    id: 'sharvari_key',
    title: 'शर्वरी करवले  ',
  },
];

const Index = ({navigation}) => {
    const [name,setName] = useState("Name");
    const Item = ({title}) => (
      <TouchableOpacity
      className={`bg-[#f9c2ff] p-[20px] mx-[8px] my-[16px]`}
      onPress={() => { setName(title); navigation.navigate('Manav',{customerName:title}) }}
    >
      <Text className={`text-2xl`}>{title}</Text>
    </TouchableOpacity>
    );
  
  return (
    <SafeAreaView className={`flex-1 mt-[${StatusBar.currentHeight || 0}]`}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
      <Text>{name}</Text>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        hidden={true}
      />
    </SafeAreaView>
  )
}

export default Index