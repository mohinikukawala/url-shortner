import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import classes from './ViewUrls.module.css';
import {sendData} from '../api/shortUrlActionCreators.js';

const domain = 'http://localhost:3000/';

const ViewUrls = () => {
    const urls = useSelector(state => state.shortUrl.urls);
    const urlContent=[];
    const dispatch = useDispatch();

    const updateVisitCount = (event) => {
        let foundRecord = null;
        
        const visitedRecord = event.target.innerText;
        const domainLength = domain.length;
    
        for(const url in urls){
            if(url === visitedRecord){
                const extractedShortenedKey = visitedRecord.substring(domainLength);
                foundRecord = {
                    [extractedShortenedKey] : {
                        enteredUrl: urls[url].enteredUrl,
                        visitCount: (+urls[url].visitCount) + 1
                    }
                }
            }
        }
        // console.log(foundRecord);
        // console.log(event.target.innerText);
        if(foundRecord != null && Object.keys(foundRecord).length > 0){
            dispatch(sendData(foundRecord));
        }
            
    }

    for(const url in urls){
        urlContent.push(
            <tr key={url} className={classes.list}>
                <td>
                    <a href={urls[url].enteredUrl} onClick={updateVisitCount}>{url}</a>
                </td>
                <td>
                    {urls[url].visitCount}
                </td>
            
            </tr>)
    }

    if(urlContent.length > 0){
        return <table className={classes.tableContainer}>
            <thead>
                <tr>
                    <th>Shortened Url</th>
                    <th>Visit Count</th>
                </tr>
            </thead>
            <tbody>
            {urlContent}
            </tbody>
        </table>
    }else{
        return null;
    }
}


export default ViewUrls;