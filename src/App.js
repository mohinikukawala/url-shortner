import { useEffect,useRef,useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './App.css';

import {fetchAllUrls,sendData} from './api/shortUrlActionCreators';
import ViewUrls from './components/ViewUrls';

const KeyLength = 8;
const domain = 'http://localhost:3000/';

const calculateShortValue = () => {
  let key='';
  for(let i=0;i<=KeyLength;i++){
    key += (Math.floor(Math.random()*10)).toString();
  }
  return key;
}



function App() {
  const urlInputRef = useRef();
  const [shortenedUrl,setShortenedUrl] = useState(null);
  const dispatch = useDispatch();

  let urls = useSelector(state => state.shortUrl.urls);
  console.log(urls);
  
  useEffect(()=>{
    dispatch(fetchAllUrls());
   },[])

  const shoertenedUrlExist = (enteredUrl) => {
    for(const shortUrl in urls){
        if(urls[shortUrl] === enteredUrl){
          return shortUrl;
        }
      }
    return false;
  }

  const shortUrlHandler = () => {
    const enteredUrl = urlInputRef.current.value;
    const foundUrl = shoertenedUrlExist(enteredUrl)
    
    if(foundUrl){
      setShortenedUrl(foundUrl);
    }else{
      const calculatedKey = calculateShortValue();
      const newShortenedUrl = {
        [calculatedKey]:{ enteredUrl,
        visitCount: 0}
      }
      dispatch(sendData(newShortenedUrl));
      setShortenedUrl(domain+calculatedKey);
    }
  }

  return (
    <div className="App">
      
      <div className="searchContainer">
      <input type="text" className="searchInput" placeholder="Type in the url..." ref={urlInputRef}></input>
      <button onClick={shortUrlHandler}> Get Short URL </button>
      {!!shortenedUrl && <p> {shortenedUrl} </p>}
      </div>

      <ViewUrls />
    </div>
  );
}

export default App;
