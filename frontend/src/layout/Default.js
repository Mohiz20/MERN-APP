import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
}));

export default function Default({children}) {
    const classes = useStyles();
    const history = useHistory();

    const onLogout = (e => {
        e.preventDefault();
        localStorage.setItem("token", "");
        history.push('/')
    })

    return (
        <div>
             <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={onLogout}
            >
                Logout
            </Button>
            <div>{children}</div>
        </div>
    )
}
