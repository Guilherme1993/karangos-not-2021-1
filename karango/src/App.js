/*
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button'

<div className="App">
      <header className="App-header">
          <h1>Projeto Karangos</h1>
          <Button variant="contained">Clique aqui</Button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
  </div>*/

import TopBar from './ui/TopBar';
import FooterBar from './ui/FooterBar'
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import pink from '@material-ui/core/colors/pink';
import { Box } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import KarangosList from './routed/KarangosList2';
import KarangosForm from './routed/KarangosForm';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: yellow[500],
    },
    secondary: {
      main: pink[500],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',     //100% da altura da área visível
    paddingBottom: '42px'   //Para que o conteúdo não fique escondido atrás do footer
  },
  routed: {
    padding: '25px',
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily
  }

}));

function Main() {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <BrowserRouter>
        <TopBar />
        <Box id="routed" className={classes.routed}>
          <Switch>
            <Route path="/list">
              <KarangosList />
            </Route>
            <Route path="/new">
              <KarangosForm />
            </Route>
          </Switch>
        </Box>
        <FooterBar />
      </BrowserRouter>
    </Box>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
