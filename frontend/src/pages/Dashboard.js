import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {TextField, Radio} from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

import DataTable from '../components/DataTable'

const useStyles = makeStyles((theme) => ({
    container: {
      padding: theme.spacing(3),
    },
    heading: {
        size: '40px'
    }
}));

export default function Dashboard() {
    let user = localStorage.getItem("user");
    const classes = useStyles();

    const [leadName, setLeadName] = useState('');
    const [leadCompany, setLeadCompany] = useState('');
    const [leadDomain, setLeadDomain] = useState('');
    const [leadConversionStatus, setLeadConversionStatus] = useState(Boolean);
    const [leadBroadCastStatus, setLeadBroadCastStatus] = useState(Boolean);
    const [leadCreatedBy, setLeadCreatedBy] = useState('');

    const onSubmit = (e => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/lead', 
        {
            lead_name: leadName,
            lead_company: leadCompany,
            lead_domain: leadDomain,
            lead_conversion_status: leadConversionStatus,
            lead_broadcast_status: leadBroadCastStatus,
            lead_created_by: leadCreatedBy
        }
        ).then(res => {
            alert('Lead Created Successfully...', res.data.lead_name)
            console.log('response:',res.data)
            setLeadName('');
            setLeadCompany('');
            setLeadDomain('');
            setLeadConversionStatus(true)
            setLeadBroadCastStatus(true)
            setLeadCreatedBy('')
        }).catch(e => {
            alert('Lead Already Exists')
            console.log('error:',e)
        })
    })

    return (
      <div>
        <Container className={classes.container} maxWidth="xs">
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/broadcast">Broadcast</Link>
            </li>
          </ul>
        </nav>
            <h1>{user.toUpperCase()}</h1>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Lead Name"
                    name="name"
                    size="small"
                    type="text"
                    variant="outlined"
                    value={leadName}
                    onChange={e => setLeadName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Lead Company"
                    name="company"
                    size="small"
                    type="text"
                    variant="outlined"
                    value={leadCompany}
                    onChange={e => setLeadCompany(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Lead Domain"
                    name="domain"
                    size="small"
                    type="text"
                    variant="outlined"
                    value={leadDomain}
                    onChange={e => setLeadDomain(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Lead Conversion Status</FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel
                        value="true"
                        control={<Radio color="primary" />}
                        onChange={e => setLeadConversionStatus(e.target.value)}

                        label="True"
                        labelPlacement="top"
                        />
                        <FormControlLabel
                        value="false"
                        control={<Radio color="primary" />}
                        onChange={e => setLeadConversionStatus(e.target.value)}

                        label="False"
                        labelPlacement="top"
                        />
                    </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                   <FormControl component="fieldset">
                    <FormLabel component="legend">Lead Broadcast Status</FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel
                        value="true"
                        control={<Radio color="primary" />}
                        onChange={e => setLeadBroadCastStatus(e.target.value)}
                        label="True"
                        labelPlacement="top"
                        />
                        <FormControlLabel
                        value="false"
                        control={<Radio color="primary" />}
                        onChange={e => setLeadBroadCastStatus(e.target.value)}
                        label="False"
                        labelPlacement="top"
                        />
                    </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Lead Created BY"
                    name="createdBy"
                    size="small"
                    type="text"
                    variant="outlined"
                    value={leadCreatedBy}
                    onChange={e => setLeadCreatedBy(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button color="secondary" fullWidth type="submit" variant="contained">
                Create New Lead
              </Button>
            </Grid>
          </Grid>
        </form>
        
      </Container>
      <DataTable />
      </div>
    )
}
