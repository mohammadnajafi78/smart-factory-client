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
import Table from 'src/components/Desktop/Table';
import { useSnackbar } from 'notistack';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import { Plus } from 'react-feather';
import InputLabelHeader from 'src/components/Desktop/InputLabel';
import moment from 'jalali-moment';
import NewExam from '../examDetails/desktop/NewExam';
const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

let item = {};
// let itemSort = {};
const ExamsTable = props => {
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
  const { enqueueSnackbar } = useSnackbar();
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
        name: 'name',
        label: 'نام آزمون',
        options: {
          filter: false
        }
      },
      {
        name: 'date',
        label: 'تاریخ برگزاری',
        options: {
          filter: true,
          customBodyRender: value => {
            return <div>{MomentFa(value)}</div>;
          }
        }
      },
      {
        name: 'start_time',
        label: 'ساعت برگزاری',
        options: {
          filter: true
        }
      },

      {
        name: 'question_count',
        label: 'تعداد سوالات'
      },
      {
        name: 'duration',
        label: 'مدت زمان آزمون'
      },
      {
        name: 'category.name',
        label: 'نوع آزمون',
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
        // `${API_BASE_URL}/api/management/lms/exam/get_exam_list/?limit=10&offset=0`,
        `${API_BASE_URL}/api/management/lms/exam/get_exam_list/?limit=${rowsPerPage}&offset=${page *
          rowsPerPage}${filter !== '' ? `&${filter}` : ''}`,
        {
          search: 'text',
          order: 'name'
        }
      )
      .then(res => {
        if (res.status === 200) {
          setData(res.data.results);
          setCount(res.data.count);
          setStatusList(res.data.results);
        }
      })
      .catch(ex => {
        console.log(ex);
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
    const ref_num = data?.filter(f => f?.name === rowData[0])[0].ref_num;
    history.push({
      pathname: '/management/lms/exam/details',
      state: {
        data: ref_num
      }
    });
  }
  function onRowsDelete(rowsDeleted, newData) {}

  function onRowSelectionChange(rowsSelectedData, allRows, rowsSelected) {}
  const [open, setOpen] = useState(false);

  return (
    <>
      <Table
        title={
          <>
            <InputLabelHeader
              style={{
                fontWeight: '700',
                color: '#00346D',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginLeft: '8px'
              }}
            >
              لیست
            </InputLabelHeader>
            <ConfirmButton
              style={{ width: '150px' }}
              onClick={() => {
                setOpen(true);
              }}
            >
              <Plus />
              <div>آزمون جدید</div>
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
      <NewExam
        open={open}
        handleClose={() => setOpen(false)}
        title="آزمون جدید "
        data={data}
        type="new"
      />
    </>
  );
};

export default ExamsTable;
