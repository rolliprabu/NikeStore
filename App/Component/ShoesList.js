import React, {Component} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class ShoesList extends Component{
  render(){
    return (
      <View style={{padding: 10}}>
        <View style={{height: 200, width: 150, backgroundColor: 'white'}}>
          <Image 
            source={this.props.imgSrc}
            style={{width: 150, height: 200}}  
          />
        </View>
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