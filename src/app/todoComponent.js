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
		this.state = {'todos': ['wash up', 'eat some cheese', 'take a nap', 'buy flower']};
		this.onAdd = this.onAdd.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	render(){
		console.log('==========================this.state')
		console.log(this.state)
		var todos = this.state.todos;

		todos = todos.map(function(item, index){
			return(
				<TodoItem item={item} key={index} onDelete={this.onDelete} />
			)
		}.bind(this));

		return(
			<div id="todo-list">
				<ul>
					{todos}
				</ul>
				<AddItem onAdd={this.onAdd} />
			</div>
		);
	} //render

	//custom functions
	onDelete(item){
		var updatedTodos = this.state.todos.filter(function(val, index){
			return item !== val;
		});

		this.setState({
			todos: updatedTodos
		});
	}

	onAdd(item){
		console.log('todoComponent.onAdd')
		var updatedTodos = this.state.todos;
		updatedTodos.push(item);

		this.setState({
			todos:updatedTodos
		});
	}

	//lifecycle functions
	componentWillMount(){
		console.log('componentWillMount')
	}

	componentDidMount() {
		this.GetLists();
	}

	GetLists() {
		fetch('http://localhost:3001/api/lists')
		.then((data) => {
			console.log('ajax response')
			console.log(data.json())
			//this.setState({ person: data.results });
		});
	}

	componentWillUpdate(){
		console.log('componentWillUpdate')
	}
};

export default TodoComponent;