import * as React from 'react';

function UserMng(props) {
  return (
    <svg
      width="40"
      height="28"
      viewBox="0 0 40 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M28.1821 15.9775C30.5796 17.605 32.2596 19.81 32.2596 22.75V28H37.5096C38.4721 28 39.2596 27.2125 39.2596 26.25V22.75C39.2596 18.935 33.0121 16.6775 28.1821 15.9775Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M25.2596 14C29.1271 14 32.2596 10.8675 32.2596 7C32.2596 3.1325 29.1271 0 25.2596 0C24.4371 0 23.6671 0.175 22.9321 0.42C24.3846 2.2225 25.2596 4.515 25.2596 7C25.2596 9.485 24.3846 11.7775 22.9321 13.58C23.6671 13.825 24.4371 14 25.2596 14Z"
        fill="white"
      />
      <path
        d="M14.7598 14C18.6258 14 21.7598 10.866 21.7598 7C21.7598 3.13401 18.6258 0 14.7598 0C10.8938 0 7.75977 3.13401 7.75977 7C7.75977 10.866 10.8938 14 14.7598 14Z"
        fill={props.fill}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.7598 15.75C10.0873 15.75 0.759766 18.095 0.759766 22.75V26.25C0.759766 27.2125 1.54727 28 2.50977 28H27.0098C27.9723 28 28.7598 27.2125 28.7598 26.25V22.75C28.7598 18.095 19.4323 15.75 14.7598 15.75Z"
        fill={props.fill}
      />
    </svg>
  );
}

export default UserMng;