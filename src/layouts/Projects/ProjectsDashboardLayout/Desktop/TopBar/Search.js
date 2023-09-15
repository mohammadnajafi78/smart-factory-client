import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import InputLabel from 'src/components/Mobile/InputLabel';
import ScoreIcon from 'src/assets/img/icons/score.svg';
import Icon from 'src/components/Mobile/Icon';
import UserClub from 'src/utils/userClub';
import { Search as SearchIcon } from '@mui/icons-material';
import { SearchTextField } from 'src/components/Mobile/TextField/SearchTextField';
import useSaleSearch from 'src/hooks/useSaleSearch';

export default function Search() {
  const [input, setInput] = useState(null);
  const { setSaleSearchResult } = useSaleSearch();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: '4px',

        width: '170px',
        height: '44px',

        // background: '#FFFFFF',
        boxShadow: '1px 1px 6px rgba(201, 201, 201, 0.25)',
        borderRadius: '6px',
        flex: 'none',
        flexGrow: 1
      }}
    >
      <SearchTextField
        id="search"
        aria-describedby="my-helper-text"
        fullWidth
        placeholder="جستجو در محصولات"
        value={input}
        onChange={event => {
          setInput(event.target.value);
        }}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            setSaleSearchResult(event.target.value);
          }
        }}
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" tabIndex={-1}>
              <IconButton edge="start" tabIndex={-1}>
                <SearchIcon sx={{ margin: '0px', color: '#99AEC5' }} />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Box>
  );
}