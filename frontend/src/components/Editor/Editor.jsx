import React from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import createLinkDecorator from "./Link";

export default function MyEditor() {
  const rawContentState =
    '{"blocks":[{"key":"3echq","text":"link","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":4,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}}}';

  const decorator = createLinkDecorator();
  const defaultEditorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(rawContentState)),
    decorator
  );

  const [editorState, setEditorState] = React.useState(defaultEditorState);

  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  React.useEffect(() => {
    focusEditor();
  }, []);

  return (
    <div onClick={focusEditor}>
      <Editor
        readOnly
        ref={editor}
        editorState={editorState}
        onChange={editorState => setEditorState(editorState)}
      />
    </div>
  );
}
