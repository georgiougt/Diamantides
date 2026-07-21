import React from 'react';

const PhoneInputMock = (props) => {
  // Extract standard properties to map them to a clean static HTML input
  const placeholder = props.placeholder || 'Phone Number';
  const name = props.inputProps?.name || 'phone_number';
  const required = props.inputProps?.required || false;
  
  return (
    <input
      type="tel"
      name={name}
      placeholder={placeholder}
      required={required}
      defaultValue={props.value}
      className="phone-input-ssr-fallback"
      style={{
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        fontSize: '1rem',
        outline: 'none',
        boxSizing: 'border-box'
      }}
    />
  );
};

export default PhoneInputMock;
