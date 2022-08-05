import React, { useEffect, useState } from 'react';
import httpService from './httpService';
import { API_BASE_URL } from './urls';

export default function UserClub() {
  const [data, setData] = useState(null);
  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/club/user_club/`).then(res => {
      if (res.status === 200) {
        setData(res.data[0]);
      }
    });
  }, []);
  return <>{data && `${data.spent_credit} از ${data.total_credit}`}</>;
  // return <>{``}</>;
}
