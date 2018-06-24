import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './view/App';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffcdd2',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#606060',
      contrastText: '#000',
    },
  },
});

const root = document.getElementById('root');
const load = () => render(
  (
    <MuiThemeProvider theme={theme}>
      <AppContainer>
        <App />
      </AppContainer>
    </MuiThemeProvider>
  ), root,
);

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./view/App', load);
}

load();
