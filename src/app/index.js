var React = require('react');
var ReactDom = require('react-dom');
require('./css/index.css');
import {Router, Route, browserHistory, Link} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'

const newHistory = createBrowserHistory();

//Module requires
// var TodoItem = require('./todoItem');
// var AddItem = require('./addItem');
// var About = require('./about');

//import {TodoItem} from './todoItem';
//import {AddItem} from './addItem';
//import {Link} from 'react-router';
import TodoComponent from './todoComponent';

// export default class App extends React.Component {
// 	render(){
// 		return(
// 			<Router history={newHistory}>
// 				<div>
// 					<Route path={'/'} component={TodoComponent}></Route>
// 					<Route path={'/about'} component={About}></Route>
// 				</div>
// 			</Router>
// 		);
// 	}
// };


//put component into html page
ReactDom.render(<TodoComponent />, document.getElementById('todo-wrapper'));

