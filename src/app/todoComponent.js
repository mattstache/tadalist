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
		console.log('==========================this.state')
		console.log(this.state)
		var items = this.state.items || [];

		items = items.map(function(item, index){
			console.log('item.name: '  + item.name)
			return(
				<TodoItem name={item.name} key={index} onDelete={this.onDelete} />
			)
		}.bind(this));

		return(
			<div id="todo-list">
				<ul>
					{items}
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
		var updatedTodos = this.state.items || [];
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
		this.GetList(function(response){
			console.log('test');
			console.log(response)
			$self.setState({items: response.items});
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