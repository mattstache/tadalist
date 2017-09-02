var React = require('react');
require('es6-promise').polyfill();
require('isomorphic-fetch');

//Create component
class ListAllComponent extends React.Component{
	constructor(){
		super();
		this.state = {};
	}

	render(){
		this.state.lists = this.state.lists || [];

		let listEl = this.state.lists.map(function(list, index){
			console.log('list.name: '  + list.name)
			return(
				<div key={list._id}>{list.name}</div>
			)
		}.bind(this));

		return(
			<div>
				{listEl}
			</div>
		);
	} //render

	componentDidMount() {
		console.log('componentDidMount')
		var $self = this;
		this.GetLists(function(lists){
			$self.setState({lists: lists});
		});
	}

	GetLists(callback) {
		console.log('get lists')
		fetch('http://localhost:3001/api/listall')
		.then((data) => {
			return data.json().then(function(json) {
				callback(json);
			});
		});
	}
};

export default ListAllComponent;