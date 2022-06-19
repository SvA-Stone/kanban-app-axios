import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [columns, setColumns] = useState([])
    const [cards, setCards] = useState([])





    function getColumns() {
        axios.get("https://nazarov-kanban-server.herokuapp.com/column")
            .then(res => setColumns(res.data))
            .catch(err => console.log(err))

    };

    function getCards() {
        axios.get("https://nazarov-kanban-server.herokuapp.com/card")
            .then(res => setCards(res.data))
            .catch(err => console.log(err))
    };

    function createCard(name, description, priority, status) {
        axios.post("https://nazarov-kanban-server.herokuapp.com/card", {
            name,
            description,
            priority,
            status
        }).then(res => getCards())
            .catch(err => console.log(err))
    }

    function deleteCard(id) {
        axios.delete(`https://nazarov-kanban-server.herokuapp.com/card/${id}`)
            .then((res) => {
                console.log(res);
                getCards()
            })
            .catch(err => console.log(err))
    }

    function updatePriority(id, priority) {
        axios.patch(`https://nazarov-kanban-server.herokuapp.com/card/${id}`, {priority})
            .then((res) => {
                console.log(res);
                getCards();

            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getColumns();
        getCards()
    }, []);

    return (
        <div className="App">
            <h3>Kanban Board</h3>
            {columns.map(el => <li key={el._id}>{el.status}</li>)}
            {cards.map(el => <li key={el._id}>{el.name}
                <button onClick={() => deleteCard(el._id)}>Delete</button>
                {" "}{el.priority}{" "}
                <button onClick={() => updatePriority(el._id, 100)}>Change priority</button>
            </li>)}


            <button onClick={() => createCard(
                'Peace √',
                'Repeat that',
                1,
                'todo')}>Create
            </button>
        </div>
    );
}

export default App;
