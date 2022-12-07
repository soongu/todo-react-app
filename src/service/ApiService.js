import {API_BASE_URL} from "../config/app-config";
import axios from "axios";

const ACCESS_TOKEN = 'ACCESS_TOKEN';

export const call = async(apiUri, method='GET', payload={}) => {

    const error403 = () => {
        alert('로그인이 필요한 서비스입니다.');
        window.location.href='/login';
    };

    const url = API_BASE_URL + apiUri;

    // 헤더
    const headers = {
        'Content-Type' : 'application/json'
    };

    // 로컬 스토리지에서 토큰 가져오기
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken && accessToken !== null) {
        headers['Authorization'] = 'Bearer ' + accessToken;
    }

    let responseData = await axios({
        method: method,
        url: url,
        data: payload,
        headers: headers
    }).catch(error => {
        if (error.response.status === 403) error403();
    });

    return responseData.data;
}

// 로그인 기능
export const signin = (userInfo) => {

    return axios.post(API_BASE_URL + '/auth/signin', userInfo)
        .then(res => {
            console.log(res);
            if (res.data.token) {
                // 로컬 스토리지에 토큰 저장
                localStorage.setItem(ACCESS_TOKEN, res.data.token);
                window.location.href='/';
            }
        })
        .catch(err => {
            console.log(err);
            alert(err.response.data.error);
        });
};

// 로그아웃 기능
export const signout = () => {
    // 토큰 제거
    localStorage.removeItem(ACCESS_TOKEN);
    window.location.href = '/login';
};

// 회원 가입
export const signup = (userInfo) => {

    return axios.post(API_BASE_URL + '/auth/signup', userInfo)
        .then(res => {
            // console.log(res);
            window.location.href='/login';
        })
        .catch(err => {
            console.log(err);
        });
};


















