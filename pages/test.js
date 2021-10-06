import React, { useState,Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar } from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import dynamic from "next/dynamic";

const Waveform = dynamic(() => import("../components/wave"), { ssr: false });

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 10
  },
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
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
  },
  typography: {
    padding: theme.spacing(2),
  },
  wave: {
      marginTop: "300px"
  }
}));

export default function Test(){
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
    const [startSecond, setStartSecond] = useState('0');
    const [endSecond, setEndSecond] = useState('0');
    const classes = useStyles();
    const [startTime, setStartTime] = useState("2021-08-03T9:55");
    const [endTime, setEndTime] = useState("2021-08-03T9:56");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [src, setSrc] = useState("")
    const [date, setDate] = useState("2021-08-01");
    const handleDate = (e) => {
        console.log(e.target)
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleChange = (e, newTime) => {
        e.target.defaultValue = e.target.value;
        setStartTime(e.target.value);
    }
    const handleChange2 = (e, newTime) => {
        e.target.defaultValue = e.target.value;
        setEndTime(e.target.value);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    
    const replay = () => {
        // setSrc("https://tts.baidu.com/text2audio.mp3?tex=啊啊啊啊啊啊啊&cuid=baike&amp&lan=ZH&amp&ctp=1&amp&pdt=301&amp&vol=100&amp&rate=32&amp&per=1");
        const s = startTime.replace('T', ' ') + `:${startSecond}`;
        const e = endTime.replace('T', ' ') + `:${endSecond}`;
        // const s = "2021-08-03 9:55:56";
        // const e = "2021-08-03 09:56:28";
        const userId = 1;
        setSrc('http://8.131.62.53:8080/api/audio/details?userId='+userId+'&start_time='+s+'&end_time='+e)
    }    
    const [alertType, setAlertType] = useState("error");
    const [bar, setBar] = useState(false);
    const [message, setMessage] = useState("");
    const showAlert = (type, msg) => {
        setAlertType(type);
        setMessage(msg);
        setBar(true);
    }
    
    return(
        <div style={style.bgd}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={bar}
                autoHideDuration={6000}
                onClose={() => { setBar(false) }}
            >
                <Alert onClose={() => { setBar(false) }} severity={alertType} elevation={6} variant="filled">
                {message}
                </Alert>
            </Snackbar>
            <div className={classes.header}>
                <div className={classes.heartChoice}>心音图仪</div>
                <div className={classes.lungChoice}>肺音图仪</div>
            </div>
            <div className={classes.wave}>
              <Waveform src={src}/>
            </div>
        </div>
    );
    
}