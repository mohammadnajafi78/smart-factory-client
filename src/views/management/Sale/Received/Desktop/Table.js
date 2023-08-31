import React, { useState, useEffect } from 'react';

import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Autocomplete} from '@mui/material';

import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import MomentFa from 'src/utils/MomentFa';
// import Datepicker from 'src/components/Desktop/Datepicker';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'jalali-moment';
import Table from 'src/components/Desktop/Table';

const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

let item = {};
// let itemSort = {};
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
                    نام سفارش دهنده
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
                    نام خانوادگی
                  </InputLabel>
                  <TextField
                    id="name"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="نام خانوادگی"
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
                    // getOptionLabel={option => option.label}
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
      });
  }

  function onFilterChange(column, filterList, type) {
    // let filterNames = [
    //   'id',
    //   'user_info.first_name',
    //   'user_info.last_name',
    //   '',
    //   'create_date__gte',
    //   'create_date__lte',
    //   'current_state.label'
    // ];
    // let filterType = [
    //   '',
    //   '__contains',
    //   '__contains',
    //   '',
    //   '',
    //   '',
    //   '__icontains'
    // ];
    console.log('filterlist', filterList);

    switch (column) {
      case 'user_info.first_name':
        if (filterList[1][0]) {
          item['user__first_name__contains'] = filterList[1][0];
          // filterType = '__contains';
        } else {
          delete item['user__first_name__contains'];
        }
        break;
      case 'user_info.last_name':
        if (filterList[2][0]) {
          item['user__last_name__contains'] = filterList[2][0];
          // filterType = '__contains';
        } else {
          delete item['user__last_name__contains'];
        }
        break;

      case 'create_date':
        if (filterList[4][0]) {
          item['create_date__gte'] = startDate;
          // filterType = '__gte';
        } else {
          delete item['create_date__gte'];
        }
        break;
      case 'end_date':
        if (filterList[5][0]) {
          item['create_date__lte'] = endDate;
          // filterType = '__lte';
        } else {
          delete item['create_date__lte'];
        }
        break;
      case 'current_state.label':
        if (filterList[6][0]) {
          item['order_state__icontains'] = statusList.filter(
            f => f.label === filterList[6][0]
          )[0].name;
          // filterType = '';
        } else {
          delete item['current_state.label'];
          setState(null);
        }
        break;
      default:
        item = item;
    }

    let temp = item;
    let filterItems = Object.keys(temp).map(key => [key, temp[key]]);
    console.log('filterItems', filterItems);
    // console.log('filterType', filterType);

    let str = '';
    if (filterItems?.length > 0) {
      filterItems.map((itm, index) => {
        str =
          str +
          itm[0] +
          // filterType[filterNames.indexOf(itm[0])] +
          '=' +
          decodeURIComponent(itm[1]) +
          '&';
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
      pathname: '/management/sale/received/detail',
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
