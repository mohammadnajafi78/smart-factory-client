import React from 'react';
import { Box } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import InputLabel from '../InputLabel';
import { toString } from 'lodash';

export default function NumberFormat({
  price,
  label,
  color,
  fontSize,
  fontWeight,
  width,
  backgroundColor
}) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'flex-start' }}>
      <NumericFormat
        value={price}
        allowLeadingZeros
        thousandSeparator=","
        style={{
          color: color ? color : '#00346D',
          backgroundColor: backgroundColor ? backgroundColor : 'white',
          fontSize: fontSize ? fontSize : '12px',
          fontWeight: fontWeight ? fontWeight : 400,
          width: width ? width : `${toString(price).length * 10}px`,
          border: 'none',
          textAlign: 'left',
          paddingLeft: '3px'
        }}
      />
      <InputLabel
        style={{
          color: color ? color : '#00346D',
          fontSize: fontSize ? fontSize : '10px',
          fontWeight: fontWeight ? fontWeight : 400,
          lineHeight: '24px'
        }}
      >
        {label}
      </InputLabel>
    </Box>
  );
}
