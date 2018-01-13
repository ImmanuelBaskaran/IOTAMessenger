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
                            <a><Link to={'/'}>Home</Link></a>
                            <a><Link to={'/room'}>App</Link></a>
                    </div>
                    <Switch>
                        <Route exact path='/' component={UserNameSet} />
                        <Route exact path='/room' component={Messenger} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App