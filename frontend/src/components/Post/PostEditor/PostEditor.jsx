import React, { useState, useCallback, useEffect } from "react";
import PostEditorHeader from "./PostEditorHeader";
import PostEditorBody from "./PostEditorBody";
import { EditorWrapper } from "./styles/PostEditor.styles";
import { useThemeUI } from "theme-ui";
import { EditorState, convertToRaw } from "draft-js";
import Button from "@material-ui/core/Button";
import useLanguage from "../../Global/useLanguage";
import _ from "lodash";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../../apollo/operations/mutations/post/createPost";
import {cacheMutations} from "../../../apollo/operations/mutations/cache"
const PostEditor = ({ user }) => {
  const [postStatus, setPostStatus] = useState("PUBLIC");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [images, setImages] = useState([]);
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();
  const { post } = i18n.store.data[lang].translation;
  const [createPost, { loading: createPostLoading }] = useMutation(CREATE_POST);
  const {setNewPost} = cacheMutations
  const handleSetPostStatus = useCallback((status) => {
    setPostStatus(status);
  }, []);
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

  const onSubmitPostStatus = () => {
    const rawEditorState = convertToRaw(editorState.getCurrentContent());
    document.getElementById("post-editor").querySelector("[contenteditable=true]").setAttribute("contenteditable", false);
    const text = document.getElementById("post-editor").innerHTML;
    
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

    createPost({variables : {
      text,
      mentions,
      fileNames,
      fileMimetype,
      fileEncodings,
      status: postStatus
    }})
      .then(({data}) => {
        const {createPost} = data ;        
        setNewPost(createPost)
        document.getElementById("post-editor").querySelector("[contenteditable=true]").setAttribute("contenteditable", true);
        setEditorState(EditorState.createEmpty());
        setImages([]);
      })
      .catch((err) => {
        console.log(err.message);
        document.getElementById("post-editor").querySelector("[contenteditable=true]").setAttribute("contenteditable", true);
      });
  };

  if (createPostLoading) return <div>Loading...</div>;
  return (
    <EditorWrapper theme={colorMode}>
      <PostEditorHeader
        user={user}
        postStatus={postStatus}
        setPostStatus={handleSetPostStatus}
      />
      
        <PostEditorBody
          editorState={editorState}
          setEditorState={setEditorState}
          images={images}
          setImages={setImages}
          id="post-editor"
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
};

export default React.memo(PostEditor);
