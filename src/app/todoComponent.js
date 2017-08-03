var React = require('react');
import TodoItem from './todoItem';
import AddItem from './addItem';
require('es6-promise').polyfill();
require('isomorphic-fetch');

//Create component
class TodoComponent extends React.Component{
	constructor(){
		console.log('contrsutco')
		super();
		this.state = {'items': []};
		this.onAddItem = this.onAddItem.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onDeleteItem = this.onDeleteItem.bind(this);
		this.editItem = this.editItem.bind(this);
	}

	render(){
		this.state.list = this.state.list || {};
		this.state.list.items = this.state.list.items || [];

		let itemsEl = this.state.list.items.map(function(item, index){
			console.log('item.name: '  + item.name)
			return(
				<TodoItem item={item} key={index} editItem={this.editItem} onDeleteItem={this.onDeleteItem} />
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
		let $self = this;
		var updatedTodos = this.state.list.items || [];
		updatedTodos.push({name: item});

		fetch('http://localhost:3001/api/list/' + this.props.match.params.id + '/item', {
			method: 'POST',
			headers: new Headers({
             'Content-Type': 'application/json', // <-- Specifying the Content-Type
    		}),
			body: JSON.stringify({items: updatedTodos})
		})
		.then((data) => {
			return data.json().then(function(list) {
				$self.setState({list: list})
			});
		});
	}

	onDeleteItem(item){
		let $self = this;

		fetch('http://localhost:3001/api/list/' + this.state.list._id + '/item/' + item._id, {
			method: 'DELETE',
			headers: new Headers({
             'Content-Type': 'application/json', // <-- Specifying the Content-Type
    		}),
			body: JSON.stringify({itemId: item._id})
		})
		.then((data) => {
			console.log(data)
			return data.json().then(function(list) {
				console.log(list);
				$self.setState({list: list});
			});
		});
	}

	editItem(item){
		let $self = this;

		fetch('http://localhost:3001/api/list/' + this.state.list._id + '/item/' + item._id, {
			method: 'PUT',
			headers: new Headers({
             'Content-Type': 'application/json', // <-- Specifying the Content-Type
    		}),
			body: JSON.stringify({item: item})
		})
		.then((data) => {
			console.log(data)
			return data.json().then(function(list) {
				console.log(list);
				$self.setState({list: list});
			});
		});
	}

	//lifecycle functions
	componentWillMount(){
		console.log('componentWillMount')

	}

	componentDidMount() {
		console.log('componentDidMount')
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

	componentWillReceiveProps(){
		console.log('componentWillReceiveProps')

	}

	// shouldComponentUpdate(){
	// 	console.log('componentShouldUpdate')

	// }

	componentWillUpdate(){
		console.log('componentWillUpdate')

	}

	componentDidUpdate(){
		console.log('componentDidUpdate')

	}

	componentWillUnmount(){
		console.log('componentWillUnmount')

	}

};

export default TodoComponent;