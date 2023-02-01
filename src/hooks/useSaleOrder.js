import { useContext } from 'react';
import SaleOrderContext from 'src/contexts/SaleOrderContext';

const useSaleOrder = () => useContext(SaleOrderContext);

export default useSaleOrder;
