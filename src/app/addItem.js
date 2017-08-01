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
				<input type="text" required ref="newItem" />
				<input type="submit" value="Hit me" />
			</form>
		);
	}

	//custom functions
	add(e){
		e.preventDefault();
		console.log('addItem.add')
		this.props.onAdd(this.refs.newItem.value);
	}
};

export default AddItem;