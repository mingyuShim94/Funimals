import React, { useEffect, useState, useRef } from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { db } from './Firebase/firebase';
import { useFonts } from 'expo-font';
const { width, height } = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY_watched = '@watched';
const STORAGE_KEY_like = '@like';
const colors = [
  '#F94144',
  '#F3722C',
  '#F8961E',
  '#F9844A',
  '#F9C74F',
  '#90BE6D',
  '#43AA8B',
  '#4D908E',
  '#577590',
  '#277DA1',
];

const videoH = height * 0.5;
const videoW = width * 0.9;

const WindowContainer = styled.View`
  flex:1;
`;
const FlatlistRenderView = styled.View`
  width:${width};
  height: ${height};
  alignItems: center;
`;
const TouchContainer = styled.TouchableOpacity`
  alignItems: center;
  width: ${width};
  height: ${height};
`;
const LikeContainer = styled.TouchableOpacity`
  alignItems: center;
  backgroundColor: red;
`;
const ImageContainer = styled.View`
  alignItems: center;
  width: ${width};
  height: ${height * 0.6};
`;
const TitleContainer = styled.View`
  justify-content: center;
  height: ${height * 0.3};
`;
const Title = styled.Text`
  margin-top:150;
  font-size:25;
  font-family:fon;
  text-align: center;
`;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  backgroundColor: black;
`;

export default ({ navigation: { navigate }, route }) => {
  const [loading, setLoading] = useState(true);
  const [watchedArr, setWatchedArr] = useState([]);
  const [fontsLoaded] = useFonts({
    fon: require('./assets/fonts/Binggrae-Bold.ttf'),
  });
  const [imgVisible, setImgVisible] = useState(
    Array.from({ length: 10 }, (v, i) => false)
  );
  const [todayData, setTodayData] = useState([]);

  useEffect(() => {
    //loadData();
    //console.info(todayData.length);
    setTodayData(route.params.data);
    //console.info(route.params);
    todayData.length == 10 ? setLoading(false) : null;
  }, [route.params.data, todayData.length]);

  useEffect(() => {
    loadLog();
  }, []);
  //console.info(route.params);
  const onImgvisible = (index) => {
    let tempArr = [...imgVisible];
    tempArr[index] = true;
    setImgVisible(tempArr);
  };

  const saveLog = async (number) => {
    const temp = [...watchedArr];
    // console.info(temp);
    temp.push(number);
    temp.sort(function (a, b) {
      return a - b;
    });
    console.info(temp);
    await AsyncStorage.setItem(STORAGE_KEY_watched, JSON.stringify(temp));
    setWatchedArr(temp);
  };

  const loadLog = async () => {
    const temp = await AsyncStorage.getItem(STORAGE_KEY_watched);
    const tempData = JSON.parse(temp);
    tempData == null ? null : setWatchedArr(tempData);
  };

  const saveLike = async (item) => {
    console.info(item);
  };
  return loading ? (
    <Loader>
      <ActivityIndicator size="large" color="white" />
    </Loader>
  ) : (
    <WindowContainer>
      <StatusBar hidden />
      <FlatList
        data={todayData}
        initialScrollIndex={route.params.index}
        keyExtractor={(_, index) => index.toString}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        renderItem={({ item, index }) => {
          return (
            <FlatlistRenderView>
              <TouchContainer
                style={{ backgroundColor: colors[index] }}
                activeOpacity={1}
                onPress={() => {
                  onImgvisible(index);
                  watchedArr.includes(item.number)
                    ? null
                    : saveLog(item.number);
                }}>
                <TitleContainer>
                  <Title>{item.title.replace('\\n', '\n')}</Title>
                </TitleContainer>
                <ImageContainer>
                  {imgVisible[index] ? (
                    <VideoPlayer
                      style={{
                        width: videoW,
                        height: videoH,
                        videoBackgroundColor: null,
                      }}
                      videoProps={{
                        shouldPlay: true,
                        resizeMode: ResizeMode.CONTAIN,
                        // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
                        source: {
                          uri: item.url,
                        },
                      }}
                    />
                  ) : null}
                </ImageContainer>
                <LikeContainer
                  onPress={() => {
                    saveLike(item);
                  }}>
                  <Ionicons name="heart" size={24} color="black" />
                </LikeContainer>
              </TouchContainer>
            </FlatlistRenderView>
          );
        }}
      />
    </WindowContainer>
  );
};
