import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import { Checkbox } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect } from 'react';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useState } from 'react';
import useSaleSearch from 'src/hooks/useSaleSearch';
import { useSnackbar } from 'notistack';

const MenuRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    backgroundColor: '#E6EBF0',
    padding: '4px',
    margin: '4px 0px',
    borderRadius: '4px',
    // borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.MuiTreeItem-content': {
      flexDirection: 'row-reverse'
    },
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)'
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit'
    }
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2)
    }
  }
}));

function Menu(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    isChild,
    id,
    subCatIds,
    setSubCatIds,
    setCatIds,
    catIds,
    ...other
  } = props;
  const { setFilterProducts } = useSaleSearch();

  return (
    <MenuRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          {isChild ? (
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
              <Checkbox
                size="small"
                sx={{
                  padding: '2px',
                  margin: '0px 6px',
                  color: '#99AEC5',
                  width: '12px',
                  fontSize: '14px'
                }}
                checked={subCatIds.filter(item => item === id).length > 0}
                onClick={() => {
                  if (subCatIds.includes(id)) {
                    if (subCatIds.filter(item => item !== id).length > 0)
                      setFilterProducts(
                        [],
                        subCatIds.filter(item => item !== id)
                      );
                    else setFilterProducts(catIds, []);

                    setSubCatIds(subCatIds.filter(item => item !== id));
                  } else {
                    setFilterProducts([], [...subCatIds, id]);
                    setSubCatIds([...subCatIds, id]);
                  }
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'inherit',
                  flexGrow: 1,
                  fontSize: '13px',
                  fontWeight: 300,
                  color: '#00346D'
                }}
              >
                {labelText}
              </Typography>
            </Box>
          ) : (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'inherit',
                flexGrow: 1,
                fontSize: '14px',
                fontWeight: 500,
                color: '#00346D',
                lineHeight: '25px'
              }}
            >
              {labelText}
            </Typography>
          )}
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor
      }}
      {...other}
    />
  );
}

Menu.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired
};

export default function ProjectTreeView(props) {
  const [data, setData] = useState(null);
  const { setFilterProducts, getProducts } = useSaleSearch();
  const [catIds, setCatIds] = useState([]);
  const [subCatIds, setSubCatIds] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setCatIds([]);
    setSubCatIds([]);

    httpService
      .get(`${API_BASE_URL}` + props.url)
      .then(res => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch(ex => {
        if (ex.response.status === 417) {
          enqueueSnackbar(ex.response.data.error, { variant: 'error' });
        } else {
          enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
            variant: 'error'
          });
        }
      });
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
        // gap: '20px'
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between'
          //   mt: 2
        }}
      >
        {/* <InputLabelHeader
          style={{ fontSize: '14px', fontWeight: 500, color: '#00346D' }}
        >
          نوع طراحی
        </InputLabelHeader> */}
        {/* {catIds.length > 0 || subCatIds.length > 0 ? (
          <IconButton
            onClick={() => {
              setCatIds([]);
              setSubCatIds([]);
              getProducts();
            }}
          >
            <FilterAlt sx={{ color: '#00AAB5' }} />
          </IconButton>
        ) : (
          <FilterAltOff sx={{ color: '#00AAB5' }} />
        )} */}
      </Box>
      <TreeView
        aria-label="gmail"
        // defaultExpanded={['3']}
        defaultCollapseIcon={<KeyboardArrowUpIcon />}
        defaultExpandIcon={<KeyboardArrowDownIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{
          flexGrow: 1,
          width: '100%',
          overflowY: 'auto',
          paddingRight: '15px'
        }}
        multiSelect={true}
      >
        {data &&
          data.map((item, key) => {
            return (
              <div key={key}>
                <Menu
                  nodeId={key}
                  labelText={item?.name}
                  // labelIcon={Label}
                  onClick={() => {
                    setCatIds([item.id]);
                    setSubCatIds([]);
                    setFilterProducts([item.id], []);
                  }}
                >
                  {item?.child.map((subItem, subKey) => {
                    return (
                      <Menu
                        nodeId={subItem.id + subKey + 1000}
                        labelText={subItem?.name}
                        // labelIcon={SupervisorAccountIcon}
                        // labelInfo="90"
                        // color="#1a73e8"
                        // bgColor="#e8f0fe"
                        id={subItem.id}
                        isChild
                        subCatIds={subCatIds}
                        setSubCatIds={setSubCatIds}
                        catIds={catIds}
                        setCatIds={setCatIds}
                      />
                    );
                  })}
                </Menu>
                {/* <Divider sx={{ margin: '10px 0px' }} /> */}
              </div>
            );
          })}
      </TreeView>
    </Box>
  );
}
