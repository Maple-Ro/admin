/**
 * Created by Endless on 2017/6/11.
 */
import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styles from './Editor.less'

class DraftEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editorContent: props.editorContent || null,
    }
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }
  render() {
    const { editorState } = this.state;
    return (<Editor
      editorState={editorState}
      toolbarClassName={styles.toolbar}
      wrapperClassName={styles.wrapper}
      editorClassName={styles.editor}
      onEditorStateChange={this.onEditorStateChange}
    />)
  }
}
export default DraftEditor;
