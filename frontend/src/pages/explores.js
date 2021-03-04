import React, { useState } from "react";
import { EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createLinkifyPlugin from "@draft-js-plugins/linkify";


const Linkify = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const linkifyPlugin = createLinkifyPlugin({
    component(props){
      return <a {...props} onClick={() => alert('Clicked on Link!')} />;
    }
  });

  return (
    <div className="wrapper">
      <h2 style={{color:"#43a047"}}>Draftjs Linkify</h2>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        plugins={[linkifyPlugin]}
      />
    </div>
  );
};

export default Linkify;
