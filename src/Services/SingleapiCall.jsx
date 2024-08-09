import React from 'react';
import CmsService from './CMS';

const useFetchsingle = (url) => {
    
const [SinglecontentContent, SinglecontentsetContent] = React.useState();
const [loading, setloading] = React.useState(true);
    React.useEffect(() => {
        setloading(true);
        apicall();
        setloading(false);
      }, [url]);
      
      const apicall = async () => {
        const Singlecontents = await CmsService.getGetContent(url);
      
        SinglecontentsetContent(Singlecontents);
      };
      return {loading,SinglecontentContent}
}
 


export default useFetchsingle;