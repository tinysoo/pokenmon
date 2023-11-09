
import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import pokemonList from './screens/pokemonList';
import detailPokenmon from './screens/detailPokenmon';
import {Provider} from 'react-redux';
import reducer from './redux/reducer';
import {createStore} from 'redux';
import store from './redux/store';

class App extends React.Component {


	render() {
		return (
		    <>
			<Provider store={store}>
			<Router>
                <Switch>
                    <Route exact path="/" component={pokemonList}/>
					<Route exact path="/detailPokenmon" component={detailPokenmon}/>
				</Switch>
			</Router>
			</Provider>
              </>

		);
	}
}
export default App;
