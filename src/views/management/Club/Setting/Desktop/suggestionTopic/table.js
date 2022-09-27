import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Divider,
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
const SuggestionTopicTable = props => {
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
  const [type, setType] = useState([]);
  const [typeId, setTypeId] = useState([]);
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
    httpService
      .get(`${API_BASE_URL}/api/management/club/suggestion_type/type_list/`)
      .then(res => {
        if (res.status === 200) {
          setType(res.data);
        }
      });
  }, []);

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
                <FormControl>
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
      },
      {
        name: 'suggestion_type',
        label: 'نوع',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    نوع
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    fullWidth
                    id="type"
                    options={type}
                    renderInput={params => (
                      <TextField {...params} placeholder="نوع" fullWidth />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.name
                    }
                    // value={filterList[index]}
                    getOptionLabel={option => option.name}
                    disableClearable
                    onChange={(event, values, reason, details) => {
                      if (values) {
                        setTypeId(values.id);
                        filterList[index][0] = values.name;
                        onChange(filterList[index], index, column);
                      } else {
                        filterList[index] = [];
                        onChange(filterList[index], index, column);
                      }
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
      }
    ]);
  }, [endDate, type]);

  function getData(page, rowsPerPage, search) {
    httpService
      .post(
        `${API_BASE_URL}/api/management/club/suggestion_topic/suggestion_topic_list/?limit=${rowsPerPage}&offset=${page}${
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
    console.log('filterList', filterList);
    switch (column) {
      case 'create_date':
        if (filterList[2][0]) {
          item['create_date'] = endDate;
          filterType = '';
        } else {
          delete item['create_date'];
        }
        break;
      case 'name':
        if (filterList[1][0]) {
          item['name'] = filterList[1][0];
          filterType = '__contains';
        } else {
          delete item['name'];
        }
        break;
      case 'suggestion_type':
        if (filterList[3][0]) {
          item['type__name'] = filterList[3][0];
          filterType = '';
        } else {
          delete item['type__name'];
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
      case 'name':
        itemSort['name'] = direction;
        break;
      case 'create_date':
        itemSort['create_date'] = direction;
        break;
      case 'suggestion_type':
        itemSort['type__name'] = direction;
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
    // history.push({
    //   pathname: '/management/club/lottery/details',
    //   state: {
    //     data: data.filter(f => f.id === rowData[0])
    //   }
    // });
  }

  function onRowsDelete(rowsDeleted, newData) {
    const topicIds = [];
    rowsDeleted.data.map((item, index) => {
      topicIds.push(data[item.index].id);
    });

    httpService
      .post(`${API_BASE_URL}/api/management/club/suggestion_topic/delete/`, {
        topic_ids: topicIds
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
            <ConfirmButton
              style={{ width: '180px', marginRight: '20px' }}
              onClick={() => {
                //   history.push('/management/club/lottery/new');
                setOpen(true);
              }}
            >
              <Plus />
              <di>عنوان پیشنهاد جدید</di>
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
          title={'عنوان پیشنهاد'}
          content={
            <Box>
              <Formik
                initialValues={{
                  name: '',
                  type: ''
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required('نام اجباری می باشد'),
                  type: Yup.string().required('نوع اجباری می باشد')
                })}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                  setSubmitting(true);
                  httpService
                    .post(
                      `${API_BASE_URL}/api/management/club/suggestion_topic/`,
                      values
                    )
                    .then(res => {
                      if (res.status === 201) {
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
                  values,
                  setFieldValue
                }) => (
                  <form
                    noValidate
                    onSubmit={handleSubmit}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'start',
                      justifyContent: 'space-between',
                      width: '400px',
                      height: '180px'
                    }}
                  >
                    <Box sx={{ width: '100%', padding: '10px 16px 30px 16px' }}>
                      <Box sx={{ width: '100%' }}>
                        <InputLabel>نوع </InputLabel>
                        <TextField
                          id="name"
                          aria-describedby="my-helper-text"
                          fullWidth
                          // placeholder="رمز عبور"
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '6px 3px'
                          }}
                          value={values.name}
                          onChange={handleChange}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Box>
                      <Box sx={{ width: '100%' }}>
                        <InputLabel>نوع </InputLabel>
                        <Autocomplete
                          disablePortal
                          fullWidth
                          id="type"
                          options={type}
                          renderInput={params => (
                            <TextField
                              {...params}
                              placeholder="نوع"
                              fullWidth
                            />
                          )}
                          onChange={(event, newValue) => {
                            if (newValue) setFieldValue('type', newValue.id);
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          noOptionsText={'موردی یافت نشد'}
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
                        ثبت عنوان پیشنهاد
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

export default SuggestionTopicTable;
