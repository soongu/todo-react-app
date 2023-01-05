import React, {useEffect, useState} from 'react';
import {AppBar, Toolbar, Grid, Typography, Button} from "@mui/material";
import {signout} from "../service/ApiService";
import {API_BASE_URL} from "../config/app-config";

function Header(props) {


    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const reqUrl = API_BASE_URL + '/auth/load-profile';
        fetch(reqUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.blob();
                }
                else {
                    setProfile(null);
                }
            })
            .then(profileBlob => {
                const imgSrc =  window.URL.createObjectURL(profileBlob);
                setProfile(imgSrc);
            });
    }, []);

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Grid justify="space-between" container>
                    <Grid item flex={9}>
                        <div style={
                            {
                                display:'flex',
                                alignItems: 'center'
                            }
                        }>
                            <Typography variant="h6">오늘의 할일</Typography>
                            <img
                                src={profile ? profile : require('../assets/img/anonymous.jpg')}
                                alt="프사"
                                style={
                                {
                                    marginLeft: 20,
                                    width: 30,
                                    height: 30,
                                    borderRadius: '50%'
                                }
                            }
                            />
                        </div>
                    </Grid>
                    <Grid item>

                        <Grid item>
                            <Button color="inherit" onClick={signout}>
                                로그아웃
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header;