import React, { useState, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';

import {
  TextField,
  FormControl,
  InputLabel,
  Autocomplete,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
  IconButton,
  Box
} from '@mui/material';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import Table from 'src/components/Desktop/Table';
import { useHistory } from 'react-router-dom';
import FaTOEn from 'src/utils/FaTOEn';
import Confirm from 'src/components/Desktop/Button/Confirm';
import { Plus } from 'react-feather';

let item = {};
// let itemSort = {};
const LotteryReceiverTable = props => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [completed, setCompleted] = useState(null);
  const [confirmed, setConfirmed] = useState(null);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [reset, setReset] = useState(false);
  const [state, setState] = useState(null);

  const history = useHistory();

  useEffect(() => {
    setFilter('');
    setSort('');
  }, [reset]);

  useEffect(() => {
    if (filter.length === 0 && sort.length === 0 && reset === true) {
      getData(page, rowsPerPage, '');
      setReset(false);
    }
  }, [filter, sort]);

  useEffect(() => {
    setColumns([
      {
        name: 'user_info.user_id',
        label: 'شناسه',
        options: {
          filter: false
        }
      },
      {
        name: 'user_info.first_name',
        label: 'نام',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    نام
                  </InputLabel>
                  <TextField
                    id="name"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="نام"
                    value={filterList[index]}
                    onChange={event => {
                      if (event.target.value) {
                        filterList[index][0] = event.target.value;
                        onChange(filterList[index], index, column);
                      } else {
                        filterList[index] = [];
                        onChange(filterList[index], index, column);
                      }
                    }}
                  />
                </FormControl>
              );
            }
          }
        }
      },
      {
        name: 'user_info.last_name',
        label: 'نام خانوادگی',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    نام خانوادگی
                  </InputLabel>
                  <TextField
                    id="name"
                    aria-describedby="my-helper-text"
                    fullWidth
                    value={filterList[index]}
                    onChange={event => {
                      if (event.target.value) {
                        filterList[index][0] = event.target.value;
                        onChange(filterList[index], index, column);
                      } else {
                        filterList[index] = [];
                        onChange(filterList[index], index, column);
                      }
                    }}
                  />
                </FormControl>
              );
            }
          }
        }
      },
      {
        name: 'user_info.mobile',
        label: 'شماره موبایل',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl sx={{ marginTop: '10px' }}>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    شماره موبایل
                  </InputLabel>
                  <TextField
                    id="name"
                    aria-describedby="my-helper-text"
                    fullWidth
                    value={filterList[index]}
                    onChange={event => {
                      if (event.target.value) {
                        filterList[index][0] = event.target.value;
                        onChange(filterList[index], index, column);
                      } else {
                        filterList[index] = [];
                        onChange(filterList[index], index, column);
                      }
                    }}
                  />
                </FormControl>
              );
            }
          }
        }
      },
      {
        name: 'result',
        label: 'وضعیت',
        options: {
          customBodyRender: value => {
            return (
              <>
                {value.toLowerCase() === 'win' ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '3px 6px !important',
                      background: '#CCEEF0',
                      borderRadius: '4px',
                      color: '#00AAB5',
                      width: '35%'
                    }}
                  >
                    <InputLabel style={{ color: '#00AAB5', paddingLeft: 0 }}>
                      برنده
                    </InputLabel>
                  </Box>
                ) : value.toLowerCase() === 'lose' ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '3px 6px !important',
                      background: '#FDE8E8',
                      borderRadius: '4px',
                      color: '#F4777C !important',
                      width: '35%'
                    }}
                  >
                    <InputLabel style={{ color: '#F4777C', paddingLeft: 0 }}>
                      بازنده
                    </InputLabel>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '3px 6px !important',
                      background: '#F3F3F3',
                      borderRadius: '4px',
                      width: '35%'
                      // color: '#F3F3F3 !important'
                    }}
                  >
                    <InputLabel style={{ color: '#A7A5A6', paddingLeft: 0 }}>
                      در انتظار
                    </InputLabel>
                  </Box>
                )}
              </>
            );
          },
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl sx={{ marginTop: '10px' }}>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    وضعیت
                  </InputLabel>
                  <ToggleButtonGroup
                    color="primary"
                    value={state}
                    exclusive
                    onChange={(event, newValue) => {
                      setState(newValue);

                      if (newValue?.toLowerCase() === 'win')
                        filterList[index][0] = 'برنده';
                      else if (newValue?.toLowerCase() === 'lose')
                        filterList[index][0] = 'بازنده';
                      else if (newValue?.toLowerCase() === 'pending')
                        filterList[index][0] = 'در انتظار';
                      else filterList[index] = [];
                      onChange(filterList[index], index, column);
                    }}
                    sx={{
                      marginTop: '5px',
                      direction: 'ltr',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <ToggleButton
                      value="WIN"
                      sx={{
                        fontFamily: 'IRANSans'
                      }}
                    >
                      برنده
                    </ToggleButton>
                    <ToggleButton
                      value="LOSE"
                      sx={{
                        fontFamily: 'IRANSans'
                      }}
                    >
                      بازنده
                    </ToggleButton>
                    <ToggleButton
                      value="PENDING"
                      sx={{
                        fontFamily: 'IRANSans'
                      }}
                    >
                      در انتظار
                    </ToggleButton>
                  </ToggleButtonGroup>
                </FormControl>
              );
            }
          }
        }
      }
    ]);
  }, [state]);

  function getData(page, rowsPerPage, search) {
    httpService
      .post(
        `${API_BASE_URL}/api/management/club/lottery_participant/lottery_list/?lottery_id=${
          props.location.state.data[0].id
        }&limit=${rowsPerPage}&offset=${page * rowsPerPage}${
          filter !== '' ? `&${filter}` : ''
        }`,
        {
          order: sort,
          search: search
        }
      )
      .then(res => {
        if (res.status === 200) {
          setData(res.data.results);
          setCount(res.data.count);
        }
      });
  }

  function onFilterChange(column, filterList, type) {
    let filterType = '';

    switch (column) {
      case 'user_info.first_name':
        if (filterList[1][0]) {
          item['user__first_name'] = filterList[1][0];
          filterType = '__contains';
        } else {
          delete item['user__first_name'];
        }
        break;
      case 'user_info.last_name':
        if (filterList[2][0]) {
          item['user__last_name'] = filterList[2][0];
          filterType = '__contains';
        } else {
          delete item['user__last_name'];
        }
        break;
      case 'user_info.mobile':
        if (filterList[3][0]) {
          item['user__mobile'] = FaTOEn(filterList[3][0]);
          filterType = '__contains';
        } else {
          delete item['user__mobile'];
        }
        break;
      case 'result':
        if (filterList[4][0]) {
          item['result'] =
            filterList[4][0] == 'برنده'
              ? 'WIN'
              : filterList[4][0] == 'بازنده'
              ? 'LOSE'
              : 'PENDING';
          filterType = '';
        } else {
          delete item['result'];
          setState(null);
        }
        break;

      default:
        item = item;
    }

    let temp = item;
    let filterItems = Object.keys(temp).map(key => [key, temp[key]]);
    console.log('filterItems', filterItems);

    let str = '';
    if (filterItems?.length > 0) {
      filterItems.map((itm, index) => {
        str =
          str + itm[0] + filterType + '=' + decodeURIComponent(itm[1]) + '&';
      });
    }
    str.replace('&&', '&');
    setFilter(str);
  }

  function onColumnSortChange(changedColumn, direction) {
    let itemSort = {};

    switch (changedColumn) {
      case 'user_info.user_id':
        itemSort['user_id'] = direction;
        break;
      case 'user_info.first_name':
        itemSort['first_name'] = direction;
        break;
      case 'user_info.last_name':
        itemSort['last_name'] = direction;
        break;
      case 'user_info.mobile':
        itemSort['mobile'] = direction;
        break;
      case 'result':
        itemSort['result'] = direction;
        break;
      default:
        itemSort = itemSort;
    }

    // let temp = itemSort;
    // let filterItems = Object.keys(temp).map(key => [key, temp[key]]);

    // let str = [];
    // if (filterItems?.length > 0) {
    //   filterItems.map((itm, index) => {
    //     str.push(itm[1] === 'asc' ? itm[0] : `-${itm[0]}`);
    //   });
    // }
    let temp = itemSort;
    let filterItems = Object.keys(temp).map(key => [key, temp[key]]);

    let str = '';
    if (filterItems?.length > 0) {
      filterItems.map((itm, index) => {
        str = itm[1] === 'asc' ? itm[0] : `-${itm[0]}`;
      });
    }
    setSort(str);
  }

  function onRowClick(rowData, rowState) {
    // history.push({
    //   pathname: '/management/user/newUser/details',
    //   state: {
    //     rowData,
    //     rowState
    //   }
    // });
  }

  function onRowsDelete(rowsDeleted, newData) {
    const userIds = [];
    rowsDeleted.data.map((item, index) => {
      userIds.push(data[item.index].user_info.user_id);
    });

    httpService
      .post(`${API_BASE_URL}/api/management/user/user_delete/`, {
        user_ids: userIds
      })
      .then(res => {
        if (res.status === 200) {
          getData(page, rowsPerPage, '');
        }
      });
  }
  function onRowSelectionChange(rowsSelectedData, allRows, rowsSelected) {
    // console.log('rowsSelectedData', rowsSelectedData);
    // console.log('allRows', allRows);
    // console.log('rowsSelected', rowsSelected);
  }
  function customToolbarSelect(selectedRows, displayData, setSelectedRows) {
    const userIds = [];
    selectedRows.data.map((item, index) => {
      userIds.push(data[item.index].user_info.user_id);
    });
    return (
      <IconButton
        onClick={() => {
          httpService
            .post(
              `${API_BASE_URL}/api/management/club/lottery_participant/set_winners/`,
              {
                winners: userIds,
                lottery_id: props.location.state.data[0].id
              }
            )
            .then(res => {
              if (res.status === 200) {
                getData(page, rowsPerPage, '');
              }
            });
        }}
      >
        <Plus style={{ color: 'white' }} />
        <InputLabel style={{ color: 'white', fontSize: '16px' }}>
          تعیین برنده
        </InputLabel>
      </IconButton>
    );
  }

  return (
    <Table
      title={'لیست'}
      data={data}
      columns={columns}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      count={count}
      page={page}
      filter={filter}
      sort={sort}
      setReset={setReset}
      search={false}
      getData={(page, rowsPerPage, search) =>
        getData(page, rowsPerPage, search)
      }
      onRowClick={(rowData, rowState) => onRowClick(rowData, rowState)}
      onRowsDelete={(rowsDeleted, newData) =>
        onRowsDelete(rowsDeleted, newData)
      }
      onRowSelectionChange={(rowsSelectedData, allRows, rowsSelected) =>
        onRowSelectionChange(rowsSelectedData, allRows, rowsSelected)
      }
      onFilterChange={(column, filterList, type) =>
        onFilterChange(column, filterList, type)
      }
      onColumnSortChange={(changedColumn, direction) =>
        onColumnSortChange(changedColumn, direction)
      }
      customToolbarSelect={(selectedRows, displayData, setSelectedRows) =>
        customToolbarSelect(selectedRows, displayData, setSelectedRows)
      }
      customToolbarSelectActive={true}
    />
  );
};

export default LotteryReceiverTable;
