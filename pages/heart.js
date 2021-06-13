import React from "react";
import SmoothieComponent, { TimeSeries } from "react-smoothie";
import { useWebSocket } from "ahooks";
import Image from "next/image";
import {Grid,Container,Paper,Button,Typography} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme)=>({
  header:{
    position: "fixed",
    top: 0,
    width: "100%",
    height: 100,
    minWidth: "100px",
    display: "flex",
    flexDirection: "row"
  },
  lungChoice: {
    height: 100,
    width: "50%",
    margin: 0,
    lineHeight: "100px",
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  heartChoice: {
    height: 100,
    width: "50%",
    margin: 0,
    fontSize: 50,
    lineHeight: "100px",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#8D8A8A",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  content: {
    marginTop: 100,
    height: 700,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    position: "fixed",
    bottom: 0,
    height: 120,
    width: "100%",
    backgroundColor: "rgba(232, 232, 232, 0.3)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  funcBtn: {
    width: 350,
    height: 100,
    lineHeight: "100px",
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    backgroundColor: "rgba(16, 15, 15, 0.34)",
    color: "white",
    borderRadius: 50,
  }
  
}));
const LoginButton = withStyles({
  root: {
    background: "#ff9800",
    margin: 20,
    "&:hover": {
    }
  }
})(Button);

const addData = (num1, num2, time) => {
  ts[0].append(time, num1);
  ts[1].append(time, num2);
}

let ts = [];
let i = 0;
for(i = 0; i<2 ;i++)
{
    ts[i] = new TimeSeries;
}



export default function BrainPowerPage(){
    const styles = useStyles();
    const style = {
        bgd: {
            position: "fixed",
            width: "1920px",
            margin: "0",
            padding: "0",
            backgroundImage: `url("/hospital.png")`,
            height: "1080px",
            backgroundColor: "#DFDFDF",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat"
        }
    };
    var sleep = function(time) {
      var startTime = new Date().getTime() + parseInt(time, 10);
      while(new Date().getTime() < startTime) {}
    };
    const handleOpen = (event) => {
        alert("连接成功");
      }
      const handleMessage = (event) => {
        let time = new Date().getTime();
        let data = JSON.parse(event.data);
        let channel0 = data.channel0;
        let channel1 = data.channel1;
        let step = data.step;
        let length = channel0.length;
        console.log(channel0);
        console.log(time);
        for(let i=0;i<length;i++){
          addData(channel0[i], channel1[i], time+step*10000*i);
        }
        addData(0, 0, )
      };
      const handleClose = () => {
        alert("断开连接");
      }
      const options = {
        onOpen: handleOpen,
        onMessage: handleMessage,
        onClose: handleClose,
        // manual: true
      };
      const {
        readyState,
        sendMessage,
        latestMessage,
        disconnect,
        connect
      } = useWebSocket("ws://106.52.19.50:8086/api/heart", options);
    return(
        <div style={style.bgd}>
          <div className={styles.header}>
            <div className={styles.heartChoice}>心音图仪</div>
            <div className={styles.lungChoice}>肺音图仪</div>
          </div>
          <div className={styles.content}>
          <SmoothieComponent
          maxValue={20}
          width={1592}
          height={628}
          // streamDelay={200}
          // tooltip={true}
          timestampFormatter= {(timestamp)=> {
              let date = new Date(timestamp);
              return date.toTimeString().slice(0,8);
          }}
          grid={{
            sharpLines:true,
            millisPerLine:5000
          }}
          series={[
          {
              data: ts[0],
              strokeStyle:{g:255},
              fillStyle: { g: 255 },
              lineWidth: 2.5
          },
          {
            data: ts[1],
            strokeStyle:'#b52121',
            fillStyle: { g: 255 },
            lineWidth: 2.5
          }
          ]}
          />
          </div>
          <div className={styles.footer}>
            <div className={styles.funcBtn}>暂停</div>
            <div className={styles.funcBtn}>开始</div>
            <div className={styles.funcBtn}>回放</div>
          </div>
        </div>
    );
}
