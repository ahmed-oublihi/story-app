import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles'

import Input from './Input';
import Icon from './icon';

const Auth = () => {
  const classes = useStyles();
  const [ showPassword, setShowPassword ] = useState(false);
  const [ isSignup, setIsSignup ] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {}

  const handleChange = () => {}

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword )

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {

      dispatch({ type: 'AUTH', data: { result, token } });
      history.push('/');
      
    } catch (error) {
      console.log(error);
    }
  }

  const googleFailure = () => {
    console.log('Google Sign in was unsuccessful, Try Again Later!')
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>
          {isSignup ? 'Sign up' : 'Sign in'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="firstName" label="First Name" handleChange={handleChange}  half />
                </>
              )
            }
            <Input name="email" label="Email Adress" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type='password' /> }
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {isSignup ? 'Sign up' : 'Sign in'}
          </Button>
          <GoogleLogin 
            clientId='723302735419-7lql6mse2ea2d5ldlu5ohjdl4v8qmqqo.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button 
                className={classes.googleButton} 
                color='primary' 
                fullWidth 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled} 
                startIcon={<Icon />} 
                variant='contained' 
              >
                Google Sign in
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : 'Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
