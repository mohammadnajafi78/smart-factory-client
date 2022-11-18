import { useContext } from 'react';
import SalesSearchContext from 'src/contexts/SalesSearchContext';

const useSaleSearch = () => useContext(SalesSearchContext);

export default useSaleSearch;
