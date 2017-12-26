import React , {Component} from 'react'; 
import {View ,ScrollView, StyleSheet, Text} from  'react-native';

import {List, ListItem} from 'react-native-elements';

import ReplyComment from './reply_comment';

export default class Comment extends Component{
    
    constructor(props){
        super(props); 
        
        this.state = {
            comment_id : this.props.navigation.state.params.comment_id, 
            comments : [], 
            header : {}
        };
    }
    
    componentDidMount(){
        let comment_id = this.state.comment_id; 
        fetch(`https://www.reddit.com/r/changemyview/comments/${comment_id}/.json`)
            .then(response => response.json() )
            .then(response=>{
                
                let [header, comments] =  response; 
                this.setState({
                    'comments' : comments.data.children,
                    'header'   : header.data.children
                });
            })
            .catch(()=>{
                
            });
    }
    
    
    
    render(){
        return(
                 <ScrollView>
                     {
                        this.state.header instanceof Array && 
                            <View style={card_style.card}> 
                                <Text>{this.state.header[0].data.selftext}</Text>
                            </View>
                        
                    }
                  {
                    this.state.comments.map((item, i) => {
                        
                        
                        if(!item.data){
							    return ;
						}
                        return(
                            <View style={card_style.card}>
                                <Text>{item.data.body}</Text>
                                <ReplyComment  
                                    comment =  {item} 
                                />
                            </View>

                        )
                        
                    })
                  }
                </ScrollView>
            );
    }
}


const card_style = StyleSheet.create({
    card : {
        borderStyle :  'solid', 
        borderWidth : 2 , 
        borderRadius : 3, 
        backgroundColor : '#fcfcfc', 
        padding : 10, 
        margin : 5
    }
    
})