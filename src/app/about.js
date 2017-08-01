var React = require('react');
import Link from 'react-router';

class About extends React.Component {
	render(){
		return(
			<div>
				<Link to={'/'}>Home</Link>
				<h1>About Me</h1>
			</div>
		);
	}
};

export default About;