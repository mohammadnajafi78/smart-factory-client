import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { useTranslation } from 'react-i18next';
import * as PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import TableCustomToolbar from '../views/components/OverviewView/TableCustomToolbar';

export default function MaterialDataTable(props) {
  const {
    columns,
    data,
    title,
    filter,
    selectableRows,
    rowsPerPage,
    rowsPerPageOptions,
    print,
    search,
    download,
    jumpToPage,
    rowHover,
    selectableRowsHeader,
    confirmFilters,
    draggableColumnsEnabled,
    columnHeader,
    customFilterDialogFooter,
    pagination

  } = props;

  const { t } = useTranslation();
  const [newColumns, setNewColumns] = useState([]);

  function onHandleColumnReorder(result) {
    setNewColumns(result);
    console.log('result', result);
    console.log('columnOrder', newColumns);
  }


  const options = {
    filter: filter,
    selectableRows: selectableRows,
    filterType: 'dropdown',
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: rowsPerPageOptions,
    print: print,
    search: search,
    download: download,
    columnHeader: columnHeader,
    draggableColumns: { enabled: draggableColumnsEnabled, transitionTime: 300 },
    jumpToPage: jumpToPage,
    rowHover: rowHover,
    selectableRowsHeader: selectableRowsHeader,
    confirmFilters: confirmFilters,
    customFilterDialogFooter: customFilterDialogFooter,
    pagination: pagination,
    sortThirdClickReset: true,
/*    setRowProps: (row, dataIndex, rowIndex) => {
      //console.log( row, dataIndex, rowIndex);
      return (
        <div>

        </div>
      );
    },*/
    //columnOrder:[],
    customToolbar: () => {
      return (
        <TableCustomToolbar onColumnReorder={onHandleColumnReorder} {...props}/>
      );
    },
    //resizableColumns: true,
    //responsive: "scroll",
    textLabels: {
      body: {
        noMatch: t('Sorry, no matching records found'),
        toolTip: <Typography
          variant="body2"
          color="inherit"
        >t("Sort") </Typography>,
        columnHeaderTooltip: column => <Typography
          variant="body2"
          color="inherit"
        > {t('Sort for')} {column.label} </Typography>
      },
      pagination: {
        next: t('Next Page'),
        previous: t('Previous Page'),
        rowsPerPage: t('Rows per page'),
        displayRows: t('of'),
        jumpToPage: t('jumpToPage')
      },
      toolbar: {
        search:
          <Typography
            variant="body2"
            color="inherit"
          >
            {t('Search')}
          </Typography>,
        downloadCsv:
          <Typography
            variant="body2"
            color="inherit"
          >
            {t('Download CSV')}
          </Typography>,
        print:
          <Typography
            variant="body2"
            color="inherit"
          >
            {t('Print')}
          </Typography>,
        viewColumns:
          <Typography
            variant="body2"
            color="inherit"
          >
            {t('View Columns')}
          </Typography>,
        filterTable:
          <Typography
            variant="body2"
            color="inherit"
          >
            {t('Filter Table')}
          </Typography>
      },
      filter: {
        all: t('All'),
        title: t('FILTERS'),
        reset: t('RESET')
      },
      viewColumns: {
        title: t('Show Columns'),
        titleAria: t('Show/Hide Table Columns')
      },
      selectedRows: {
        text: t('row(s) selected'),
        delete: t('Delete'),
        deleteAria: t('Delete Selected Rows')
      }
    }
  };


  return (

    <MUIDataTable
      title={title}
      data={data}
      columns={newColumns.length>0 ? newColumns :columns}
      options={options}
    />

  );
}
MaterialDataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string,
        name: PropTypes.string.isRequired,
        options: PropTypes.shape({
          display: PropTypes.oneOf(['true', 'false', 'excluded', 'always']),
          empty: PropTypes.bool,
          filter: PropTypes.bool,
          sort: PropTypes.bool,
          print: PropTypes.bool,
          searchable: PropTypes.bool,
          download: PropTypes.bool,
          viewColumns: PropTypes.bool,
          filterList: PropTypes.array,
          filterOptions: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.shape({
              names: PropTypes.array,
              logic: PropTypes.func,
              display: PropTypes.func
            })
          ]),
          filterType: PropTypes.oneOf(['dropdown', 'checkbox', 'multiselect', 'textField', 'custom']),
          customHeadRender: PropTypes.func,
          customBodyRender: PropTypes.func,
          customBodyRenderLite: PropTypes.func,
          customHeadLabelRender: PropTypes.func,
          customFilterListOptions: PropTypes.oneOfType([
            PropTypes.shape({
              render: PropTypes.func,
              update: PropTypes.func
            })
          ]),
          customFilterListRender: PropTypes.func,
          setCellProps: PropTypes.func,
          setCellHeaderProps: PropTypes.func,
          sortThirdClickReset: PropTypes.bool,
          sortDescFirst: PropTypes.bool
        })
      })
    ])
  ).isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  filter: PropTypes.bool,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  print: PropTypes.bool,
  search: PropTypes.bool,
  download: PropTypes.bool,
  selectableRows: PropTypes.oneOf(['multiple', 'single', 'none']),
  jumpToPage: PropTypes.bool,
  rowHover: PropTypes.bool,
  selectableRowsHeader: PropTypes.bool,
  confirmFilters: PropTypes.bool,
  customFilterDialogFooter: PropTypes.func,
  draggableColumnsEnabled: PropTypes.bool,
  columnHeader: PropTypes.bool,
  pagination: PropTypes.bool

};

MaterialDataTable.defaultProps = {
  columns: ['column1', 'column2'],
  data: [['no data']],
  title: 'table name',
  filter: true,
  selectableRows: 'multiple',
  rowsPerPage: 10,
  rowsPerPageOptions: [10, 15, 100],
  print: true,
  search: true,
  download: true,
  jumpToPage: true,
  rowHover: true,
  selectableRowsHeader: true,
  confirmFilters: true,
  draggableColumnsEnabled: false,
  columnHeader: true,
  pagination: true

};

/** @link source:https://github.com/gregnb/mui-datatables#custom-components **/
