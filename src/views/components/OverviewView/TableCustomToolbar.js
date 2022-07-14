import React, { useRef, useState } from 'react';
import {
  IconButton,
  Popover,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import MoreIcon from '@mui/icons-material/MoreVert';
import { DragDropContext } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import ChangeColumnOrder from './ChangeColumnOrder';
import { useSnackbar } from 'notistack';
import ThreeSixtyRoundedIcon from '@mui/icons-material/ThreeSixtyRounded';

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: 'IRANSans',
    fontSize: '12px'
  },
  badge: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 5
  },
  popover: {
    width: 320,
    padding: theme.spacing(2)
  }
}));

function TableCustomToolbar(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [columns, setColumns] = useState(props.columns);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onColumnReorder(columns);
  };
  const onColumnUpdate = (finalIndex, firstIndex) => {
    let result = Array.from(columns);
    const [removed] = result.splice(firstIndex, 1);
    console.log('removed', removed);
    result.splice(finalIndex, 0, removed);

    console.log('result', result);

    return result;
  };
  const handleDragEnd = async ({ source, destination, draggableId }) => {
    try {
      // Dropped outside the list
      if (!destination) {
        return;
      }
      // Card has not been moved
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        setColumns(
          onColumnUpdate(destination.index, source.index, draggableId)
        );
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar(t('Something went wrong'), {
        variant: 'error'
      });
    }
  };

  return (
    <Toolbar
      style={{
        display: 'inline-block',
        margin: '0px',
        padding: '0px'
      }}
    >
      <Tooltip
        title={
          <Typography variant="caption" color="inherit">
            {t('Column Order')}
          </Typography>
        }
      >
        <IconButton edge="end" ref={ref} onClick={handleOpen} size="large">
          <ThreeSixtyRoundedIcon />
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <ChangeColumnOrder columns={columns} />
        </DragDropContext>
      </Popover>
    </Toolbar>
  );
}

export default TableCustomToolbar;
