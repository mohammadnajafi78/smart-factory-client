import React from 'react';

export default function Icon({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ color: '#00346D', width: '25px', height: '21px' }}
    />
  );
}
