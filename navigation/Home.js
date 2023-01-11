import React, { useRef, useState } from 'react';
import { Animated, PanResponder, Image, View, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  flex:1;
  background-color: skyblue;
  paddingTop:150px
  align-items: center;
  borderWidth: 5;
  position: absolute;
  width:${windowWidth};
  height:${windowHeight};
`;

const CardContainer = styled.View`
  flex:1;
  align-items: center;
`;
const Title = styled.Text`
  font-size:25;
  font-weight:900;
`;

const todayData = [
  // { title: '고양이 상위 0.0000001%', imageUrl: require('../assets/pic1.png') },
  // { title: '알에서 깨어난 아기 거북', imageUrl: require('../assets/pic2.png') },
  // { title: '냥줍 하는법', imageUrl: require('../assets/pic3.png') },
  // {
  //   title: '얌전하고 깔끔하게 먹는 고양이',
  //   imageUrl: require('../assets/pic4.png'),
  // },
];

const Home = () => {
  //Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(-windowWidth)).current;
  //Animation
  const onPressIn = () => {
    setImgVisible(true);
    //Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  const goLeft = Animated.spring(position, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100,
    restSpeedThreshold: 100,
  });
  const goRight = Animated.spring(position, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100,
    restSpeedThreshold: 100,
  });
  //Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn(),
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -170) {
          goLeft.start(onDismiss);
        } else if (dx > 170) {
          goRight.start(onDismiss);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;
  //State
  const [imgVisible, setImgVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const onDismiss = () => {
    position.setValue(0);

    setIndex((prev) => prev + 1);
  };
  return (
    <Container>
      <CardContainer>
        <Card>
          <Title>{todayData[2].title}</Title>
          {imgVisible ? (
            <Image
              style={{
                height: '90%',
                width: '90%',
                resizeMode: 'contain',
                top: '-50px',
              }}
              source={todayData[2].imageUrl}
            />
          ) : null}
        </Card>
        <Card
          {...panResponder.panHandlers}
          style={{
            transform: [{ scale }, { translateX: position }],
          }}>
          <Title>{todayData[1].title}</Title>
          {imgVisible ? (
            <Image
              style={{
                height: '90%',
                width: '90%',
                resizeMode: 'contain',
                top: '-50px',
              }}
              source={todayData[1].imageUrl}
            />
          ) : null}
        </Card>
      </CardContainer>
    </Container>
  );
};

export default Home;
