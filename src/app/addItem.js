var React = require('react');

require('./css/addItem.css');

class AddItem extends React.Component{
	constructor(){
        super();
        this.add = this.add.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
        	value: ''
        }
    }

	render(){
		return(
			<form id="add-todo" onSubmit={this.add}>
				<input type="text" required ref="name" value={this.state.value} onChange={this.handleChange} />
				<input type="submit" value="Hit me" />
			</form>
		);
	}

	handleChange(event) {
	    console.log('handleChange')
	    this.setState({value: event.target.value});
	  }

	//custom functions
	add(e){
		e.preventDefault();
		this.props.onAddItem(this.refs.name.value);
		this.setState({value: ''});
	}
};

export default AddItem;