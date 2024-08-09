import React from 'react';
import CmsService from './CMS';

const useFetch = (url) => {
    
const [Content, setContent] = React.useState([]);
const [loading, setloading] = React.useState(true);
    React.useEffect(() => {
      setTimeout(()=>{
        apicall();
      },10);
 
  
      }, [url]);
      
      const apicall = async () => {
        setloading(true);
        const contents = await CmsService.getGetContent(url);
      
        setContent(contents);
        setloading(false);
      };
      return {loading,Content}
}
 


export default useFetch;