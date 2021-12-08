import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Grid, Button, TextField} from '@material-ui/core';
import {useForm} from 'react-hook-form';
import {useLocation, useHistory, Link} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import theme from '../theme';


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
}));

function toHumanReadable(name: string) {
    if (!name) {
        return '';
    }
    const words = name.match(/[A-Za-z][^_\-A-Z]*/g) || [];

    return words.map(capitalize).join(' ');
}

function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}

const UserDataFields = ({userData, inputRef}: any) => {
    const output = Object.keys(userData).filter((key) => !(key.startsWith('_') && !key.endsWith('__'))).map(
        (name) => (
            <Grid item xs={12} key={name}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    inputRef={inputRef}
                    id={name}
                    label={toHumanReadable(name)}
                    name={name}
                    InputProps={{
                        readOnly: true,
                    }}
                    defaultValue={userData[name]}
                    autoComplete={name}
                />
            </Grid>
        ),
    );
    return (
        <>
            {output}
        </>
    );
};

const ListValue = ({name, value, inputRef}: any) => (
    <Grid item xs={12}>
        <Autocomplete
            id={name}
            options={value}
            getOptionLabel={(option: any) => option}
            defaultValue={value[0]}
            renderInput={(params) => (
                <TextField
                    {...params}
                    required
                    autoFocus
                    inputRef={inputRef}
                    autoComplete={name}
                    name={name}
                    label={toHumanReadable(name)}
                    variant="outlined"
                />
            )}
        />
    </Grid>
);

const StringValue = ({name, value, inputRef}: any) => (
    <Grid item xs={12}>
        <TextField
            variant="outlined"
            fullWidth
            autoFocus
            inputRef={inputRef}
            id={name}
            label={toHumanReadable(name)}
            name={name}
            defaultValue={value}
            autoComplete={name}
        />
    </Grid>
);

const InputField = ({
                        name, value, inputRef, done,
                    }: any) => {
    if (done) {
        return null;
    }
    if (typeof value === 'string') {
        return <StringValue key={name} name={name} value={value} inputRef={inputRef} />;
    }
    return <ListValue key={name} name={name} value={value} inputRef={inputRef} />;
};

export default function CCForm(this: any) {
    const classes = useStyles(theme);
    const {register, handleSubmit} = useForm<any>({reValidateMode: 'onSubmit'});
    const location = useLocation<any>();
    const history = useHistory();

    const handleSubmit_create = () => {
        location.state.isDownload = false
    }

    const onSubmit = (data: any) => {
        console.log(location.state.isDownload)
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    ...location.state,
                    user_inputs: {...location.state.user_inputs, ...data},
                },
            ),
        };
        fetch(`${process.env.REACT_APP_WORKER_URL}/form`, requestOptions)
            .then((response) => response.json())
            .then((newData) => {
                if (location.state.isDownload) {
                    history.push(location.state.done ? '/downloaded' : '/download', newData);
                } else {
                    history.push(location.state.done ? '/created' : '/create', newData);
                }
            });

    };

    useEffect(() => {
            if (!location.state) {
                history.push('/');
            }
        },
        [location, history]);

    if (location.state) {

        const { user_inputs, next_key, next_value, done, has_defaults } = location.state;

        const template = location.state.template.repo + (location.state.template.directory ? `/${location.state.template.directory}` : '');

        const defaultPrompt = (
            <Typography component="h6" variant="caption">
                Default prompts for
                {' '}
                <span style={{color: 'grey'}}>{template}</span>
                {' '}
                are missing from your
                organization.
                <br />
                <Link
                    style={{color: 'orangered'}}
                    to={{
                        pathname: 'default-docs',
                        state: {
                            template,
                            org: location.state.org,
                            baseUrl: location.state.base_url,
                            templateRepo: location.state.template.repo,
                            templateDir: location.state.template.directory,
                            ccKeys: Object.keys(location.state.cc_context),
                        },
                    }}
                >
                    Click here to see instructions on how to add them.
                </Link>
            </Typography>
        );
        return (
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Please provide inputs
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <UserDataFields inputRef={register} userData={user_inputs} />
                        <InputField name={next_key} value={next_value} done={done} inputRef={register} />
                    </Grid>
                    <Button
                        onClick={handleSubmit_create}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {done ? 'Submit' : 'Next'}
                    </Button>
                </form>
                {has_defaults ? null : defaultPrompt}
            </div>
        );
    }
    return null;
}
