/**
 * Created by Endless on 2017/6/11.
 */
import React from 'react'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styles from './Editor.less'
import {convertFromRaw, EditorState, convertToRaw} from 'draft-js'
import {uploadCallback} from '../../services/articles'

class DraftEditor extends React.Component {
  constructor(props) {
    super(props)
    let content = null;
    if(!!props.content){
      content = EditorState.createWithContent(convertFromRaw(JSON.parse(props.content)))
    }else{
      content = EditorState.createEmpty()
    }
    this.state = {
      readOnly:props.readOnly || false,
      editorState: content
    }

    this.onEditorStateChange = (editorState) => {
      this.setState({editorState});

      props.getContents.call(this, JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    }
  }

  render() {
    const {readOnly,editorState} = this.state;
    return (<Editor
      editorState={editorState}
      toolbarClassName={styles.toolbar}
      wrapperClassName={styles.wrapper}
      editorClassName={styles.editor}
      onEditorStateChange={this.onEditorStateChange}
      toolbar={{image: {uploadCallback: uploadCallback}}}
      placeholder="Enter Your Idea..."
      readOnly={readOnly}
      toolbarHidden={readOnly}
    />)
  }
}
export default DraftEditor;
