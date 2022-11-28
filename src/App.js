import logo from './logo.svg';
import './App.css';
import Todo from './Todo';

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

    return (
        <div className="App">
            {todoItems}
        </div>
    );
}

export default App;
