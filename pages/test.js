import SmoothieComponent, { TimeSeries } from "react-smoothie";
import React from "react";
import { useWebSocket } from "ahooks";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
// global.WebSocket = require('ws');
// enum ReadyState {
//   Connecting = 0,
//   Open = 1,
//   Closing = 2,
//   Closed = 3,
// }
/*
  用于测试数据的函数
  用于模拟硬件传递的数据
  生成0~1随机数，发送post请求
  一次发送十个
*/
const test = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  var i = 0;
  for(i = 0; i < 10; i++){
    var urlencoded = new URLSearchParams();
    urlencoded.append((Math.random()*10).toString(), "");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://119.23.233.64:8081/diagram", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
}
const LoginButton = withStyles({
  root: {
    background: "#ff9800",
    margin: 20,
    "&:hover": {
    }
  }
})(Button);

const ts1 = new TimeSeries({});
const ts2 = new TimeSeries({
  resetBounds: true,
  resetBoundsInterval: 3000
});
export default function IndexPage() {
  const handleOpen = (event) => {
    alert("连接成功");
  }
  const handleMessage = (event) => {
    var time = new Date().getTime();
    ts1.append(time, parseInt(event.data));
    console.log(time, event.data);
  };
  const handleClose = () => {
    alert("断开连接");
  }
  const options = {
    onOpen: handleOpen,
    onMessage: handleMessage,
    onClose: handleClose,
    manual: true
  };
  const {
    readyState,
    sendMessage,
    latestMessage,
    disconnect,
    connect
  } = useWebSocket("ws://119.23.233.64:8081/showdiagram", options);
  return (
    <div>
      <h3>
      用于测试数据的函数
      用于模拟硬件传递的数据
      生成0~1随机数，发送post请求
      一次发送十个
      通过http://119.23.233.64:8081/diagram
      </h3>
      <LoginButton
        onClick={() => {
          connect();
        }}
      >连接websocket服务</LoginButton>
      <LoginButton
        onClick={() => {
          disconnect();
        }}
      >断开连接</LoginButton>
       <LoginButton
        onClick={() => {
          test();
        }}
      >模拟硬件，发送到后端一堆随机数</LoginButton>
      <SmoothieComponent
        responsive
        height={300}
        series={[
          {
            data: ts1,
            strokeStyle: { g: 255 },
            fillStyle: { g: 255 },
            lineWidth: 4
          },
          {
            data: ts2,
            strokeStyle: { r: 255 },
            fillStyle: { r: 255 },
            lineWidth: 4
          }
        ]}
      />
    </div>
  );
}
