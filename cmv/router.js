import {StackNavigator} from 'react-navigation';


import Comment from './component/comment_view'; 
import MainBody from './component/main_body';
import LoginForm from './component/login';

const BasicApp = StackNavigator({
  Main: {screen: MainBody},
  Comment: {screen: Comment},
  LoginPage : {screen : LoginForm}
}); 


export default BasicApp;