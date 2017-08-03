var React = require('react');
require('es6-promise').polyfill();
require('isomorphic-fetch');


//Create component
class HomeComponent extends React.Component{
	constructor(props, context){
		super(props, context);
		this.createNewList = this.createNewList.bind(this);
	}

	render(){
		var temporaryHomepageStyle = {
			textAlign: 'center'
		}

		return(
			<div style={temporaryHomepageStyle}>
				<h1>Tada List</h1>

				<form onSubmit={this.createNewList}>
					<input type="text" ref="name" />
					<input type="submit" value="Create a new list" />
				</form>
			</div>
		);
	} //render

	createNewList(e){
		e.preventDefault();
		let $self = this;
		let newListName = this.refs.name.value;
		fetch('http://localhost:3001/api/list', {
			method: 'POST',
			headers: new Headers({
             'Content-Type': 'application/json', // <-- Specifying the Content-Type
    		}),
			body: JSON.stringify({name: newListName})
		})
		.then((data) => {
			return data.json().then(function(json) {
				$self.props.history.push("/list/" + json._id)
			});
		});
	} //createNewList

	//lifecycle functions
	componentWillMount(){

	}

	//load data
	componentDidMount() {

	}

	componentWillUpdate(){

	}
};

export default HomeComponent;