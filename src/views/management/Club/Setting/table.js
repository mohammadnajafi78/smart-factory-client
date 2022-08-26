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
import IconButton from '@mui/material/IconButton';
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
        }
        // caption: {
        //   left: '0px'
        // }
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
          display: 'flex',
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
    setColumns([
      {
        name: 'user.first_name',
        label: 'نام',
        options: {
          filter: true,
          filterType: 'custom',
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl
                // sx={{ margin: 0, paddingTop: 0, paddingBottom: 0 }}
                >
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    نام
                  </InputLabel>
                  <TextField
                    id="name"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="نام"
                    // sx={{
                    //   background: '#F2F2F2',
                    //   borderRadius: '4px'
                    // }}
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
                <FormControl
                // sx={{ margin: 0, paddingTop: 0, paddingBottom: 0 }}
                >
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    نام خانوادگی
                  </InputLabel>
                  <TextField
                    id="name"
                    aria-describedby="my-helper-text"
                    fullWidth
                    // sx={{
                    //   background: '#F2F2F2',
                    //   borderRadius: '4px',
                    //   margin: '6px 3px'
                    // }}
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
                    // sx={{
                    //   background: '#F2F2F2',
                    //   borderRadius: '4px',
                    //   margin: '6px 3px'
                    // }}
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
            return value.map(option => option.translate).toString();
          },
          filter: true,
          filterType: 'custom',
          // customFilterListOptions: {
          //   update: (filterList, filterPos, index) => {
          //     console.log('update');
          //     filterList[index].splice(filterPos, 1);
          //     return filterList;
          //   }
          // },
          filterOptions: {
            display: (filterList, onChange, index, column) => {
              return (
                <FormControl>
                  <InputLabel sx={{ transform: 'none', position: 'initial' }}>
                    فعالیت
                  </InputLabel>
                  <Autocomplete
                    multiple
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
                      if (values.length > 0) {
                        filterList[index][values?.length - 1] =
                          values[values?.length - 1].translate;
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
                    onChange={event => {
                      setCompleted(event.target.value);
                      filterList[index][0] =
                        event.target.value == 'true'
                          ? 'تکمیل شده'
                          : 'تکمیل نشده';
                      onChange(filterList[index], index, column);
                    }}
                    sx={{
                      marginTop: '5px',
                      width: '60.5%',
                      borderLeft: '1px solid rgba(0,0,0, 0.12)'
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
                        fontFamily: 'IRANSans',
                        borderLeft: '1px solid rgba(0,0,0, 0.12)'
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
      },
      {
        name: 'user.is_verified',
        label: 'تایید شده',
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
                    وضعیت تایید کاربر
                  </InputLabel>
                  <ToggleButtonGroup
                    color="primary"
                    value={confirmed}
                    exclusive
                    onChange={event => {
                      setConfirmed(event.target.value);
                      filterList[index][0] =
                        event.target.value == 'true'
                          ? 'تایید شده'
                          : 'تایید نشده';
                      onChange(filterList[index], index, column);
                    }}
                    sx={{
                      marginTop: '5px',
                      width: '56%',
                      borderLeft: '1px solid rgba(0,0,0, 0.12)'
                    }}
                  >
                    <ToggleButton
                      value="true"
                      sx={{
                        fontFamily: 'IRANSans'
                      }}
                    >
                      تایید شده
                    </ToggleButton>
                    <ToggleButton
                      value="false"
                      sx={{
                        fontFamily: 'IRANSans'
                      }}
                    >
                      تایید نشده
                    </ToggleButton>
                  </ToggleButtonGroup>
                </FormControl>
              );
            }
          }
        }
      }
    ]);
  }, [provinces, cities, works, completed, confirmed]);

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
    // this.setState({ isLoading: true });
    httpService
      .get(
        `${API_BASE_URL}/api/management/club/matches/?limit=${page *
          rowsPerPage +
          rowsPerPage}&offset=${page}`
      )

      .then(res => {
        if (res.status === 200) {
          // var array = Object.keys(res.data.results).map(function(key) {
          //   return res.data.results[key];
          // });
          // console.log('arr', array);
          setData(res.data.results);
          setCount(res.data.count);
        }
      });
  }

  useEffect(() => {
    getData(page, rowsPerPage);
  }, []);

  function changePage(page, rowsPerPage, sortOrder) {
    // this.setState({
    //   isLoading: true,
    // });
    setRowsPerPage(rowsPerPage);
    httpService
      .get(
        `${API_BASE_URL}/api/management/user/?limit=${page * rowsPerPage +
          rowsPerPage}&offset=${page}`
      )
      .then(res => {
        if (res.status === 200) {
          setData(res.data.results);
          setCount(res.data.count);
        }
      });
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
      // a developer could react to change on an action basis or
      // examine the state as a whole and do whatever they want

      switch (action) {
        case 'changeRowsPerPage':
          changePage(
            tableState.page,
            tableState.rowsPerPage
            // tableState.sortOrder
          );
          break;
        // case 'sort':
        //   this.sort(tableState.page, tableState.sortOrder);
        //   break;

        // case 'filterChange'
        default:
          console.log('action not handled.', action, tableState);
      }
    }
  };

  function onHandleColumnReorder(result) {
    // setNewColumns(result);
    // console.log('result', result);
    // console.log('columnOrder', newColumns);
  }

  function modalAction(rowUser) {
    setUser(rowUser);
    setOpenModal(!openModal);
  }

  function getRowData(row) {
    if (props.handleClose !== undefined) {
      props.handleClose();
    }
    return returnFunction(row);
  }

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <Card>
          {/* <PerfectScrollbar> */}
          <Box sx={{ height: '87vh' }}>
            {/* {data && ( */}
            <MUIDataTable
              title={'لیست'}
              data={data}
              columns={columns}
              options={tableOptions}
              components={components}
            />
            {/* )} */}
          </Box>
          {/* </PerfectScrollbar> */}
        </Card>
      </ThemeProvider>
    </CacheProvider>
  );
};

AllUsersTable.propTypes = {
  className: PropTypes.string
};

export default AllUsersTable;
