import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from 'src/components/Page';
import { useTranslation } from 'react-i18next';
import FilesDropzone from '../../../components/FilesDropzone';
import MaterialDataTable from '../../../components/MaterialDataTable';
import TableTest from '../../../views/components/TableTest';
//import ServerData from "./ServerData";
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Switch from '@mui/material/Switch/Switch';
// import JalaliUtils from '@date-io/jalaali';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateTimePicker } from '@mui/lab';
import moment from 'moment';
import jMoment from 'moment-jalaali';

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

const ComponentsOverview = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const columns = [
    {
      columnId: 1,
      name: 'Id',
      label: 'شناسه',
      options: {
        filter: false,
        sort: false,
        display: true
      }
    },
    {
      columnId: 2,
      name: 'name',
      label: 'نام',
      options: {
        filter: true,
        sort: true,
        display: true
      }
    },
    {
      columnId: 3,
      name: 'title',
      label: 'عنوان',
      options: {
        filter: true,
        sort: false,
        display: true,
        hint: 'توضیحی در ارتباط با عنوان'
      }
    },
    {
      columnId: 4,
      name: 'location',
      label: 'موقعیت',
      options: {
        filter: true,
        sort: false,
        display: true
      }
    },
    {
      columnId: 5,
      name: 'age',
      label: 'سن',
      options: {
        filter: true,
        sort: false,
        display: true
      }
    },
    {
      columnId: 6,
      name: 'salary',
      label: 'حقوق',
      options: {
        filter: true,
        sort: true,
        display: true
      }
    },
    {
      columnId: 7,
      name: 'status',
      label: 'وضعیت',
      options: {
        filter: true,
        display: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          //console.log('tableMeta', tableMeta);
          return (
            <FormControlLabel
              label={value ? 'Yes' : 'No'}
              value={value ? 'Yes' : 'No'}
              control={
                <Switch
                  color="primary"
                  checked={value}
                  value={value ? 'Yes' : 'No'}
                />
              }
              onChange={event => {
                updateValue(event.target.value !== 'Yes');
              }}
            />
          );
        }
      }
    },
    {
      columnId: 8,
      name: 'Date',
      label: 'تاریخ',
      options: {
        filter: true,
        display: true,
        filterType: 'textField',
        customBodyRender: () => {
          return (
            <div>
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  fullWidth
                  inputVariant="outlined"
                  label={t('Start date')}
                  okLabel="تأیید"
                  cancelLabel="لغو"
                  clearLabel="پاک کردن"
                  labelFunc={date =>
                    date ? date.format('jYYYY/jMM/jDD hh:mm A') : ''
                  }
                  name="start"
                  //onClick={() => setFieldTouched('end')}
                  //onChange={(date) => setFieldValue('start', date)}
                  value={moment().toDate()}
                />
              </LocalizationProvider> */}
            </div>
          );
        }
      }
    }
  ];
  const data = [
    ['1', 'Gabby George', 'Business Analyst', 'Minneapolis', 30, '$100,000'],
    ['2', 'Aiden Lloyd', 'Business Consultant', 'Dallas', 55, '$200,000'],
    ['3', 'Jaden Collins', 'Attorney', 'Santa Ana', 27, '$500,000'],
    ['4', 'Franky Rees', 'Business Analyst', 'St. Petersburg', 22, '$50,000'],
    ['5', 'Aaren Rose', 'Business Consultant', 'Toledo', 28, '$75,000'],
    [
      '6',
      'Blake Duncan',
      'Business Management Analyst',
      'San Diego',
      65,
      '$94,000'
    ],
    [
      '7',
      'Frankie Parry',
      'Agency Legal Counsel',
      'Jacksonville',
      71,
      '$210,000'
    ],
    ['8', 'Lane Wilson', 'Commercial Specialist', 'Omaha', 19, '$65,000'],
    ['9', 'Robin Duncan', 'Business Analyst', 'Los Angeles', 20, '$77,000'],
    [
      '10',
      'Mel Brooks',
      'Business Consultant',
      'Oklahoma City',
      37,
      '$135,000'
    ],
    ['11', 'Harper White', 'Attorney', 'Pittsburgh', 52, '$420,000'],
    ['12', 'Kris Humphrey', 'Agency Legal Counsel', 'Laredo', 30, '$150,000'],
    ['13', 'Frankie Long', 'Industrial Analyst', 'Austin', 31, '$170,000'],
    ['14', 'Brynn Robbins', 'Business Analyst', 'Norfolk', 22, '$90,000'],
    ['15', 'Justice Mann', 'Business Consultant', 'Chicago', 24, '$133,000'],
    [
      '16',
      'Addison Navarro',
      'Business Management Analyst',
      'New York',
      50,
      '$295,000'
    ],
    ['17', 'Jesse Welch', 'Agency Legal Counsel', 'Seattle', 28, '$200,000'],
    ['18', 'Eli Mejia', 'Commercial Specialist', 'Long Beach', 65, '$400,000'],
    ['19', 'Gene Leblanc', 'Industrial Analyst', 'Hartford', 34, '$110,000'],
    ['20', 'Danny Leon', 'Computer Scientist', 'Newark', 60, '$220,000'],
    ['21', 'Lane Lee', 'Corporate Counselor', 'Cincinnati', 52, '$180,000'],
    ['22', 'Jesse Hall', 'Business Analyst', 'Baltimore', 44, '$99,000'],
    ['23', 'Danni Hudson', 'Agency Legal Counsel', 'Tampa', 37, '$90,000'],
    ['24', 'Terry Macdonald', 'Commercial Specialist', 'Miami', 39, '$140,000'],
    ['25', 'Justice Mccarthy', 'Attorney', 'Tucson', 26, '$330,000'],
    ['26', 'Silver Carey', 'Computer Scientist', 'Memphis', 47, '$250,000'],
    ['27', 'Franky Miles', 'Industrial Analyst', 'Buffalo', 49, '$190,000'],
    ['28', 'Glen Nixon', 'Corporate Counselor', 'Arlington', 44, '$80,000'],
    [
      '29',
      'Gabby Strickland',
      'Business Process Consultant',
      'Scottsdale',
      26,
      '$45,000'
    ],
    ['30', 'Mason Ray', 'Computer Scientist', 'San Francisco', 39, '$142,000']
  ];

  function customFilterDialogFooter(currentFilterList, applyNewFilters) {
    return (
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <Button
          color="secondary"
          size="small"
          variant="contained"
          onClick={applyNewFilters}
        >
          اعمال فیلتر
        </Button>
      </div>
    );
  }

  return (
    <Page className={classes.root} title={t('Components Overview')}>
      <Container maxWidth="lg">
        <Card>
          <CardHeader title={t('Upload Component')} />
          <Divider />
          <CardContent>
            <FilesDropzone />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title={t('Table Component')} />
          <Divider />
          <CardContent>
            <MaterialDataTable
              columns={columns}
              data={data}
              title={'عنوان جدول'}
              selectableRows={'multiple'}
              filter={true}
              print={true}
              search={true}
              download={true}
              rowsPerPage={5}
              customFilterDialogFooter={customFilterDialogFooter}
              draggableColumnsEnabled={true}
              rowsPerPageOptions={[2, 5, 10]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title={t('Table Component')} />
          <Divider />
          <CardContent>
            <TableTest />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default ComponentsOverview;
