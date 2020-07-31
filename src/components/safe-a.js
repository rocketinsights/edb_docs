import React, { useRef, useEffect } from 'react';

const SafeA = ({ children, ...props }) => {
  const aRef = useRef(null);

  useEffect(() => {
    if (window && fetch && props.href) {
      window.setTimeout(() => {
        const hostname = aRef.current.hostname;
        const mode = hostname === window.location.hostname ? 'cors' : 'no-cors';

        try {
          fetch(props.href, {
            method: 'GET',
            mode: mode,
          }).then(response => {
            console.log(response)
            if (response.status >= 400) {
              console.error(`Url check: ${props.href} is bad (${response.status})`);
            }
          }).catch(error => {
            console.log('bad')
            console.error(`Url check: ${error}`)
          });
        } catch (e) {
          console.log('cought')
        }
      }, 500 * Math.random());
    }
  });

  return (
    <a {...props} ref={aRef}>
      { children }
    </a>
  );
}

export default SafeA;
