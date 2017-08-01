var React = require('react');
require('./css/todoItem.css');

//Create todoitem component
class TodoItem extends React.Component{
	render(){
		return(
			<li>
				<div className="todo-item">
					<span className="item-name">{this.props.item}</span>
					<span className="item-delete" onClick={this.handleDelete}>x</span>
				</div>
			</li>
		);
	}

	//custom functions
	handleDelete(){
		this.props.onDelete(this.props.item);
	}
};

export default TodoItem;