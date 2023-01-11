import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';
import Home from './navigation/Home';
import SlideView from './SlideView';
import ListView from './ListView';
import Stacks from './navigation/Stacks';
import { db } from './Firebase/firebase';

SplashScreen.preventAutoHideAsync();
// const date = new Date();
// const todayDate = date.toLocaleDateString('ko-kr');
const dataUpdate = () => {
  const todayAnimals = db.collection('2022. 10. 17.');

  todayAnimals.doc('data0').set({
    title: '집사가 되는 과정',
    url: 'https://thumbs.gfycat.com/RightAltruisticEmperorshrimp-mobile.mp4',
    date: '2022.10.17',
    number: '20',
  });
  todayAnimals.doc('data1').set({
    title: '귀여움 + 귀여움',
    url: 'https://thumbs.gfycat.com/EnlightenedSizzlingHarborseal-mobile.mp4',
    date: '2022.10.17',
    number: '21',
  });
  todayAnimals.doc('data2').set({
    title: '쓰다듬으면 혓바닥 나오는 강아지',
    url: 'https://thumbs.gfycat.com/FavorableExhaustedHyena-mobile.mp4',
    date: '2022.10.17',
    number: '22',
  });
  todayAnimals.doc('data3').set({
    title: '댕댕이 레이스에 참가한 포메라니안',
    url: 'https://thumbs.gfycat.com/AltruisticImpoliteDodobird-mobile.mp4',
    date: '2022.10.17',
    number: '23',
  });
  todayAnimals.doc('data4').set({
    title: '내 친구네 강아지가 나를 어색해 함',
    url: 'https://thumbs.gfycat.com/SomeCheeryKitty-mobile.mp4',
    date: '2022.10.17',
    number: '24',
  });
  todayAnimals.doc('data5').set({
    title: '햄스터 거대 미궁 대탈출',
    url: 'https://thumbs.gfycat.com/UnfitSaneChrysalis-mobile.mp4',
    date: '2022.10.17',
    number: '25',
  });
  todayAnimals.doc('data6').set({
    title: '너무 무서운 새끼 냥이',
    url: 'https://thumbs.gfycat.com/ImprobableDimIslandwhistler-mobile.mp4',
    date: '2022.10.17',
    number: '26',
  });
  todayAnimals.doc('data7').set({
    title: '제대로 삐진 고양이',
    url: 'https://thumbs.gfycat.com/FriendlySinfulAmericanrobin-mobile.mp4',
    date: '2022.10.17',
    number: '27',
  });
  todayAnimals.doc('data8').set({
    title: '고양이도 "물어와" 가능합니다.',
    url: 'https://video.twimg.com/ext_tw_video/1575318890141188096/pu/vid/720x1280/hpd0a3q_7O-orvMz.mp4?tag=12',
    date: '2022.10.17',
    number: '28',
  });
  todayAnimals.doc('data9').set({
    title: '사육사가 너무 좋은 펭귄',
    url: 'https://thumbs.gfycat.com/ArcticTangibleDogwoodtwigborer-mobile.mp4',
    date: '2022.10.17',
    number: '29',
  });
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        //dataUpdate();
        // const today = new Date('2022. 10. 31.');
        // today.setDate(today.getDate() + 1);
        // console.info(today);
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (e) {
        console.info(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
  );
}
