import React, { useState, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';

import { Box, Card, Typography, Link, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MaterialTable, { Column, MTableFilterRow } from 'material-table';
//import axios from "axios";
// import axios from 'src/utils/axios';
// import {
//   DatePicker,
//   DateTimePicker,
//   MuiPickersUtilsProvider
// } from '@material-ui/pickers';
// import JalaliUtils from '@date-io/jalaali';
// import jMoment from 'moment-jalaali';
import { Link as RouterLink, useHistory } from 'react-router-dom';
// import moment from 'moment';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
// import { API_BASE_URL, UI_BASE_URL } from '../../../utils/urls';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog/Dialog';
import Button from '@mui/material/Button';
//import IrisaConfirmationDialog from "../../components/ConfirmationDialog";
//import {createApi} from "../../../utils/FetchSign";
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
// import { converterForIbxSelect } from 'src/utils/helpers';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/FileUpload';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterIcon from '@mui/icons-material/FilterAlt';

// jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const muiCache = createCache({
  key: 'mui-datatables',
  prepend: true
});

let theme = createTheme({
  components: {
    MUIDataTable: {
      styleOverrides: {
        root: {
          //backgroundColor: 'red',
          direction: 'rtl',
          fontFamily: 'IRANSans'
        },
        paper: {
          boxShadow: 'none'
        },
        caption: {
          left: '0px'
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
          fontWeight: 8
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
          fontSize: 12
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
          position: 'absolute',
          left: 0,
          top: 0,
          width: '1200px',

          '&:hover': {
            backgroundColor: 'white'
          }
        }
      }
    }
  }
});

theme = responsiveFontSizes(theme);

