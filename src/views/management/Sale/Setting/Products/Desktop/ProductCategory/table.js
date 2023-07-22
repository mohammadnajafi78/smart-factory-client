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
import NewProductType from './NewProductCategory';

let item = {};
// let itemSort = {};
const ProductTypeTable = props => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [data, setData] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [works, setWorks] = useState([]);
  const [columns, setColumns] = useState([]);
  const [activeCatalogue, setActiveCatalogue] = useState(null);
  const [activeShop, setActiveShop] = useState(null);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [reset, setReset] = useState(false);
  const [openNew, setOpenNew] = useState(false);

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
        name: 'name',
        label: 'دسته',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    دسته
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
        name: 'translate_detail.item_en',
        label: 'ترجمه انگلیسی',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    ترجمه انگلیسی
                  </InputLabel>
                  <TextField
                    id="translate_detail.item_en"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="ترجمه انگلیسی"
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
        name: 'translate_detail.item_fa',
        label: 'ترجمه فارسی',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    ترجمه فارسی
                  </InputLabel>
                  <TextField
                    id="translate_detail.item_fa"
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
        name: 'translate_detail.item_ar',
        label: 'ترجمه عربی',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    ترجمه عربی
                  </InputLabel>
                  <TextField
                    id="translate_detail.item_ar"
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
        name: 'translate_detail.item_ru',
        label: 'ترجمه روسی',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    ترجمه روسی
                  </InputLabel>
                  <TextField
                    id="translate_detail.item_ru"
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
        name: 'active_in_catalogue',
        label: 'در کاتالوگ',
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
                    در کاتالوگ
                  </InputLabel>
                  <ToggleButtonGroup
                    color="primary"
                    value={activeCatalogue}
                    exclusive
                    onChange={(event, newValue) => {
                      // setCompleted(newValue);
                      setActiveCatalogue(newValue);

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
      },
      {
        name: 'active_in_shop',
        label: 'در فروشگاه',
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
                    در فروشگاه
                  </InputLabel>
                  <ToggleButtonGroup
                    color="primary"
                    value={activeShop}
                    exclusive
                    onChange={(event, newValue) => {
                      // setCompleted(newValue);
                      setActiveShop(newValue);

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
  }, [provinces, cities, works, activeCatalogue, activeShop]);

  function getData(page, rowsPerPage, search) {
    httpService
      .post(
        `${API_BASE_URL}/api/management/product/category/category_list/?limit=${rowsPerPage}&offset=${page *
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
          filterType = '__icontains';
        } else {
          delete item['name'];
        }
        break;
      case 'translate_detail.item_en':
        if (filterList[2][0]) {
          item['translate__item_en'] = filterList[2][0];
          filterType = '__icontains';
        } else {
          delete item['translate__item_en'];
        }
        break;
      case 'translate_detail.item_fa':
        if (filterList[3][0]) {
          item['translate__item_fa'] = FaTOEn(filterList[3][0]);
          filterType = '__icontains';
        } else {
          delete item['translate__item_fa'];
        }
        break;
      case 'translate_detail.item_ar':
        if (filterList[4][0]) {
          item['translate__item_ar'] = filterList[4][0];
          filterType = '__icontains';
        } else {
          delete item['translate__item_ar'];
        }
        break;
      case 'translate_detail.item_ru':
        if (filterList[5][0]) {
          item['translate__item_ru'] = filterList[5][0];
          filterType = '__icontains';
        } else {
          delete item['translate__item_ru'];
        }
        break;
      case 'active_in_catalogue':
        if (filterList[6][0]) {
          item['active_in_catalogue'] =
            filterList[6][0] == 'فعال' ? 'True' : 'False';
          filterType = '';
        } else {
          delete item['active_in_catalogue'];
          setActiveCatalogue(null);
        }
        break;
      case 'active_in_shop':
        if (filterList[7][0]) {
          item['active_in_shop'] =
            filterList[7][0] == 'فعال' ? 'True' : 'False';
          filterType = '';
        } else {
          delete item['active_in_shop'];
          setActiveShop(null);
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
      case 'name':
        itemSort['name'] = direction;
        break;
      case 'translate_detail.item_en':
        itemSort['translate__item_en'] = direction;
        break;
      case 'translate_detail.item_fa':
        itemSort['translate__item_fa'] = direction;
        break;
      case 'translate_detail.item_ar':
        itemSort['translate__item_ar'] = direction;
        break;
      case 'translate_detail.item_ru':
        itemSort['translate__item_ru'] = direction;
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
      pathname: '/management/sale/setting/products/category',
      state: {
        data: data.filter(f => f.id === rowData[0])
      }
    });
  }

  function onRowsDelete(rowsDeleted, newData) {
    const catIds = [];
    rowsDeleted.data.map((item, index) => {
      catIds.push(data[item.index].id);
    });

    httpService
      .post(
        `${API_BASE_URL}/api/management/product/category/category_delete/`,
        {
          cat_ids: catIds
        }
      )
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
              }}
            >
              <Plus />
              <di>دسته جدید</di>
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
        <NewProductType
          open={openNew}
          handleClose={() => setOpenNew(false)}
          title={'ایجاد دسته جدید'}
          type="new"
          reloadData={() => getData(page, rowsPerPage, '')}
        />
      )}
    </>
  );
};

export default ProductTypeTable;
