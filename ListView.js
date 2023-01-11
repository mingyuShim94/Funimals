import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { db } from './Firebase/firebase';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY = '@watched';
const { width, height } = Dimensions.get('window');

const ListContainer = styled.View`
  flex:1;
  //background-color:blue;
`;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  backgroundColor: black;
`;
const TextContainer = styled.TouchableOpacity`
  padding-vertical:10;
  flex-direction:row;
  padding-right:10;
`;
const NumberView = styled.View`
  flex:1;
  align-items: center;
  justify-content: center;
  //background-color:red;
`;
const TitleView = styled.View`
  flex:5;
  align-items: center;
  justify-content: center;
  //background-color:blue;
`;

const TitleText = styled.Text`
  font-size:18;
  font-family:fon;
  text-align: center;
`;
const NumberText = styled.Text`
  font-size:14;
  font-family:fon;
  text-align: center;
`;
const TextHeader = styled.View`
  flex-direction:row;
  padding-vertical:10;
`;
const HeaderText = styled.Text`
  font-size:15;
`;
const Line = styled.View`
  height : 1;
  width: ${width};
  background-color:#BCCEF8;
`;
const BottomView = styled.View`
  flex:0.2;
  //padding-top:10;
  //background-color:blue;
  align-items: center;
`;
const ArrowView = styled.View`
  //flex:0.2;
  flex-direction:row;
  padding-top:5;
  //background-color:red;
  // justify-content: center;
  // align-items: center;
`;
const DateView = styled.Text`
  padding-vertical:8;
  font-size:15;
  font-family:fon;
  background-color:skyblue;
  borderRadius:10;
  padding-horizontal:10;
`;
const ArrowRight = styled.TouchableOpacity`
  padding-horizontal:10;
`;
const ArrowLeft = styled.TouchableOpacity`
  padding-horizontal:10;
`;
const AdsView = styled.View`
  flex:0.1;
  background-color:skyblue;
`;
const FlatListBasics = ({ navigation: { navigate, addListener } }) => {
  const navigation = useNavigation();
  const today = new Date(2022, 10, 17);
  const firstDate = new Date(2022, 10, 15);
  const [page, setPage] = useState(today);
  const [loading, setLoading] = useState(true);
  const [todayData, setTodayData] = useState([]);
  const [watchedArr, setWatchedArr] = useState([]);
  const loadData = async (dateToday) => {
    //const krDate = date.toLocaleDateString();
    //alert(krDate);
    const year = dateToday.getFullYear();
    const month = dateToday.getMonth();
    const date = dateToday.getDate();
    const krDate = `${year}. ${month}. ${date}.`;
    const d = await db.collection(krDate).onSnapshot((snapshot) => {
      var dArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setTodayData(dArr);
      //alert(dArr.length);
    });
  };
  useEffect(() => {
    loadData(today);
    //console.info(todayData.length);
    todayData.length == 10 ? setLoading(false) : null;
    //setLoading(false);
    //alert(todayData.length)
  }, [todayData.length]);

  useEffect(() => {
    const goBackListener = addListener('focus', () => {
      loadLog();
      return goBackListener;
    });
  }, []);

  const datePast = () => {
    const tempDate = page;
    if (tempDate <= firstDate) null;
    else {
      tempDate.setDate(tempDate.getDate() - 1);
      loadData(tempDate);
    }
  };

  const dateNext = () => {
    const tempDate = page;
    if (tempDate >= today) null;
    else {
      tempDate.setDate(tempDate.getDate() + 1);
      loadData(tempDate);
    }
    console.info(tempDate.toLocaleDateString('ko-kr'));
  };

  const saveLog = async (number) => {
    const temp = [...watchedArr];
    temp.push(number);
    temp.sort();
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(temp));
    setWatchedArr(temp);
  };

  // watchedArr.includes(item.number) ? null : saveLog(item.number);
  const loadLog = async () => {
    const temp = await AsyncStorage.getItem(STORAGE_KEY);
    const tempData = JSON.parse(temp);
    tempData == null ? null : setWatchedArr(tempData);
  };
  return loading ? (
    <Loader>
      <ActivityIndicator size="large" color="white" />
    </Loader>
  ) : (
    <>
      <ListContainer>
        <StatusBar hidden />
        <TextHeader>
          <NumberView>
            <HeaderText>{'번호'}</HeaderText>
          </NumberView>
          <TitleView>
            <HeaderText>{'제목'}</HeaderText>
          </TitleView>
        </TextHeader>
        <Line></Line>
        <FlatList
          data={todayData}
          ItemSeparatorComponent={() => <Line></Line>}
          keyExtractor={(_, index) => index.toString}
          renderItem={({ item, index }) => (
            <TextContainer
              onPress={() => navigate('SlideView', { index, data: todayData })}>
              <NumberView>
                <NumberText
                  style={
                    watchedArr.includes(item.number) ? { opacity: 0.5 } : null
                  }>
                  {item.number}
                </NumberText>
              </NumberView>
              <TitleView>
                <TitleText
                  style={
                    watchedArr.includes(item.number) ? { opacity: 0.5 } : null
                  }>
                  {item.title.replace('\\n', '')}
                </TitleText>
              </TitleView>
            </TextContainer>
          )}
        />
      </ListContainer>
      <BottomView>
        <DateView>{`${page.getFullYear()}. ${page.getMonth()}. ${page.getDate()}.`}</DateView>
        <ArrowView>
          <ArrowLeft onPress={() => dateNext()}>
            <FontAwesome5
              name="arrow-alt-circle-left"
              size={30}
              color="black"
            />
          </ArrowLeft>
          <ArrowRight onPress={() => datePast()}>
            <FontAwesome5
              name="arrow-alt-circle-right"
              size={30}
              color="black"
            />
          </ArrowRight>
        </ArrowView>
      </BottomView>
      <AdsView>
        <Text>광고넣을예정</Text>
      </AdsView>
    </>
  );
};

//  const year = dateToday.getFullYear();
//     const month = dateToday.getMonth();
//     const date = dateToday.getDate();
//     const krDate = `${year}. ${month}. ${date}.`;

// <NumberText>{item.number}</NumberText>
// <TitleText>{item.title.replace('\\n', '')}</TitleText>
// <DateText>{item.date}</DateText>
export default FlatListBasics;
