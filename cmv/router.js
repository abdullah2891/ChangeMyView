import {StackNavigator} from 'react-navigation';


import Comment from './component/comment_view'; 
import MainBody from './component/main_body';


const BasicApp = StackNavigator({
  Main: {screen: MainBody},
  Comment: {screen: Comment},
}); 


export default BasicApp;