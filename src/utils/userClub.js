import React, { useEffect, useState } from 'react';
import httpService from './httpService';
import { API_BASE_URL } from './urls';

export default function UserClub() {
  const [data] = useState(JSON.parse(localStorage.getItem('user')).user_club);
  return <>{data && `${data.spent_credit} از ${data.total_credit}`}</>;
}
