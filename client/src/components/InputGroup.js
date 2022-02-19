import React from 'react';
import '../css/landing.css';

const InputGroup = ({
  labelName,
  inputType,
  inputName,
  placeholderName,
  inputValueHandler,
  error,
}) => {
  return (
    <div className='InputGroup'>
      <label htmlFor={inputType}>{labelName}</label>
      <input
        type={inputType}
        name={inputName}
        placeholder={placeholderName}
        onChange={inputValueHandler}
      />
      <small className='errorMsg'>{error}</small>
    </div>
  );
};

export default InputGroup;
