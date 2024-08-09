import axios from "axios";
axios.defaults.baseURL = "https://strapi.swagrun.io/api/";
  
class GenericService {
  constructor() {}
  get = (url) =>
    new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
     
          resolve(res.data.data);
        })
        .catch((err) => {
          console.log(err)
          reject(err);
        });
    });
  post = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .post(url, {data})
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  
}
export default GenericService;