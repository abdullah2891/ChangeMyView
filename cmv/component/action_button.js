import React, {Component} from 'react'; 
import {Icon} from 'react-native-elements'; 


import {View , StyleSheet,Text, AsyncStorage } from 'react-native';




export default class ActionButton extends Component{
        
        constructor(props){
            super(props); 
            
            this.state = {
                access_token : {},
            }
        }
        
        componentWillMount(){
            AsyncStorage.getItem('accessToken')
                    .then(token=>{
                        this.setState({access_token : token})
                    })
                    .catch(err => {
                        console.log(err);
                    })
        }
        
        _cast_vote(direction){
            
            let formData =  new FormData(); 
    
        
            formData.append('id', this.props.item.data.name); 
            formData.append('dir', direction); 

            
            console.log(formData); 
            
            console.log(this.state.access_token);
            
            fetch('https://oauth.reddit.com/api/vote', {
              method : 'POST', 
              headers : {
                            'Authorization' : `Bearer ${this.state.access_token}`
                        },
              body :  formData
            }).then(data=>{
                
                if(!data.ok){
                    console.log(data['_bodyText'] );
                }
                
                console.log(data["_bodyInit"]);
                
            }).catch(err => {
                console.log('downvote', err);
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
                          onPress={() => this._cast_vote(1) } />
                          
                           <Icon
                              raised
                              name='thumbs-o-down'
                              type='font-awesome'
                              color='#f50'
                              onPress={() => this._cast_vote(-1) } />
                    
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
