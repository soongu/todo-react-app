import React, {useState} from 'react';
import {TextField, Paper, Button, Grid} from "@mui/material";

function AddTodo({add}) {

    // 사용자의 입력을 저장할 객체
    const [item, setItem] = useState({ title : '' })

    const change = e => {
        setItem({ title: e.target.value });
        // console.log(item);
    };

    const addClick = e => {
        add(item);
        setItem({ title : ''});
    }

    const enterKeyAdd = e => {
        if (e.key === 'Enter') {
            addClick();
        }
    }

    return (
        <Paper style={{ margin: 16, padding: 16 }}>
            <Grid container>
                <Grid xs={11} md={11} item style={{paddingRight: 16}}>
                    <TextField
                        placeholder="Add Todo Here"
                        fullWidth
                        onChange={change}
                        onKeyUp={enterKeyAdd}
                        value={item.title}
                    />
                </Grid>
                <Grid xs={1} md={1} item>
                    <Button fullWidth color="secondary" variant="outlined" onClick={addClick}>
                        +
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default AddTodo;