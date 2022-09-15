import { useContext } from 'react';
import ScoreContext from 'src/contexts/ScoreContext';

const useScore = () => useContext(ScoreContext);

export default useScore;
