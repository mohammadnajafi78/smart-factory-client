import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import Item from './Item';
import LinkIconButton from 'src/components/Desktop/Button/LinkIcon';
import Present from 'src/assets/img/icons/present.svg';

export default function CompetitionListDesktop({
  selected,
  setSelected,
  setNewCompetition
}) {
  const history = useHistory();
  const [competition, setCompetition] = useState([
    {
      id: 1,
      title: 'مسابقه ۱',
      description:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ    ',
      expireDate: '۱۴۰۱/۱۲/۰۲'
    },
    {
      id: 2,
      title: 'مسابقه ۱',
      description:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ    ',
      expireDate: '۱۴۰۱/۱۲/۰۲'
    },
    {
      id: 3,
      title: 'مسابقه ۱',
      description:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ    ',
      expireDate: '۱۴۰۱/۱۲/۰۲'
    },
    {
      id: 4,
      title: 'مسابقه ۱',
      description:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ    ',
      expireDate: '۱۴۰۱/۱۲/۰۲'
    },
    {
      id: 5,
      title: 'مسابقه ۱',
      description:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ    ',
      expireDate: '۱۴۰۱/۱۲/۰۲'
    }
  ]);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleScroll() {
    // console.log('inja', window.pageYOffset);
    // if (window.pageYOffset > 140) {
    //   setScroll(true);
    //   // window.removeEventListener('scroll', handleScroll);
    // } else setScroll(false);
    setScroll(window.pageYOffset);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px 0px 0px'
        // height: '1000px'
        // overflow: 'auto'
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '174.17px',
          filter: 'drop-shadow(1px 1px 8px rgba(82, 82, 82, 0.25))',
          background:
            'linear-gradient(91.93deg, #5FD5DD -10%, #00AAB5 109.19%)',
          // opacity: 0.7,
          borderRadius: '10px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '11.92px',
            height: '100.92px'
          }}
        >
          <InputLabelHeader style={{ color: '#00346D' }}>
            مسابقه جدید
          </InputLabelHeader>
          <InputLabel style={{ color: '#00346D' }}>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
          </InputLabel>
        </Box>
        <LinkIconButton
          onClick={() => {
            setNewCompetition(true);
          }}
        >
          <img
            src={Present}
            width="26px"
            height="20px"
            style={{ color: 'white' }}
          />
          <div>شرکت در مسابقه</div>
        </LinkIconButton>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '12px 0px 0px',
          gap: '4px',
          width: '100%'

          // width: 360px;
          // height: '380.83px'
        }}
      >
        <InputLabelHeader
          style={{
            padding: '0px 14px 4px',
            gap: '10px'
          }}
        >
          مسابقات قبلی
        </InputLabelHeader>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px 0px 0px',
            gap: '14px',
            width: '100%'
            // overflow: 'auto',
            // height: '510px'
          }}
        >
          {competition.map((item, key) => (
            <Item
              data={item}
              key={key}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
