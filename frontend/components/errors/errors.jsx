import React from 'react';
import { Link, hashHistory } from 'react-router';

class Errors extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidUpdate(){
    this.props.errors.forEach(error => {
      $.notify(error, { position:'bottom left', className: 'error' });
    });
	}

	render() {
    return (<div></div>);
	}
}
export default Errors;
