import {useState} from 'react'
import {Formik, Form, Field} from 'formik'
import './Header.css'
import './Content.css'
import './Article.css'

function App() {
  const [photos, setPhotos] = useState([]);
  const open = url => window.open(url)
  const api = async (values) =>{
    const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
      headers:{
        'Authorization': 'Client-ID dWKsEoIGxek0aQWAnGXuyviWEK04cor_wPkrmv9wY88'
      }
    })
    const data = await response.json()
    setPhotos(data.results);
  }
  const reset = () =>{
    setPhotos([])
  }
  // console.log({photos});
  return (
    <div >
     <header>
        <div>
          <h1>Img</h1>
        </div>

       <Formik
        initialValues={{search: ''}}
        onSubmit={api}
       >
         <Form>
           <label >Search: </label>
           <Field name='search' />
         </Form>
       </Formik>
       <div className='restart' >
          <img onClick={reset} src="bx-refresh.svg" alt="" type='submit'/>
       </div>
     </header>
     <div className="container">
       <div className="center">
         {photos.map(photo=>
          <article key={photo.id} onClick={() => open(photo.links.html)} >
              <img src={photo.urls.regular} alt="" />
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
          </article> )}
       </div>
     </div>

    </div>
  );
}

export default App;
