import {API_BASE_URL} from "../config/app-config";
import axios from "axios";

export const call = async(apiUri, method='GET', payload={}) => {

    const error403 = () => {
        alert('로그인이 필요한 서비스입니다.');
        window.location.href='/login';
    };

    const url = API_BASE_URL + apiUri;

    let responseData = await axios({
        method: method,
        url: url,
        data: payload
    }).catch(error => {
        if (error.response.status === 403) error403();
    });

    return responseData.data;
}