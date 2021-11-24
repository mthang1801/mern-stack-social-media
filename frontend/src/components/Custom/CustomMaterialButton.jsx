import React from 'react';
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple, red, blue } from '@material-ui/core/colors';

export const AcceptButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[600]),
    fontWeight: 600,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

export const DenyButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[600]),
    fontWeight: 600,
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);
