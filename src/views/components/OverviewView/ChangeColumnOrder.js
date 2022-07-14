import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import makeStyles from '@mui/styles/makeStyles';
import { useTranslation } from 'react-i18next';
import { CardContent } from '@mui/material';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from '@mui/material/Card';
import clsx from 'clsx';

const useStyles = makeStyles(
  theme => ({
    root: {
      padding: '16px 24px 16px 24px',
      fontFamily: 'IRANSans',
      fontSize: '11px'
    },
    title: {
      marginLeft: '-7px',
      marginRight: '24px',
      fontSize: '14px',
      color: theme.palette.text.secondary,
      textAlign: 'left',
      fontWeight: 500
    },
    formGroup: {
      marginTop: '8px'
    },
    formControl: {},
    checkbox: {
      padding: '0px',
      width: '32px',
      height: '32px'
    },
    checkboxRoot: {},
    checked: {},
    label: {
      fontSize: '15px',
      marginLeft: '8px',
      color: theme.palette.text.primary
    },
    popover: {
      width: 320,
      padding: theme.spacing(2)
    },
    droppableArea: {
      minHeight: 80,
      flexGrow: 1,
      overflowY: 'auto',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    card: {
      '&:hover': {
        backgroundColor: theme.palette.background.dark
      }
    },
    dragging: {
      backgroundColor: theme.palette.background.dark
    }
  }),
  { name: 'ChangeColumnOrder' }
);

const ChangeColumnOrder = ({ columns }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <FormControl className={classes.root} aria-label={'ChangeColumnOrderAria'}>
      <Typography variant="caption" className={classes.title}>
        {t('Change Columns Order')}
      </Typography>

      <FormGroup className={classes.formGroup}>
        <Droppable droppableId={'FormGroupId'} type="card">
          {provided => (
            <div
              ref={provided.innerRef}
              classes={{
                root: classes.formControl,
                label: classes.label
              }}
            >
              {columns.map((column, index) => {
                return (
                  column.display !== 'excluded' &&
                  column.viewColumns !== false && (
                    <Draggable
                      draggableId={column.name}
                      index={index}
                      key={column.columnId}
                    >
                      {(provided, snapshot) => (
                        <Card
                          className={clsx(classes.card, {
                            [classes.dragging]: snapshot.isDragging
                          })}
                          raised={snapshot.isDragging}
                          variant={
                            snapshot.isDragging ? 'elevation' : 'outlined'
                          }
                          dragging={'snapshot.isDragging'}
                          index={index}
                          key={index}
                          value={column.name}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <CardContent>
                            <Typography variant="body2" color="textPrimary">
                              {column.label}
                            </Typography>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  )
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </FormGroup>
    </FormControl>
  );
};

ChangeColumnOrder.propTypes = {
  /** Columns used to describe table */
  columns: PropTypes.array.isRequired,
  /** Callback to trigger View column update */
  onColumnUpdate: PropTypes.func,
  /** Extend the style applied to components */
  classes: PropTypes.object
};

export default ChangeColumnOrder;
