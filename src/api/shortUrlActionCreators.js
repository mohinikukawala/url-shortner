import {shortUrlActions} from '../store/index';

const domain = 'http://localhost:3000/';

const transformData = data => {
  let tempUrls = {};
  for(const key in data){
    const urlData = data[key];
    for(const shortUrl in urlData){
      const shortenedUrl = domain+shortUrl;
      const finalUrlObject = {[shortenedUrl] :
        {enteredUrl: urlData[shortUrl].enteredUrl, visitCount: urlData[shortUrl].visitCount}}
      tempUrls = {...tempUrls,
        ...finalUrlObject  
      }
    }
  }
  return tempUrls;
}

export const fetchAllUrls = () => {
    return async(dispatch) => {
      
      const fetchRequest = async() => {
        const resp = await fetch('https://url-shortner-9d3d2-default-rtdb.firebaseio.com/shortUrls.json');
        if(!resp.ok){
          throw new Error('Error Fetching quotes!');
        }
        const data = await resp.json();
        return data;
      }

      try{
        const urlData = await fetchRequest();
        const transformedUrls = transformData(urlData);
        dispatch(shortUrlActions.updateUrls(transformedUrls));
      }catch(err){
        alert(err.message)
      }
    }  
  }

// const sendRequest = async (urlData) => {
//   const response = await fetch('https://url-shortner-9d3d2-default-rtdb.firebaseio.com/shortUrls.json',{
//                 method:'POST',
//                 body:JSON.stringify(urlData),
//                 headers:{
//                   'Content-Type':'application/json'
//                 }
//               });
//         if(!response.ok){
//           throw new Error('Error sending request!');
//         }
//   } 
  
export const sendData = urlData => {
    return async(dispatch) => {
      const sendRequest = async() => {
        const response = await fetch('https://url-shortner-9d3d2-default-rtdb.firebaseio.com/shortUrls.json',{
                method:'POST',
                body:JSON.stringify(urlData),
                headers:{
                  'Content-Type':'application/json'
                }
              });
        if(!response.ok){
          throw new Error('Error sending request!');
        }
      }

      try{
        await sendRequest(urlData);
        for(const key in urlData)
          {
            dispatch(shortUrlActions.updateUrls({[domain+key] : {enteredUrl: urlData[key].enteredUrl,
                                                                  visitCount: urlData[key].visitCount}}));
          }
      }catch(err){
        alert(err.message);
      }
    }
  }

// const updateVisitCount = (urlData) => {
//   return async(dispatch) => {
//     try{
//       await sendRequest(urlData);

//     }catch(err){
//       alert(err.message);
//     }
//   }
// }

