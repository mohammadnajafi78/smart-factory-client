import React from 'react';
import useScore from 'src/hooks/useScore';

export default function UserClub() {
  // const [data] = useState(JSON.parse(localStorage.getItem('user')).user_club);
  const { total_credit, spent_credit } = useScore();
  return <>{`${spent_credit} از ${total_credit}`}</>;
}
