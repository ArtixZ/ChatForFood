import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
// import { CheckBox } from 'react-native-elements';
import { Button } from './common';

class FoodClassOptions extends Component {

    constructor(props) {
        super(props);
        props.options[0]['checked'] = true;
        this.state = {
            foodClasses: props.options,
        };
    }

    onPressBtn = (index) => {
        const { foodClasses } = this.state;
        foodClasses.forEach( (item, i) => {
            if(i === index) {
                item.checked = true;
            }else {
                item.checked = false;
            }
        })
        this.setState({foodClasses: [...foodClasses]});
    }


    renderBtn = ({item, index: i}) => {
        return (
            <CheckBox
                center
                title={item.food_class}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={!!item.checked}
                onIconPress={() => this.onPressBtn(i)}
                onPress={() => this.onPressBtn(i)}
                checkedColor='#5C6BC0'
            />
        )
    }

    renderOptions = () => {
        const {options} = this.props;
        return options.map( (opt, i) => {
            return (
                <View>
                </View>
            )
        })
    }

    render() {

        return(
            <View style={styles.optionsContainer}>
                {this.renderOptions}
            </View>
        )
    }
}

const styles = {
    optionsContainer: {
    }
}

export default FoodClassOptions;