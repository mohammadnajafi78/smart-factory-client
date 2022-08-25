import React, { useState, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';

import {
  Box,
  Card,
  Typography,
  Link,
  TextField,
  FormControl,
  InputLabel
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

const muiCache = createCache({
  key: 'mui-datatables',
  prepend: true
});

let theme = createTheme({
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
          fontSize: 12
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
  const [columns, setColumns] = useState([
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
                  sx={{
                    background: '#F2F2F2',
                    borderRadius: '4px'
                    // margin: '6px 3px'
                  }}
                  value={filterList[index]}
                  onChange={event => {
                    filterList[index] = event.target.value;
                    onChange(filterList[index], index, column);
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
                  sx={{
                    background: '#F2F2F2',
                    borderRadius: '4px',
                    margin: '6px 3px'
                  }}
                  value={filterList[index][0] || ''}
                  onChange={event => {
                    filterList[index][0] = event.target.value;
                    onChange(filterList[index], index, column);
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
      label: 'شماره موبایل'
    },
    {
      name: 'location.province_name',
      label: 'استان'
    },
    {
      name: 'location.city_name',
      label: 'شهر'
    },
    {
      name: 'user.user_type_list',
      label: 'فعالیت',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value.map(option => option.translate).toString();
        }
      }
    },
    {
      name: 'user.profile_is_completed',
      label: 'تکمیل شده',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value === true ? 'بله' : 'خیر';
        }
      }
    },
    {
      name: 'user.is_verified',
      label: 'تایید شده',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value === true ? 'بله' : 'خیر';
        }
      }
    }
    // {
    //   name: 'user.first_name',
    //   label: 'کد پستی'
    // }
    // {
    //   name: 'taskTitle',
    //   label: 'شماره موبایل',
    //   filterType: 'custom',
    //   filterOptions: {
    //     display: (filterList, onChange, index, column) => {
    //       const optionValues = ['Minneapolis', 'New York', 'Seattle'];
    //       return (
    //         <FormControl>
    //           <InputLabel htmlFor="select-multiple-chip">Location</InputLabel>
    //           <TextField
    //             id="password"
    //             aria-describedby="my-helper-text"
    //             fullWidth
    //             placeholder="رمز عبور"
    //             sx={{
    //               background: '#F2F2F2',
    //               borderRadius: '4px',
    //               margin: '6px 3px'
    //             }}
    //             //   value={values.password}
    //             //   onChange={handleChange}
    //           />
    //         </FormControl>
    //       );
    //     }
    //   }
    // },
    // { name: 'requestCode', label: 'کد پستی' },
    // { name: 'requestDes', label: 'آدرس' }
    // {
    //   name: 'assignedDate',
    //   label: 'تاریخ انتصاب',
    //   filterOptions: {
    //     display: (filterList, onChange, index, column) => {
    //       const optionValues = ['Minneapolis', 'New York', 'Seattle'];
    //       return (
    //         <FormControl>
    //           <InputLabel htmlFor="select-multiple-chip">Location</InputLabel>
    //           <TextField
    //             id="password"
    //             aria-describedby="my-helper-text"
    //             fullWidth
    //             placeholder="رمز عبور"
    //             sx={{
    //               background: '#F2F2F2',
    //               borderRadius: '4px',
    //               margin: '6px 3px'
    //             }}
    //             //   value={values.password}
    //             //   onChange={handleChange}
    //           />
    //         </FormControl>
    //       );
    //     }
    //   }
    // },
    // {
    //   name: 'creatorName',
    //   label: 'ایجاد کننده',
    //   filterOptions: {
    //     display: (filterList, onChange, index, column) => {
    //       const optionValues = ['Minneapolis', 'New York', 'Seattle'];
    //       return (
    //         <FormControl>
    //           <InputLabel htmlFor="select-multiple-chip">Location</InputLabel>
    //           <TextField
    //             id="password"
    //             aria-describedby="my-helper-text"
    //             fullWidth
    //             placeholder="رمز عبور"
    //             sx={{
    //               background: '#F2F2F2',
    //               borderRadius: '4px',
    //               margin: '6px 3px'
    //             }}
    //             //   value={values.password}
    //             //   onChange={handleChange}
    //           />
    //         </FormControl>
    //       );
    //     }
    //   }
    // },
    // { name: 'flowId', label: 'شماره درخواست' },
    // {
    //   name: 'details',
    //   label: ' ',
    //   filterOptions: {
    //     display: (filterList, onChange, index, column) => {
    //       const optionValues = ['Minneapolis', 'New York', 'Seattle'];
    //       return (
    //         <FormControl>
    //           <InputLabel htmlFor="select-multiple-chip">Location</InputLabel>
    //           <TextField
    //             id="password"
    //             aria-describedby="my-helper-text"
    //             fullWidth
    //             placeholder="رمز عبور"
    //             sx={{
    //               background: '#F2F2F2',
    //               borderRadius: '4px',
    //               margin: '6px 3px'
    //             }}
    //             //   value={values.password}
    //             //   onChange={handleChange}
    //           />
    //         </FormControl>
    //       );
    //     }
    //   }
    // }
  ]);

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
        `${API_BASE_URL}/api/management/user/?limit=${page * rowsPerPage +
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

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  function changePage(page, rowsPerPage, sortOrder) {
    // this.setState({
    //   isLoading: true,
    // });
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
      console.log(action, tableState);

      // a developer could react to change on an action basis or
      // examine the state as a whole and do whatever they want

      switch (action) {
        case 'changePage':
          changePage(
            tableState.page,
            tableState.rowsPerPage
            // tableState.sortOrder
          );
          break;
        // case 'sort':
        //   this.sort(tableState.page, tableState.sortOrder);
        //   break;
        default:
          console.log('action not handled.');
      }
    }
  };

  function onHandleColumnReorder(result) {
    // setNewColumns(result);
    console.log('result', result);
    console.log('columnOrder', newColumns);
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
          <PerfectScrollbar>
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
          </PerfectScrollbar>
        </Card>
      </ThemeProvider>
    </CacheProvider>
  );
};

AllUsersTable.propTypes = {
  className: PropTypes.string
};

export default AllUsersTable;
