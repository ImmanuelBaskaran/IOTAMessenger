import React, { Component } from 'react';
import Link from 'react-router'


class Messenger extends Component {

    constructor(props) {
        super(props);
        this.mam = "";
        this.iotajs = "";
        this.mamstate = "";
        this.init = false;
        this.sending = false;
        this.state = {value: '',address: '',fetch:'',message:[]};

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

    async repeatedFetch(){
        console.log(!this.sending);
        if(!this.sending){
            await this.fetch2();
        }
    }



    async send(){
        if(!this.init){
            this.mam = window.Mam;
            this.mamstate = window.mamstate;
            this.init = true;
        }
        let packet = this.state.value;
        let p = packet;

            packet = window.MyVars.username + ":" + packet;
            let trytes = window.iota.utils.toTrytes(JSON.stringify(packet));
            let message = this.mam.create(this.mamstate, trytes);
            this.mamstate = message.state;
            this.sending = true;
            await this.mam.attach(message.payload, message.address);
            this.sending = false;
            this.setState(this.setState({address: message.root}));
            console.log(window.mamstate);
            this.fetch2();
        if(p==="Temperature"){
            console.log(p);
            let temperature = Math.floor(20+(Math.random()*5));
            let temp  = this.state.message;
            temp.push(temperature);
            this.setState({message: temp});
        }
        if(p==="Weather"){
            console.log(p);
            let temperature = "Cloudy";
            let temp  = this.state.message;
            temp.push(temperature);
            this.setState({message: temp});
        }

    }
    async fetch2(){
        let resp = await window.Mam.fetch(window.mamIndex, window.mode);
        const mappingFunction = p => window.iota.utils.fromTrytes(p);
        let usersmessages = resp.messages.map(mappingFunction);
        console.log(usersmessages);
        window.mamstate.channel.start = resp.messages.length+1;
        this.setState(this.setState({message: usersmessages}));
    }

    componentDidMount() {
        this.state.fetch = window.mamIndex;
        console.log("Mount");
        this.fetch2();
        setInterval(this.repeatedFetch.bind(this), 30000);
    }



    render() {


        return (
            <div className="App">
                <br/>
                <br/>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Message:
                        <input type="text" name= "value" value={this.state.value} onChange={this.handleChange} required/>
                    </label>
                    <input type="submit" value="Submit" />

                </form>
                <div class="messageBox">
                    {this.state.message.map((person, index) => (
                        <p>{person}</p>
                    ))}
                </div>

            </div>
        );
    }
}

export default Messenger;
