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
	}

	render(){
		this.state.list = this.state.list || {};
		this.state.list.items = this.state.list.items || [];

		let itemsEl = this.state.list.items.map(function(item, index){
			console.log('item.name: '  + item.name)
			return(
				<TodoItem name={item.name} key={index} onDelete={this.onDelete} />
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
		console.log('todoComponent.onAdd')
		console.log(item);
		var updatedTodos = this.state.list.items || [];
		updatedTodos.push({name: item});

		console.log('JSON.stringify({items: updatedTodos})')
		console.log(JSON.stringify({items: updatedTodos}))

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

	//lifecycle functions
	componentWillMount(){
		console.log('componentWillMount')
	}

	componentDidMount() {
		var $self = this;
		this.GetList(function(list){
			console.log('test');
			console.log(list)
			$self.setState({list: list});
		});
	}

	GetList(callback) {
		console.log('======PROPS=====')
		console.log(this.props.match.params.id)
		fetch('http://localhost:3001/api/list/' + this.props.match.params.id)
		.then((data) => {
			return data.json().then(function(json) {
				callback(json);
			});
		});
	}

	componentWillUpdate(){
		console.log('componentWillUpdate') 
	}
};

export default TodoComponent;