import React from 'react'
import './NotefulForm.css'
import propTypes from 'prop-types';

export default function NotefulForm(props) {
  const { className, ...otherProps } = props

  return (
    <form
      className={['Noteful-form', className].join(' ')}
      action='#'
      {...otherProps}
    />
  )
}

NotefulForm.propTypes = {
  className: propTypes.string.isRequired
}