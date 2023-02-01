import React, { useEffect, useState } from 'react';
import Products from './Products';
import Location from './Location';
import Delivery from './Deleivery';
import Message from './Message';
import useSaleOrder from 'src/hooks/useSaleOrder';

export default function OrderMobile(props) {
  const [data, setData] = useState(props.location.pathname.split('/')[4]);
  const { order, getOrder } = useSaleOrder();

  useEffect(() => {
    setData(props.location.pathname.split('/')[4]);
  });
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      {data == 2 ? (
        <Location />
      ) : data == 3 ? (
        <Delivery order={order} />
      ) : data == 4 ? (
        <Message {...props} />
      ) : (
        <>{order && <Products order={order} />}</>
      )}
    </>
  );
}
