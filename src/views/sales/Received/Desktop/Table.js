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
import { Plus } from 'react-feather';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import Table from 'src/components/Desktop/Table';
import { ArrowBack, ArrowRight } from '@mui/icons-material';

const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

let item = {};
// let itemSort = {};
const ReceiveTable = props => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
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
        name: 'order_num',
        label: 'شناسه',
        options: {
          filter: false
        }
      },
      {
        name: 'user_info.first_name',
        label: 'نام سفارش دهنده',
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
        label: 'نام خانوادگی سفارش دهنده',
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
        name: 'final_price',
        label: 'قیمت',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return `${value} تومان`;
          },
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    تعداد شرکت کنندگان
                  </InputLabel>
                  <TextField
                    id="name"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="تعداد شرکت کنندگان"
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
        name: 'create_date',
        label: 'زمان ثبت',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return MomentFa(value);
          },
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
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
                      // leftArrowIcon={<ArrowBack />}
                      // rightArrowIcon={<ArrowRight />}
                    />
                  </LocalizationProvider>
                </FormControl>
              );
            }
          }
        }
      },
      {
        name: 'current_state.label',
        label: 'وضعیت',
        options: {
          customBodyRender: value => {
            return (
              <>
                {
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
                    <InputLabel style={{ color: '#00AAB5', paddingLeft: 0 }}>
                      {value}
                    </InputLabel>
                  </Box>
                }
                {/* {value.toLowerCase() === 'submit' ? (
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
                    <InputLabel style={{ color: '#00AAB5', paddingLeft: 0 }}>
                      ارسال شده
                    </InputLabel>
                  </Box>
                ) : value.toLowerCase() === 'finished' ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '3px 6px !important',
                      background: '#FDE8E8',
                      borderRadius: '4px',
                      color: '#F4777C !important'
                    }}
                  >
                    <InputLabel style={{ color: '#F4777C', paddingLeft: 0 }}>
                      برگزار شده
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
                      borderRadius: '4px'
                      // color: '#F3F3F3 !important'
                    }}
                  >
                    <InputLabel style={{ color: '#A7A5A6', paddingLeft: 0 }}>
                      برگزار نشده
                    </InputLabel>
                  </Box>
                )} */}
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

                      if (newValue?.toLowerCase() === 'performing')
                        filterList[index][0] = 'در حال برگزاری';
                      else if (newValue?.toLowerCase() === 'pending')
                        filterList[index][0] = 'برگزار نشده';
                      else if (newValue?.toLowerCase() === 'finished')
                        filterList[index][0] = 'برگزار شده';
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
                      value="PERFORMING"
                      sx={{
                        fontFamily: 'IRANSans'
                      }}
                    >
                      در حال برگزاری
                    </ToggleButton>
                    <ToggleButton
                      value="FINISHED"
                      sx={{
                        fontFamily: 'IRANSans'
                      }}
                    >
                      برگزار شده
                    </ToggleButton>
                    <ToggleButton
                      value="PENDING"
                      sx={{
                        fontFamily: 'IRANSans'
                      }}
                    >
                      برگزار نشده
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
        `${API_BASE_URL}/api/orders/get_received_orders/?limit=${rowsPerPage}&offset=${page}${
          filter !== '' ? `&${filter}` : ''
        }`,
        {
          order: sort,
          search: search
        }
      )
      .then(res => {
        if (res.status === 200) {
          //   setData(res.data.results);
          //   setCount(res.data.count);
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
      case 'participant_count':
        if (filterList[2][0]) {
          item['participant_count'] = filterList[2][0];
          filterType = '';
        } else {
          delete item['participant_count'];
        }
      case 'start_date':
        if (filterList[3][0]) {
          item['start_date'] = startDate;
          filterType = '';
        } else {
          delete item['start_date'];
        }
        break;
      case 'end_date':
        if (filterList[4][0]) {
          item['end_date'] = endDate;
          filterType = '';
        } else {
          delete item['end_date'];
        }
        break;
      case 'status':
        if (filterList[5][0]) {
          console.log('filterlist', filterList[5][0]);
          item['status'] =
            filterList[5][0] == 'در حال برگزاری'
              ? 'PERFORMING'
              : filterList[5][0] == 'برگزار شده'
              ? 'FINISHED'
              : 'PENDING';
          filterType = '';
        } else {
          delete item['status'];
          setState(null);
        }
        break;

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
      case 'order_num':
        itemSort['order_num'] = direction;
        break;
      case 'name':
        itemSort['name'] = direction;
        break;
      case 'start_date':
        itemSort['start_date'] = direction;
        break;
      case 'end_date':
        itemSort['end_date'] = direction;
        break;
      case 'participant_count':
        itemSort['participant_count'] = direction;
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
      pathname: '/sale/received/detail',
      state: {
        data: data.filter(f => f.order_num === rowData[0])
      }
    });
  }

  function onRowsDelete(rowsDeleted, newData) {
    const matchNums = [];
    rowsDeleted.data.map((item, index) => {
      matchNums.push(data[item.index].match_num);
    });

    httpService
      .post(`${API_BASE_URL}/api/management/club/matches/match_delete/`, {
        match_nums: matchNums
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
      title={'سفارشات دریافتی'}
      data={data}
      columns={columns}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      count={count}
      page={page}
      filter={filter}
      sort={sort}
      selectableRows={false}
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

export default ReceiveTable;