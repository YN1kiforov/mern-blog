import axios from "axios";
const instance = axios.create({
	baseURL: 'https://sheltered-castle-49133.herokuapp.com/',
});
export default instance