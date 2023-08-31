import React, { useState, useEffect } from 'react';

import {
  TextField,
  FormControl,
  InputLabel,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import Table from 'src/components/Desktop/Table';
import { useHistory } from 'react-router-dom';
import InputLabelHeader from 'src/components/Desktop/InputLabel';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import { Plus } from 'react-feather';
import NewProductType from './NewProduct';

let item = {};
// let itemSort = {};
const ProductTable = props => {
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
        name: 'type_detail.name_translate.item_fa',
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
        name: 'code',
        label: 'کد',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    کد
                  </InputLabel>
                  <TextField
                    id="name"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="دسته"
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
        name: 'erp_code',
        label: 'کد ERP',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    کد ERP
                  </InputLabel>
                  <TextField
                    id="name_translate.item_en"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="کد ERP"
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
        name: 'size',
        label: 'سایز',
        options: {
          filter: false
          // filterType: 'custom',
          // filterOptions: {
          //   display: (filterList, onChange, index, column) => {
          //     return (
          //       <FormControl>
          //         <InputLabel sx={{ transform: 'none', position: 'initial' }}>
          //           سایز
          //         </InputLabel>
          //         <TextField
          //           id="name_translate.item_fa"
          //           aria-describedby="my-helper-text"
          //           fullWidth
          //           value={filterList[index]}
          //           onChange={event => {
          //             if (event.target.value) {
          //               filterList[index][0] = event.target.value;
          //               onChange(filterList[index], index, column);
          //             } else {
          //               filterList[index] = [];
          //               onChange(filterList[index], index, column);
          //             }
          //           }}
          //         />
          //       </FormControl>
          //     );
          //   }
          // }
        }
      },
      {
        name: 'order',
        label: 'ترتیب',
        options: {
          filter: false
          // filterType: 'custom',
          // filterOptions: {
          //   display: (filterList, onChange, index, column) => {
          //     return (
          //       <FormControl>
          //         <InputLabel sx={{ transform: 'none', position: 'initial' }}>
          //           ترتیب
          //         </InputLabel>
          //         <TextField
          //           id="name_translate.item_ar"
          //           aria-describedby="my-helper-text"
          //           fullWidth
          //           value={filterList[index]}
          //           onChange={event => {
          //             if (event.target.value) {
          //               filterList[index][0] = event.target.value;
          //               onChange(filterList[index], index, column);
          //             } else {
          //               filterList[index] = [];
          //               onChange(filterList[index], index, column);
          //             }
          //           }}
          //         />
          //       </FormControl>
          //     );
          //   }
          // }
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
        `${API_BASE_URL}/api/management/product/product/product_list/?limit=${rowsPerPage}&offset=${page *
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
      case 'type_detail.name_translate.item_fa':
        if (filterList[1][0]) {
          item['product_type__translate__item_fa'] = filterList[1][0];
          filterType = '__icontains';
        } else {
          delete item['product_type__translate__item_fa'];
        }
        break;
      case 'code':
        if (filterList[2][0]) {
          item['code'] = filterList[2][0];
          filterType = '__icontains';
        } else {
          delete item['code'];
        }
        break;
      case 'erp_code':
        if (filterList[3][0]) {
          item['erp_code'] = filterList[3][0];
          filterType = '__contains';
        } else {
          delete item['erp_code'];
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
      pathname: '/management/sale/setting/products/product',
      state: {
        data: data.filter(f => f.id === rowData[0])
      }
    });
  }

  function onRowsDelete(rowsDeleted, newData) {
    const productIds = [];
    rowsDeleted.data.map((item, index) => {
      productIds.push(data[item.index].id);
    });

    httpService
      .post(`${API_BASE_URL}/api/management/product/product/product_delete/`, {
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
              }}
            >
              <Plus />
              <di>محصول جدید</di>
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
          title={'ایجاد محصول جدید'}
          type="new"
          reloadData={() => getData(page, rowsPerPage, '')}
        />
      )}
    </>
  );
};

export default ProductTable;
