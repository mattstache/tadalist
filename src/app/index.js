var React = require('react');
var ReactDom = require('react-dom');
// const mongoose = require('mongoose');
import {Router, Route, browserHistory, Link} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'
const newHistory = createBrowserHistory();

//Styles
require('./css/index.css');

//Database conenction
// const db = 'mongodb://localhost/mongoosetest';
// mongoose.Promise = global.Promise;
// mongoose.connect(db);

//Module requires
import TodoComponent from './todoComponent';

export default class App extends React.Component {
	render(){
		return(
			<Router history={newHistory}>
				<div>
					<Route path={'/'} component={TodoComponent}></Route>
				</div>
			</Router>
		);
	}
};


//put component into html page
ReactDom.render(<App />, document.getElementById('todo-wrapper'));

