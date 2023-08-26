import React from 'react'
import './Card.css'

// It's a UI component

export default function Card(props) {
    const classes='card ' + props.className;
  return (
    <div className={classes}>{props.children}</div>
  )
}
