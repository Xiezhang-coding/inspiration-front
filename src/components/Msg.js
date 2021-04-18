import React, {Component} from 'react';

import {connect} from 'react-redux';
import axios from 'axios';
import Constant from '../Constant';
import Chat from './index';

class Msg extends Component {

    constructor(props) {
        super(props);
    }


    send = () => {
        // 发送消息
        axios.post('http://localhost:8080/message/send', {
            "topic": Constant.TOPIC,
            "msg": this.inputMsg.value,
            "userId": this.props.user.ID,
            "userName": this.props.user.name
        }).then(r => {
            console.log('send res->', r)
        })
    };

    clearTopicMsg = () => {
        axios.get('http://localhost:8080/message/clear', {
            params: {
                'topic': Constant.TOPIC
            }
        }).then(res => {
            console.log("clear res->", res)
        })
    };

    setScrollTop = () => {
        this.chat.refs.message.setScrollTop(1200);  //set scrollTop position
    };

    render() {
        return (
            <div className="center-block" style={{width: 800}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{textAlign: "center", margin: "auto auto"}}>当前房间：{Constant.TOPIC}</div>
                    <div style={{textAlign: "center", margin: "auto auto"}}>当前用户：{this.props.user.name}</div>
                    <div>
                        <button className="btn btn-default" type="button" onClick={this.clearTopicMsg}>清空数据
                        </button>
                    </div>
                </div>

                <div style={{marginTop: 20}}>
                    <Chat
                        ref={el => this.chat = el}
                        className="my-chat-box"
                        timestamp={this.props.user.t}
                        userInfo={{
                            avatar: 'http://example/avatar.jpg', //user avatar,  required parameters
                            userId: this.props.user.ID, //user id,  required parameters
                            name: this.props.user.name,
                            other: 'otherInfo'
                        }}
                        dataSource={this.props.msg}
                        // sendMessage={this.send()}
                        // placeholder="请输入"
                        messageListStyle={{width: '100%', height: 600}}
                        // inputFocus={this.setInputfoucs}
                    />
                </div>

                <div>
                    <div className="from-group" style={{display: "flex"}}>
                        <textarea defaultValue={"有请马老师发言!"} style={{flex: 2}} ref={inputMsg => {
                            this.inputMsg = inputMsg
                        }}/>
                        <button className="btn btn-default" type="button" onClick={this.send}>发送</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(
    (
        state
        ,
        props
    ) =>
        Object
            .assign({}, props, state)

    , {}
)
(Msg);