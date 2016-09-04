import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';

import NewFrom from '../forms/new_form';
import UpdateForm from '../forms/update_form';
import RejectForm from '../forms/reject_form';
import OfferForm from '../forms/offer_form';

class HomeButtonGroup extends React.Component {
	constructor(props){
		super(props);
    this.nullState = {
      new: false,
      update: false,
      reject: false,
      offer: false
    };
    this.state = this.nullState;
    this._toggle = this._toggle.bind(this);
	}


  _toggle(form) {
    return (() => {
      if (this.state[form]) {
        this.setState(this.nullState);
      } else {
        let newState = merge({}, this.nullState, {[form]: true});
        this.setState(newState);
      }
    }).bind(this);
  }


	render() {
		return (
      <div>
        <div className='button-group'>
          <button className="btn btn-primary btn-lg"
                  id='new'
                  onClick={this._toggle('new')}>
            Add
          </button>
          <button className="btn btn-info btn-lg"
									id='update'
									onClick={this._toggle('update')}>
            Progress
          </button>
          <button className="btn btn-danger btn-lg"
									id='reject'
									onClick={this._toggle('reject')}>
            Rejected
          </button>
        </div>
				<NewFrom new={this.state.new}
								 createApplication={this.props.createApplication}/>
				<UpdateForm update={this.state.update}
										applications={this.props.applications}
										updateApplication={this.props.updateApplication}
										createEvent={this.props.createEvent}/>
				<RejectForm reject={this.state.reject}
										applications={this.props.applications}/>
        <button className="btn btn-success btn-lg btn-full"
								id='offer'
								onClick={this._toggle('offer')}>
          Offer
        </button>
				<OfferForm offer={this.state.offer} />
      </div>
		);
	}

}

export default withRouter(HomeButtonGroup);
