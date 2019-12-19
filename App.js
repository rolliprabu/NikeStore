import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { ToastModule } from "./module"

import BannerList from './App/Component/BannerList'
import DotIndicator from './App/Component/DotIndicator'
import ShoesList from './App/Component/ShoesList'
import Fade from './App/Fade'

const { width } = Dimensions.get('window');
const images = {
  banner1: require('./Image/banner1.jpg'),
  banner2: require('./Image/banner2.jpg'),
  banner3: require('./Image/banner3.jpg'),
  shoes1: require('./Image/shoes1.jpg'),
  shoes2: require('./Image/shoes2.png'),
  shoes3: require('./Image/shoes3.png'),
  shoes4: require('./Image/shoes4.png'),
};

class App extends Component {
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
            <BannerList keyID={0} imgSrc={images.banner1}/>
            <BannerList keyID={1} imgSrc={images.banner2}/>
            <BannerList keyID={2} imgSrc={images.banner3}/>

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
            <ShoesList imgSrc={images.shoes1} shoeName={"Nike Vapormax"} func={() => {this.setCartItem("Nike Vapormax")}}/>
            <ShoesList imgSrc={images.shoes2} shoeName={"Nike Airmax"} func={() => {this.setCartItem("Nike Airmax")}}/>
            <ShoesList imgSrc={images.shoes3} shoeName={"Nike Mercurial"} func={() => {this.setCartItem("Nike Mercurial")}}/>
            <ShoesList imgSrc={images.shoes4} shoeName={"Nike Metcon"} func={() => {this.setCartItem("Nike Metcon")}}/>
          </ScrollView>
        </View>

      </View>
    )
  }
}

class Favourite extends Component {
  render(){
    return(
      <View>
        <Text>fav screen</Text>
      </View>
    )
  }
}

class Account extends Component {
  render(){
    return(
      <View>
        <Text>acc screen</Text>
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
  }
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: App,
    Favourite: Favourite,
    Account: Account
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        
        let iconName;
        if (routeName === 'Home') {
          iconName = `${focused ? 'home' : 'home-outline'}`;
        } else if (routeName === 'Favourite') {
          iconName = `${focused ? 'heart' : 'heart-outline'}`;
        } else if (routeName === 'Account') {
          iconName = `${focused ? 'account' : 'account-outline'}`;          
        }

        return <Icon type='material-community' name={iconName}/>
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      style:{height:75}
    },
  }
);

export default createAppContainer(TabNavigator);