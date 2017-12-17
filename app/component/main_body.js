import React , {Component} from 'react'; 

import {Alert,Text, View, ScrollView} from 'react-native';

import {List, ListItem} from 'react-native-elements';

export default class MainBody extends Component{
    
    constructor(props){
        super(...arguments); 
        
        this.state = {
            posts  : []
        }
    }
    
    componentDidMount(){
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

        
        return(
            
                <ScrollView>
                    <List>
                      {
                        this.state.posts.map((item, i) => (
                          <ListItem
                            key={i}
                            title={item.data.title}
                            titleNumberOfLines = {3}
                            onPress = {()=>this._on_click(item)}
                          />
                        ))
                      }
                    </List>
                </ScrollView>
                
            
            );
    }
}