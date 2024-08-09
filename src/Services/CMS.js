import GenericService from "./GenericService.js";
class Cms extends GenericService {

  addContent = (url,data) => {console.log(data); return this.post(url, data)};

  getGetContent= (url) =>
    this.get(url);

}

let CmsService = new Cms();
export default CmsService;