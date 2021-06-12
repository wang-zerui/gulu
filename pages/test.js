import SmoothieComponent, { TimeSeries } from "react-smoothie";
import React from "react";
import { useWebSocket } from "ahooks";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import WaveSurfer from 'wavesurfer.js'
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js'

var host = "106.52.19.50";
function randomNum(minNum,maxNum){ 
  switch(arguments.length){ 
  case 1: 
   return parseInt(Math.random()*minNum+1); 
  break; 
  case 2: 
   return parseInt(Math.random()*(maxNum-minNum+1)+minNum); 
  break; 
  default: 
   return 0; 
  break; 
  } 
 } 
 
const postData = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  var i = 0;
  var urlencoded = new URLSearchParams();
  var data = [];
  for(i = 0; i < 8 ; i++ ){
    data.push(randomNum(10, 99).toString());
  }
  urlencoded.append("data",data.join(" "));

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  fetch("http://"+host+":8090/api/sendnsave", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
const test = () => {
  setInterval(postData, 100);
}
const LoginButton = withStyles({
  root: {
    background: "#ff9800",
    margin: 20,
    "&:hover": {
    }
  }
})(Button);

wavesurfer = WaveSurfer.create({
  container: '#audioChart',//容器
  waveColor: '#1DE3FA',//波形图颜色
  progressColor: '#159faf',//进度条颜色
  backend: 'MediaElement',
  mediaControls: false,
  audioRate: '1',//播放音频的速度
  //插件
  plugins: [
      //时间轴插件
      // Timeline.create({
      //     container: '#wave-timeline'
      // }),
      // 光标插件
      // CursorPlugin.create({
      //     showTime: true,
      //     opacity: 1,
      //     customShowTimeStyle: {
      //         backgroundColor: '#000',
      //         color: '#fff',
      //         padding: '2px',
      //         fontSize: '10px'
      //     }
      // }),
  ]
});
// 特别提醒：此处需要使用require(相对路径)，否则会报错
wavesurfer.load("/test.flac");


export default function IndexPage() {
  const handleOpen = (event) => {
    alert("连接成功");
  }
  const handleMessage = (event) => {
    let time = new Date().getTime();
    let data = JSON.parse(event.data);
    // let stringtime = data.collect_time;
    // let time = Date.parse(new Date(stringtime));
    ts1.append(time, data.p0);
    console.log(time, data);
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
  } = useWebSocket("ws://106.52.19.50:8086/api/heart", options);
  return (
    <div>
      <h3>
        测试音频波形图
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
      <div id="#audioChart">
      </div>
    </div>
  );
}
