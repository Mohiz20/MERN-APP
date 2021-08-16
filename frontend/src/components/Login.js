import React from 'react'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    container: {
      padding: theme.spacing(3),
    },
}));


export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e => {
        e.preventDefault();
        console.log(email, password)
        axios.post('http://localhost:3000/api/auth/login/', {email, password}).then(res => {
            alert('Welcome...', res.data.user.name)
            console.log(res.data.user)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", res.data.user.name);
            setEmail('')
            setPassword('')
            history.push('/dashboard')
        }).catch(e => {
            alert('Error, Use valid email or password')
            console.log('error:', e)
        });
        console.log();
    });

    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token){
            history.push('/dashboard')
        }
    })

    return (
        <Container className={classes.container} maxWidth="xs">
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  size="small"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" fullWidth type="submit" variant="contained">
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    )
}