const TaskListGrid = props => {
  const { className, rest, returnFunction, gridData } = props;

  const tableRef = React.createRef();
  const [user, setUser] = useState();
  //   const [strDate, setStrDate] = useState();
  //   const [endDate, setEndDate] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [newColumns, setNewColumns] = useState([]);
  const [columns, setColumns] = useState([
    {
      name: 'taskState',
      label: ' ',
      options: {
        customBodyRender: data => (
          <>
            {data !== null && data !== undefined ? (
              data.toLowerCase() === 'assigned' ? (
                <AssignmentOutlinedIcon style={{ color: '#57c5f7' }} />
              ) : data.toLowerCase() === 'completed' ? (
                <AssignmentTurnedInOutlinedIcon
                  style={{ color: '#7fd41b' }}
                  color={'action'}
                />
              ) : data.toLowerCase() === 'expired' ? (
                <AssignmentLateOutlinedIcon style={{ color: '#ed453e' }} />
              ) : data.toLowerCase() === 'alerted' ? (
                <AssignmentLateOutlinedIcon
                  style={{ color: '#ed453e', fontSize: 15 }}
                />
              ) : (
                <LockOpenRoundedIcon style={{ color: 'green' }} />
              )
            ) : (
              ''
            )}
          </>
        ),
        filter: false,
        viewColumns: false
      }
    },
    {
      name: 'taskTitle',
      label: 'عنوان وظیفه',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log('tableMeta =>', tableMeta);
          return (
            <Link
              underline={'hover'}
              color="textPrimary"
              onClick={() => getRowData(value)}
              component={RouterLink}
              to={{
                pathname: `/app/processviewer`,
                state: {
                  data: {
                    taskState: tableMeta.rowData?.[0],
                    type: 'continue'
                    //taskId: rowData.taskId,
                    //name: rowData.flowId,
                    //selectedFilter: this.state.selectedTaskFilter,
                    // dn: rowData.partialUrl + "/" + rowData.flowId + "/" + rowData.taskId,
                    //processInstanceId: rowData.processInstanceId,
                    //requestId: rowData.requestId,
                    //tableName: rowData.tableName,
                    //compositeDn: rowData.compositeDn,
                    //processName: rowData.processName
                  }
                }
              }}
              variant="h6"
            >
              <h6 style={{ color: '#3f51b5', fontSize: '10px' }}>{value}</h6>
            </Link>
          );
        }
      },
      filterType: 'custom',
      filterOptions: {
        // logic: (location, filters, row) => {
        //   if (filters.length) return !filters.includes(location);
        //   return false;
        // },
        display: (filterList, onChange, index, column) => {
          const optionValues = ['Minneapolis', 'New York', 'Seattle'];
          return (
            <FormControl>
              <InputLabel htmlFor="select-multiple-chip">Location</InputLabel>
              <TextField
                id="password"
                aria-describedby="my-helper-text"
                fullWidth
                placeholder="رمز عبور"
                sx={{
                  background: '#F2F2F2',
                  borderRadius: '4px',
                  margin: '6px 3px'
                }}
                //   value={values.password}
                //   onChange={handleChange}
              />
            </FormControl>
          );
        }
      }
    },
    { name: 'requestCode', label: 'کد درخواست' },
    { name: 'requestDes', label: 'عنوان درخواست' },
    {
      name: 'assignedDate',
      label: 'تاریخ انتصاب',
      options: {
        sort: true,
        customBodyRender: (data, dataIndex, rowIndex) => (
          <div>
            {data !== null ? (
              <h3>
                {moment(data, 'YYYY/MM/DD HH:mm:ss', 'fa')
                  .format('YYYY/MM/DD')
                  .toLocaleLowerCase('fa')}
              </h3>
            ) : (
              '-'
            )}
          </div>
        )
      }
    },
    { name: 'creatorName', label: 'ایجاد کننده' },
    { name: 'flowId', label: 'شماره درخواست' },
    {
      name: 'details',
      label: ' ',
      options: {
        customBodyRender: rowData => (
          <div>
            <IconButton
              onClick={() => modalAction(rowData.PERSONAL_CODE)}
              size="large"
            >
              <Tooltip label={'اطلاعات بیشتر'}>
                <ErrorOutlineRoundedIcon
                  color="disabled"
                  style={{ cursor: 'pointer' }}
                />
              </Tooltip>
            </IconButton>
          </div>
        ),
        filter: false,
        viewColumns: false
      }
    }
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

  const [data] = useState(props.gridData);

  const tableOptions = {
    filter: true,
    selectableRows: false,
    filterType: 'textField',
    rowsPerPage: '15',
    //rowsPerPageOptions: rowsPerPageOptions,
    print: false,
    //search: true,
    responsive: 'vertical',
    //download: true,
    downloadOptions: {
      filename: 'لیست وظایف',
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
    setRowProps: (row, dataIndex, rowIndex) => {
      console.log('row', row);
      console.log('dataIndex', dataIndex);
      console.log('rowIndex', rowIndex);
      return <div></div>;
    },
    //columnOrder:[],
    resizableColumns: false,
    textLabels: {
      body: {
        noMatch: 'رکوردی برای نمایش نیست',
        toolTip: (
          <Typography variant="body2" color="inherit">
            مرتب سازی{' '}
          </Typography>
        ),
        columnHeaderTooltip: column => (
          <Typography variant="body2" color="inherit">
            {' '}
            مرتب سازی براساس {column.label}{' '}
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
        reset: 'حذف فیلتر'
      },
      viewColumns: {
        title: 'نمایش ستونها',
        titleAria: 'نمایش/عدم نمایش ستونها'
      },
      selectedRows: {
        text: 'سطر(های) انتخاب شده',
        delete: 'حذف',
        deleteAria: 'حذف سطر(های) انتخاب شده'
      }
    }
  };

  function onHandleColumnReorder(result) {
    setNewColumns(result);
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
            <Box>
              <MUIDataTable
                //title={"لیست وظایف"}
                data={gridData}
                columns={newColumns.length > 0 ? newColumns : columns}
                options={tableOptions}
                components={components}
              />
            </Box>
          </PerfectScrollbar>
        </Card>
      </ThemeProvider>
    </CacheProvider>
  );
};

TaskListGrid.propTypes = {
  className: PropTypes.string
};

export default TaskListGrid;
