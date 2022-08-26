import * as React from 'react';

function AllUserMng(props) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.74728 8.72726C11.1572 8.72726 13.1109 6.77359 13.1109 4.36363C13.1109 1.95366 11.1572 0 8.74728 0C6.33731 0 4.38365 1.95366 4.38365 4.36363C4.38365 6.77359 6.33731 8.72726 8.74728 8.72726Z"
        fill={props.fill}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.74728 9.81816C5.83455 9.81816 0.0200195 11.28 0.0200195 14.1818V16.3636C0.0200195 16.9636 0.510928 17.4545 1.11093 17.4545H16.3836C16.9836 17.4545 17.4745 16.9636 17.4745 16.3636V14.1818C17.4745 11.28 11.66 9.81816 8.74728 9.81816Z"
        fill={props.fill}
      />
    </svg>
  );
}

export default AllUserMng;
