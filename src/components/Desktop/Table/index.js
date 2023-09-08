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
  ToggleButton,
  IconButton,
  TableRow,
  TableCell
} from '@mui/material';
import MUIDataTable from 'mui-datatables';
import TableFooter from '@mui/material/TableFooter';
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
import { Co2Sharp } from '@mui/icons-material';
import { Delete } from '@mui/icons-material';
import PropagateLoader from 'react-spinners/PropagateLoader';

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
        },
        actions: {
          direction: 'ltr'
        },
        displayedRows: {
          fontFamily: 'IRANSans'
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
          color: 'white'
        },
        root: {
          color: 'white',
          backgroundColor: '#00AAB5'
        },
        iconButton: {
          color: 'white'
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

function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  );
}

const Table = props => {
  const [search, setSearch] = useState('');

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

  // useEffect(() => {
  //   props.getData(props.page, props.rowsPerPage, search);
  // }, []);

  useEffect(() => {
    props.getData(props.page, props.rowsPerPage, search);
  }, [props.sort, props.filter]);

  function changePage(page, rowsPerPage) {
    props.setRowsPerPage(rowsPerPage);
    props.getData(page, rowsPerPage, search);
  }

  const tableOptions = {
    filter: true,
    selectableRows:
      props.selectableRows !== undefined ? props.selectableRows : true,
    fixedHeader: true,
    fixedSelectColumn: true,
    tableBodyHeight: '56vh',
    filterType: 'textField',
    rowsPerPage: props.rowsPerPage,
    count: props.count,
    serverSide: true,
    enableNestedDataAccess: '.',
    rowsPerPageOptions: [25, 50, 75],
    print: false,
    search: props.search !== undefined ? props.search : true,
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
        noMatch: (
          <div
            style={{
              margin: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <PropagateLoader
              color="#00AAB5"
              style={{ marginBottom: '30px', marginTop: '10px' }}
            />
          </div>
        ),
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
        case 'changePage':
          changePage(tableState.page, tableState.rowsPerPage);
          break;
        case 'resetFilters':
          props.setReset(true);
          break;
        // case 'sort':
        //   this.sort(tableState.page, tableState.sortOrder);
        //   break;

        // case 'filterChange'
        // default:
        //   console.log('action not handled.', action);
      }
    },
    onFilterChange: (column, filterList, type) => {
      props.onFilterChange(column, filterList, type);
    },
    onColumnSortChange: (changedColumn, direction) => {
      props.onColumnSortChange(changedColumn, direction);
    },
    onRowClick: (rowData, rowState) => {
      props.onRowClick(rowData, rowState);
    },
    onRowsDelete: (rowsDeleted, newData) => {
      props.onRowsDelete(rowsDeleted, newData);
    },
    onSearchChange: text => {
      setSearch(text);
    },
    onSearchClose: () => {
      props.getData(props.page, props.rowsPerPage, '');
    },
    onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
      props.onRowSelectionChange(rowsSelectedData, allRows, rowsSelected);
    },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
      if (props.customToolbarSelectActive === true) {
        return props.customToolbarSelect(
          selectedRows,
          displayData,
          setSelectedRows
        );
      } else
        return (
          <IconButton
            onClick={() => {
              props.onRowsDelete(selectedRows);
              setSelectedRows([]);
            }}
          >
            <Delete style={{ color: 'white' }} />
          </IconButton>
        );
    },
    selectToolbarPlacement: 'replace',

    searchText: search,
    // searchProps: {
    //   onkeydown: e => {
    //     console.log('inja');
    //     if (e.key === 'Enter') {
    //       props.getData(props.page, props.rowsPerPage, search);
    //     }
    //   }
    // }
    searchProps: {
      onKeyDown: e => {
        if (e.key === 'Enter') {
          props.getData(props.page, props.rowsPerPage, search);
        }
      }
    }

    // onSearchClose: () => {
    //   setSearch()
    //   props.getData(props.page, props.rowsPerPage, '');
    // }
  };

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <Card>
          {/* <Box sx={{ height: '72vh', overflow: 'auto' }}> */}
          <MUIDataTable
            title={props.title}
            data={props.data}
            columns={props.columns}
            options={tableOptions}
            components={components}
          />
          {/* </Box> */}
        </Card>
      </ThemeProvider>
    </CacheProvider>
  );
};

Table.propTypes = {
  className: PropTypes.string
};

export default Table;
