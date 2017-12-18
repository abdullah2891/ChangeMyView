import React, {Component} from 'react';

import { StyleSheet, Text, View } from 'react-native';


// loading external libraries
import MainBody from './main_body'; 
import Navbar from './nav'; 


export default class IndexView extends Component{
    
    
    
    render(){
        
        return(
            
            <View style={styles.container}>
                <Navbar />
            
            
            
                <MainBody/>
                
            
            
            </View>
        
            
            
            
            );
        
    }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#191a1c',
    marginTop : 30
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
});