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
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import { ToastModule } from "./module"

const { width } = Dimensions.get('window');

class BannerList extends Component{
  render(){
    return(
      <View key={this.props.keyID} style={[{backgroundColor: this.props.color}, styles.banner]}></View>
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
        style={[{opacity}, styles.dotIndicator]}
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
          <Icon
            type='antdesign'
            name='plussquareo'
            color='white'
          />
          <Text style={{paddingLeft: 10, color: 'white'}}>{this.props.shoeName}</Text>
        </TouchableOpacity>
      </View>      
    )
  }
}

class Fade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  };

  componentWillMount() {
    this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true });
    }
    Animated.timing(this._visibility, {
      toValue: nextProps.visible ? 1 : 0,
      duration: 75,
    }).start(() => {
      this.setState({ visible: nextProps.visible });
    });
  }

  render() {
    const { visible, style, children, ...rest } = this.props;

    const containerStyle = {
      opacity: this._visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this._visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1],
          }),
        },
      ],
    };

    const combinedStyle = [containerStyle, style];
    return (
      <Animated.View style={this.state.visible ? combinedStyle : containerStyle} {...rest}>
        {this.state.visible ? children : null}
      </Animated.View>
    );
  }
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      cartItem: 0,
      visibility: true
    }
  }

  scrollX = new Animated.Value(0)

  setCartItem(shoesname){
    this.setState({cartItem: this.state.cartItem+1})
    ToastModule.toastMe(`${shoesname} added to the cart`, ToastModule.SHORT)
  }

  render(){
    let position = Animated.divide(this.scrollX, width);

    return(
      <View>
        <View style={{flexDirection: 'row', marginBottom: 10, height: '10%', justifyContent: 'space-between'}}>
          <View style={{justifyContent:'center', height: 70, width: 70}}>
            <TouchableOpacity onPress={() => this.setState({visibility: !this.state.visibility})}>
              <Fade visible={this.state.visibility}>
                <Icon
                  type='feather'
                  name='menu'
                />
              </Fade>
              <Fade visible={!this.state.visibility}>
                <Icon
                  type='feather'
                  name='x'
                />
              </Fade>
            </TouchableOpacity>                     
          </View>
          <View style={{paddingRight: 20, paddingTop: 20, justifyContent:'center', height: 50, width: 50}}>
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

        <Text style={styles.titleText}>Nike App Store</Text>

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
            <ShoesList color={'purple'} shoeName={"Nike a"} func={() => {this.setCartItem("nike a")}}/>
            <ShoesList color={'green'} shoeName={"bata"} func={() => {this.setCartItem("bata")}}/>
            <ShoesList color={'blue'} shoeName={"aid ideas"} func={() => {this.setCartItem("aid ideas")}}/>
            <ShoesList color={'red'} shoeName={"wacky"} func={() => {this.setCartItem("wacky")}}/>
          </ScrollView>
        </View>
        

      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingLeft: 20,
    marginBottom: 20,
    height: '5%'
  },
  banner: {
    height: 100,
    width: 300,
    marginHorizontal: 15
  },
  dotIndicator: {
    height: 10,
    width: 10,
    backgroundColor: '#595959',
    marginHorizontal: 8,
    borderRadius: 5
  }
});