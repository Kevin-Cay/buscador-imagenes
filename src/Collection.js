import './Article.css'
import './Content.css'

function Collection({ photos, open, searched = false }) {
  return (
    <div className="container">
      <div className="center">
        {searched && photos?.length ? photos.map(photo =>
          <article key={photo.id} onClick={() => open(photo.links.html)} >
            <img src={photo.urls.regular} alt="" />
            <p>{[photo.description, photo.alt_description].join(' - ')}</p>
          </article>) : <p>
          No se encontraron resultados
        </p>}
      </div>
    </div>
  )
}

export default Collection