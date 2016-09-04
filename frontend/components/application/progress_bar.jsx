import React from 'react';
import $ from 'jquery';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    let progres = newProps.progress;
    let width;
    if (progres === 'rejected' || progres === 'offer') {
      width = '100%';
    } else
    if (progres === 'on-site') {
      width= '67%';
    } else
    if (progres === 'phone') {
      width= '35%';
    } else {
      width= '5%';
    }
    $(".bar-filler").animate({width}, 1000);
  }

  render() {
    return(
      <div className='progress-bar'>
        <div className='progress-names'>
          <span>Application</span>
          <span>Phone Interview</span>
          <span>On-Site</span>
          <span>Decision</span>
        </div>
        <div className='bar-background'>
          <div className='bar-filler' id='progress'></div>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
