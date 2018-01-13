import React, { Component } from 'react';


class UserNameSet extends Component {

    constructor(props) {
        super(props);
        this.mam = "";
        this.iotajs = "";
        this.mamstate = "";
        this.init = false;
        this.state = {value: '',address: '',fetch:'',message:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFetch = this.handleFetch.bind(this);
        this.send = this.send.bind(this);
    }




    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.send();

    }
    handleFetch(event) {
        event.preventDefault();
        this.fetch();
    }

    send(){
        window.MyVars = {
            username:this.state.value
        };
        console.log(window)
    }


    componentDidMount() {
        const IOTA = require('iota.lib.js');
        this.iotajs =new IOTA({ provider: `https://testnet140.tangle.works:443/` });
    }



    render() {


        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to the IOTA MAM encrypter and decrypter</h1>
                </header>
                <br/>
                <br/>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Message:
                        <input type="text" name= "value" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>



            </div>
        );
    }
}

export default UserNameSet;
