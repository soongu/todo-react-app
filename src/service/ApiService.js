import {API_BASE_URL} from "../config/app-config";
import axios from "axios";

export const call = async(apiUri, method='GET', payload={}) => {
    let responseData;
    const url = API_BASE_URL + apiUri;
    switch (method) {
        case 'GET':
            responseData = await axios.get(url);
            break;
        case 'POST':
            responseData = await axios.post(url, payload);
            break;
        case 'PUT':
            responseData = await axios.put(url, payload);
            break;
        case 'DELETE':
            responseData = await axios.delete(url);
            break;
    }
    // console.log(responseData);
    return responseData.data;
}