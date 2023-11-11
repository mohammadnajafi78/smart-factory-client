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
import { useSnackbar } from 'notistack';

const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

let item = {};
// let itemSort = {};
const GiftTypesTable = props => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [columns, setColumns] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [endDate, setEndDate] = React.useState(new Date());
  const [reset, setReset] = useState(false);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

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
        name: 'order',
        label: 'ترتیب',
        options: {
          // customBodyRender: (value, tableMeta, updateValue) => {
          //   return (
          //     <Box
          //       sx={{
          //         display: 'flex',
          //         flexDirection: 'row',
          //         justifyContent: 'center',
          //         alignItems: 'center',
          //         padding: '3px 6px !important',
          //         background: '#CCEEF0',
          //         borderRadius: '4px',
          //         color: '#00AAB5',
          //         width: '35%'
          //       }}
          //     >
          //       <InputLabel style={{ color: '#00AAB5' }}>{value}</InputLabel>
          //       <Star style={{ width: '27px', height: '18px' }} />
          //     </Box>
          //   );
          // },
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    ترتیب
                  </InputLabel>
                  <TextField
                    id="name"
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
        `${API_BASE_URL}/api/management/club/gift_type/gift_type_list/?limit=${rowsPerPage}&offset=${page *
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
    let filterType = '';

    console.log('column', column);
    switch (column) {
      case 'create_date':
        if (filterList[3][0]) {
          item['create_date'] = endDate;
          filterType = '';
        } else {
          delete item['create_date'];
        }
        break;
      case 'name':
        if (filterList[1][0]) {
          item['name'] = filterList[1][0];
          filterType = '__icontains';
        } else {
          delete item['name'];
        }
        break;
      case 'order':
        if (filterList[2][0]) {
          item['order'] = filterList[2][0];
          filterType = '';
        } else {
          delete item['order'];
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
      case 'name':
        itemSort['name'] = direction;
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
    // history.push({
    //   pathname: '/management/club/lottery/details',
    //   state: {
    //     data: data.filter(f => f.id === rowData[0])
    //   }
    // });
  }

  function onRowsDelete(rowsDeleted, newData) {
    const typeIds = [];
    rowsDeleted.data.map((item, index) => {
      typeIds.push(data[item.index].id);
    });

    httpService
      .post(`${API_BASE_URL}/api/management/club/gift_type/delete/`, {
        type_ids: typeIds
      })
      .then(res => {
        if (res.status === 200) {
          getData(page, rowsPerPage, '');
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
            <ConfirmButton
              style={{ width: '180px', marginRight: '20px' }}
              onClick={() => {
                //   history.push('/management/club/lottery/new');
                setOpen(true);
              }}
            >
              <Plus />
              <di>نوع هدایا جدید</di>
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
      <div>
        <CustomizedDialogs
          open={open}
          handleClose={() => setOpen(false)}
          title={'نوع هدایا'}
          content={
            <Box>
              <Formik
                initialValues={{
                  item_en: '',
                  item_fa: '',
                  item_ru: '',
                  item_ar: '',
                  order: ''
                }}
                validationSchema={Yup.object().shape({
                  item_en: Yup.string().required('نام انگلیسی اجباری می باشد'),
                  item_fa: Yup.string().required('نام فارسی اجباری می باشد'),
                  order: Yup.string().required('ترتیب اجباری می باشد')
                })}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                  setSubmitting(true);
                  httpService
                    .post(
                      `${API_BASE_URL}/api/management/club/gift_type/`,
                      values
                    )
                    .then(res => {
                      if (res.status === 201) {
                        getData(page, rowsPerPage, '');
                        setOpen(false);
                        setSubmitting(false);
                      }
                    })
                    .catch(ex => {
                      setSubmitting(false);
                      if (ex.response.status === 417) {
                        enqueueSnackbar(ex.response.data.error, {
                          variant: 'error'
                        });
                      } else {
                        enqueueSnackbar(
                          'مشکلی پیش آمده! لطفا دوباره سعی کنید',
                          {
                            variant: 'error'
                          }
                        );
                      }
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
                      height: '420px'
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
                        <InputLabel> نام انگلیسی </InputLabel>
                        <TextField
                          id="item_en"
                          aria-describedby="my-helper-text"
                          fullWidth
                          // placeholder="رمز عبور"
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '6px 3px'
                          }}
                          value={values.item_en}
                          onChange={handleChange}
                          error={Boolean(touched.item_en && errors.item_en)}
                          helperText={touched.item_en && errors.item_en}
                        />
                      </Box>
                      <Box sx={{ width: '100%' }}>
                        <InputLabel>نام فارسی </InputLabel>
                        <TextField
                          id="item_fa"
                          aria-describedby="my-helper-text"
                          fullWidth
                          // placeholder="رمز عبور"
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '6px 3px'
                          }}
                          value={values.item_fa}
                          onChange={handleChange}
                          error={Boolean(touched.item_fa && errors.item_fa)}
                          helperText={touched.item_fa && errors.item_fa}
                        />
                      </Box>
                      <Box sx={{ width: '100%' }}>
                        <InputLabel>نام روسی </InputLabel>
                        <TextField
                          id="item_ru"
                          aria-describedby="my-helper-text"
                          fullWidth
                          // placeholder="رمز عبور"
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '6px 3px'
                          }}
                          value={values.item_ru}
                          onChange={handleChange}
                          error={Boolean(touched.item_ru && errors.item_ru)}
                          helperText={touched.item_ru && errors.item_ru}
                        />
                      </Box>
                      <Box sx={{ width: '100%' }}>
                        <InputLabel>نام عربی </InputLabel>
                        <TextField
                          id="item_ar"
                          aria-describedby="my-helper-text"
                          fullWidth
                          // placeholder="رمز عبور"
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '6px 3px'
                          }}
                          value={values.item_ar}
                          onChange={handleChange}
                          error={Boolean(touched.item_ar && errors.item_ar)}
                          helperText={touched.item_ar && errors.item_ar}
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
                          error={Boolean(touched.order && errors.order)}
                          helperText={touched.order && errors.order}
                        />
                      </Box>
                    </Box>
                    <Divider sx={{ width: '100%' }} />

                    <Box
                      sx={{
                        display: 'inline-flex',
                        justifyContent: 'center',
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
                        ثبت نوع هدایا
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

export default GiftTypesTable;
