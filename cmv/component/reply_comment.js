import React , {Component} from 'react'; 

import {View, StyleSheet,Text} from 'react-native';

import ActionButton from './action_button';

export default class ReplyComment extends Component{

	constructor(props){
		super(props);

	}



	render(){
		let post =  this.props.comment;
		
		
		    return (
		        <View>
    		        {
    		            post.data.replies ?
        		            ( 
            				<View>
                                {
                                    post.data.replies.data.children.map((reply, index)=>(
                                    
                                        <View  style={styles.card_style}>
                                            <Text>{reply.data.body} - {reply.data.author}</Text>
                                            <ActionButton item = {reply} />
                                            <ReplyComment
                                                comment = {reply}
                                                />
                                        </View>
                                    ))
                                    
                                }
            				</View>
            				) : (
            				    
            			        <View></View>	
            				)
    		        }
		        </View>
			)    
	
		

	}

}

const styles = StyleSheet.create({
    card_style : {
        borderLeftWidth: 7,
        borderLeftColor : '#1852af',

        borderTopWidth : 1 ,
        
        
        borderRadius : 10, 
        
        marginLeft  : 5, 
        marginRight : 5, 
        marginTop : 3, 
        
        padding : 5
        
    } 
});