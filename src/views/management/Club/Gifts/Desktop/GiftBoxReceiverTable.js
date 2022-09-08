import React, { useState, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';

import {
  Box,
  Card,
  Typography,
  Link,
  TextField,
  FormControl,
  InputLabel,
  Autocomplete,
  colors,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MaterialTable, { Column, MTableFilterRow } from 'material-table';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import IconButton from 'src/components/Desktop/Button/Icon';
import Dialog from '@mui/material/Dialog/Dialog';
import Button from '@mui/material/Button';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import Tooltip from '@mui/material/Tooltip';
import MUIDataTable from 'mui-datatables';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/FileUpload';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterIcon from '@mui/icons-material/FilterAlt';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { consoleSandbox } from '@sentry/utils';
import FaTOEn from 'src/utils/FaTOEn';
import MomentFa from 'src/utils/MomentFa';
import Datepicker from 'src/components/Desktop/Datepicker';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'jalali-moment';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import { Plus } from 'react-feather';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';

const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

const muiCache = createCache({
  key: 'mui-datatables',
  prepend: true
});

let theme = createTheme({
  palette: {
    mode: 'light',
    action: {
      active: colors.blueGrey[600]
    },
    background: {
      default: colors.common.white,
      dark: '#f4f6f8',
      paper: colors.common.white
    },
    primary: {
      // main: colors.indigo[600]
      main: '#00AAB5'
    },
    secondary: {
      // main: '#5850EC'
      main: '#00AAB5'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
      // secondary: colors.common.white
    }
  },
  components: {
    MUIDataTable: {
      styleOverrides: {
        root: {
          direction: 'rtl',
          fontFamily: 'IRANSans'
        },
        paper: {
          boxShadow: 'none'
        },
        caption: {
          display: 'none'
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          //backgroundColor: '#f00',
          fontFamily: 'IRANSans',
          textAlign: 'center'
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          // color: 'rgba(0, 0, 0, 0.6) !important'
          color: '#00AAB5 !important'
        }
      }
    },
    MUIDataTableHeadCell: {
      styleOverrides: {
        root: {
          //textAlign: 'center',
          fontFamily: 'IRANSans'
        },
        toolButton: {
          marginRight: '2px',
          marginLeft: '8px'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: 'right'
        },
        head: {
          backgroundColor: 'purple'
          //textAlign: 'center'
        }
      }
    },
    MUIDataTableSelectCell: {
      styleOverrides: {
        headerCell: {
          //backgroundColor: 'blue',
        }
      }
    },
    MuiTableFooter: {
      styleOverrides: {
        root: {
          fontFamily: 'IRANSans',
          '& .MuiToolbar-root': {
            backgroundColor: 'white',
            fontFamily: 'IRANSans'
          }
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          fontFamily: 'IRANSans'
        },
        selectLabel: {
          fontFamily: 'IRANSans',
          fontSize: 10
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'IRANSans',
          fontSize: 12,
          fontWeight: 8,
          display: 'inline',
          flexDirection: 'column'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'IRANSans',
          fontSize: 12,
          fontWeight: 8
        }
      }
    },
    MUIDataTableFilter: {
      styleOverrides: {
        root: {
          direction: 'rtl',
          fontFamily: 'IRANSans',
          fontSize: 12,
          fontWeight: 8
        },
        resetLink: {
          color: '#00AAB5',
          fontSize: '16px',
          fontWeight: 700
        },
        title: {
          fontSize: '16px',
          fontWeight: 700
        },
        reset: {
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          width: '700px'
        },
        gridListTile: {
          margin: 0,
          padding: 0
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          direction: 'rtl',
          fontFamily: 'IRANSans',
          fontSize: 12
        },
        label: {
          direction: 'rtl',
          fontFamily: 'IRANSans',
          fontSize: 12
        }
      }
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          direction: 'rtl',
          fontFamily: 'IRANSans',
          fontSize: 12,
          margin: 0,
          paddingTop: 0,
          paddingBottom: 0
        },
        item: {
          margin: 0,
          paddingTop: 0,
          paddingBottom: 0
        },
        grid: {
          margin: 0,
          paddingTop: 0,
          paddingBottom: 0
        }
      }
    },
    MUIDataTableViewCol: {
      styleOverrides: {
        root: {
          direction: 'rtl',
          fontFamily: 'IRANSans',
          fontSize: 12,
          padding: '16px 0px 16px 44px'
        },
        label: {
          direction: 'rtl',
          fontFamily: 'IRANSans',
          fontSize: 12
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          right: 0,
          fontFamily: 'IRANSans',
          fontSize: 12
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          right: 0,
          fontFamily: 'IRANSans',
          fontSize: 12
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          right: 0,
          fontFamily: 'IRANSans',
          fontSize: 12
        }
      }
    },
    MUIDataTableSearch: {
      styleOverrides: {
        main: {
          direction: 'initial'
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: 'IRANSans',
          fontSize: 9
        }
      }
    },
    MUIDataTableBodyCell: {
      styleOverrides: {
        stackedCommon: {
          fontSize: 12
        }
      }
    },
    MUIDataTableToolbar: {
      styleOverrides: {
        actions: {
          textAlign: 'left'
        },
        filterCloseIcon: {
          // position: 'absolute',
          // left: 0,
          // top: 0,
          // width: '1200px',

          // '&:hover': {
          //   backgroundColor: 'white'
          // }
          display: 'none'
        },
        left: {
          display: 'flex',
          justifyContent: 'flex-start'
        },
        titleText: {
          color: '#00346D',
          fontWeight: 700,
          fontSize: '20px',
          fontFamily: 'IRANSans'
        }
      }
    },
    MUIDataTableToolbarSelect: {
      styleOverrides: {
        title: {
          paddingRight: '10px',
          fontSize: '18px',
          fontWeight: 500,
          fontFamily: 'IRANSans',
          color: '#00346D'
        }
      }
    },
    MUIDataTableSelectCell: {
      styleOverrides: {
        // checked: { color: '#00AAB5 !important' },
        // color: '#00AAB5 !important',
        headerCell: {
          // fill: '#00AAB5 !important'
        },
        checkboxRoot: {
          color: '#00AAB5 !important'
        }
      }
    },
    MUIDataTableFilterList: {
      styleOverrides: {
        root: {
          justifyContent: 'flex-start'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          background: '#F2F2F2'
          // borderRadius: '4px'
          // margin: '6px 3px'
        }
      }
    }
  }
});

