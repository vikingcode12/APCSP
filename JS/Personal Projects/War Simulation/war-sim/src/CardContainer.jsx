import React from 'react'
import Card from './Card.jsx'

export default function CardContainer({ cardArr }) {
  return (
        cardArr.map(card =>{
            return <Card key={card.id} src={card.dir}/>
        })
  )
}
