import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';

import NewFrom from '../forms/new_form';
import UpdateForm from '../forms/update_form';
import DeleteForm from '../forms/delete_form';
import RejectForm from '../forms/reject_form';
import OfferForm from '../forms/offer_form';

class ApplicationButtonGroup extends React.Component {
	constructor(props){
		super(props);
    this.nullState = {
      new: false,
      update: false,
			delete: false,
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
            Edit
          </button>
          <button className="btn btn-info btn-lg"
									id='update'
									onClick={this._toggle('update')}>
            Progress
          </button>
          <button className="btn btn-danger btn-lg"
									id='delete'
									onClick={this._toggle('delete')}>
            Delete
          </button>
        </div>
				<NewFrom new={this.state.new}
								 createApplication={this.props.createApplication}/>
				<UpdateForm update={this.state.update}
										applications={this.props.applications}
										updateApplication={this.props.updateApplication}/>
				<DeleteForm delete={this.state.delete}
					 					application={this.props.application}
										destroyApplication={this.props.destroyApplication}/>
				<OfferForm offer={this.state.offer} />
      </div>
		);
	}

}

export default withRouter(ApplicationButtonGroup);
