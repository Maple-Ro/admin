import React from 'react'
import Quill from 'react-quill'
import styles from './Requill.less'


const QuillEditor = (props) => {
  return (<Quill toolbarClassName={styles.toolbar} wrapperClassName={styles.wrapper} editorClassName={styles.editor} {...props} />)
}

export default QuillEditor
