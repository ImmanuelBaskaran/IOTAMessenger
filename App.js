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
                    <div class="nav">
                        <Link to={'/'}>Home</Link>s
                        <Link to={'/room'}>App</Link>
                    </div>
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