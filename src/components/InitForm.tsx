import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useForm, Resolver } from 'react-hook-form';
import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useCookies } from 'react-cookie';
import theme from '../theme';
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
}));

type Inputs = {
  template: string;
  directory?: string;
  org: string;
  repo: string;
};

const getUrl = (repo: string) => {
  const cookies = new Cookies();
  return `${process.env.REACT_APP_WORKER_URL}/validate/statisticsnorway/${repo}?token=${cookies.get('token')}`;
};

const resolver: Resolver<any> = async (values) => {
  const { data }: any = await axios.get(getUrl(values.repo));
  const errors: any = {};
  if (data?.repo) {
    errors.repo = {
      type: 'validate',
      message: data.repo,
    };
  }
  return {
    values: {
      template: {
        repo: "statisticsnorway/cookiecutter-dapla-team-default",
        directory: '',
      },
      repo: '',
      org: "statisticsnorway",
    },
    errors,
  };
};

export default function InitForm() {
  const classes = useStyles(theme);
  const { handleSubmit } = useForm<Inputs>({ resolver, reValidateMode: 'onSubmit' });
  const history = useHistory();
  const [cookies] = useCookies();
  if (!cookies.token) {
    return <Redirect to="/authorize" />;
  }
  const onSubmit = (data: any) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, token: cookies.token }),
    };
    fetch(`${workerURL}/form`, requestOptions)
      .then((response) => response.json())
      .then((data) => history.push('/create', data));
  };

  return (
    <div className={classes.paper}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Initialize
        </Button>
      </form>
    </div>
  );
}
