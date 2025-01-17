import * as React from 'react';

function CommentMng(props) {
  return (
    <svg
      width="26"
      height="25"
      viewBox="0 0 26 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 5H5C3.9 5 3 5.9 3 7V19C3 20.1 3.9 21 5 21H21C22.1 21 23 20.1 23 19V7C23 5.9 22.1 5 21 5ZM20.6 9.25L14.06 13.34C13.41 13.75 12.59 13.75 11.94 13.34L5.4 9.25C5.15 9.09 5 8.82 5 8.53C5 7.86 5.73 7.46 6.3 7.81L13 12L19.7 7.81C20.27 7.46 21 7.86 21 8.53C21 8.82 20.85 9.09 20.6 9.25Z"
        fill={props.fill}
      />
    </svg>
  );
}

export default CommentMng;
