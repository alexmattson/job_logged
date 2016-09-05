import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';

import EditFrom from './forms/edit_form';
import UpdateForm from './forms/update_form';
import DeleteForm from './forms/delete_form';
// import RejectForm from '../forms/reject_form';
// import OfferForm from '../forms/offer_form';

class ApplicationButtonGroup extends React.Component {
	constructor(props){
		super(props);
    this.nullState = {
      edit: false,
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
                  id='edit'
                  onClick={this._toggle('edit')}>
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
				<EditFrom edit={this.state.edit}
									application={this.props.application}
									applications={this.props.applications}
									errors={this.props.errors}
								 	updateApplication={this.props.updateApplication}
									toggleParent={this._toggle('edit')}/>
				<UpdateForm update={this.state.update}
										application={this.props.application}
										applications={this.props.applications}
										errors={this.props.errors}
										updateApplication={this.props.updateApplication}
										createEvent={this.props.createEvent}
										toggleParent={this._toggle('update')}/>
				<DeleteForm delete={this.state.delete}
					 					application={this.props.application}
					 					applications={this.props.applications}
										errors={this.props.errors}
										destroyApplication={this.props.destroyApplication}/>
      </div>
		);
	}

}

export default withRouter(ApplicationButtonGroup);
