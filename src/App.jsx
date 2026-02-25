import { useState } from 'react'
import { useFormik } from 'formik'
import Collection from './Collection'
import refresh from './refresh.svg'
import './Header.css'
import './Content.css'
import './Article.css'
import { API_KEY } from './api/configs'

function App() {
  const [photos, setPhotos] = useState([]);
  const [searched, setSearched] = useState(false)
  const [ loading, setLoading] = useState(false)
  const open = url => window.open(url)

  const handleSearchImages = async (values) => {
    try {
      setSearched(true)
      setLoading(true)
      const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
        headers: {
          'Authorization': `Client-ID ${API_KEY}`
        }
      })
      const data = await response.json()
      setPhotos(data.results)
    } catch (error) {
      console.log('error', error)
      setPhotos([])
    } finally{
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      search: ''
    },
    validate: values => {
      const errors = {};
      if (!values.search) {
        errors.search = 'Required';
      } else if (values.search === '') {
        errors.search = 'Must be 15 characters or less';
      }

      return errors
    },
    onSubmit: handleSearchImages
  });

  const handleReset = () => {
    setPhotos([])
  }

  return (
    <div >
      <header>
        <div>
          <img src={require('./images/logo.png')} alt="logo" className='logo' />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className='row'>
            <label className='title' >Search:</label>
            <input
              id='search'
              type="text"
              name='search'
              onChange={formik.handleChange}
              value={formik.values.search}
            />
            <button className='submit' type='submit' >
              Buscar
            </button>
          </div>
        </form>

        <div className='restart' >
          <img onClick={handleReset} src={refresh} alt="" type="reset" />
        </div>
      </header>

      <Collection photos={photos} open={open} searched={searched} />

    </div>
  );
}

export default App;
