var React = require('react');
var ReactDom = require('react-dom');
// const mongoose = require('mongoose');
import {Router, Route, browserHistory, Link} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'
const newHistory = createBrowserHistory();

//Styles
require('./css/index.css');

//Module requires
import TodoComponent from './todoComponent';
import HomeComponent from './homeComponent';
import ListAllComponent from './listAllComponent';

export default class App extends React.Component {
	render(){
		return(
			<Router history={newHistory}>
				<div>
					<Route exact path={'/'} component={HomeComponent}></Route>
					<Route path={'/listall'} component={ListAllComponent}></Route>
					<Route path={'/list/:id'} component={TodoComponent}></Route>
				</div>
			</Router>
		);
	}
};


//put component into html page
ReactDom.render(<App />, document.getElementById('todo-wrapper'));

