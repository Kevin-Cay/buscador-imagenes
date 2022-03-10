import React from 'react'
import './Article.css'
import './Content.css'

function Collection({ photos, open }) {
  return (
    <div className="container">
    <div className="center">
      {photos.map(photo=>
       <article key={photo.id} onClick={() => open(photo.links.html)} >
           <img src={photo.urls.regular} alt="" />
           <p>{[photo.description, photo.alt_description].join(' - ')}</p>
       </article> )}
    </div>
  </div>
  )
}

export default Collection