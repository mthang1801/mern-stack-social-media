import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useLocale from '../../locales';
import { FaWrench } from 'react-icons/fa';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import { useHistory } from 'react-router-dom';
export default function ResponsiveDialog() {
  const {
    translation: { alert },
  } = useLocale();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <h2
            style={{
              fontSize: '2.5rem',
              lineHeight: 1,
              textAlign: 'center',
              color: 'orange',
            }}
          >
            <FaWrench />
          </h2>
        </DialogTitle>
        <DialogContent>
          <h3 style={{ fontSize: '1.25rem' }}>{alert.developing}</h3>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            style={{ margin: '1rem auto 2rem auto' }}
            onClick={() => history.replace('/')}
          >
            Home
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
