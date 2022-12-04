import axios from "axios";
const instance = axios.create({
	baseURL: 'https://mern-blog-a63e.vercel.app/',
});
export default instance