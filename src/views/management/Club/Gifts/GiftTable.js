import React, { useState, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';

import {
  Box,
  Card,
  Typography,
  Link,
  TextField,
  FormControl,
  InputLabel,
  Autocomplete,
  colors,
  ToggleButtonGroup,
  ToggleButton,
  Tab
} from '@mui/material';

import { Link as RouterLink, useHistory } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/FileUpload';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterIcon from '@mui/icons-material/FilterAlt';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { consoleSandbox } from '@sentry/utils';
import FaTOEn from 'src/utils/FaTOEn';
import MomentFa from 'src/utils/MomentFa';
// import Datepicker from 'src/components/Desktop/Datepicker';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'jalali-moment';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import { Plus, Star } from 'react-feather';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import Table from 'src/components/Desktop/Table';
import { ArrowBack, ArrowRight } from '@mui/icons-material';

const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

let item = {};
// let itemSort = {};
const GiftTable = props => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [reset, setReset] = useState(false);
  const [state, setState] = useState(null);
  const [giftType, setGiftType] = useState([]);
  const [grades, setGrades] = useState([]);

  const history = useHistory();

  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/club/gift_type/`).then(res => {
      if (res.status === 200) {
        setGiftType(res.data);
      }
    });
  }, []);

  useEffect(() => {
    httpService
      .post(`${API_BASE_URL}/api/management/club/club_grade/grade_list/`, {
        search: '',
        order: ''
      })
      .then(res => {
        if (res.status === 200) {
          setGrades(res.data);
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
        name: 'gift_id',
        label: 'شناسه',
        options: {
          filter: false
          // display: false
        }
      },
      {
        name: 'name',
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
        name: 'credit',
        label: 'امتیاز',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '3px 6px !important',
                  background: '#CCEEF0',
                  borderRadius: '4px',
                  color: '#00AAB5'
                }}
              >
                <InputLabel style={{ color: '#00AAB5' }}>{value}</InputLabel>
                <Star style={{ width: '27px', height: '18px' }} />
              </Box>
            );
          },
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    امتیاز
                  </InputLabel>
                  <TextField
                    id="name"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="امتیاز"
                    value={filterList[index]}
                    type={'number'}
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
        name: 'start_date',
        label: 'تاریخ شروع',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return MomentFa(value);
          },
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl sx={{ marginTop: '10px' }}>
                  <InputLabel
                    sx={{
                      transform: 'none',
                      position: 'initial'
                    }}
                  >
                    تاریخ شروع
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterJalali}>
                    <DatePicker
                      mask="____/__/__"
                      value={
                        filterList[index].length > 0
                          ? moment
                              .from(
                                p2e(
                                  moment(filterList[index][0]).format(
                                    'YYYY/MM/DD'
                                  )
                                ),
                                'fa',
                                'YYYY/MM/DD'
                              )
                              .locale('en')
                          : new Date()
                      }
                      onChange={newValue => {
                        if (newValue) {
                          setStartDate(moment(newValue).format('YYYY-MM-DD'));
                          filterList[index][0] = MomentFa(newValue);
                          onChange(filterList[index], index, column);
                        } else {
                          filterList[index] = [];
                          onChange(filterList[index], index, column);
                        }
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          sx={{
                            background: '#F2F2F2'
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              );
            }
          }
        }
      },
      {
        name: 'expire_date',
        label: 'تاریخ پایان',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return MomentFa(value);
          },
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl sx={{ marginTop: '10px' }}>
                  <InputLabel
                    sx={{
                      transform: 'none',
                      position: 'initial'
                    }}
                  >
                    تاریخ پایان
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterJalali}>
                    <DatePicker
                      mask="____/__/__"
                      value={
                        filterList[index].length > 0
                          ? moment
                              .from(
                                p2e(
                                  moment(filterList[index][0]).format(
                                    'YYYY/MM/DD'
                                  )
                                ),
                                'fa',
                                'YYYY/MM/DD'
                              )
                              .locale('en')
                          : new Date()
                      }
                      onChange={newValue => {
                        if (newValue) {
                          setEndDate(moment(newValue).format('YYYY-MM-DD'));
                          filterList[index][0] = MomentFa(newValue);
                          onChange(filterList[index], index, column);
                        } else {
                          filterList[index] = [];
                          onChange(filterList[index], index, column);
                        }
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          sx={{
                            background: '#F2F2F2'
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              );
            }
          }
        }
      },
      {
        name: 'gift_grade',
        label: 'سطح',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl sx={{ marginTop: '10px' }}>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    سطح
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    id="grades"
                    options={grades}
                    renderInput={params => (
                      <TextField {...params} placeholder="سطح" />
                    )}
                    // getOptionLabel={option => option.label}
                    disableClearable
                    // value={filterList[index]}
                    onChange={(event, values) => {
                      // setCityId(values.id);
                      filterList[index][0] = values.name;
                      onChange(filterList[index], index, column);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.name
                    }
                    getOptionLabel={option => option.name}
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
        name: 'gift_type_info.translate',
        label: 'نوع',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl sx={{ marginTop: '10px' }}>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    نوع
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    id="type"
                    options={giftType}
                    renderInput={params => (
                      <TextField {...params} placeholder="نوع" />
                    )}
                    // getOptionLabel={option => option.label}
                    disableClearable
                    // value={filterList[index]}
                    onChange={(event, values) => {
                      // setCityId(values.id);
                      filterList[index][0] = values.translate;
                      onChange(filterList[index], index, column);
                    }}
                    getOptionLabel={option => option.translate}
                    isOptionEqualToValue={(option, value) =>
                      option.translate === value.translate
                    }
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
      }
    ]);
  }, [state, grades, giftType, startDate, endDate]);

  function getData(page, rowsPerPage, search) {
    httpService
      .post(
        `${API_BASE_URL}/api/management/club/gifts/gift_list/?limit=${rowsPerPage}&offset=${page *
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
      case 'name':
        if (filterList[1][0]) {
          item['name'] = filterList[1][0];
          filterType = '__contains';
        } else {
          delete item['name'];
        }
        break;
      case 'credit':
        if (filterList[2][0]) {
          item['credit'] = filterList[2][0];
          filterType = '';
        } else {
          delete item['credit'];
        }

        break;
      case 'start_date':
        if (filterList[3][0]) {
          item['start_date'] = startDate;
          filterType = '';
        } else {
          delete item['start_date'];
        }
        break;
      case 'expire_date':
        if (filterList[4][0]) {
          item['expire_date'] = endDate;
          filterType = '';
        } else {
          delete item['expire_date'];
        }
        break;
      case 'gift_grade':
        if (filterList[5][0]) {
          item['grade__name'] = filterList[5][0];
          filterType = '';
        } else {
          delete item['grade__name'];
        }
      case 'gift_type_info.translate':
        if (filterList[6][0]) {
          item['gift_type__translate__item_fa'] = filterList[6][0];
          filterType = '';
        } else {
          delete item['gift_type__translate__item_fa'];
        }

        break;
      default:
        item = item;
    }

    let temp = item;
    let filterItems = Object.keys(temp).map(key => [key, temp[key]]);

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
      case 'gift_id':
        itemSort['gift_id'] = direction;
        break;
      case 'name':
        itemSort['name'] = direction;
        break;
      case 'start_date':
        itemSort['start_date'] = direction;
        break;
      case 'expire_date':
        itemSort['expire_date'] = direction;
        break;
      case 'credit':
        itemSort['credit'] = direction;
        break;
      case 'gift_grade':
        itemSort['gift_grade'] = direction;
        break;
      case 'gift_type_info.translate':
        itemSort['gift_type__translate__item_fa'] = direction;
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
      pathname: '/management/club/gift/details',
      state: {
        data: data.filter(f => f.gift_id === rowData[0])
      }
    });
  }

  function onRowsDelete(rowsDeleted, newData) {
    const giftIds = [];
    rowsDeleted.data.map((item, index) => {
      giftIds.push(data[item.index].gift_id);
    });

    httpService
      .post(`${API_BASE_URL}/api/management/club/gifts/delete/`, {
        gift_ids: giftIds
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
      title={
        <>
          <InputLabelHeader
            style={{
              color: '#00346D',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            لیست
          </InputLabelHeader>
          <ConfirmButton
            style={{ width: '180px', marginRight: '20px' }}
            onClick={() => {
              history.push('/management/club/gift/new');
            }}
          >
            <Plus />
            <di>جایزه جدید</di>
          </ConfirmButton>
        </>
      }
      data={data}
      columns={columns}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      count={count}
      page={page}
      filter={filter}
      sort={sort}
      setReset={setReset}
      onRowSelectionChange={(rowsSelectedData, allRows, rowsSelected) =>
        onRowSelectionChange(rowsSelectedData, allRows, rowsSelected)
      }
      onRowsDelete={(rowsDeleted, newData) =>
        onRowsDelete(rowsDeleted, newData)
      }
      getData={(page, rowsPerPage, search) =>
        getData(page, rowsPerPage, search)
      }
      onRowClick={(rowData, rowState) => onRowClick(rowData, rowState)}
      onFilterChange={(column, filterList, type) =>
        onFilterChange(column, filterList, type)
      }
      onColumnSortChange={(changedColumn, direction) =>
        onColumnSortChange(changedColumn, direction)
      }
    />
  );
};

export default GiftTable;
