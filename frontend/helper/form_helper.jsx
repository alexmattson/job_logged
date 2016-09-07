import React from 'react';

export const generateInput = (state, property, callback) => {
  return (
    <div className={setClass(state, property)}>
      <input className="input__field input__field--form"
        type={property}
        value={state[property]}
        onChange={callback} />
      <label className="input__label input__label--form"
             htmlFor={property}>
        <span className="input__label-content input__label-content--form">
          {humanize(property)}
        </span>
      </label>
    </div>
  );
};

const setClass = (state, property) => {
  if (state[property] === '') {
    return "";
  } else {
    return "input--filled";
  }
};

const humanize = (str) => {
  let frags = str.split('_');
  for (let i=0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
};
