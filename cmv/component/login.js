import React, {Component} from 'react'; 

import {View, StyleSheet , Text,WebView, AsyncStorage } from 'react-native'; 

export default class LoginForm  extends Component{
    
    constructor(props){
        super(props); 
        
        this.state = { 
            loginView :  true , 
            accessToken : '', 
            profile : ''
            
        };
    }
    
    login(){
        this.setState({loginView : true});
    }
    

    async updateGlobalStorage(){
        const {accessToken , profile } = this.state; 
        
        
        await AsyncStorage.setItem('accessToken' , accessToken); 
        await AsyncStorage.setItem('profile' , profile );
        
        
        const {navigate} = this.props.navigation; 
        
        navigate('Main');

    }



    _onNavigationStateChange(webViewState){
        
        let [_, code] = webViewState.url.split('&code=');
        
        // if we have access token , don't ask for access token again
        if(! (code && !this.state.access_token) ){
            return false;
        }
        console.log(code ,this.state.access_token );
        fetch('https://ssl.reddit.com/api/v1/access_token',{
            method : 'POST', 
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic MHNRbDFxalJ3MVZwWFE6dXVDOWtCaW82dDZ4VnV1MVdvNXd6d3czS1VV'
            }, 
            
            body :  `code=${code}&redirect_uri=https://python-workspace-abdullah2891.c9users.io/login&grant_type=authorization_code`
        })
            .then(response=>response.json() )
            .then(data=>{
                this.setState({accessToken :  data.access_token ,loginView :  false });
                this.getProfile();
            })
            
        
    }   
    
    getProfile(){
        
        window.fetch('https://oauth.reddit.com/api/v1/me.json' ,{
            headers : {
                'Authorization' : `Bearer ${this.state.accessToken}`
            }
        })
        .then(response => response.json())
        .then(data=>{
            console.log("++++++logged in_++_+++++++");
            this.setState({profile : data.name});
            this.updateGlobalStorage();
        }).catch((err)=>{
            console.log(err);
            
            
        })
        
        
    }
    
    
    render(){
        const client_id = '0sQl1qjRw1VpXQ'; 
        const api_url = 'https://ssl.reddit.com/api/v1/authorize.compact'; 
        const redirect_uri = 'https://python-workspace-abdullah2891.c9users.io/login';
        const request_url = `${api_url}?state=abbaforever&duration=permanent&response_type=code&scope=identity,edit,vote,submit&client_id=${client_id}&redirect_uri=${redirect_uri}`;
        
        console.log(this.props.window);
        return (
            <View style={{flex :1 , width :  400 }}>
                    {this.state.loginView &&
                         <WebView
                            source={{uri: request_url}}
                            scrollEnabled= "test"
                            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                          />
                    }
                    
                    <Text>Logged In As {this.state.profile}</Text>

                
            </View>
                
            )
    }
}


