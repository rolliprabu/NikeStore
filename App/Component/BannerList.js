import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View
} from 'react-native';

export default class BannerList extends Component {
    render() {
        return (
            <View key={this.props.keyID} style={styles.banner}>
                <Image
                    source={this.props.imgSrc}
                    style={{ width: 300, height: 100 }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({    
    banner: {
      height: 100,
      width: 300,
      marginHorizontal: 15
    }
  });