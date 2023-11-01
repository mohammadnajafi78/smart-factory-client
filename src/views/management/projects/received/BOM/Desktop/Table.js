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
          filter: false
        }
      },
      {
        name: 'project.name',
        label: 'عنوان',
        options: {
          filter: true
        }
      },
      {
        name: 'create_date',
        label: 'تاریخ پروژه',
        options: {
          filter: true,
          customBodyRender: value => {
            return (
              <div>
                {/* {moment(value, 'YYYY/MM/DD HH:mm:ss', 'fa')
                  .format.p2e('YYYY/MM/DD')
                  .toLocaleLowerCase('fa')} */}
                {MomentFa(value)}
              </div>
            );
          }
        }
      },
      {
        //should edit
        name: 'project.user',
        label: 'کاربر ثبت کننده پروژه',
        options: {
          filter: true,
          customBodyRender: value => {
            return (
              <>
                {
                  <div
                    style={{
                      fontSize: '12px',
                      paddingRight: '12px',
                      display: 'flex',
                      justifyContent: 'start'
                    }}
                  >
                    {value.first_name} {value.last_name}
                  </div>
                }
              </>
            );
          }
        }
      },
      {
        name: 'project.supplier',
        label: 'تامین کننده',
        options: {
          filter: false,
          customBodyRender: value => {
            return (
              <>
                {
                  <div
                    style={{
                      fontSize: '12px',
                      paddingRight: '8px',
                      display: 'flex',
                      justifyContent: 'start'
                    }}
                  >
                    {value.first_name} {value.last_name}
                  </div>
                }
              </>
            );
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
        `${API_BASE_URL}/api/management/project/get_receive_request/?type=BOM&limit=${rowsPerPage}&offset=${page *
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
          setStatusList(res.data.results);
          console.log(data);
        }
      });
  }

  function onFilterChange(column, filterList, type) {
    switch (column) {
      case 'name':
        if (filterList[1][0]) {
          item['name__icontains'] = filterList[1][0];
          // filterType = '__contains';
        } else {
          delete item['name__icontains'];
          setState(null);
        }
        break;
      case 'create_date':
        if (filterList[2][0]) {
          item['create_date__gte'] = filterList[2][0];
          // filterType = '__gte';
        } else {
          delete item['create_date__gte'];
        }
        break;
      case 'user':
        if (filterList[3][0]) {
          item['user__icontains'] = filterList[2][0];
          // filterType = '__contains';
        } else {
          delete item['user__icontains'];
          setState(null);
        }
        break;

      case 'status.label':
        if (filterList[6][0]) {
          item['status.label__icontains'] = statusList.filter(
            f => f.label === filterList[6][0]
          )[0].name;
          // filterType = '';
        } else {
          delete item['status.label'];
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
        str = str + itm[0] + '=' + decodeURIComponent(itm[1]) + '&';
      });
    }
    str.replace('&&', '&');
    setFilter(str);
  }

  function onColumnSortChange(changedColumn, direction) {
    let itemSort = {};

    switch (changedColumn) {
      case 'project_num':
        itemSort['project_num'] = direction;
        break;
      case 'name':
        itemSort['name'] = direction;
        break;
      case 'create_date':
        itemSort['start_date'] = direction;
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
        `${API_BASE_URL}/api/management/project/get_project/?project_num=${rowData[0]}`
      )
      .then(res => {
        if (res.status === 200) {
          history.push({
            pathname: '/management/project/received/project/details',
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
      title={'لیست'}
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
