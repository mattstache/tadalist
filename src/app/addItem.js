var React = require('react');

require('./css/addItem.css');

class AddItem extends React.Component{
	constructor(){
        super();
        this.add = this.add.bind(this);
    }

	render(){
		return(
			<form id="add-todo" onSubmit={this.add}>
				<input type="text" required ref="name" />
				<input type="submit" value="Hit me" />
			</form>
		);
	}

	//custom functions
	add(e){
		e.preventDefault();
		this.props.onAddItem(this.refs.name.value);
	}
};

export default AddItem;