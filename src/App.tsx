import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UseWalletProvider } from 'use-wallet';

import RobotsProvider from './contexts/Robots';
import BasisCashProvider from './contexts/BasisCashProvider';
import ModalsProvider from './contexts/Modals';

import store from './state';
import theme from './theme';
import config from './config';
import Updaters from './state/Updaters';
import Popups from './components/Popups';
import Robots from './views/Robot';
import Wallet from './views/Wallet';
import WhiteListBalance from './views/WhitelistBalance';


const App: React.FC = () => {
  return (
    <Providers>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Robots />
          </Route>
          <Route path="/wallet" exact>
            <Wallet />
          </Route>
          <Route path="/wlbalance" exact>
            <WhiteListBalance />
          </Route>
        </Switch>
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider chainId={config.chainId}>
        <Provider store={store}>
          <Updaters />
          <BasisCashProvider>
            <ModalsProvider>
              <RobotsProvider>
                <>
                  <Popups />
                  {children}
                </>
              </RobotsProvider>
            </ModalsProvider>
          </BasisCashProvider>
        </Provider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

export default App;
