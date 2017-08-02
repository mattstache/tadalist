var React = require('react');
require('./css/todoItem.css');

//Create todoitem component
class TodoItem extends React.Component{
	constructor(){
        super();
        this.delete = this.delete.bind(this);
    }

	render(){
		return(
			<li>
				<div className="todo-item">
					<span className="item-name">{this.props.name}</span>
					<span className="item-delete" onClick={this.delete}>x</span>
				</div>
			</li>
		);
	}

	//custom functions
	delete(){
		this.props.onDelete(this.props.item);
	}
};

export default TodoItem;