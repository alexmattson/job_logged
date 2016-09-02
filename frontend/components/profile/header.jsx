import React from 'react';

class Header extends React.Component {
	constructor(props){
		super(props);

    this.stats = this.stats.bind(this);
    this.applicationsSent = this.applicationsSent.bind(this);
	}

  stats() {
    return (
      <div className='right'>
        <div className='row'>
          {this.applicationsSent()}
          <div className='box dark'></div>
          <div className='box'></div>
        </div>
        <div className='row'>
          <div className='box dark'></div>
          <div className='box'></div>
          <div className='box dark'></div>
        </div>
      </div>
    );
  }

  applicationsSent() {
    return (
      <div className='box'>
        <h2>{Object.keys(this.props.applications).length}</h2>
        <p>Applications Sent</p>
      </div>
    );
  }

	render() {
		return (
			<div className='main shadow profile-main'>

				<div className='left'>
					<h1>{this.props.username}</h1>
					<p>Your job search had lasted <span>31</span> days</p>
					<div></div>
				</div>
        {this.stats()}
			</div>
		);
	}

}

export default Header;
