import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'

export default class AddFolder extends Component {
  static contextType = ApiContext;

  handleAdd = event => {
    event.preventDefault()
    const newFolder = {
      name: event.target['name'].value
    }
    console.log(newFolder)
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newFolder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(newFolder)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Add Folder</h2>
        <NotefulForm onSubmit={this.handleAdd}>
          <label htmlFor='folder-name-input'>Name</label>
          <input type='text' id='name' name='name' />
          <button type='submit'>Add folder</button>
        </NotefulForm>
      </section>
    )
  }
}