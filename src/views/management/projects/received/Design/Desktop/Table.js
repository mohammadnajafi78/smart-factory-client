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
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  // useEffect(() => {
  //   httpService
  //     .get(
  //       `${API_BASE_URL}/api/management/project/get_receive_request?type=DESIGN&limit=10&offset=0`
  //     )
  //     .then(res => {
  //       if (res.status === 200) {
  //         setStatusList(res.data.results);
  //         setData(res.data.results);
  //         setCount(res.data.count);
  //       }
  //     });
  // }, []);

  useEffect(() => {
    if (filter.length === 0 && sort.length === 0 && reset === true) {
      getData(page, rowsPerPage, '');
      setReset(false);
    }
  }, [filter, sort]);
  useEffect(() => {
    setColumns([
      {
        name: 'project.project_num',
        label: 'شماره پروژه',
        options: {
          filter: true
        }
      },
      {
        name: 'project.name',
        label: 'نام پروژه',
        options: {
          filter: true
        }
      },
      {
        name: 'ref_num',
        label: 'شماره درخواست',
        options: {
          filter: false
        }
      },
      {
        name: 'create_date',
        label: 'تاریخ درخواست',
        options: {
          customBodyRender: value => {
            return <div>{MomentFa(value)}</div>;
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
        //should edit
        name: 'project.user.first_name',
        label: 'نام کاربر',
        options: {
          filter: true
        }
      },
      {
        //should edit
        name: 'project.user.last_name',
        label: 'نام خانوادگی کاربر',
        options: {
          filter: true
        }
      },
      {
        name: 'status',
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
        `${API_BASE_URL}/api/management/project/design/get_received/?limit=${rowsPerPage}&offset=${page *
          rowsPerPage}${filter !== '' ? `&${filter}` : ''}`,
        {
          order: sort,
          search: search
        }
      )
      .then(res => {
        if (res.status === 200) {
          setStatusList(res.data.results);
          setData(res.data.results);
          setCount(res.data.count);
        }
      });
  }

  function onFilterChange(column, filterList, type) {
    switch (column) {
      case 'project.project_num':
        if (filterList[0][0]) {
          item['project__project_num__icontains'] = filterList[0][0];
          // filterType = '__contains';
        } else {
          delete item['project__project_num__icontains'];
          setState(null);
        }
        break;
      case 'project.name':
        if (filterList[1][0]) {
          item['project__name__icontains'] = filterList[1][0];
          // filterType = '__contains';
        } else {
          delete item['project__name__icontains'];
          setState(null);
        }
        break;
      case 'ref_num':
        if (filterList[2][0]) {
          item['ref_num__icontains'] = filterList[2][0];
          // filterType = '__contains';
        } else {
          delete item['ref_num__icontains'];
          setState(null);
        }
        break;
      case 'create_date':
        if (filterList[3][0]) {
          item['create_date__gte'] = filterList[3][0];
          // filterType = '__gte';
        } else {
          delete item['create_date__gte'];
        }
        break;
      case 'project.user.first_name':
        if (filterList[4][0]) {
          item['project__user__first_name__icontains'] = filterList[4][0];
          // filterType = '__contains';
        } else {
          delete item['project__user__first_name__icontains'];
          setState(null);
        }
        break;
      case 'project.user.last_name':
        if (filterList[5][0]) {
          item['project__user__last_name__icontains'] = filterList[5][0];
          // filterType = '__contains';
        } else {
          delete item['project__user__last_name__icontains'];
          setState(null);
        }
        break;
      case 'status.label':
        if (filterList[6][0]) {
          item['status'] = statusList.filter(
            f => f.label === filterList[6][0]
          )[0].name;
          // filterType = '';
        } else {
          delete item['status'];
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
      case 'project.project_num':
        itemSort['project.project_num'] = direction;
        break;
      case 'project.name':
        itemSort['project.name'] = direction;
        break;
      case 'ref_num':
        itemSort['ref_num'] = direction;
        break;
      case 'create_date':
        itemSort['create_date'] = direction;
        break;
      case 'project.user.first_name':
        itemSort['project.user.first_name'] = direction;
        break;
      case 'project.user.last_name':
        itemSort['project.user.last_name'] = direction;
        break;
      case 'status.label':
        itemSort['status.label'] = direction;
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
    console.log(str);
    setSort(str);
  }

  function onRowClick(rowData, rowState) {
    httpService
      .get(
        `${API_BASE_URL}/api/management/project/design/get_design/?ref_num=${rowData[2]}`
      )
      .then(res => {
        if (res.status === 200) {
          history.push({
            pathname: '/management/project/received/design/details',
            state: {
              data: res.data
            }
          });
        }
      })
      .catch(err => {
        enqueueSnackbar('پروژه معتبر نیست', { variant: 'error' });
        console.log(err);
      });
  }

  function onRowsDelete(rowsDeleted, newData) {}

  function onRowSelectionChange(rowsSelectedData, allRows, rowsSelected) {}

  return (
    <Table
      title={'درخواست های طراحی دریافتی'}
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
