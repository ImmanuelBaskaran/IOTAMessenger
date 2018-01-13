import React, { Component } from 'react';


class UserNameSet extends Component {

    constructor(props) {
        super(props);
        this.mam = "";
        this.iotajs = "";
        this.mamstate = "";
        this.init = false;
        this.state = {value: '',key: '',fetch:'',message:''};

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
            username:this.state.value,
        };
        window.mamstate = window.Mam.init(window.iota,"AJGCFUNURGYBEILHQGZYFGZUAEFDBYNBLJNNGBILLGBJNWEWNLJPLVXLZVZFG9MAXMLLRWYQSVOZFWZXX");
       // window.mamstate = window.Mam.init(window.iota);
        let packet = "";
        let trytes = this.iotajs.utils.toTrytes(JSON.stringify(packet));
        let message = window.Mam.create(window.mamstate, trytes);
        window.mamIndex = window.Mam.getRoot(window.mamstate);
        console.log(window.mamstate);
    }


    componentDidMount() {
        this.iotajs = window.iota;
    }

    updateMamState(){
     //   if(window.Mam.state.index);
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
                        Username:
                        <input type="text" name= "value" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                        Username:
                        <input type="text" name= "key" value={this.state.key} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default UserNameSet;
