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
        // Alert.alert('You tapped the button!');
    }
        
    render(){
        
        const {navigate} = this.props.navigation; 

        
        return(
            
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
                
            
            );
    }
}