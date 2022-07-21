// import React, { Component } from 'react';
// import { EditorState, convertToRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';



// class ForTesting extends Component {
//   state = {
//     editorState: EditorState.createEmpty(),
//   }

//   onEditorStateChange = (editorState) => {
//     this.setState({
//       editorState,
//     });
//   };

//   render() {
//     const { editorState } = this.state;
//     return (
//       <div>
//         <Editor
//           editorState={editorState}
//           wrapperClassName="demo-wrapper"
//           editorClassName="demo-editor"
//           onEditorStateChange={this.onEditorStateChange}
//         />
//         <textarea
//           disabled
//           value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//         />
//       </div>
//     );
//   }
// }
// export default ForTesting;






              
// import ReactQuill,{ Quill } from "react-quill";
// import 'react-quill/dist/quill.snow.css';

//     function undoChange() {
//       this.quill.history.undo();
//   }
//   function redoChange() {
//       this.quill.history.redo();
//   }
//   const modules = {
//       toolbar: {
//           container: "#toolbar",
//           handlers: {
//               undo: undoChange,
//               redo: redoChange
//           }
//       },
//       history: {
//           delay: 500,
//           maxStack: 100,
//           userOnly: true
//       }
//   };
//   const formats = [
//       "bold",
//       "italic",
//       "strike"

//       // "file",
//   ];

//   //  const modules = {
//   //     toolbar: [["bold", "italic", "strike","emoji"]]

//   //       };
//   //    const formats = [
//   //         "bold",
//   //         "italic",
//   //         "strike"
//   //       ];
// <div className="text-editor">
//                       <ReactQuill
//                           theme="snow"
//                           value={state.value}
//                           onChange={handleChange}
//                           placeholder={"Write a message ..."}
//                           modules={modules}
//                           formats={formats}
//                       />
//                       <div id="toolbar">
//                           <span className="ql-formats">
//                               <button className="ql-bold" />
//                               <button className="ql-italic" />
//                               <button className="ql-strike" />
//                           </span>

//                       </div>
//                   </div>