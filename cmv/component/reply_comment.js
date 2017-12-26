import React , {Component} from 'react'; 

import {View, StyleSheet,Text} from 'react-native';



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
                                        <View  style={styles.comment}>
                                            <Text>{reply.data.body}</Text>
                                            
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
    comment : {
        borderStyle : 'solid', 
        borderLeftWidth  : 2,
        borderColor : '#353131',
        backgroundColor : '#ffffff'
    } 
});