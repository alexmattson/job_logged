import React from 'react';

import PieChart from './pie_chart';

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
					<div className='box'>
		        <h2>{this.applicationsSent()}</h2>
		        <p>Applications Sent</p>
		      </div>
					<div className='box dark'>
						<h2>{this.responsesReceived()}</h2>
						<p>Responses</p>
					</div>
					<div className='box'>
						<h2>{this.offersReceived()}</h2>
						<p>Offers</p>
					</div>
        </div>
        <div className='row'>
          <PieChart percent={this.appPercentage()}
										text='Compared to Others'
										dark={true} />
					<PieChart percent={this.responsePercentage()}
										text='Response Percentage'/>
					<PieChart percent={this.offerPercentage()}
										text='Offer Percentage'
										dark={true}/>
        </div>
      </div>
    );
  }

	appPercentage() {
		return Math.round((this.applicationsSent() / 1000) * 100);
	}

  applicationsSent() {
    return Object.keys(this.props.applications).length;
  }

	responsePercentage() {
		return Math.round((this.responsesReceived() / this.applicationsSent()) * 100) || 0;
	}

	responsesReceived() {
		let responses = 0;
		let apps = this.props.applications;
		Object.keys(apps).forEach(id => {
			if (apps[id].progress !== 'application') {
				responses += 1;
			}
		});
		return responses;
	}

	offerPercentage() {
		return Math.round((this.offersReceived() / this.applicationsSent()) * 100) || 0;
	}

	offersReceived() {
		let offers = 0;
		let apps = this.props.applications;
		Object.keys(apps).forEach(id => {
			if (apps[id].progress === 'offer') {
				offers += 1;
			}
		});
		return offers;
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
