import React, { useState, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';

import {
  TextField,
  FormControl,
  InputLabel,
  Autocomplete,
  ToggleButtonGroup,
  ToggleButton,
  Box
} from '@mui/material';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import Table from 'src/components/Desktop/Table';
import { useHistory } from 'react-router-dom';
import FaTOEn from 'src/utils/FaTOEn';

let item = {};
// let itemSort = {};
const CommentTable = props => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [data, setData] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [topics, setTopics] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [works, setWorks] = useState([]);
  const [columns, setColumns] = useState([]);
  const [completed, setCompleted] = useState(null);
  const [confirmed, setConfirmed] = useState(null);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [reset, setReset] = useState(false);
  const [status, setStatus] = useState(null);

  const history = useHistory();

  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/club/suggestion_topic/`).then(res => {
      if (res.status === 200) {
        setTopics(res.data);
      }
    });
  }, []);

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
        name: 'suggestion_id',
        label: 'شناسه',
        options: {
          filter: false
        }
      },
      {
        name: 'subject',
        label: 'عنوان',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    عنوان
                  </InputLabel>
                  <TextField
                    id="subject"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="عنوان"
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
        name: 'topic_detail.name',
        label: 'موضوع',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    موضوع
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    fullWidth
                    id="topics"
                    options={topics}
                    renderInput={params => (
                      <TextField {...params} placeholder="موضوع" fullWidth />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.name
                    }
                    // value={filterList[index]}
                    getOptionLabel={option => option.name}
                    disableClearable
                    onChange={(event, values, reason, details) => {
                      // setProvinceId(values.id);
                      filterList[index][0] = values.name;
                      onChange(filterList[index], index, column);
                    }}
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      '.MuiOutlinedInput-root': {
                        padding: '5px'
                      }
                    }}
                    noOptionsText={'موردی یافت نشد'}
                  />
                </FormControl>
              );
            }
          }
        }
      },
      {
        name: 'status',
        label: 'وضعیت',
        options: {
          customBodyRender: value => {
            return (
              <>
                {value.toLowerCase() === 'answered' ? (
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
                      width: '45%'
                    }}
                  >
                    <InputLabel style={{ color: '#00AAB5', paddingLeft: 0 }}>
                      پاسخ داده شده
                    </InputLabel>
                  </Box>
                ) : value.toLowerCase() === 'closed' ? (
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
                      width: '45%'
                    }}
                  >
                    <InputLabel style={{ color: '#F4777C', paddingLeft: 0 }}>
                      بسته شده
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
                      width: '45%'

                      // color: '#F3F3F3 !important'
                    }}
                  >
                    <InputLabel style={{ color: '#A7A5A6', paddingLeft: 0 }}>
                      در انتظار پاسخ
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
                    value={status}
                    exclusive
                    onChange={(event, newValue) => {
                      setStatus(newValue);
                      if (newValue?.toLowerCase() === 'answered')
                        filterList[index][0] = 'پاسخ داده شده';
                      else if (newValue?.toLowerCase() === 'closed')
                        filterList[index][0] = 'بسته شده';
                      else if (newValue?.toLowerCase() === 'pending')
                        filterList[index][0] = 'در انتظار پاسخ';
                      else filterList[index] = [];
                      onChange(filterList[index], index, column);
                    }}
                    sx={{
                      marginTop: '5px',
                      direction: 'ltr',
                      justifyContent: 'flex-end'
                      // width: '82%',
                      // borderLeft: '1px solid rgba(0,0,0, 0.12)'
                    }}
                  >
                    <ToggleButton
                      value="ANSWERED"
                      sx={{
                        fontFamily: 'IRANSans'
                      }}
                    >
                      پاسخ داده شده
                    </ToggleButton>
                    <ToggleButton
                      value="CLOSED"
                      sx={{
                        fontFamily: 'IRANSans'
                      }}
                    >
                      بسته شده
                    </ToggleButton>
                    <ToggleButton
                      value="PENDING"
                      sx={{
                        fontFamily: 'IRANSans'
                        // borderLeft: '1px solid rgba(0,0,0, 0.12) !important'
                      }}
                    >
                      در انتظار پاسخ
                    </ToggleButton>
                  </ToggleButtonGroup>
                </FormControl>
              );
            }
          }
        }
      }
    ]);
  }, [topics, status]);

  function getData(page, rowsPerPage, search) {
    httpService
      .post(
        `${API_BASE_URL}/api/management/club/suggestions/suggestion_list/?limit=${rowsPerPage}&offset=${page *
          rowsPerPage}${filter !== '' ? `&${filter}` : ''}`,
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
      case 'subject':
        if (filterList[1][0]) {
          item['subject'] = filterList[1][0];
          filterType = '__icontains';
        } else {
          delete item['subject'];
        }
        break;
      case 'topic_detail.name':
        if (filterList[2][0]) {
          item['topic__name'] = filterList[2][0];
          filterType = '__icontains';
        } else {
          delete item['topic__name'];
        }
        break;
      case 'status':
        if (filterList[3][0]) {
          item['status'] =
            filterList[3][0] == 'پاسخ داده شده'
              ? 'ANSWERED'
              : filterList[3][0] == 'بسته شده'
              ? 'CLOSED'
              : 'PENDING';
          filterType = '';
        } else {
          delete item['status'];
          setConfirmed(false);
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
      case 'suggestion_id':
        itemSort['suggestion_id'] = direction;
        break;
      case 'subject':
        itemSort['subject'] = direction;
        break;
      case 'topic_detail.name':
        itemSort['topic_detail.name'] = direction;
        break;
      case 'status':
        itemSort['status'] = direction;
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
    history.push({
      pathname: '/management/club/comment/details',
      state: {
        data: data.filter(f => f.suggestion_id === rowData[0])
      }
    });
  }

  function onRowsDelete(rowsDeleted, newData) {
    const userIds = [];
    rowsDeleted.data.map((item, index) => {
      userIds.push(data[item.index].user.user_id);
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
    />
  );
};

export default CommentTable;
