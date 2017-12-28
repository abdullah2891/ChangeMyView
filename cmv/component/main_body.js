import React , {Component} from 'react'; 

import {Alert,Text, View, ScrollView,AsyncStorage} from 'react-native';

import {List, ListItem ,Button} from 'react-native-elements';

export default class MainBody extends Component{
    
    constructor(props){
        super(...arguments); 
        
        this.state = {
            posts  : []
        }
    }
    
    componentDidMount(){
        
        AsyncStorage
            .getItem('profile').then(response=>{
                console.log(response);
            });
        
        
        fetch('https://www.reddit.com/r/changemyview/.json')
            .then(response => response.json() )
            .then(response=>{
                let posts = response.data.children; 
                
                this.setState({posts : posts});
            })
    }
    
    _on_click(item){
        Alert.alert('You tapped the button!');
    }
        
    render(){
        
        const {navigate} = this.props.navigation; 

        
        return(
            <View>
                
             <Button
                      large
                      title='LOG IN TO REDDIT'
                      onPress =  {()=>navigate('LoginPage') }
                      />
            
            
                <ScrollView>
                    <List>
                      {
                        this.state.posts.map((item, i) => (
                          <ListItem
                            key={i}
                            title={item.data.title}
                            titleNumberOfLines = {3}
                            onPress = {()=>navigate('Comment', {comment_id : item.data.id }) }
                          />
                        ))
                      }
                    </List>
                </ScrollView>
            
                 
            </View>    
            
            );
    }
}