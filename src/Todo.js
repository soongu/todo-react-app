import React, {useState} from 'react';

//https://mui.com/material-ui/getting-started/learn/
import {ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";

const Todo = (props) => {

    const [state, setState] = useState({
        item: props.item,
        readOnly: true
    });

    const {id, title, done} = state.item;

    const removeClick = e => {
        props.remove(state.item);
    };

    const offReadOnlyMode = () => {
        setState({ ...state, readOnly: false });
    };

    const enterKeyEventHandler = e => {
        if (e.key === 'Enter') {
            setState({ ...state, readOnly: true });
        }
    };

    const editEventHandler = e => {
        const thisItem = state.item;
        thisItem.title = e.target.value;
        setState({ ...state, thisItem });
    };

    const checkEventHandler = e => {
        const thisItem = state.item;
        thisItem.done = !thisItem.done;
        setState({ ...state, thisItem });
    };

    return (
        <ListItem>
            <Checkbox checked={done} onChange={checkEventHandler} />
            <ListItemText>
                <InputBase
                    inputProps={{
                        "aria-label" : "naked",
                        readOnly: state.readOnly
                    }}
                    onClick={offReadOnlyMode}
                    onKeyUp={enterKeyEventHandler}
                    onChange={editEventHandler}
                    type="text"
                    id={id}
                    name={id}
                    value={title}
                    multiline={true}
                    fullWidth={true}
                />
            </ListItemText>

            <ListItemSecondaryAction>
                <IconButton aria-label="Delete Todo" onClick={removeClick}>
                    <DeleteOutline/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default Todo;