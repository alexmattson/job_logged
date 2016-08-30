import React from 'react';
import { Link } from 'react-router';
import { withRouter } from 'react-router';

class App extends React.Component {
  constructor (props) {
    super(props);
    this._returnHome = this._returnHome.bind(this);
  }

  _returnHome(){
    this.props.router.push('/');
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(App);
