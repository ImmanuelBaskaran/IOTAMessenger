import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Messenger from './Messenger';
import UserNameSet from './UserNameSet'


class App extends Component {

    componentWillMount() {
        const IOTA = require('iota.lib.js');
        window.User = {
            username:undefined,
        };
        window.iota = new IOTA({provider:`https://testnet140.tangle.works:443/`});

    }

    render() {
        return (
            <Router>
                <div>

                    <div class="nav">
                        <Link to={'/'}>Home</Link>s
                        <Link to={'/room'}>App</Link>
                    </div>
                    <header className="App-header">
                        <h1 className="App-title">Welcome to the IOTA MAM encrypter and decrypter</h1>
                    </header>
                    <Switch>
                        <Route exact path='/' component={UserNameSet} />
                        <Route exact path='/room' component={Messenger} />
                    </Switch>
                    <div class="footer"></div>
                </div>
            </Router>
        );
    }
}

export default App