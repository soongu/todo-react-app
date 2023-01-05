import React, {useState, useRef} from 'react';

import {signup, call} from "../service/ApiService";
import {Button, Container, Grid, TextField, Typography, Link} from "@mui/material";



function SignUp(props) {

    const [user, setUser] = useState({username: '', email: '', password: ''});
    const [validated, setValidated] = useState({username: false, email: false, password: false});
    const [errorMessage, setErrorMessage] = useState({username: '', email: '', password: ''});

    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();

    // 이미지 업로드 input의 onChange
    const saveImgFile = () => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
        };
    };


    const handleName = (e) => {
        console.log(e.target.value);

        const nameRegex = /^[\w\W가-힣]{2,8}$/;

        let message;
        if (!e.target.value) {
            message = '닉네임은 필수값입니다!';
            setValidated({...validated, username: false});
        } else if (!nameRegex.test(e.target.value)) {
            message = '2글자에서 8글자 사이로 입력하세요!';
            setValidated({...validated, username: false});
        } else {
            message = '사용할 수 있는 닉네임입니다!';
            setValidated({...validated, username: true});
        }
        setErrorMessage({...errorMessage, username: message});

        setUser({...user, username: e.target.value})
    }

    const checkEmail = (email) => {

        call(`/auth/check?email=${email}`)
            .then(flag => {
                console.log(flag);
                if (!flag) {
                    console.log('사용가능!');
                    setErrorMessage({...errorMessage, email: '사용가능한 이메일입니다.'});
                    setValidated({...validated, email: true});
                } else {
                    console.log('사용 불가능!');
                    setErrorMessage({...errorMessage, email: '중복된 이메일입니다.'});
                    setValidated({...validated, email: false});
                }
            });
    }

    const handleEmail = (e) => {
        const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

        setUser({...user, email: e.target.value})
        let message;
        if (!e.target.value) {
            message = '이메일은 필수값입니다!';
            setValidated({...validated, email: false});
        } else if (!emailRegex.test(e.target.value)) {
            message = '이메일 형식이 아닙니다!';
            setValidated({...validated, email: false});
        } else {
            checkEmail(e.target.value);
        }
        setErrorMessage({...errorMessage, email: message});
        setUser({...user, email: e.target.value})
    }
    const handlePassword = (e) => {

        const pwRegex =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

        let message;
        if (!e.target.value) {
            message = '비밀번호는 필수값입니다!';
            setValidated({...validated, password: false});
        } else if (!pwRegex.test(e.target.value)) {
            message = '8자리 이상의 특수문자, 숫자를 포함해주세요!';
            setValidated({...validated, password: false});
        } else {
            message = '사용할 수 있는 비밀번호입니다!';
            setValidated({...validated, password: true});
        }
        setErrorMessage({...errorMessage, password: message});

        setUser({...user, password: e.target.value})

    }

    const isValidateOk = () => {
        for (let key in validated) {
            if (!validated[key]) return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(user);

        if (isValidateOk()) {

            const userBlob = new Blob([JSON.stringify(user)], { type: "application/json" });

            const userFormData = new FormData();
            userFormData.append("user", userBlob);
            userFormData.append("profileImage", imgRef.current.files[0]);

            signup(userFormData);
        } else {
            alert('회원가입 입력란을 확인하세요!');
        }

    };


    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            계정 생성
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <div className="thumbnail-box" onClick={() => imgRef.current.click()}>
                            <img
                                src={imgFile ? imgFile : require("../assets/img/image-add.png")}
                                alt="프사프사"
                            />
                        </div>
                        <label className="signup-img-label" htmlFor="profileImg">프로필 이미지 추가</label>
                        <input id="profileImg" type="file" accept="image/*" style={{display: 'none'}}
                               ref={imgRef}
                               onChange={saveImgFile}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="유저 이름"
                            autoFocus
                            onChange={handleName}
                        />
                        <span style={validated.username ? {color:'green'} : {color:'red'}}>{errorMessage.username}</span>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="이메일 주소"
                            name="email"
                            autoComplete="email"
                            onChange={handleEmail}
                        />
                        <span style={validated.email ? {color:'green'} : {color:'red'}}>{errorMessage.email}</span>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="패스워드"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handlePassword}
                        />
                        <span style={validated.password ? {color:'green'} : {color:'red'}}>{errorMessage.password}</span>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            계정 생성
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            이미 계정이 있습니까? 로그인 하세요.
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default SignUp;