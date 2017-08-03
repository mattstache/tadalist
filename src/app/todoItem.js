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
			<li key={this.props.item._id}>
				<div className="todo-item">
					<input className="item-name" onKeyUp={this.handleItemKeyUp} name="name" defaultValue={this.props.item.name} />
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
		this.props.editItem(this.props.item);
	}
};

export default TodoItem;