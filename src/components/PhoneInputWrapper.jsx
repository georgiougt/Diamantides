import React, { useState, useEffect } from 'react';

const PhoneInputWrapper = (props) => {
  const [PhoneInputComponent, setPhoneInputComponent] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Dynamically import the real react-phone-input-2 to bypass module-load server crashes
    import('react-phone-input-2/lib/lib.js')
      .then((module) => {
        setPhoneInputComponent(() => module.default);
      })
      .catch((err) => {
        console.error('Failed to load PhoneInput component dynamically:', err);
      });
  }, []);

  // During SSR and the initial browser hydration phase, render the standard fallback input
  if (!mounted || !PhoneInputComponent) {
    const placeholder = props.placeholder || 'Phone Number';
    const name = props.inputProps?.name || 'phone_number';
    const required = props.inputProps?.required || false;
    const value = props.value || '';

    return (
      <input
        type="tel"
        name={name}
        placeholder={placeholder}
        required={required}
        defaultValue={value}
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
        {...props.inputProps}
      />
    );
  }

  // Render the real component after client hydration completes
  const RealPhoneInput = PhoneInputComponent;
  return <RealPhoneInput {...props} />;
};

export default PhoneInputWrapper;
