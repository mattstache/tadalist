var React = require('react');
import TodoItem from './todoItem';
import AddItem from './addItem';
//import Link from 'react-router';

//Create component
class TodoComponent extends React.Component{
	constructor(){
		console.log('contrsutco')
		super();
		this.state = {'todos': ['wash up', 'eat some cheese', 'take a nap', 'buy flower']}
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
		var updatedTodos = this.todos;
		updatedTodos.push(item);

		this.setState({
			todos:updatedTodos
		});
	}

	//lifecycle functions
	componentWillMount(){
		console.log('componentWillMount')
	}

	componentDidMount(){
		console.log('componentDidMount')

		//any grabbing of external data
	}

	componentWillUpdate(){
		console.log('componentWillUpdate')
	}
};

export default TodoComponent;