import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Redirect, Route} from 'react-router-dom'
import Msg from './components/Msg'
import {addMsg, setSeq, setUserId, setUserName, setTimestamp} from './actions'
import axios from "axios";
import Constant from "./Constant";

class App extends Component {
    // eslint-disable-next-line no-useless-constructor

    constructor() {
        super()
    }

    longPull = () => {
        axios.get('http://localhost:8080/message/pull', {
            timeout: 6000,
            params: {
                'topic': Constant.TOPIC,
                'seq': this.props.user.seq,
                'userId': this.props.user.ID
            }
        }).then(res => {
            let data = res.data;
            // let obj = JSON.parse(data);

            let messages = data.messages;
            let seq = data.seq;

            if (messages !== undefined) {
                messages.forEach(msg => {
                    let useMsg = {
                        timestamp: msg.timestamp,
                        userInfo: {
                            avatar: "http://example/2.png",
                            name: msg.userName,
                            userId: msg.userId
                        },
                        value: msg.msg + "_seq" + msg.num,
                        t: new Date(msg.timestamp).toLocaleString()
                    };
                    this.props.setTimestamp(msg.timestamp);
                    this.props.addMsg(useMsg);
                });
            }

            this.props.setSeq(seq);

            // 重新轮询
            this.longPull()
        }).catch(reason => {
            console.log("pull error->", reason);
            this.longPull()
        })
    };

    login = () => {
        axios.get('http://localhost:8080/user/login').then(res => {
            let data = res.data;
            this.props.setUserId(data.userId);
            this.props.setUserName(data.userName);
        }).then(res => {
            this.longPull();
        })
    }

    componentDidMount() {
        this.login();
    }

    render() {
        return (
            <div>
                {
                    <Redirect to="/msg"/>
                }
                <Route path="/msg" component={Msg}/>
            </div>
        );
    }
}


export default connect((state, props) => Object.assign({}, props, state), {
    setUserId,
    setUserName,
    addMsg,
    setSeq,
    setTimestamp
})(App);
