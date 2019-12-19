import React, { Component } from 'react';
import {
    Animated,
    StyleSheet
} from 'react-native';

export default class DotIndicator extends Component {
    render() {
        let i = this.props.keyID;
        let position = this.props.position;

        let opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.2, 1, 0.2],
            extrapolate: 'clamp'
        });

        return (
            <Animated.View
                key={this.props.keyID}
                style={[{ opacity }, styles.dotIndicator]}
            />
        )
    }
}

const styles = StyleSheet.create({
    dotIndicator: {
        height: 10,
        width: 10,
        backgroundColor: '#595959',
        marginHorizontal: 8,
        borderRadius: 5
    }
});