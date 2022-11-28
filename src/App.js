import logo from './logo.svg';
import './App.css';
import Todo from './Todo';
import {Paper, List} from '@mui/material';

function App() {

    const items = [
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
    ];

    const todoItems = items.map(item => {
        return <Todo key={item.id} item={item} />;
    });

    const paper = items.length > 0 && (
        <Paper style={{margin: 16}}>
            <List>
                {todoItems}
            </List>
        </Paper>
    );



    return (
        <div className="App">
            {paper}
        </div>
    );
}

export default App;
