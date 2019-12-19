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
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements';

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
      inputRange: [i - 1, i, i + 1],
      outputRange: [0.2, 1, 0.2],
      extrapolate: 'clamp'
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
          onPress={() => this.props.func()}
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
  constructor(props){
    super(props);
    this.state={
      cartItem: 0
    }
  }

  scrollX = new Animated.Value(0)

  setCartItem(){
    this.setState({cartItem: this.state.cartItem+1})
  }

  render(){
    let position = Animated.divide(this.scrollX, width);
    // const BadgedIcon = withBadge(this.state.cartItem)(Icon)

    return(
      <View>
        <View style={{flexDirection: 'row', marginBottom: 10, height: '10%', justifyContent: 'space-between'}}>
          <View style={{justifyContent:'center', height: 70, width: 70}}>
            <Icon
              type='Feather'
              name='menu'
            />
          </View>
          <View style={{paddingRight: 20, paddingTop: 20, justifyContent:'center', height: 50, width: 50}}>
            {/* <BadgedIcon
              type="EvilIcons"
              name="shopping-cart"
            /> */}
            <Icon
              type="EvilIcons"
              name="shopping-cart"
            />
            <Badge
              value={this.state.cartItem}
              containerStyle={{ position: 'absolute', top: 10, right: 10 }}
              status="error"
            />
          </View>
        </View>

        <Text style={{fontWeight: 'bold', fontSize: 24, paddingLeft: 20, marginBottom: 20, height: '5%'}}>Nike App Store</Text>

        <View style={{height: 100, marginBottom: 5}}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.scrollX } } }]
            )}
            scrollEventThrottle={16}
            decelerationRate={0}
            snapToInterval={315}
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
          <DotIndicator keyID={0} position={position}/>
          <DotIndicator keyID={1} position={position}/>
          <DotIndicator keyID={2} position={position}/>
        </View>

        <View style={{height: '45%'}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <ShoesList color={'purple'} shoeName={"Nike a"} func={() => {this.setCartItem()}}/>
            <ShoesList color={'green'} shoeName={"bata"} func={() => {this.setCartItem()}}/>
            <ShoesList color={'blue'} shoeName={"aid ideas"} func={() => {this.setCartItem()}}/>
            <ShoesList color={'red'} shoeName={"wacky"} func={() => {this.setCartItem()}}/>
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