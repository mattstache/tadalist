var React = require('react');
require('./css/todoItem.css');

//Create todoitem component
class TodoItem extends React.Component{
	constructor(){
        super();
        this.delete = this.delete.bind(this);
        this.handleItemKeyUp = this.handleItemKeyUp.bind(this);
    }

	render(){
		return(
			<li>
				<div className="todo-item">
					<span className="item-name">{this.props.item.name}</span>
					<input onKeyUp={this.handleItemKeyUp} name="name" defaultValue={this.props.item.name} />
					<span className="item-delete" onClick={this.delete}>x</span>
				</div>
			</li>
		);
	}

	//custom functions
	delete(){
		this.props.onDeleteItem(this.props.item);
	}

	handleItemKeyUp(e){
		let item = this.props.item;
		item.name = e.target.value;
		this.props.editItem(this.props.item, e.target.value);
	}
};

export default TodoItem;