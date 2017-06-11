// /**
//  * Created by Endless on 2017/6/11.
//  */
// import React from 'react'
// import { Editor } from 'react-draft-wysiwyg'
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import styles from './Editor.less'
//
// class DraftEditor extends React.Component {
//   constructor (props) {
//     super(props)
//     // this.props = props
//     this.state = {
//       editorContent: null,
//     }
//   }
//
//   onEditorStateChange = (index, editorContent) => {
//       let editorContents = this.state.editorContent;
//       editorContents[index] = editorContent;
//       editorContents = [...editorContents];
//       this.setState({
//         editorContents,
//       });
//     };
//
//
//   render () {
//     return (
//       <Editor
//         toolbarClassName={styles.toolbar}
//         wrapperClassName={styles.wrapper}
//         editorClassName={styles.editor}
//         onEditorStateChange={this.onEditorStateChange.bind(this, 0)}
//   />
//     )
//   }
//
// }
// export default DraftEditor;
