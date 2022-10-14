import React from 'react';
import InputLabel from '../InputLabel';

export default function Text({ label, value }) {
  return (
    <div style={{ display: 'inline-flex' }}>
      <InputLabel style={{ color: '#00AAB5' }}>{`${label}: `}</InputLabel>
      <InputLabel style={{ color: '#335D8A' }}>{value}</InputLabel>
    </div>
  );
}
