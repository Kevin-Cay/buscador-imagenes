import { useState } from 'react'
import './Article.css'
import './Content.css'
import DetailModal from './components/DetailModal'

function Collection({ photos, searched = false, loading = false }) {

  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [data, setData] = useState({})

  const handleOpenModal = (data) => {
    setIsDetailOpen(true)
    setData(data)
  }

  const handleCloseModal = () => {
    setIsDetailOpen(false)
    setData({})
  }

  if (loading || !searched) return (
    <>
    </>
  )

  console.log(data)

  return (
    <div className="container">
      {photos?.length ? (
        <div className="center">
          {
            photos.map(photo =>
              <div className='content' key={photo.id} >
                <article onClick={() => handleOpenModal(photo)} >
                  <img src={photo.urls.regular} alt="" />
                  <p>{[photo.description, photo.alt_description].join(' - ')}</p>
                </article>
              </div>
            )
          }
        </div>
      ) : (
        <div className='placeholder'>
          <p>
            No se encontraron resultados
          </p>
        </div>
      )
      }
      <DetailModal
        isOpen={isDetailOpen}
        onClose={handleCloseModal}
        data={data}
      />
    </div>
  )
}

export default Collection