var React = require('react');
import TodoItem from './todoItem';
import AddItem from './addItem';
require('es6-promise').polyfill();
require('isomorphic-fetch');
//var fetch = require('node-fetch');
//import Link from 'react-router';

//Create component
class TodoComponent extends React.Component{
	constructor(){
		console.log('contrsutco')
		super();
		this.state = {'items': []};
		this.onAddItem = this.onAddItem.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onDeleteItem = this.onDeleteItem.bind(this);
	}

	render(){
		this.state.list = this.state.list || {};
		this.state.list.items = this.state.list.items || [];

		let itemsEl = this.state.list.items.map(function(item, index){
			console.log('item.name: '  + item.name)
			return(
				<TodoItem item={item} key={index} onDeleteItem={this.onDeleteItem} />
			)
		}.bind(this));

		return(
			<div id="todo-list">
				<h1>{this.state.list.name}</h1>
				<ul>
					{itemsEl}
				</ul>
				<AddItem onAddItem={this.onAddItem} />
			</div>
		);
	} //render

	//custom functions
	onDelete(item){
		var updatedTodos = this.state.items.filter(function(val, index){
			return item !== val;
		});

		this.setState({
			items: updatedTodos
		});
	}

	onAddItem(item){
		var updatedTodos = this.state.list.items || [];
		updatedTodos.push({name: item});

		fetch('http://localhost:3001/api/list/' + this.props.match.params.id, {
			method: 'POST',
			headers: new Headers({
             'Content-Type': 'application/json', // <-- Specifying the Content-Type
    		}),
			body: JSON.stringify({items: updatedTodos})
		})
		.then((data) => {
			return data.json().then(function(json) {
				callback(json);
			});
		});

		this.setState({
			items:updatedTodos
		});
	}

	onDeleteItem(item){
		let $self = this;
		console.log('onDeleteItem')
		console.log(item)
		//this.props.match.params.itemId
		fetch('http://localhost:3001/api/list/' + this.state.list._id + '/item/' + item._id, {
			method: 'POST',
			headers: new Headers({
             'Content-Type': 'application/json', // <-- Specifying the Content-Type
    		}),
			body: JSON.stringify({itemId: item._id})
		})
		.then((data) => {
			return data.json().then(function(json) {
				callback(json);
			});
		});

		// this.setState({
		// 	items:updatedTodos
		// });
	}

	//lifecycle functions
	componentWillMount(){

	}

	componentDidMount() {
		var $self = this;
		this.GetList(function(list){
			$self.setState({list: list});
		});
	}

	GetList(callback) {
		fetch('http://localhost:3001/api/list/' + this.props.match.params.id)
		.then((data) => {
			return data.json().then(function(json) {
				callback(json);
			});
		});
	}

	componentWillUpdate(){

	}
};

export default TodoComponent;