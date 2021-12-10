import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    Grid, LinearProgress, Container, Link, Card, CardContent,
} from '@material-ui/core';
import {useLocation, useHistory} from 'react-router-dom';
import theme from '../theme';
import axios from 'axios';
import workerURL from "../constants";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        padding: '20px',
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function Download() {

    const classes = useStyles(theme);
    const location = useLocation<any>();
    // Check the location state if the cookiecutter has been created already.
    const [downloaded, setDownloaded] = useState(location.state?.downloaded || false)
    const [outputFolder, setOutputFolder] = useState({folderLocation: ''});

    const history = useHistory();

    function str2bytes (str: string) {
        var bytes = new Uint8Array(str.length);
        for (var i=0; i<str.length; i++) {
            bytes[i] = str.charCodeAt(i);
        }
        return bytes;
    }

    function createZipFolder(newData: any) {

    }

    useEffect(() => {

            const {...ccState} = location.state || {};
            delete ccState.created;
            delete ccState.downloaded;

            if (!Object.keys(ccState).length) {
                history.push('/');
                return;
            }


            //data: JSON.stringify(ccState)
            if (!downloaded && ccState) {
                const data = JSON.stringify(ccState)
                console.log(data)
                axios.post(
                    `${window.__ENV.REACT_APP_WORKER_URL}/download`,
                    data,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                ).then(
                    (res) => {
                        const url = window.URL.createObjectURL(new Blob([res.data],{type:'application/zip'}));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'file.zip');
                        document.body.appendChild(link);
                        link.click();
                        setDownloaded(true)
                        history.replace(location.pathname, { ...location.state, created: true, downloaded: true });
                    },
                    (error) => {
                        console.log(error);
                    });
            }
        },
        [downloaded, location, setDownloaded, history]);
    const {repo = '', org = ''} = location.state || {};

    const component = downloaded ? (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5">
                    Successfully downloaded
                </Typography>
            </CardContent>
        </Card>
    ) : (
        <div className={classes.root}>
            <Typography component="h1" variant="h6">
                Please wait while your project-directory is being generated...
            </Typography>

            <LinearProgress color="secondary" />
        </div>
    );

    return (
        <div className={classes.paper}>
            <Container>
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                >
                    {component}
                </Grid>
            </Container>
        </div>
    );
}
