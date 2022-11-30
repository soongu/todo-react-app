
import './App.css';
import Todo from './Todo';
import AddTodo from "./AddTodo";
import {Paper, List, Container} from '@mui/material';
import React, {useState, useEffect} from "react";

function App() {



    const [itemList, setItemList] = useState([
        {
            id: 1,
            title: 'hello world1',
            done: true
        },
        {
            id: 2,
            title: 'hello world2',
            done: false
        }
    ]);

    useEffect(() => {

    }, [itemList]);

    //할 일 추가
    const add = item => {
        item.id = itemList.length + 1;
        item.done = false;
        setItemList(itemList => itemList.concat(item));

        // console.log(itemList);
    };

    const todoItems = itemList.map(item => {
        return <Todo key={item.id} item={item} />;
    });

    const paper = itemList.length > 0 && (
        <Paper style={{margin: 16}}>
            <List>
                <AddTodo add={add} />
                <div className="TodoList">{todoItems}</div>
            </List>
        </Paper>
    );



    return (
        <div className="App">
            <Container maxWidth="md">
            {paper}
            </Container>
        </div>
    );
}

export default App;
