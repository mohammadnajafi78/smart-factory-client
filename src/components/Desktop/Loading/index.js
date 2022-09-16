import { useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

function Loading() {
  let [color, setColor] = useState('#ffffff');

  return (
    <BeatLoader
      color={'rgba(0, 0, 0, 0.26)'}
      loading={true}
      //   cssOverride={override}
      size={8}
    />
  );
}

export default Loading;
