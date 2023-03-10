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
import InputLabelHeader from 'src/components/Desktop/InputLabel';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import { Plus } from 'react-feather';
import NewPrice from './NewPrice';
import MomentFa from 'src/utils/MomentFa';
// import Datepicker from 'src/components/Desktop/Datepicker';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'jalali-moment';

let item = {};
// let itemSort = {};
const PriceListTable = props => {
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
  const [isActive, setIsActive] = useState(null);
  const [activeShop, setActiveShop] = useState(null);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [reset, setReset] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [formType, setFormType] = useState('new');
  const [title, setTitle] = useState('لیست قیمت جدید');
  const [selectedData, setSelectedData] = useState({});

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
          display: false,
          filter: false
        }
      },
      {
        name: 'list_name',
        label: 'عنوان',
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
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
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
        name: 'is_active',
        label: 'وضعیت',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return value === true ? 'فعال' : 'غیر فعال';
          },
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl sx={{ marginTop: '10px' }}>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    وضعیت
                  </InputLabel>
                  <ToggleButtonGroup
                    color="primary"
                    value={isActive}
                    exclusive
                    onChange={(event, newValue) => {
                      // setCompleted(newValue);
                      setIsActive(newValue);

                      if (newValue === 'true') filterList[index][0] = 'فعال';
                      else if (newValue?.toLowerCase() === 'false')
                        filterList[index][0] = 'غیرفعال';
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
                      فعال
                    </ToggleButton>
                    <ToggleButton
                      value="false"
                      sx={{
                        fontFamily: 'IRANSans'
                        // borderLeft: '1px solid rgba(0,0,0, 0.12) !important'
                      }}
                    >
                      غیر فعال
                    </ToggleButton>
                  </ToggleButtonGroup>
                </FormControl>
              );
            }
          }
        }
      }
    ]);
  }, [provinces, cities, works, isActive, activeShop]);

  function getData(page, rowsPerPage, search) {
    httpService
      .post(
        `${API_BASE_URL}/api/management/product/price_list/get_price_list/?limit=${rowsPerPage}&offset=${page}${
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
      case 'list_name':
        if (filterList[1][0]) {
          item['list_name'] = filterList[1][0];
          filterType = '__icontains';
        } else {
          delete item['list_name'];
        }
        break;
      case 'create_date':
        if (filterList[2][0]) {
          item['create_date'] = filterList[2][0];
          filterType = '__icontains';
        } else {
          delete item['create_date'];
        }
        break;
      case 'is_active':
        if (filterList[3][0]) {
          item['is_active'] = filterList[3][0] == 'فعال' ? 'True' : 'False';
          filterType = '';
        } else {
          delete item['is_active'];
          setIsActive(null);
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
      case 'type_detail.name_translate.item_fa':
        itemSort['product_type__translate__item_fa'] = direction;
        break;
      case 'code':
        itemSort['code'] = direction;
        break;
      case 'erp_code':
        itemSort['erp_code'] = direction;
        break;
      case 'active_in_catalogue':
        itemSort['active_in_catalogue'] = direction;
        break;
      case 'active_in_shop':
        itemSort['active_in_shop'] = direction;
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
      pathname: '/management/sale/setting/price',
      state: {
        data: data.filter(f => f.id === rowData[0])
      }
    });
    // setOpenNew(true);
    // setFormType('edit');
    // setTitle('ویرایش لیست قیمت');
    // setSelectedData(data.filter(f => f.id === rowData[0])[0]);
  }

  function onRowsDelete(rowsDeleted, newData) {
    const productIds = [];
    rowsDeleted.data.map((item, index) => {
      productIds.push(data[item.index].id);
    });

    httpService
      .post(`${API_BASE_URL}/api/management/product/price_list/`, {
        product_ids: productIds
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
                // history.push('/management/club/competition/new');
                setOpenNew(true);
                setFormType('new');
                setTitle('لیست قیمت جدید');
              }}
            >
              <Plus />
              <di>لیست قیمت جدید</di>
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
        getData={(page, rowsPerPage, search) =>
          getData(page, rowsPerPage, search)
        }
        onRowClick={(rowData, rowState) => onRowClick(rowData, rowState)}
        onRowsDelete={(rowsDeleted, newData) =>
          onRowsDelete(rowsDeleted, newData)
        }
        onRowSelectionChange={(rowsSelectedData, allRows, rowsSelected) =>
          onRowSelectionChange(rowsSelectedData, allRows, rowsSelected)
        }
        onFilterChange={(column, filterList, type) =>
          onFilterChange(column, filterList, type)
        }
        onColumnSortChange={(changedColumn, direction) =>
          onColumnSortChange(changedColumn, direction)
        }
      />
      {openNew && (
        <NewPrice
          open={openNew}
          handleClose={() => setOpenNew(false)}
          title={title}
          type={formType}
          reloadData={() => getData(page, rowsPerPage, '')}
          data={formType === 'new' ? null : selectedData}
        />
      )}
    </>
  );
};

export default PriceListTable;
