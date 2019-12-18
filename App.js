/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Animated,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

class BannerList extends Component{
  render(){
    return(
      <View key={this.props.keyID} style={{height: 100, width: 300, backgroundColor: this.props.color, marginHorizontal: 15}}></View>
    )
  }
}

class DotIndicator extends Component{  
  render(){
    let i = this.props.keyID;
    let position = this.props.position;

    let opacity = position.interpolate({
      inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
      outputRange: [0.2, 1, 0.2], // when position is not i, the opacity of the dot will animate to 0.3
      extrapolate: 'clamp' // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
    });

    return(
      <Animated.View
        key={this.props.keyID}
        style={{opacity, height: 10, width: 10, backgroundColor: '#595959', marginHorizontal: 8, borderRadius: 5 }}
      />
    )
  }
}

class ShoesList extends Component{
  render(){
    return (
      <View style={{padding: 10}}>
        <View style={{height: 200, width: 150, backgroundColor: this.props.color}}></View>
        <TouchableOpacity 
          onPress={() => ToastAndroid.show(this.props.shoeName, ToastAndroid.SHORT)}
          style={{flexDirection: 'row', padding: 10, backgroundColor: 'grey'}}
        >
          <View style={{height: 20, width: 20, backgroundColor: 'white'}}></View>
          <Text style={{paddingLeft: 10, color: 'white'}}>{this.props.shoeName}</Text>
        </TouchableOpacity>
      </View>      
    )
  }
}

export default class App extends Component {
  scrollX = new Animated.Value(0)

  render(){
    let position = Animated.divide(this.scrollX, width);

    return(
      <View>
        <View style={{flexDirection: 'row', marginBottom: 10, height: '10%',borderWidth: 2}}>
          <Text>burger</Text>
          <Text>cart</Text>
        </View>

        <Text style={{fontWeight: 'bold', fontSize: 24, paddingLeft: 20, marginBottom: 20, height: '5%'}}>Nike App Store</Text>

        <View style={{height: 100, marginBottom: 5}}>
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            onScroll={Animated.event( // Animated.event returns a function that takes an array where the first element...
              [{ nativeEvent: { contentOffset: { x: this.scrollX } } }] // ... is an object that maps any nativeEvent prop to a variable
            )} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
            scrollEventThrottle={16} // this will ensure that this ScrollView's onScroll prop is called no faster than 16ms between each function call
            decelerationRate={0}
            snapToInterval={315} //your element width
            snapToAlignment={"center"}
            style={{paddingLeft: 15}}
          >
            <BannerList keyID={0} color={'red'}/>
            <BannerList keyID={1} color={'purple'}/>
            <BannerList keyID={2} color={'green'}/>
            
            <View style={{width: 30}}></View>
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row',marginBottom: 20, height: 20, justifyContent: 'center'}}>
          {/* <Animated.View style={{ height: 10, width: 10, backgroundColor: '#595959', marginHorizontal: 8, borderRadius: 5 }} />
          <Animated.View style={{ height: 10, width: 10, backgroundColor: '#595959', marginHorizontal: 8, borderRadius: 5 }} />
          <Animated.View style={{ height: 10, width: 10, backgroundColor: '#595959', marginHorizontal: 8, borderRadius: 5 }} /> */}
          <DotIndicator keyID={0} position={position}/>
          <DotIndicator keyID={1} position={position}/>
          <DotIndicator keyID={2} position={position}/>
        </View>

        <View style={{height: '45%'}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <ShoesList color={'purple'} shoeName={"Nike a"}/>
            <ShoesList color={'blue'} shoeName={"aid ideas"}/>
            <ShoesList color={'red'} shoeName={"wacky"}/>
          </ScrollView>
        </View>
        

      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  }
});