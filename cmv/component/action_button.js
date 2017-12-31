import React, {Component} from 'react'; 
import {Icon} from 'react-native-elements'; 


import {View , StyleSheet,Text, AsyncStorage } from 'react-native';




export default class ActionButton extends Component{
        
        constructor(props){
            super(props); 
            
            this.state = {
                access_token : ''
            }
        }
        
        componentWillMount(){
            AsyncStorage.get('accessToken')
                    .then(token=>{
                        this.setState({access_token : token})
                    })
                    .catch(err => {
                        console.log(err);
                    })
        }
        
        
        render(){
            
            return(
                  <View style={styles.button_group}>
                        <Icon
                          raised
                          name='thumbs-o-up'
                          type='font-awesome'
                          color='#f50'
                          onPress={() => console.log('updoot')} />
                          
                           <Icon
                              raised
                              name='thumbs-o-down'
                              type='font-awesome'
                              color='#f50'
                              onPress={() => console.log('down doot')} />
                    
                    </View>
                );
        }
    
}

const styles = StyleSheet.create({
    
    button_group: {
        flex: 1, 
        flexDirection: 'row', 
    }
    
})
