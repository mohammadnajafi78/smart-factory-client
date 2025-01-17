import React, { useState, useEffect } from 'react';

import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Autocomplete
} from '@mui/material';

import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import MomentFa from 'src/utils/MomentFa';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'jalali-moment';
import Table from 'src/components/Desktop/Table';
import { useSnackbar } from 'notistack';

const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

let item = {};
const ReceiveTable = props => {
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
  const [statusList, setStatusList] = useState([]);
  const [statusId, setStatusId] = useState(null);
  const [total, setTotal] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();

  useEffect(() => {
    setFilter('');
    setSort('');
  }, [reset]);

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/management/order/get_order_states/`)
      .then(res => {
        if (res.status === 200) {
          setStatusList(res.data);
        }
      })
      .catch(ex => {
        if (ex.response.status === 417) {
          enqueueSnackbar(ex.response.data.error, { variant: 'error' });
        } else {
          enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
            variant: 'error'
          });
        }
      });
  }, []);

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
        label: 'شماره سفارش',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <>
                  <FormControl>
                    <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                      شماره سفارش
                    </InputLabel>
                    <TextField
                      id="order_num"
                      aria-describedby="my-helper-text"
                      fullWidth
                      placeholder="شماره سفارش"
                      value={filterList[index]}
                      onKeyDown={event => {
                        if (event.key === 'Enter') {
                          onChange(filterList[index], index, column);
                        }
                      }}
                      onChange={event => {
                        if (event.target.value) {
                          filterList[index][0] = event.target.value;
                        } else {
                          filterList[index] = [];
                        }
                      }}
                    />
                  </FormControl>
                </>
              );
            }
          }
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
                    نام سفارش دهنده
                  </InputLabel>
                  <TextField
                    id="name"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="نام"
                    value={filterList[index]}
                    onKeyDown={event => {
                      if (event.key === 'Enter') {
                        onChange(filterList[index], index, column);
                      }
                    }}
                    onChange={event => {
                      if (event.target.value) {
                        filterList[index][0] = event.target.value;
                      } else {
                        filterList[index] = [];
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
                    نام خانوادگی
                  </InputLabel>
                  <TextField
                    id="name"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="نام خانوادگی"
                    value={filterList[index]}
                    onKeyDown={event => {
                      if (event.key === 'Enter') {
                        onChange(filterList[index], index, column);
                      }
                    }}
                    onChange={event => {
                      if (event.target.value) {
                        filterList[index][0] = event.target.value;
                      } else {
                        filterList[index] = [];
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
            return `${value} `;
          },
          filter: false,
          filterType: 'custom'
          // filterOptions: {
          //   display: (filterList, onChange, index, column) => {
          //     return (
          //       <FormControl>
          //         <InputLabel sx={{ transform: 'none', position: 'initial' }}>
          //           تعداد شرکت کنندگان
          //         </InputLabel>
          //         <TextField
          //           id="name"
          //           aria-describedby="my-helper-text"
          //           fullWidth
          //           placeholder="تعداد شرکت کنندگان"
          //           value={filterList[index]}
          //           type={'number'}
          //           onChange={event => {
          //             if (event.target.value) {
          //               filterList[index][0] = event.target.value;
          //               onChange(filterList[index], index, column);
          //             } else {
          //               filterList[index] = [];
          //               onChange(filterList[index], index, column);
          //             }
          //           }}
          //         />
          //       </FormControl>
          //     );
          //   }
          // }
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
                    تاریخ ثبت
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
        name: 'end_date',
        label: 'زمان پایان',
        options: {
          display: false,
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
        name: 'current_state',
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
                      background: JSON.parse(value.data).back,
                      borderRadius: '4px',
                      color: JSON.parse(value.data).text
                    }}
                  >
                    <InputLabel
                      style={{
                        color: JSON.parse(value.data).text,
                        paddingLeft: 0
                      }}
                    >
                      {value.label}
                    </InputLabel>
                  </Box>
                }
              </>
            );
          },
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    وضعیت
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    id="status"
                    options={statusList}
                    renderInput={params => (
                      <TextField {...params} placeholder="وضعیت" />
                    )}
                    disableClearable
                    value={filterList[index]}
                    onChange={(event, values) => {
                      setStatusId(values.id);
                      filterList[index][0] = values.label;
                      onChange(filterList[index], index, column);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.name
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
  }, [state, statusList]);

  function getData(page, rowsPerPage, search) {
    httpService
      .post(
        `${API_BASE_URL}/api/management/order/get_received_orders/?limit=${rowsPerPage}&offset=${page *
          rowsPerPage}${filter !== '' ? `&${filter}` : ''}`,
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
      })
      .catch(ex => {
        if (ex.response.status === 417) {
          enqueueSnackbar(ex.response.data.error, { variant: 'error' });
        } else {
          enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
            variant: 'error'
          });
        }
      });
  }

  function onFilterChange(column, filterList, type) {
    switch (column) {
      case 'order_num':
        if (filterList[0][0]) {
          item['order_num__icontains'] = filterList[0][0];
        } else {
          delete item['order_num__icontains'];
        }
        break;
      case 'user_info.first_name':
        if (filterList[1][0]) {
          item['user__first_name__icontains'] = filterList[1][0];
        } else {
          delete item['user__first_name__icontains'];
        }
        break;
      case 'user_info.last_name':
        if (filterList[2][0]) {
          item['user__last_name__icontains'] = filterList[2][0];
        } else {
          delete item['user__last_name__icontains'];
        }
        break;

      case 'create_date':
        if (filterList[4][0]) {
          item['create_date__gte'] = startDate;
        } else {
          delete item['create_date__gte'];
        }
        break;
      case 'end_date':
        if (filterList[5][0]) {
          item['create_date__lte'] = endDate;
        } else {
          delete item['create_date__lte'];
        }
        break;
      case 'current_state':
        if (filterList[6][0]) {
          item['order_state'] = statusList.filter(
            f => f.label === filterList[6][0]
          )[0].name;
        } else {
          delete item['order_state'];
          setState(null);
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
        str = str + itm[0] + '=' + decodeURIComponent(itm[1]) + '&';
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
      case 'user_info.first_name':
        itemSort['user__first_name'] = direction;
        break;
      case 'user_info.last_name':
        itemSort['user__last_name'] = direction;
        break;
      case 'create_date':
        itemSort['create_date'] = direction;
        break;
      case 'final_price':
        itemSort['final_price'] = direction;
        break;
      case 'current_state':
        itemSort['order_state'] = direction;
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
    httpService
      .get(
        `${API_BASE_URL}/api/management/order/get_order/?order_num=${rowData[0]}`
      )
      .then(res => {
        if (res.status === 200) {
          history.push({
            pathname: '/management/sale/received/detail',
            state: {
              data: res.data
            }
          });
        }
      })
      .catch(ex => {
        if (ex.response.status === 417) {
          enqueueSnackbar(ex.response.data.error, { variant: 'error' });
        } else {
          enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
            variant: 'error'
          });
        }
      });
  }

  function onRowsDelete(rowsDeleted, newData) {
    // const matchNums = [];
    // rowsDeleted.data.map((item, index) => {
    //   matchNums.push(data[item.index].match_num);
    // });
    // httpService
    //   .post(`${API_BASE_URL}/api/management/club/matches/match_delete/`, {
    //     match_nums: matchNums
    //   })
    //   .then(res => {
    //     if (res.status === 200) {
    //       getData(page, rowsPerPage, '');
    //     }
    //   });
  }

  function onRowSelectionChange(rowsSelectedData, allRows, rowsSelected) {
    // console.log('rowsSelectedData', rowsSelectedData);
    // console.log('allRows', allRows);
    // console.log('rowsSelected', rowsSelected);
  }

  function handleTableChange(action, tableState) {
    const totalAmount = calculateTotalSum(tableState.displayData);
    setTotal(totalAmount);
  }

  const calculateTotalSum = data => {
    const totalAmount = data.map(a => a.data[3]).reduce((a, b) => (a += b), 0);
    return totalAmount;
  };

  return (
    <Table
      title={'سفارشات دریافتی'}
      sumColumn={3}
      // options={options}
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
