import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar } from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import dynamic from "next/dynamic";
import { isLogin } from "../components/user.js";


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

const getUserId = () => {
  return "19030"
}

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
    const classes = useStyles();
   
    const [alertType, setAlertType] = useState("error");
    const [recordList, setRecordList] = useState([]);
    const [bar, setBar] = useState(false);
    const [message, setMessage] = useState("");
    const showAlert = (type, msg) => {
        setAlertType(type);
        setMessage(msg);
        setBar(true);
    }
    useEffect(() => {
      fetch('http://8.131.62.53:8080/api/record/load?userId=' + getUserId(),{
      "method": "POST"
      }).then(res => res.json())
          .then(res => {
            // list = res.data;
            console.log(res.data);
            setRecordList(res.data);
          })
          .catch(err => console.log(err))
    }, [])
    

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
              <Waveform recordList={recordList}/>
            </div>
        </div>
    );
    
}

export async function getServerSideProps(ctx) {
  if(isLogin()){
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return { props: {} }
}