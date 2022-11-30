
import './App.css';
import Todo from './Todo';
import AddTodo from "./AddTodo";
import {Paper, List, Container} from '@mui/material';
import React, {useState, useEffect} from "react";
import axios from "axios";
import {call} from "./service/ApiService";

function App() {



    const [itemList, setItemList] = useState([
        // {
        //     id: 1,
        //     title: 'hello world1',
        //     done: true
        // },
        // {
        //     id: 2,
        //     title: 'hello world2',
        //     done: false
        // }
    ]);

    useEffect(() => {
        const callTodoListApi = async () => {
            call('/todo').then(res => {
                console.log(res.data)
                setItemList(res.data);
            });
            // console.log(response);

        };

        callTodoListApi();
    }, []);

    //할 일 추가
    const add = item => {

        call("/todo", "POST", item)
            .then(res => {
                setItemList(res.data);
            });

        // item.id = itemList.length + 1;
        // item.done = false;
        // setItemList(itemList => itemList.concat(item));

        // console.log(itemList);
    };

    //할 일 삭제
    const remove = target => {

        call(`/todo/${target.id}`, "DELETE")
            .then(res => {
                setItemList(res.data);
            });

        // const newItems = itemList.filter(item => item.id !== target.id);
        // setItemList(newItems);

    };

    // 할 일 수정
    const update = item => {
        call(`/todo`, "PUT", item)
            .then(res => {
                setItemList(res.data);
            });
    };

    const todoItems = itemList.map(item => {
        return <Todo key={item.id} item={item} remove={remove} update={update} />;
    });

    const paper = itemList.length > 0 && (
        <Paper style={{margin: 16}}>
            <List>

                <div className="TodoList">{todoItems}</div>
            </List>
        </Paper>
    );



    return (
        <div className="App">
            <Container maxWidth="md">
                <AddTodo add={add} />
                {paper}
            </Container>
        </div>
    );
}

export default App;
