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
const GiftBoxTable = props => {
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
  const [giftType, setGiftType] = useState([]);
  const [grades, setGrades] = useState([]);
  const [giftList, setGiftList] = useState([]);

  const history = useHistory();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/management/club/gifts/select_list/`)
      .then(res => {
        if (res.status === 200) {
          setGiftList(res.data);
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
        name: 'box_num',
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
        name: 'require_credit',
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
        name: 'valid_date',
        label: 'تاریخ اعتبار',
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
                    تاریخ اعتبار
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
        name: 'grade',
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
        name: 'gifts_list',
        label: 'هدایا',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return value?.map(option => option.name).toString();
          },
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl sx={{ marginTop: '10px' }}>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    هدایا
                  </InputLabel>
                  <Autocomplete
                    // multiple
                    disablePortal
                    id="gifts_list"
                    limitTags={1}
                    options={giftList}
                    getOptionLabel={option => option.name}
                    renderInput={params => <TextField {...params} />}
                    // value={filterList[index]}
                    renderValue={selected => selected.join(', ')}
                    disableClearable
                    onChange={(event, values) => {
                      if (values) {
                        filterList[index][0] = values.name;
                        onChange(filterList[index], index, column);
                      } else {
                        filterList[index] = [];
                        onChange(filterList[index], index, column);
                      }
                    }}
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
  }, [state, grades, giftType, endDate]);

  function getData(page, rowsPerPage, search) {
    httpService
      .post(
        `${API_BASE_URL}/api/management/club/gift_box/gift_box_list/?limit=${rowsPerPage}&offset=${page *
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
      case 'require_credit':
        if (filterList[2][0]) {
          item['require_credit'] = filterList[2][0];
          filterType = '';
        } else {
          delete item['require_credit'];
        }

        break;
      case 'valid_date':
        if (filterList[3][0]) {
          item['valid_date'] = endDate;
          filterType = '';
        } else {
          delete item['valid_date'];
        }
        break;
      case 'grade':
        if (filterList[4][0]) {
          item['require_grade__name'] = filterList[4][0];
          filterType = '';
        } else {
          delete item['require_grade__name'];
        }
      case 'gifts_list':
        if (filterList[5][0]) {
          item['gifts__name'] = filterList[5][0];
          filterType = '';
        } else {
          delete item['gifts__name'];
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
      case 'box_num':
        itemSort['box_num'] = direction;
      case 'name':
        itemSort['name'] = direction;
        break;
      case 'valid_date':
        itemSort['valid_date'] = direction;
        break;
      case 'require_credit':
        itemSort['require_credit'] = direction;
        break;
      case 'grade':
        itemSort['grade'] = direction;
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
      pathname: '/management/club/giftBox/details',
      state: {
        data: data.filter(f => f.box_num === rowData[0])
      }
    });
  }

  function onRowsDelete(rowsDeleted, newData) {
    const boxIds = [];
    rowsDeleted.data.map((item, index) => {
      boxIds.push(data[item.index].box_num);
    });

    httpService
      .post(`${API_BASE_URL}/api/management/club/gift_box/delete/`, {
        box_ids: boxIds
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
              history.push('/management/club/giftBox/new');
            }}
          >
            <Plus />
            <di>صندوق جایزه جدید</di>
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

export default GiftBoxTable;
