import {useState} from 'react'
import {Formik, Form, Field} from 'formik'
import refresh from './refresh.svg'
import './Header.css'
import './Content.css'
import './Article.css'

function App() {
  const [photos, setPhotos] = useState([]);
  const open = url => window.open(url)
  const api = async (values, {resetForm}) =>{
    const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
      headers:{
        'Authorization': 'Client-ID dWKsEoIGxek0aQWAnGXuyviWEK04cor_wPkrmv9wY88'
      }
    })
    const data = await response.json()
    setPhotos(data.results);
    resetForm()
  }
  const handleReset = () =>{
    setPhotos([])
  }

  // https://codesandbox.io/s/7122xmovnq?file=/src/index.js
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
          <Field style={{fontSize: "16px"}} name='search' />
        </Form>
         
       </Formik>
       <div className='restart' >
              <img onClick={handleReset} src={refresh} alt="" type="reset" />
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
