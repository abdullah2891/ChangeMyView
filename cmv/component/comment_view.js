import React , {Component} from 'react'; 
import {View , Text} from  'react-native';


export default class Comment extends Component{
    
    render(){
        const input_object = this.props.navigation;
        console.log(input_object);
        return(
            <View>
                <Text>test {input_object.state.params.comment_id}</Text>
            </View>
            );
    }
}