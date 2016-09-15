import React from 'react';
import {merge, isEmpty, clone} from 'lodash';
import dragula from 'dragula';

// Components

class CoverLetter extends React.Component {
  constructor(props) {
    super(props);
    this.nullEditing = {
      opening: null,
      companyBlurb: null,
      skill: null,
      conclusion: null,
      signOff: null
    };

    this.state = {
      company: '',
      opening: {},
      companyBlurb: {},
      skill: {},
      conclusion: {},
      signOff: '',
      editing: this.nullEditing,
      fullText: ''
    };

    this.renderParagraphs = this.renderParagraphs.bind(this);
    this.update = this.update.bind(this);
    this.toggle = this.toggle.bind(this);
    this.saveText = this.saveText.bind(this);
    this.downloadText = this.downloadText.bind(this);
  }

  componentDidMount() {
    this.props.requestCoverLetter();

    dragula([document.querySelector('#left'),
             document.querySelector('#right')], {
        copy: function (el, source) {
          return source === document.getElementById('left');
        },
        accepts: function (el, target) {
          return target !== document.getElementById('left');
        },
        removeOnSpill: function (el, target) {
          return target !== document.getElementById('left');
        },
        invalid: function (el, handle) {
          return handle === document.querySelector('.not-movable');
        }
      });
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.coverLetter.letter_state);
  }

  updateCompany() {
    return (event) => {
      this.setState({company: event.target.value});
    };
  }

  update(property, id) {
    return (event) => {
      let newProperty = merge({},
                              this.state[property],
                              { [id]: event.target.value });
      this.setState({ [property]: newProperty});
    };
  }

  toggle(property, id) {
    return (event) => {
      let newEditing = this.nullEditing;
      if (!this.state.editing[property]) {
        newEditing = merge({}, newEditing, {[property]: id});
      }
      this.setState({ editing: newEditing });
    };
  }

  remove(property, id) {
    return (event) => {
      let newProperty = clone(this.state[property]);
      delete newProperty[id];
      this.setState({[property]: newProperty});
    };
  }

  add(property) {
    return (event) => {
      let id = Math.random() * 10000;
      let newProperty = merge({}, this.state[property], {[id]: ''});
      this.setState({[property]: newProperty});
    };
  }

  toggleShow(id) {
    return (event) => {
      $(document.getElementById(id)).toggleClass('show');
    };
  }

  renderParagraphs(property) {
      let groupName = property.replace(/([A-Z])/g, ' $1')
                              .replace(/^./, function(str){ return str.toUpperCase(); })
      let paragraphs = [
        <div className='group-name' key={`${property}GroupName`}>
          <h3 className='not-movable'>
            {groupName}s
          </h3>
        </div>
      ];

      Object.keys(this.state[property]).forEach(id => {

        if (this.state.editing[property] === id) {
          paragraphs.push(
            <div className='dragable' key={id}>
              <textarea onChange={this.update(property, id)}
                value={this.state[property][id]}></textarea>
              <i className="fa fa-check-square-o"
                 onClick={this.toggle(property, id)}></i>
            </div>
          );
        } else {
          paragraphs.push(
            <div className='dragable' key={id}>
              <p id={id}
                 onClick={this.toggleShow(id)}>
                {this.state[property][id]}
              </p>
              <i className="fa fa-pencil-square-o"
                 onClick={this.toggle(property, id)}></i>
              <i className="fa fa-trash-o"
                 onClick={this.remove(property, id)}></i>
            </div>
          );
        }
      });

      paragraphs.push(
        <div key={`${property}Add`}>
          <button onClick={this.add(property)}
                  className='btn btn-tab'>
            Add {property}
          </button>
        </div>
      );
      return paragraphs;
  }

  saveText() {
    this.props.updateCoverLetter(JSON.stringify(this.state),
                                 this.props.coverLetter.id);
  }

  downloadText() {
    let fullText = document.getElementById('right').childNodes;
    fullText = Array.from(fullText).map(node => {
      let text = node.childNodes[0].innerHTML;
      text = text.replace(new RegExp("(\\*\\*COMPANY\\*\\*)", 'g'),
                          this.state.company);
      return text;
    });
    window.location = `data:application/octet-stream;charset=utf-16le;base64,${btoa(unescape(encodeURIComponent(fullText.join("\n\n\n"))))}`;
  }



  render() {
    return(
      <div className='app-content cover-letter'>
        <div className='main shadow cover-letter-header'>
          <h1>Your Cover Letter</h1>
        </div>
        <div className='cover-letter-buttons'>
          <button onClick={this.saveText}
                  className='btn btn-primary btn-tab'>
            Save
          </button>
          <button onClick={this.downloadText}
                  className='btn btn-success btn-tab'>
            Download
          </button>
        </div>
        <div className='company'>
          <p>
            Add your paragraphs on the left. Drag and Drop to the Right. Reorder and Drag off to remove. You can add **COMPANY** in any of your paragraphs and it will automatically be changed to the name in the company field when you download the file!
          </p>
          <h4>Company</h4>
          <input type='text'
            value={this.state.company}
              onChange={this.updateCompany()} />
        </div>
        <div className='cover-letter-container'>
          <div className='left' id='left'>
            {this.renderParagraphs('opening')}
            {this.renderParagraphs('companyBlurb')}
            {this.renderParagraphs('skill')}
            {this.renderParagraphs('conclusion')}
          </div>
          <div className='right' id='right'></div>
        </div>
      </div>
    );
  }
}

export default CoverLetter;
