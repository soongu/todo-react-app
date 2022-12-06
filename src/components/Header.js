import React from 'react';
import {AppBar, Toolbar, Grid, Typography, Button} from "@mui/material";
import {signout} from "../service/ApiService";

function Header(props) {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Grid justify="space-between" container>
                    <Grid item flex={9}>
                        <Typography variant="h6">오늘의 할일</Typography>
                    </Grid>
                    <Grid item>
                        <Button color="inherit" onClick={signout}>
                            로그아웃
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header;