/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from 'strapi-helper-plugin';
// Utils
import { Fonts, GlobalStyle } from '@buffetjs/styles';
import pluginId from '../../pluginId';
// Containers
import HomePage from '../HomePage';
import HistoryPage from "../HistoryPage";

const App = () => {
  return (
    <div>
      <Fonts />
      <GlobalStyle />
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route
          path={`/plugins/${pluginId}/history`}
          component={HistoryPage}
          exact
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
