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
          {this.responsesReceived()}
          {this.offersReceived()}
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

	responsesReceived() {
		let responses = 0;
		let apps = this.props.applications;
		Object.keys(apps).forEach(id => {
			if (apps[id].progress !== 'application') {
				responses += 1;
			}
		});
		return (
			<div className='box dark'>
				<h2>{responses}</h2>
				<p>Responses</p>
			</div>
		);
	}

	offersReceived() {
		let offers = 0;
		let apps = this.props.applications;
		Object.keys(apps).forEach(id => {
			if (apps[id].progress === 'offer') {
				offers += 1;
			}
		});
		return (
			<div className='box'>
				<h2>{offers}</h2>
				<p>Offers</p>
			</div>
		);
	}

	jobSearchLength() {
		let signUp = new Date(this.props.user.created_at);
		let today = new Date();
		return(
			<span>
				{Math.round((today - signUp) / 1000 / 60 / 60 / 24)}
		 	</span>
		);
	}

	render() {
		return (
			<div className='main shadow profile-main'>

				<div className='left'>
					<h1>{this.props.user.username}</h1>
					<p>Your job search has lasted about {this.jobSearchLength()} days</p>
					<div></div>
				</div>
        {this.stats()}
			</div>
		);
	}

}

export default Header;
