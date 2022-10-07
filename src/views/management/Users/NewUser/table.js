import React, { useState, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';

import {
  TextField,
  FormControl,
  InputLabel,
  Autocomplete,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import Table from 'src/components/Desktop/Table';
import { useHistory } from 'react-router-dom';
import FaTOEn from 'src/utils/FaTOEn';

let item = {};
// let itemSort = {};
const NewUserTable = props => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [data, setData] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [works, setWorks] = useState([]);
  const [columns, setColumns] = useState([]);
  const [completed, setCompleted] = useState(null);
  const [confirmed, setConfirmed] = useState(null);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [reset, setReset] = useState(false);

  // const [search, setSearch] = useState(null);

  const history = useHistory();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/utils/provinces/?country_id=25`)
      .then(res => {
        if (res.status === 200) {
          setProvinces(res.data);
        }
      });
  }, []);

  useEffect(() => {
    if (provinceId !== null) {
      httpService
        .get(`${API_BASE_URL}/api/utils/cities/?province__id=${provinceId}`)
        .then(res => {
          if (res.status === 200) {
            setCities(res.data);
          }
        });
    }
  }, [provinceId]);

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/users/user_type/activity_list`)
      .then(res => {
        if (res.status === 200) {
          setWorks(res.data);
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
        name: 'user.user_id',
        label: 'شناسه',
        options: {
          filter: false
        }
      },
      {
        name: 'user.first_name',
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
        name: 'user.last_name',
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
        name: 'user.mobile',
        label: 'شماره موبایل',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
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
        name: 'location.province_name',
        label: 'استان',
        options: {
          filter: true,
          sort: false,
          filterType: 'custom',
          filterOptions: {
            logic: (orderStatus, filters) => {
              // console.log('filters', filters);
              // if (filters.length) return !filters.includes(orderStatus.status);
              // return false;
            },
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    استان
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    fullWidth
                    id="province"
                    options={provinces}
                    renderInput={params => (
                      <TextField {...params} placeholder="استان" fullWidth />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.label === value.label
                    }
                    value={filterList[index]}
                    // getOptionLabel={option => option.label}
                    disableClearable
                    onChange={(event, values, reason, details) => {
                      console.log('event', event);
                      console.log('values', values);
                      console.log('reason', reason);
                      console.log('details', details);
                      setProvinceId(values.id);
                      filterList[index][0] = values.label;
                      onChange(filterList[index], index, column);
                    }}
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px'
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
        name: 'location.city_name',
        label: 'شهر',
        options: {
          filter: true,
          sort: false,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    شهر
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    id="city"
                    options={cities}
                    renderInput={params => (
                      <TextField {...params} placeholder="شهر" />
                    )}
                    // getOptionLabel={option => option.label}
                    disableClearable
                    value={filterList[index]}
                    onChange={(event, values) => {
                      setCityId(values.id);
                      filterList[index][0] = values.label;
                      onChange(filterList[index], index, column);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.label === value.label
                    }
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px'
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
        name: 'user.user_type_list',
        label: 'فعالیت',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return value?.map(option => option.translate).toString();
          },
          filter: true,
          filterType: 'custom',

          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    فعالیت
                  </InputLabel>
                  <Autocomplete
                    // multiple
                    disablePortal
                    id="field"
                    limitTags={1}
                    options={works}
                    getOptionLabel={option => option.translate}
                    renderInput={params => <TextField {...params} />}
                    // value={filterList[index]}
                    renderValue={selected => selected.join(', ')}
                    disableClearable
                    onChange={(event, values) => {
                      if (values) {
                        filterList[index][0] = values.translate;
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
                      borderRadius: '4px'
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
        name: 'user.profile_is_completed',
        label: 'تکمیل شده',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return value === true ? 'بله' : 'خیر';
          },
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl sx={{ marginTop: '10px' }}>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    وضعیت اطلاعات کاربر
                  </InputLabel>
                  <ToggleButtonGroup
                    color="primary"
                    value={completed}
                    exclusive
                    onChange={(event, newValue) => {
                      setCompleted(newValue);

                      if (newValue === 'true')
                        filterList[index][0] = 'تکمیل شده';
                      else if (newValue?.toLowerCase() === 'false')
                        filterList[index][0] = 'تکمیل نشده';
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
                      value="true"
                      sx={{
                        fontFamily: 'IRANSans'
                      }}
                    >
                      تکمیل شده
                    </ToggleButton>
                    <ToggleButton
                      value="false"
                      sx={{
                        fontFamily: 'IRANSans'
                        // borderLeft: '1px solid rgba(0,0,0, 0.12) !important'
                      }}
                    >
                      تکمیل نشده
                    </ToggleButton>
                  </ToggleButtonGroup>
                </FormControl>
              );
            }
          }
        }
      }
      // {
      //   name: 'user.is_verified',
      //   label: 'تایید شده',
      //   options: {
      //     customBodyRender: (value, tableMeta, updateValue) => {
      //       return value === true ? 'بله' : 'خیر';
      //     },
      //     filter: true,
      //     filterType: 'custom',
      //     filterOptions: {
      //       display: (filterList, onChange, index, column) => {
      //         return (
      //           <FormControl sx={{ marginTop: '10px' }}>
      //             <InputLabel sx={{ transform: 'none', position: 'initial' }}>
      //               وضعیت تایید کاربر
      //             </InputLabel>
      //             <ToggleButtonGroup
      //               color="primary"
      //               value={confirmed}
      //               exclusive
      //               onChange={(event, newValue) => {
      //                 setConfirmed(newValue);
      //                 if (newValue?.toLowerCase() === 'verified')
      //                   filterList[index][0] = 'تایید شده';
      //                 else if (newValue?.toLowerCase() === 'rejected')
      //                   filterList[index][0] = 'تایید نشده';
      //                 else if (newValue?.toLowerCase() === 'na')
      //                   filterList[index][0] = 'نامشخص';
      //                 else filterList[index] = [];
      //                 onChange(filterList[index], index, column);
      //               }}
      //               sx={{
      //                 marginTop: '5px'
      //                 // width: '82%',
      //                 // borderLeft: '1px solid rgba(0,0,0, 0.12)'
      //               }}
      //             >
      //               <ToggleButton
      //                 value="Verified"
      //                 sx={{
      //                   fontFamily: 'IRANSans'
      //                 }}
      //               >
      //                 تایید شده
      //               </ToggleButton>
      //               <ToggleButton
      //                 value="Rejected"
      //                 sx={{
      //                   fontFamily: 'IRANSans'
      //                 }}
      //               >
      //                 تایید نشده
      //               </ToggleButton>
      //               <ToggleButton
      //                 value="NA"
      //                 sx={{
      //                   fontFamily: 'IRANSans',
      //                   borderLeft: '1px solid rgba(0,0,0, 0.12) !important'
      //                 }}
      //               >
      //                 نامشخص
      //               </ToggleButton>
      //             </ToggleButtonGroup>
      //           </FormControl>
      //         );
      //       }
      //     }
      //   }
      // }
    ]);
  }, [provinces, cities, works, completed, confirmed]);

  function getData(page, rowsPerPage, search) {
    httpService
      .post(
        `${API_BASE_URL}/api/management/user/user_list/?limit=${rowsPerPage}&offset=${page}&is_verified=NA${
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
          item['location_province'] = filterList[4][0];
          filterType = '';
        } else {
          delete item['location_province'];
        }
        break;
      case 'location.city_name':
        if (filterList[5][0]) {
          item['location_city'] = filterList[5][0];
          filterType = '';
        } else {
          delete item['location_city'];
        }
        break;
      case 'user.user_type_list':
        if (filterList[6][0]) {
          item['user_type__activity_translate__item_fa'] = filterList[6][0];
          filterType = '';
        } else {
          delete item['user_type__activity_translate__item_fa'];
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
      // case 'user.is_verified':
      //   if (filterList[8][0]) {
      //     item['is_verified'] =
      //       filterList[8][0] == 'تایید شده'
      //         ? 'Verified'
      //         : filterList[8][0] == 'تایید نشده'
      //         ? 'Rejected'
      //         : 'NA';
      //     filterType = '';
      //   } else {
      //     delete item['is_verified'];
      //     setConfirmed(false);
      //   }
      //   break;
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
        itemSort['location_province'] = direction;
        break;
      case 'location.city_name':
        itemSort['location_city'] = direction;
        break;
      case 'user.user_type_list':
        itemSort['user_type_list'] = direction;
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
      pathname: '/management/user/newUser/details',
      state: {
        rowData,
        rowState
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

  // function onSearchChange(text) {
  //   setSearch(text);
  // }

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
      onRowSelectionChange={(rowsSelectedData, allRows, rowsSelected) =>
        onRowSelectionChange(rowsSelectedData, allRows, rowsSelected)
      }
      onRowsDelete={(rowsDeleted, newData) =>
        onRowsDelete(rowsDeleted, newData)
      }
      // onSearchChange={text => onSearchChange(text)}
      onFilterChange={(column, filterList, type) =>
        onFilterChange(column, filterList, type)
      }
      onColumnSortChange={(changedColumn, direction) =>
        onColumnSortChange(changedColumn, direction)
      }
    />
  );
};

export default NewUserTable;
