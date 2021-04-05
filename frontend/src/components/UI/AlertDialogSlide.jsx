import React, {} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useQuery} from "@apollo/client"
import {GET_DIALOG} from "../../apollo/operations/queries/cache";
import {cacheMutations} from "../../apollo/operations/mutations/cache"

function AlertDialogSlide() {    
  const {data : {dialog}} = useQuery(GET_DIALOG);
  const {title, content} = dialog; 
  const {setDialog} = cacheMutations
  const handleClose = () => {       
    setDialog({title : "", content: "", agree : false, data: null});
  };
  const handleAgree = () => {
    setDialog({...dialog, agree : true, title: "", content: "" });
  }
  return (
    <div>
      <Dialog
        open={title && content}                
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default React.memo(AlertDialogSlide)