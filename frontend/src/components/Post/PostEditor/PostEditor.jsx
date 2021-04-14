import React, { useState, useCallback, useEffect } from "react";
import PostEditorHeader from "./PostEditorHeader";
import PostEditorBody from "./PostEditorBody";
import { EditorWrapper } from "./styles/PostEditor.styles";
import draftToHtml from "draftjs-to-html";
import { useThemeUI } from "theme-ui";
import { EditorState, convertToRaw } from "draft-js";
import useLanguage from "../../Global/useLanguage";
import _ from "lodash";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_POST,
  EDIT_POST,
} from "../../../apollo/operations/mutations/post";
import { cacheMutations } from "../../../apollo/operations/mutations/cache";
import { GET_PERSONAL_USER_CACHE_DATA } from "../../../apollo/operations/queries/cache";
import { Prompt } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

const PostEditor = ({
  editedEditorState,
  isEdited,
  postEdited,
  openEdited,
  setOpenEdited,
}) => {
  const {
    data: { user, currentPersonalUser },
  } = useQuery(GET_PERSONAL_USER_CACHE_DATA);

  const [postStatus, setPostStatus] = useState("PUBLIC");
  const [editorState, setEditorState] = useState(() =>
    editedEditorState ? editedEditorState : EditorState.createEmpty()
  );
  const [isBlocking, setIsBlocking] = useState(false);
  const [images, setImages] = useState([]);
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [openPostEditorDialog, setOpenPostEditorDialog] = useState(false);
  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();
  const { post } = i18n.store.data[lang].translation;
  const [createPost, { loading: createPostLoading }] = useMutation(CREATE_POST);
  const [editPost, { loading: editPostLoading }] = useMutation(EDIT_POST);
  const {
    setNewPost,
    addPostItemToCurrentPersonalUser,
    updatePost,
    updatePostInCurrentPersonalUser,
  } = cacheMutations;
  const handleSetPostStatus = useCallback((status) => {
    setPostStatus(status);
  }, []);

  useEffect(() => {
    if (editorState.getCurrentContent().hasText()) {
      setIsBlocking(true);
    } else {
      setIsBlocking(false);
    }
  }, [editorState]);
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      if (images.length || editorState.getCurrentContent().hasText()) {
        if (
          postStatus === "PUBLIC" ||
          postStatus === "PRIVATE" ||
          postStatus === "FRIENDS"
        ) {
          setDisabledSubmit(false);
        } else {
          setDisabledSubmit(true);
        }
      } else {
        setDisabledSubmit(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [images, editorState, postStatus]);

  const onOpenDialog = useCallback((e) => {
    e.preventDefault();
    setOpenPostEditorDialog(true);
  }, []);

  const onSubmitPostStatus = () => {
    let elementId;
    if (isEdited) {
      elementId = `edited-post-body-${postEdited._id}`;
    } else {
      elementId = "post-editor-body";
    }
    const rawEditorState = convertToRaw(editorState.getCurrentContent());
    const rawText = JSON.stringify(rawEditorState);
    const shortenText = draftToHtml(rawEditorState)
      .split("</p>")[0]
      .replace(/<p>|&nbsp;/g, "");
    document
      .getElementById(elementId)
      ?.querySelector("[contenteditable=true]")
      ?.setAttribute("contenteditable", false);
    const text = document.getElementById(elementId).innerHTML;
    let mentions = [];
    let fileNames = [];
    let fileMimetype = [];
    let fileEncodings = [];

    if (rawEditorState.entityMap) {
      Object.values(rawEditorState.entityMap).map(({ data }) => {
        if (data.mention) {
          mentions.push({ ...data.mention });
        }
      });
    }
    mentions = _.unionBy(mentions, "_id").map((mention) =>
      mention._id.toString()
    );

    if (images.length) {
      fileNames = images.map((image) => image.name);
      fileMimetype = images.map((image) => image.mimetype);
      fileEncodings = images.map((image) => image.src);
    }
    const postData = {
      text,
      shortenText,
      rawText,
      mentions,
      fileNames,
      fileMimetype,
      fileEncodings,
      status: postStatus,
    };
    if (isEdited && postEdited) {
      editPost({ variables: { postId: postEdited._id, ...postData } })
        .then(({ data }) => {
          if (openEdited) {
            setOpenEdited(false);
            setEditorState(EditorState.createEmpty());
          }

          const { editPost } = data;
          updatePost(editPost);
          if (user._id === currentPersonalUser._id) {
            updatePostInCurrentPersonalUser(editPost);
          }
          document
            .getElementById(elementId)
            ?.querySelector("[contenteditable=true]")
            ?.setAttribute("contenteditable", true);
          setEditorState(EditorState.createEmpty());
          setImages([]);
        })
        .catch((err) => {
          console.log(err.message);
          document
            .getElementById(elementId)
            ?.querySelector("[contenteditable=true]")
            ?.setAttribute("contenteditable", true);
        });
    } else {
      createPost({
        variables: {
          text,
          shortenText,
          rawText,
          mentions,
          fileNames,
          fileMimetype,
          fileEncodings,
          status: postStatus,
        },
      })
        .then(({ data }) => {
          if (onOpenDialog) {
            handleCloseDialog();
            setEditorState(EditorState.createEmpty());
          }
          const { createPost } = data;
          setNewPost(createPost);
          if (user._id === currentPersonalUser._id) {
            addPostItemToCurrentPersonalUser(createPost);
          }
          document
            .getElementById(elementId)
            ?.querySelector("[contenteditable=true]")
            ?.setAttribute("contenteditable", true);
          setEditorState(EditorState.createEmpty());
          setImages([]);
        })
        .catch((err) => {
          console.log(err.message);
          document
            .getElementById(elementId)
            ?.querySelector("[contenteditable=true]")
            ?.setAttribute("contenteditable", true);
        });
    }
  };

  const handleCloseDialog = () => {
    setOpenPostEditorDialog(false);
  };

  const PostEditorRoot = (
    <EditorWrapper
      isEdited={isEdited}
      theme={colorMode}
      fullWidth={openPostEditorDialog}
    >
      <Prompt
        when={isBlocking}
        message={(location) =>
          `Are you sure you want to go to ${location.pathname}`
        }
      />
      <PostEditorHeader
        user={user}
        postStatus={postStatus}
        setPostStatus={handleSetPostStatus}
        setOpenDialog={onOpenDialog}
        openDialog={openPostEditorDialog}
        isEdited={isEdited}
      />

      <PostEditorBody
        editorState={editorState}
        setEditorState={setEditorState}
        images={images}
        setImages={setImages}
        isEdited={isEdited}
        postEdited={postEdited}
        id={
          postEdited ? `edited-post-body-${postEdited._id}` : "post-editor-body"
        }
      />

      {!disabledSubmit && (
        <Button
          variant="contained"
          color="primary"
          disabled={disabledSubmit}
          onClick={onSubmitPostStatus}
          style={{ display: "block", width: "95%", margin: "0.5rem auto" }}
        >
          {post.post}
        </Button>
      )}
    </EditorWrapper>
  );

  const PostEditorOnOpenDialog = (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={openPostEditorDialog}
      onClose={handleCloseDialog}
      aria-labelledby="max-width-dialog-title"
      style={{ maxWidth: "800px", margin: "auto" }}
    >
      {PostEditorRoot}
    </Dialog>
  );
  if (createPostLoading) return <div>Loading...</div>;
  return <>{openPostEditorDialog ? PostEditorOnOpenDialog : PostEditorRoot}</>;
};

export default React.memo(PostEditor);
