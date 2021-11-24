import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import PostEditor from './PostEditor/PostEditor';
import { PostEditorContainer } from './styles/EditPostDialog.styles';
const EditPostDialog = ({ open, setOpen, editedEditorState, post }) => {
  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth="sm"
      onClose={() => setOpen(false)}
    >
      <PostEditorContainer>
        <PostEditor
          isEdited
          editedEditorState={editedEditorState}
          postEdited={post}
          openEdited={open}
          setOpenEdited={setOpen}
        />
      </PostEditorContainer>
    </Dialog>
  );
};

export default EditPostDialog;
