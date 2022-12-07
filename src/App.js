import './App.css';
import Todo from './components/Todo';
import AddTodo from "./components/AddTodo";
import {Container, List, Paper} from '@mui/material';
import React, {useEffect, useState} from "react";
import {call} from "./service/ApiService";
import {Spinner} from "reactstrap";

function App() {


    const [loading, setLoading] = useState(true);
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
                setLoading(false);
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
        return <Todo key={item.id} item={item} remove={remove} update={update}/>;
    });

    const paper = itemList.length > 0 && (
        <Paper style={{margin: 16}}>
            <List>

                <div className="TodoList">{todoItems}</div>
            </List>
        </Paper>
    );

    // 로딩 중이 아닐 때 렌더링할 페이지
    const listPage = (
        <Container maxWidth="md">
            <AddTodo add={add}/>
            {paper}
        </Container>
    );
    // 로딩중일 때 렌더링할 페이지
    const loadingPage = (
        <Spinner color="info">
            Loading...
        </Spinner>
    );

    const content = loading ? loadingPage : listPage;


    return (
        <div className="App" style={{marginTop: '150px'}}>
            {content}
        </div>
    );
}

export default App;
