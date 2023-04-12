import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Divider
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import MomentFa from 'src/utils/MomentFa';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'jalali-moment';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import { Plus, Star } from 'react-feather';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import Table from 'src/components/Desktop/Table';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import { Formik } from 'formik';
import * as Yup from 'yup';

const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

let item = {};
let itemSort = {};
const UserTypeTable = props => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [columns, setColumns] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [endDate, setEndDate] = React.useState(new Date());
  const [reset, setReset] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
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
        name: 'id',
        label: 'شناسه',
        options: {
          filter: false,
          display: false
        }
      },
      {
        name: 'activity_translates.item_fa',
        label: 'فعالیت',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    فعالیت
                  </InputLabel>
                  <TextField
                    id="activity"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="فعالیت"
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
        name: 'type_translates.item_fa',
        label: 'نوع کاربر',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    فعالیت
                  </InputLabel>
                  <TextField
                    id="user_type"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="نوع کاربر"
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
        name: 'order',
        label: 'ترتیب',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel
                    sx={{ transform: 'none', position: 'initial' }}
                  ></InputLabel>
                  <TextField
                    id="order"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="ترتیب"
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
        label: 'تاریخ ایجاد',
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
                    تاریخ ایجاد
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
                          console.log('change', filterList);
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
      }
    ]);
  }, [endDate]);

  function getData(page, rowsPerPage, search) {
    httpService
      .post(
        `${API_BASE_URL}/api/management/user/user_type/user_type_list/?limit=${rowsPerPage}&offset=${page *rowsPerPage}${
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
      case 'activity_translates.item_fa':
        if (filterList[1][0]) {
          item['activity'] = filterList[1][0];
          filterType = '__contains';
        } else {
          delete item['activity'];
        }
        break;
      case 'type_translates':
        if (filterList[2][0]) {
          item['user_type'] = filterList[2][0];
          filterType = '__contains';
        } else {
          delete item['user_type'];
        }
        break;
      case 'order':
        if (filterList[3][0]) {
          item['credit'] = filterList[3][0];
          filterType = '';
        } else {
          delete item['credit'];
        }
        break;
      case 'create_date':
        if (filterList[4][0]) {
          item['create_date'] = endDate;
          filterType = '';
        } else {
          delete item['create_date'];
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
    switch (changedColumn) {
      case 'activity':
        itemSort['activity'] = direction;
        break;
      case 'user_type':
        itemSort['user_type'] = direction;
        break;
      case 'create_date':
        itemSort['create_date'] = direction;
        break;
      case 'order':
        itemSort['order'] = direction;
        break;
      default:
        itemSort = itemSort;
    }

    let temp = itemSort;
    let filterItems = Object.keys(temp).map(key => [key, temp[key]]);

    let str = [];
    if (filterItems?.length > 0) {
      filterItems.map((itm, index) => {
        str.push(itm[1] === 'asc' ? itm[0] : `-${itm[0]}`);
      });
    }
    setSort(str);
  }

  function onRowClick(rowData, rowState) {
    setOpen(true);
    const temp = data.filter(f => rowData[0] === f.id);
    setSelected(temp[0]);
  }

  function onRowsDelete(rowsDeleted, newData) {
    const typeIds = [];
    rowsDeleted.data.map((item, index) => {
      typeIds.push(data[item.index].id);
    });

    httpService
      .post(`${API_BASE_URL}/api/management/user/user_type/delete/`, {
        type_ids: typeIds
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
    <>
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
            {/* <ConfirmButton
              style={{ width: '180px', marginRight: '20px' }}
              onClick={() => {
                //   history.push('/management/club/lottery/new');
                setOpen(true);
              }}
            >
              <Plus />
              <di>نوع کاربر جدید</di>
            </ConfirmButton> */}
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
      <div>
        <CustomizedDialogs
          open={open}
          handleClose={() => setOpen(false)}
          title={'نوع کاربر'}
          content={
            <Box>
              <Formik
                initialValues={{
                  type_id: selected?.id,
                  // activity_fa: selected?.activity_translates?.item_fa,
                  // activity_ru: selected?.activity_translates?.item_ru,
                  // activity_ar: selected?.activity_translates?.item_ar,
                  // type_fa: selected?.type_translates?.item_fa,
                  // type_ru: selected?.type_translates?.item_ru,
                  // type_ar: selected?.type_translates?.item_ar,
                  order: selected?.order
                }}
                validationSchema={Yup.object().shape({
                  order: Yup.string().required('ترتیب اجباری می باشد')
                  // type_fa: Yup.string().required(
                  //   'نام فارسی نوع فعالیت اجباری می باشد'
                  // )
                })}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                  setSubmitting(true);
                  httpService
                    .post(
                      `${API_BASE_URL}/api/management/user/user_type/update_type/`,
                      values
                    )
                    .then(res => {
                      if (res.status === 200) {
                        getData(page, rowsPerPage, '');
                        setOpen(false);
                        setSubmitting(false);
                      }
                    })
                    .catch(err => {
                      setSubmitting(false);
                    });
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values
                }) => (
                  <form
                    noValidate
                    onSubmit={handleSubmit}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'start',
                      justifyContent: 'space-between',
                      width: '500px',
                      height: '480px'
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gridColumnGap: '20px',
                        gridRowGap: '10px',
                        padding: '16px 16px'
                      }}
                    >
                      <Box sx={{ width: '100%' }}>
                        <InputLabel>نام فارسی فعالیت </InputLabel>
                        <TextField
                          id="activity_fa"
                          aria-describedby="my-helper-text"
                          fullWidth
                          // placeholder="رمز عبور"
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '6px 3px'
                          }}
                          value={values.activity_fa}
                          onChange={handleChange}
                          error={Boolean(
                            touched.activity_fa && errors.activity_fa
                          )}
                          helperText={touched.activity_fa && errors.activity_fa}
                        />
                      </Box>
                      <Box sx={{ width: '100%' }}>
                        <InputLabel>نام روسی فعالیت </InputLabel>
                        <TextField
                          id="activity_ru"
                          aria-describedby="my-helper-text"
                          fullWidth
                          // placeholder="رمز عبور"
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '6px 3px'
                          }}
                          value={values.activity_ru}
                          onChange={handleChange}
                          // error={Boolean(
                          //   touched.activity_ru && errors.activity_ru
                          // )}
                          // helperText={touched.activity_fa && errors.activity_fa}
                        />
                      </Box>{' '}
                      <Box sx={{ width: '100%' }}>
                        <InputLabel>نام عربی فعالیت </InputLabel>
                        <TextField
                          id="activity_ar"
                          aria-describedby="my-helper-text"
                          fullWidth
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '6px 3px'
                          }}
                          value={values.activity_ar}
                          onChange={handleChange}
                          // error={Boolean(
                          //   touched.activity_ru && errors.activity_ru
                          // )}
                          // helperText={touched.activity_fa && errors.activity_fa}
                        />
                      </Box>{' '}
                      <Box sx={{ width: '100%' }}>
                        <InputLabel>نام فارسی نوع فعالیت </InputLabel>
                        <TextField
                          id="type_fa"
                          aria-describedby="my-helper-text"
                          fullWidth
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '6px 3px'
                          }}
                          value={values.type_fa}
                          onChange={handleChange}
                          error={Boolean(touched.type_fa && errors.type_fa)}
                          helperText={touched.type_fa && errors.type_fa}
                        />
                      </Box>{' '}
                      <Box sx={{ width: '100%' }}>
                        <InputLabel>نام روسی نوع فعالیت </InputLabel>
                        <TextField
                          id="type_ru"
                          aria-describedby="my-helper-text"
                          fullWidth
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '6px 3px'
                          }}
                          value={values.type_ru}
                          onChange={handleChange}
                          // error={Boolean(touched.type_fa && errors.type_fa)}
                          // helperText={touched.type_fa && errors.type_fa}
                        />
                      </Box>{' '}
                      <Box sx={{ width: '100%' }}>
                        <InputLabel>نام عربی نوع فعالیت </InputLabel>
                        <TextField
                          id="type_ar"
                          aria-describedby="my-helper-text"
                          fullWidth
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '6px 3px'
                          }}
                          value={values.type_ar}
                          onChange={handleChange}
                          // error={Boolean(touched.type_fa && errors.type_fa)}
                          // helperText={touched.type_fa && errors.type_fa}
                        />
                      </Box>
                      <Box sx={{ width: '100%' }}>
                        <InputLabel>ترتیب</InputLabel>
                        <TextField
                          id="order"
                          aria-describedby="my-helper-text"
                          fullWidth
                          // placeholder="رمز عبور"
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '6px 3px'
                          }}
                          type={'number'}
                          InputProps={{ inputProps: { min: 0 } }}
                          value={values.order}
                          onChange={handleChange}
                          // error={Boolean(touched.credit && errors.credit)}
                          // helperText={touched.credit && errors.credit}
                        />
                      </Box>
                    </Box>
                    <Divider sx={{ width: '100%', marginBottom: '10px' }} />

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        gap: 2,
                        width: '100%',
                        height: '60px'
                        // borderTop: '0.5px solid #D3D2D2',
                        // padding: '12px 16px'
                      }}
                    >
                      <ConfirmButton
                        variant={'contained'}
                        style={{ width: '50%' }}
                        type="submit"
                        loading={isSubmitting}
                      >
                        ثبت نوع کاربر
                      </ConfirmButton>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          }
        />
      </div>
    </>
  );
};

export default UserTypeTable;
