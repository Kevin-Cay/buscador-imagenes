import {useState} from 'react'
import {Formik, Form, Field} from 'formik'
import Collection from './Collection'
import refresh from './refresh.svg'
import './Header.css'
import './Content.css'
import './Article.css'

function App() {
  const [photos, setPhotos] = useState([]);
  const open = url => window.open(url)
  const api = async (values, {resetForm} ) =>{
    const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
      headers:{
        'Authorization': 'Client-ID dWKsEoIGxek0aQWAnGXuyviWEK04cor_wPkrmv9wY88'
      }
    })
    const data = await response.json()
    setPhotos(data.results);
    resetForm()
  }
  const handleReset = ( ) =>{
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

      <Collection photos={photos} open={open}  />

    </div>
  );
}

export default App;
