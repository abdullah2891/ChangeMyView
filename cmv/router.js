import {StackNavigator} from 'react-navigation';


import {Button} from 'react-native';

import Comment from './component/comment_view'; 
import MainBody from './component/main_body';
import LoginForm from './component/login';
import WritePost from './component/write_post';


const BasicApp = StackNavigator({
  Main: {
      screen: MainBody,
    
    
    
  },
  Comment: {screen: Comment},
  LoginPage : {screen : LoginForm}, 
  
  WritePost :  {screen :  WritePost}
  
  
  
}); 


export default BasicApp;