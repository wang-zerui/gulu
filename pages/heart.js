import React from "react";
import { useState } from "react";
import SmoothieComponent, { TimeSeries } from "react-smoothie";
import { useWebSocket } from "ahooks";
import Router from "next/router";
import Popover from '@mui/material/Popover';
import { Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import { isLogin } from "../components/user.js";
import { useInterval } from 'ahooks';

const useStyles = makeStyles((theme) => ({
  header: {
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

const ts1 = new TimeSeries({});

export default function BrainPowerPage() {
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
      backgroundSize: "cover",
      backgroundPosition: "50%",
    }
  };


  const [alertType, setAlertType] = useState("error");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const showAlert = (type, msg) => {
    setAlertType(type);
    setMessage(msg);
    setOpen(true);
    setTimeout(() => {
      setOpen(false)
    }, 2000);
  }
  
  const [isConnected, setIsConnected] = useState(false);
  const [src, setSrc] = useState('')
  const [isPlay, setIsPlay] = useState(false)
  const playAudio = () => {
    const audio = document.getElementById(`audio`);
    console.log("play");
    audio.play();
    setIsPlay(true);
  };

  const pauseAudio = () => {
    const audio = document.getElementById(`audio`);
    // audio.pause();
    setIsPlay(false);
  };

  const [length, setLength] = useState(999);
  const [channel, setChannel] = useState([]);
  const [count, setCount] = useState(0);
  const [interval, setInterval] = useState(null);
  const changeCount = (num) => {
    setCount(num);
    if (count >= length) {
      console.log("结束");
      pauseAudio();
      setCount(0);
      setChannel([])
      setInterval(null);
    }
  }
  useInterval(
    () => {
      let time = new Date().getTime();
      ts1.append(time, channel[count]);
      console.log("添加数据");
      // ts1.append(time, Math.random());
      changeCount(count + 1);
    },
    interval,
    { immediate: true },
  );

  const handleMessage = (event) => {
    console.log((new Date()).getTime());
    let data = JSON.parse(event.data);
    let channel0 = data.channel0;
    let length = channel0.length;
    let delta = 1000 / length;
    setChannel(channel0);
    setLength(length);
    setSrc('http://8.131.62.53:8080/api/audio/loadmusic?target=' + data.target);
    setInterval(delta);
    playAudio();
  };

  const handleOpen = (event) => {
    setIsConnected(true);
    showAlert("success", "连接成功");
  }

  const handleClose = () => {
    setIsConnected(false);
    showAlert("error", "断开连接");
  }

  const options = {
    onOpen: handleOpen,
    onMessage: handleMessage,
    onClose: handleClose,
    manual: true,
    reconnectLimit: 1000,
    reconnectInterval: 100,
  };
  
  const {
    readyState,
    sendMessage,
    latestMessage,
    disconnect,
    connect
  } = useWebSocket("ws://8.131.62.53:8080/api/connws", options);


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopClose = () => {
    setAnchorEl(null);
  };
  const open1 = Boolean(anchorEl);
  const id = open1 ? 'simple-popover' : undefined;

  return (
    <div style={style.bgd}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={() => { setOpen(false) }}
      >
        <Alert onClose={() => { setOpen(false) }} severity={alertType} elevation={6} variant="filled">
          {message}
        </Alert>
      </Snackbar>
      <div className={styles.header}>
        <div className={styles.heartChoice}>心音图仪</div>
        <div className={styles.lungChoice}>肺音图仪</div>
      </div>
      <div className={styles.content}>
        <SmoothieComponent
          maxValue={15}
          minValue={-15}
          width={1592}
          height={628}
          // streamDelay={200}
          // tooltip={true}
          timestampFormatter={(timestamp) => {
            let date = new Date(timestamp);
            return date.toTimeString().slice(0, 8);
          }}
          labels={{disabled:false}}
          grid={{
            // fillStyle: "transparent",
            sharpLines: true,
            millisPerLine: 5000,
            millisPerPixel: 2
          }}
          series={[
            {
              data: ts1,
              strokeStyle: { g: 255 },
              fillStyle: { g: 255 },
              lineWidth: 1.5
            }
          ]}
        />
      </div>
      <div className={styles.footer}>
          <Popover
            id={id}
            open={open1}
            anchorEl={anchorEl}
            onClose={handlePopClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            TODO:录制
          </Popover>
        <div className={styles.funcBtn} onClick={ handlePopOpen }>录制</div>
        <div className={styles.funcBtn} onClick={() => { if(!isConnected){connect()}else{disconnect(); setInterval(null)}; }}>{isConnected?"结束听诊":"开始听诊"}</div>
        <div className={styles.funcBtn} onClick={() => { Router.push('/record') }}>回放</div>
      </div>
      <audio
        id="audio"
        src={src}
        preload={"auto"}
      >
        <track src={src} kind="captions" />
      </audio>
    </div>
    
  );
}

export async function getServerSideProps(ctx) {
  if (isLogin()) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return { props: {} }
}