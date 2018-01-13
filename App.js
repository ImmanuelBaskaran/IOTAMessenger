import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Messenger from './Messenger';
import UserNameSet from './UserNameSet'


class App extends Component {

    componentWillMount() {
        window.MyVars = {
            username:undefined
        };
        console.log(window)
    }

    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/room'}>App</Link></li>
                    </ul>
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