import { useContext } from 'react';
import ProjectSearchContext from 'src/contexts/ProjectSearchContext';

const useProjectSearch = () => useContext(ProjectSearchContext);

export default useProjectSearch;
