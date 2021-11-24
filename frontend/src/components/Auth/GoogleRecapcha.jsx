import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
const TEST_SITE_KEY = '6LcvD8AZAAAAACzN8Rm8GyuqDckBjdIft40W75wJ';

const GoogleRecaptcha = React.forwardRef(({ onChange }, ref) => {
  return (
    <ReCAPTCHA
      style={{ display: 'inline-block', margin: '1rem auto' }}
      theme="dark"
      badge="inline"
      size="normal"
      ref={ref}
      sitekey={TEST_SITE_KEY}
      onChange={onChange}
    />
  );
});

export default GoogleRecaptcha;
