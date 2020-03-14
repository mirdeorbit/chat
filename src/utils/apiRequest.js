import axios from 'axios';

export default function(url, method, params) {
	const apiUrl = `${__CONFIG__.api.baseUrl}${url}`;

	const data = method === 'post' ? params : {params};

	return axios[method](apiUrl, data);
}