theme = responsiveFontSizes(theme);

let item = {};
const AllUsersTable = props => {
  const { className, rest, returnFunction, gridData } = props;
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [data, setData] = useState([]);
  const tableRef = React.createRef();
  const [openModal, setOpenModal] = useState(false);
  const [newColumns, setNewColumns] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [works, setWorks] = useState([]);
  const [columns, setColumns] = useState([]);
  const [completed, setCompleted] = useState(null);
  const [confirmed, setConfirmed] = useState(null);
  const [filterObj, setFilterObj] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  // let itemSort = {};
  const [value, setValue] = React.useState(new Date());

  const history = useHistory();

  useEffect(() => {
    getData(page, rowsPerPage);
  }, [filter, sort]);

  useEffect(() => {
    document.getElementById('pagination-next').style.rotate = '180deg';
    document.getElementById('pagination-back').style.rotate = '180deg';
  }, []);

  useEffect(() => {
    setColumns([
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
        name: 'start_date',
        label: 'تاریخ شروع',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            console.log('inja');
            return MomentFa(value);
          },
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    تاریخ شروع
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
                    />
                  </LocalizationProvider>
                </FormControl>
              );
            }
          }
        }
      },
      {
        name: 'end_date',
        label: 'تاریخ پایان',
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
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    تاریخ پایان
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
                    />
                  </LocalizationProvider>
                </FormControl>
              );
            }
          }
        }
      },
      {
        name: 'winner_count',
        label: 'تعداد شرکت کننده',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            customBodyRender: (value, tableMeta, updateValue) => {
              console.log('value', value);
              return value.length;
            },
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    تعداد شرکت کنندگان
                  </InputLabel>
                  <TextField
                    id="name"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="تعداد شرکت کنندگان"
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
      }
    ]);
  }, []);

  const CustomSearchIcon = props => {
    return <SearchIcon {...props} style={{ color: '#00AAB5' }} />;
  };
  const CustomDownloadIcon = props => {
    return <DownloadIcon {...props} style={{ color: '#00AAB5' }} />;
  };
  const CustomViewColumnIcon = props => {
    return <ViewColumnIcon {...props} style={{ color: '#00AAB5' }} />;
  };
  const CustomFilterIcon = props => {
    return <FilterIcon {...props} style={{ color: '#00AAB5' }} />;
  };

  const components = {
    icons: {
      SearchIcon: CustomSearchIcon,
      DownloadIcon: CustomDownloadIcon,
      ViewColumnIcon: CustomViewColumnIcon,
      FilterIcon: CustomFilterIcon
    }
  };

  function getData(page, rowsPerPage) {
    httpService
      .get(
        `${API_BASE_URL}/api/management/club/matches/?limit=${page *
          rowsPerPage +
          rowsPerPage}&offset=${page}${filter !== '' ? `&${filter}` : ''}${
          sort !== '' ? `&${sort}` : ''
        }`
      )

      .then(res => {
        if (res.status === 200) {
          setData(res.data.results);
          setCount(res.data.count);
        }
      });
  }

  useEffect(() => {
    getData(page, rowsPerPage);
  }, []);

  function changePage(page, rowsPerPage, sortOrder) {
    setRowsPerPage(rowsPerPage);
    getData(page, rowsPerPage);
  }

  const tableOptions = {
    filter: true,
    selectableRows: true,
    filterType: 'textField',
    rowsPerPage: rowsPerPage,
    count: count,
    serverSide: true,
    enableNestedDataAccess: '.',
    //rowsPerPageOptions: rowsPerPageOptions,
    print: false,
    //search: true,
    responsive: 'vertical',
    //download: true,
    downloadOptions: {
      // filename: 'لیست وظایف',
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true
      }
    },
    ///To fix utf8 probliem in Excel file
    onDownload: (buildHead, buildBody, columns, data) => {
      return '\uFEFF' + buildHead(columns) + buildBody(data);
    },
    //columnHeader: columnHeader,
    //draggableColumns: { enabled: draggableColumnsEnabled, transitionTime: 300 },
    //jumpToPage: jumpToPage,
    rowHover: true,
    //selectableRowsHeader: selectableRowsHeader,
    //confirmFilters: confirmFilters,
    //customFilterDialogFooter: customFilterDialogFooter,
    //pagination: true,
    //sortThirdClickReset: true,
    //serverside:true,
    // setRowProps: (row, dataIndex, rowIndex) => {
    //   return <div></div>;
    // },
    //columnOrder:[],
    resizableColumns: false,
    textLabels: {
      body: {
        noMatch: 'رکوردی برای نمایش نیست',
        toolTip: (
          <Typography variant="body2" color="inherit">
            مرتب سازی
          </Typography>
        ),
        columnHeaderTooltip: column => (
          <Typography variant="body2" color="inherit">
            مرتب سازی براساس {column.label}
          </Typography>
        )
      },
      pagination: {
        next: 'صفحه بعد',
        previous: 'صفحه قبل',
        rowsPerPage: 'ردیف در هر صفحه',
        displayRows: 'از',
        jumpToPage: 'رفتن به صفحه'
      },
      toolbar: {
        search: 'جستجو',
        downloadCsv: 'دانلود فایل اکسل',
        print: 'پرینت',
        viewColumns: 'نمایش ستونها',
        filterTable: 'فیلتر'
      },
      filter: {
        all: 'همه',
        title: 'فیلترها',
        reset: 'پاک کردن'
      },
      viewColumns: {
        title: 'نمایش ستونها',
        titleAria: 'نمایش/عدم نمایش ستونها'
      },
      selectedRows: {
        text: `ردیف انتخاب شده`,
        delete: 'حذف',
        deleteAria: 'حذف سطر(های) انتخاب شده'
      }
    },
    onTableChange: (action, tableState) => {
      switch (action) {
        case 'changeRowsPerPage':
          changePage(tableState.page, tableState.rowsPerPage);
          break;
        default:
        // console.log('action not handled.', action, tableState);
      }
    },
    onFilterChange: (column, filterList, type) => {
      let filterType = '';
      switch (column) {
        case 'user.first_name':
          if (filterList[0][0]) {
            item['first_name'] = filterList[0][0];
            filterType = '__contains';
          } else {
            delete item['first_name'];
          }
          break;
        case 'user.last_name':
          if (filterList[1][0]) {
            item['last_name'] = filterList[1][0];
            filterType = '__contains';
          } else {
            delete item['last_name'];
          }
          break;
        case 'user.mobile':
          if (filterList[2][0]) {
            item['mobile'] = FaTOEn(filterList[2][0]);
            filterType = '__contains';
          } else {
            delete item['mobile'];
          }
          break;
        case 'location.province_name':
          if (filterList[3][0]) {
            item['province_name'] = filterList[3][0];
            filterType = '';
          } else {
            delete item['province_name'];
          }
          break;
        case 'location.city_name':
          if (filterList[4][0]) {
            item['city_name'] = filterList[4][0];
            filterType = '';
          } else {
            delete item['city_name'];
          }
          break;
        case 'user.user_type_list':
          if (filterList[5][0]) {
            item['user_type'] = filterList[5][0];
            filterType = '';
          } else {
            delete item['user_type'];
          }
          break;
        case 'user.profile_is_completed':
          if (filterList[6][0]) {
            item['profile_is_complete'] =
              filterList[6][0] == 'تکمیل شده' ? 'True' : 'False';
            filterType = '';
          } else {
            delete item['profile_is_complete'];
            setCompleted(null);
          }
          break;
        case 'user.is_verified':
          if (filterList[7][0]) {
            item['is_verified'] =
              filterList[7][0] == 'تایید شده'
                ? 'Verified'
                : filterList[7][0] == 'تایید نشده'
                ? 'Rejected'
                : 'NA';
            filterType = '';
          } else {
            delete item['is_verified'];
            setConfirmed(false);
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
    },
    onColumnSortChange: (changedColumn, direction) => {
      let itemSort = {};
      switch (changedColumn) {
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
          itemSort['mobile'] = direction;
          break;
        case 'location.city_name':
          itemSort['mobile'] = direction;
          break;
        case 'user.user_type_list':
          itemSort['mobile'] = direction;
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
      setSort('order=' + str);
    },
    onRowClick: (rowData, rowState) => {
      history.push({
        pathname: '/management/club/gift/details',
        state: {
          rowData,
          rowState
        }
      });
    }
  };

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <Card>
          <Box sx={{ height: '87vh' }}>
            <MUIDataTable
              title={'دریافت کنندگان'}
              data={data}
              columns={columns}
              options={tableOptions}
              components={components}
            />
          </Box>
        </Card>
      </ThemeProvider>
    </CacheProvider>
  );
};

AllUsersTable.propTypes = {
  className: PropTypes.string
};

export default AllUsersTable;
