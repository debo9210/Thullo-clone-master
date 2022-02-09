import React from 'react';

const InputGroup = ({ labelName, inputType, inputName, placeholderName }) => {
  return (
    <div className='InputGroup'>
      <label htmlFor={inputType}>{labelName}</label>
      <input type={inputType} name={inputName} placeholder={placeholderName} />
    </div>
  );
};

export default InputGroup;
