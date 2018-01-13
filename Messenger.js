import React, { Component } from 'react';


class Messenger extends Component {

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
        if(!this.init){
            this.mam = window.Mam;
            this.mamstate = this.mam.init(this.iotajs);
            this.init = true;
        }

        let packet = this.state.value;
        let trytes = this.iotajs.utils.toTrytes(JSON.stringify(packet));
        let message = this.mam.create(this.mamstate, trytes);
        this.mamstate = message.state;
        this.mam.attach(message.payload, message.address);
        this.setState(this.setState({address: message.root}));
    }
    async fetch(){
        let resp = await window.Mam.fetch(this.state.fetch, 'public');
        let text = (this.iotajs.utils.fromTrytes(resp.messages[0]));
        this.setState(this.setState({message: text}));
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
                <p>{this.state.address}</p>
                <form onSubmit={this.handleFetch}>
                    <label>
                        Address:
                        <input type="text" name= "fetch" value={this.state.fetch} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="fetch" />
                </form>
                <p>

                    {this.state.message}

                </p>

            </div>
        );
    }
}

export default Messenger;
