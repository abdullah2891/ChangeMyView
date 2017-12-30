import React, {Component} from 'react'; 

import {View, StyleSheet ,Alert,  Button, AsyncStorage ,TextInput} from 'react-native'; 

export default class LoginForm  extends Component{
    
    constructor(props){
        super(props); 
        this.state = {
            text : 'placeholder text', 
            title : 'placeholder title'
            
        };
    }
    
    componentWillMount(){
        AsyncStorage
            .getItem('accessToken')
            .then(access_token => {
                this.setState({access_token});
            })
    }
    
     
    submitPost(){
        var formData =  new FormData(); 

        
        formData.append('title', this.state.title); 
        formData.append('text', this.state.text); 
        formData.append('sr', 'dev_playspace'); 
        formData.append('kind', 'self'); 
        
        
        console.log(formData); 
        
        console.log(this.state.access_token);
        
        fetch('https://oauth.reddit.com/api/submit', {
          method : 'POST', 
          headers : {
                        'Authorization' : `Bearer ${this.state.access_token}`
                    },
          body :  formData
        }).then(response =>  response.json() )
        .then(data=>{
          console.log(data);
          
          if(!data.success){
                 Alert.alert('failed to create post');  
          }
          
          
          this.props.navigation.navigate('Main');
           

        })
        .catch(err=>{
            console.log(err);
            Alert.alert('Could not log in ');
        })
    }
    
 
     render(){
            console.log("write post", this.state.access_token );
            return(
                    <View>
                    
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            value={this.state.title}
                            onChangeText = { (text)=>this.setState({title : text}) }
                          />
                        
                        <TextInput 
                             multiline = {true}
                             numberOfLines = {10}
                             value={this.state.text}
                             onChangeText = { (text) => this.setState({text : text}) }
                        />
                        
                          
                        <Button
                              large
                              icon={{name: 'fa-floppy-o', type: 'font-awesome'}}
                              title='Submit' 
                              onPress ={ ()=>this.submitPost() }
                              
                              />
                        
                    
                    </View>
                
                
                );
         
         
     }   
    
}