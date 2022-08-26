import * as React from 'react';

function NewUserMng(props) {
  return (
    <svg
      width="28"
      height="25"
      viewBox="0 0 28 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.52 12C20.2825 12 22.52 9.7625 22.52 7C22.52 4.2375 20.2825 2 17.52 2C14.7575 2 12.52 4.2375 12.52 7C12.52 9.7625 14.7575 12 17.52 12ZM6.27002 9.5V7C6.27002 6.3125 5.70752 5.75 5.02002 5.75C4.33252 5.75 3.77002 6.3125 3.77002 7V9.5H1.27002C0.58252 9.5 0.0200195 10.0625 0.0200195 10.75C0.0200195 11.4375 0.58252 12 1.27002 12H3.77002V14.5C3.77002 15.1875 4.33252 15.75 5.02002 15.75C5.70752 15.75 6.27002 15.1875 6.27002 14.5V12H8.77002C9.45752 12 10.02 11.4375 10.02 10.75C10.02 10.0625 9.45752 9.5 8.77002 9.5H6.27002ZM17.52 14.5C14.1825 14.5 7.52002 16.175 7.52002 19.5V20.75C7.52002 21.4375 8.08252 22 8.77002 22H26.27C26.9575 22 27.52 21.4375 27.52 20.75V19.5C27.52 16.175 20.8575 14.5 17.52 14.5Z"
        fill={props.fill}
      />
    </svg>
  );
}

export default NewUserMng;