import React, {useState, useCallback} from 'react'
import PostEditorHeader from "./PostEditorHeader"
import PostEditorBody from "./PostEditorBody";
import {EditorWrapper} from "./styles/PostEditor.styles"
import {useThemeUI} from "theme-ui"
const PostEditor = ({user}) => {
  const [postStatus, setPostStatus] = useState("PUBLIC");
  const {colorMode} = useThemeUI()
  const handleSetPostStatus = useCallback((status) => {
    setPostStatus(status)
  },[])
  return (
    <EditorWrapper theme={colorMode}>
      <PostEditorHeader user={user} postStatus={postStatus} setPostStatus={handleSetPostStatus}/>
      <PostEditorBody/>
    </EditorWrapper>
  )
}

export default PostEditor
