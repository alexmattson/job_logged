import React from 'react';
import {merge, isEmpty, clone} from 'lodash';
import dragula from 'dragula';
import uniq from 'uniq';
import stopwords from 'stopwords';

import PieChart from './pie_chart';

// Components

class CoverLetter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobDesc: '',
      match: 0
    };

    this.compare = this.compare.bind(this);
  }

  update(property) {
    return (event) => {
      this.setState({ [property]: event.target.value });
    };
  }

  compare(){
    let word, i;
    let uncommonArr = [];

    // debugger
    let jobDesc = this.state.jobDesc;
    let test = this.props.letter();

    let jobDescUniq = uniq(this.keyWords(jobDesc));
    let testUniq = uniq(this.keyWords(test));

    let combined = jobDescUniq.concat(testUniq).length;
    let unique = uniq(jobDescUniq.concat(testUniq)).length;
    let diff = ((combined - unique) / combined) / .05;
    diff = Math.round(diff * 100);

    this.setState({match: diff});
  }

  keyWords(str) {
    let word, i;
    let uncommonArr = [];

    let wordArr = str.match(/\w+/g);

    let common = stopwords.english;
    let commonObj = {};
    for ( i = 0; i < common.length; i++ ) {
      commonObj[ common[i].trim() ] = true;
    }

    for ( i = 0; i < wordArr.length; i++ ) {
        word = wordArr[i].trim().toLowerCase();
        if ( !commonObj[word] ) {
            uncommonArr.push(word);
        }
    }

    return uncommonArr;
  }

  show() {
    $('#match-container').toggleClass('show-match');
  }

  render() {
    return(
      <div className='cover-letter-match'>
        <div className='match-container' id='match-container'>
          <textarea onChange={this.update('jobDesc')}
            placeholder="Copy a job description here..."></textarea>
          <button className='btn'
            onClick={this.compare}>
            Compare
          </button>
          <PieChart percent={this.state.match}/>
        </div>
        <div className='match-info'>
          <button className='btn'
                  onClick={this.show}>
            Compare Cover Letter
          </button>
        </div>
      </div>
    );
  }
}

export default CoverLetter;
