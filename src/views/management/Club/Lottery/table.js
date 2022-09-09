import React, { useState, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';

import { TextField, FormControl, InputLabel } from '@mui/material';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import FaTOEn from 'src/utils/FaTOEn';
import MomentFa from 'src/utils/MomentFa';
import Datepicker from 'src/components/Desktop/Datepicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'jalali-moment';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import { Plus } from 'react-feather';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import Table from 'src/components/Desktop/Table';

const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

let item = {};
const LotteryTable = props => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');

  const history = useHistory();

  useEffect(() => {
    setColumns([
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
        name: 'end_date',
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
        name: 'winner_count',
        label: 'تعداد شرکت کننده',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            customBodyRender: (value, tableMeta, updateValue) => {
              console.log('value', value);
              return value.length;
            },
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
      }
    ]);
  }, []);

  function getData(page, rowsPerPage) {
    httpService
      .get(
        `${API_BASE_URL}/api/management/club/matches/?limit=${page *
          rowsPerPage +
          rowsPerPage}&offset=${page}${filter !== '' ? `&${filter}` : ''}${
          sort !== '' ? `&${sort}` : ''
        }`
      )

      .then(res => {
        if (res.status === 200) {
          setData(res.data.results);
          setCount(res.data.count);
        }
      });
  }

  useEffect(() => {
    getData(page, rowsPerPage);
  }, []);

  function onFilterChange(column, filterList, type) {
    let filterType = '';

    switch (column) {
      case 'user.first_name':
        if (filterList[1][0]) {
          item['first_name'] = filterList[1][0];
          filterType = '__contains';
        } else {
          delete item['first_name'];
        }
        break;
      case 'user.last_name':
        if (filterList[2][0]) {
          item['last_name'] = filterList[2][0];
          filterType = '__contains';
        } else {
          delete item['last_name'];
        }
        break;
      case 'user.mobile':
        if (filterList[3][0]) {
          item['mobile'] = FaTOEn(filterList[3][0]);
          filterType = '__contains';
        } else {
          delete item['mobile'];
        }
        break;
      case 'location.province_name':
        if (filterList[4][0]) {
          item['province_name'] = filterList[4][0];
          filterType = '';
        } else {
          delete item['province_name'];
        }
        break;
      case 'location.city_name':
        if (filterList[5][0]) {
          item['city_name'] = filterList[5][0];
          filterType = '';
        } else {
          delete item['city_name'];
        }
        break;
      case 'user.user_type_list':
        if (filterList[6][0]) {
          item['user_type'] = filterList[6][0];
          filterType = '';
        } else {
          delete item['user_type'];
        }
        break;
      case 'user.profile_is_completed':
        if (filterList[7][0]) {
          item['profile_is_complete'] =
            filterList[7][0] == 'تکمیل شده' ? 'True' : 'False';
          filterType = '';
        } else {
          delete item['profile_is_complete'];
          setCompleted(null);
        }
        break;
      case 'user.is_verified':
        if (filterList[8][0]) {
          item['is_verified'] =
            filterList[8][0] == 'تایید شده'
              ? 'Verified'
              : filterList[8][0] == 'تایید نشده'
              ? 'Rejected'
              : 'NA';
          filterType = '';
        } else {
          delete item['is_verified'];
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
      case 'user.user_id':
        itemSort['user_id'] = direction;
        break;
      case 'user.first_name':
        itemSort['first_name'] = direction;
        break;
      case 'user.last_name':
        itemSort['last_name'] = direction;
        break;
      case 'user.mobile':
        itemSort['mobile'] = direction;
        break;
      case 'location.province_name':
        itemSort['mobile'] = direction;
        break;
      case 'location.city_name':
        itemSort['mobile'] = direction;
        break;
      case 'user.user_type_list':
        itemSort['mobile'] = direction;
        break;
      default:
        itemSort = itemSort;
    }

    let temp = itemSort;
    let filterItems = Object.keys(temp).map(key => [key, temp[key]]);

    let str = '';
    if (filterItems?.length > 0) {
      filterItems.map((itm, index) => {
        str = itm[1] === 'asc' ? itm[0] : `-${itm[0]}`;
      });
    }
    setSort('order=' + str);
  }

  function onRowClick(rowData, rowState) {
    history.push({
      pathname: '/management/club/lottery/details',
      state: {
        rowData,
        rowState
      }
    });
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
              history.push('/management/club/lottery/new');
            }}
          >
            <Plus />
            <di>قرعه کشی جدید</di>
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
      getData={(page, rowsPerPage) => getData(page, rowsPerPage)}
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

LotteryTable.propTypes = {
  className: PropTypes.string
};

export default LotteryTable;
