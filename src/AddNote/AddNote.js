import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'

export default class AddNote extends Component {
  static contextType = ApiContext;

  handleAdd = event => {
    event.preventDefault()
    const newNote = {
      name: event.target['name'].value,
      content: event.target['content'].value,
      folderId: event.target['folder'].value,
      modified: new Date(),
    }
    console.log(newNote)
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleAdd}>
          <label>Note Name</label>
          <input type='text' id='name' name='name'/>
          <label>Content</label>
          <textarea id='content' name='content'/>
          <label>Folder Name</label>
          <select id='folder' name='folder'>
            <option value={null}>...</option>
              {this.context.folders.map(folder => <option value={folder.id}>{folder.name}</option>)}
          </select>
          <button type='submit'>Add Note</button>
        </NotefulForm>
      </section>
    )
  }
}