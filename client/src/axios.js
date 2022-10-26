import axios from "axios";
const instance = axios.create({
	baseURL: 'https://infinite-tundra-41570.herokuapp.com/',
});
export default instance