var React = require('react');

require('./css/addItem.css');

class AddItem extends React.Component{
	render(){
		return(
			<form id="add-todo" onSubmit={this.handleSubmit}>
				<input type="text" required ref="newItem" />
				<input type="submit" value="Hit me" />
			</form>
		);
	}

	//custom functions
	handleSubmit(e){
		e.preventDefault();
		this.props.onAdd(this.refs.newItem.value);
	}
};

export default AddItem;