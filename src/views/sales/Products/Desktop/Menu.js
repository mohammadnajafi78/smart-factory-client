import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import { Checkbox, Divider, FormControlLabel, FormGroup } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InputLabelHeader from 'src/components/Desktop/InputLabel';
import { useEffect } from 'react';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useState } from 'react';
import useSaleSearch from 'src/hooks/useSaleSearch';

const MenuRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
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
    ...other
  } = props;
  const { setFilterProducts } = useSaleSearch();

  return (
    <MenuRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          {isChild ? (
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      padding: '2px',
                      margin: '0px 6px',
                      color: '#99AEC5',
                      width: '12px',
                      fontSize: '14px'
                    }}
                    onClick={() => {
                      if (subCatIds.includes(id)) {
                        setSubCatIds(subCatIds.filter(item => item !== id));
                      } else {
                        setSubCatIds([...subCatIds, id]);
                      }
                    }}
                  />
                }
                label={
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
                }
              />
            </FormGroup>
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

export default function GmailTreeView() {
  const [data, setData] = useState(null);
  const { setFilterProducts } = useSaleSearch();
  const [catIds, setCatIds] = useState([]);
  const [subCatIds, setSubCatIds] = useState([]);

  useEffect(() => {
    // if (subCatIds.length > 0) {
    console.log('subCatIds', subCatIds);
    setFilterProducts([], subCatIds);
    // }
  }, [subCatIds]);

  useEffect(() => {
    setCatIds([]);
    setSubCatIds([]);

    httpService
      .get(`${API_BASE_URL}/api/products/category/get_category_list?ref=shop`)
      .then(res => {
        if (res.status === 200) {
          setData(res.data);
        }
      });
  }, []);

  useEffect(() => {
    if (catIds.length > 0) {
      setFilterProducts(catIds, []);
    }
  }, [catIds]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '20px',
        gap: '40px',
        // width: '300px',
        height: '84vh',
        background: '#FFFFFF',
        boxShadow: '0px 0px 8px rgba(146, 146, 146, 0.25)',
        borderRadius: '8px'
      }}
    >
      <InputLabelHeader
        style={{ fontSize: '16px', fontWeight: 500, color: '#00346D' }}
      >
        دسته محصولات
      </InputLabelHeader>
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
                  labelText={item?.translate_detail?.item_fa}
                  // labelIcon={Label}
                  onClick={() => {
                    setCatIds([item.id]);
                    setSubCatIds([]);
                  }}
                >
                  {item?.subcategories.map((subItem, subKey) => {
                    return (
                      <Menu
                        nodeId={subItem.id + subKey + 1000}
                        labelText={subItem?.translate_detail?.item_fa}
                        // labelIcon={SupervisorAccountIcon}
                        // labelInfo="90"
                        // color="#1a73e8"
                        // bgColor="#e8f0fe"
                        id={subItem.id}
                        isChild
                        subCatIds={subCatIds}
                        setSubCatIds={setSubCatIds}
                      />
                    );
                  })}
                </Menu>
                <Divider sx={{ margin: '10px 0px' }} />
              </div>
            );
          })}
      </TreeView>
    </Box>
  );
}
