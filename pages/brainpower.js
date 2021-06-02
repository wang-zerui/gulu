import React from "react";
import SmoothieComponent, { TimeSeries } from "react-smoothie";
import { useWebSocket } from "ahooks";
import Image from "next/image";
import {Grid,Container,Paper,Button,Typography} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme)=>({
    logo:{
        position: "absolute",
        top: 10,
        right: 10
    },
    content:{
        display:"flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        height: "100%"
    },
    left_card:{
        display: "flex",
        flexDirection:"column",
        alignItems:"flex-end",
    },
    right_card:{
        marginLeft: 172,
    },
    choice_card1:{
        marginTop: 219,
        width: "200px",
        height: "100px",
        lineHeight: "52px",
        backgroundColor: "rgba(255, 255, 255, 65)",
        color: "rgba(16, 16, 16, 100)",
        fontSize: "36px",
        textAlign: "center",
        fontFamily: "Roboto",
        border: "1px solid rgba(255, 255, 255, 100)",
    },
    choice_card:{
        marginTop:"35px",
        width: "200px",
        height: "100px",
        lineHeight: "52px",
        backgroundColor: "rgba(255, 255, 255, 65)",
        color: "rgba(16, 16, 16, 100)",
        fontSize: "36px",
        textAlign: "center",
        fontFamily: "Roboto",
        border: "1px solid rgba(255, 255, 255, 100)",
    },
    paper_all1:{
        flexDirection:"row",
        display: "flex",
        marginTop:"91px",
       
    },
    paper_all2:{
        flexDirection:"row",
        display: "flex",
        positon:"relative",
    },
    paper_1:{
        positon:"relative",
        marginRight:"11.5px",
        width:"874px",
        height:"554px",
        lineHeight: "104px",
        border:"2px",
        left:"372px",
        top:"91px",
        backgroundColor: "rgba(255, 255, 255, 65)",
        color: "rgba(16, 16, 16, 100)",
        fontSize: "72px",
        textAlign: "center",
        boxShadow:"0px 2px 6px 0px rgba(79, 82, 79, 77)",
        fontFamily: "Roboto",
        border: "2px solid rgba(187, 187, 187, 100)" ,
    },
    paper_2:{
        marginLeft:"11.5px",
        left: "1269px",
        width: "371px",
        height: "554px",
        lineHeight: "52px",
        color:" rgba(16, 16, 16, 100)",
        backgroundColor: "rgba(255, 255, 255, 65)",
        fontSize: "36px",
        textAlign: "center",
        fontFamily: "Roboto",
        border: "2px solid rgba(187, 187, 187, 100)",  
    },
    paper_3:{
        marginTop:"35px",
        marginRight:"22px",
        left: "374px",
        top: "680px",
        width: "616px",
        height: "375px",
        lineHeight: "20px",
        color: "rgba(16, 16, 16, 100)",
        
        fontFamily: "Roboto",
        border: "3px solid rgba(52, 171, 49, 100)"
    },
    paper_4:{
        marginTop:"35px",
        marginLeft:"22px",
        left: "1034px",
        top: "680px",
        width: "606px",
        height: "375px",
        lineHeight: "20px",
        color: "rgba(16, 16, 16, 100)",
        fontFamily: "Roboto",
        border: "3px solid rgba(52, 171, 49, 100)"
    },
    textContent:{
        marginTop:"45px",
        marginLeft:"75px",
        marginBottom:"22px",
        fontSize:"28px"
    },
    SButton:{
        left: "582px",
        top: "926px",
        width: "200px",
        height: "100px",
        lineHeight: "41px",
        backgroundColor: "rgba(52, 171, 49, 45)",
        color: "rgba(16, 16, 16, 100)",
        fontSize: "28px",
        textAlign: "center",
        fontFamily: "Roboto",
        border: "1px solid rgba(187, 187, 187, 100)",
        marginTop:"18px",
        marginLeft:"203px",
    },
    choice_text:{
        fontSize: 36,
    },
    choice_text_selected:{
        fontSize: 36,
        fontWeight: "bold"
    }

}));

var host = "8.131.62.53:8080";
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
  urlencoded.append("data", data.join(" "));

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
  setInterval(postData, 200);
}
const LoginButton = withStyles({
  root: {
    background: "#ff9800",
    margin: 20,
    "&:hover": {
    }
  }
})(Button);

let ts = [];
let i = 0;
for(i = 0; i<8 ;i++)
{
    ts[i] = new TimeSeries;
}



export default function BrainPowerPage(){
    const styles = useStyles();
    const style = {
        bgd: {
            margin: "0",
            padding: "0",
            color: "rgba(0,0,0,.25)",
            backgroundImage: `url("/functionpage.png")`,
            height: "100%",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat"
        }
    };
    const handleOpen = (event) => {
        alert("连接成功");
      }
      const handleMessage = (event) => {
        // let time = new Date().getTime();
        let data = JSON.parse(event.data);
        let datainfo = data.datainfo;
        let stringtime = datainfo.collect_time;
        let time = Date.parse(new Date(stringtime));

        for(let i=0;i<8;i++){
            ts[i].append(time, data.data[i]);
        }
        
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
      } = useWebSocket("ws://"+host+"/api/connws", options);
    return(
        <div style={style.bgd}>
            <div className={styles.logo}>
                <img src="/login-logo.png" width= "154px" height="139px"></img>
            </div>
            <div className={styles.content}>
                <div className={styles.left_card}>
                    <div className={styles.choice_card1}>
                        <Button href="\#" height="100px" width="200px">
                        <img src="/func_p5.png" alt="" height="84px" width="89px"/>
                        <div className={styles.choice_text}>首页</div>
                        </Button>
                    </div>
                    <div className={styles.choice_card}>
                        <Button href="\#"height="100px" width="200px">
                        <img src="/func_p6.png" alt="" height="84px" width="89px"/>
                        <div className={styles.choice_text}>消息</div>
                        </Button>
                    </div>
                    <div className={styles.choice_card}>
                        <Button href="\funcs" height="100px" width="200px">
                        <img src="/func_p7.png" alt="" height="84px" width="89px"/>
                        <div className={styles.choice_text_selected}>功能</div>
                        </Button>
                    </div>
                    <div className={styles.choice_card}>
                        <Button href="\#" height="100px" width="200px">
                        <img src="/func_p8.png" alt="" height="84px" width="89px"/>
                        <div className={styles.choice_text}>我的</div>
                        </Button>
                    </div>
                </div>
                
                <div className={styles.right_card}>
                <div className={styles.paper_all1} >
                    <div className={styles.paper_1}>
                    {ts.map((t) => (
                        <SmoothieComponent
                        responsive
                        height={69}
                        // streamDelay={200}
                        // tooltip={true}
                        timestampFormatter= {(timestamp)=> {
                            let date = new Date(timestamp);
                            return date.toTimeString().slice(0,8);
                        }}
                        series={[
                        {
                            data: t,
                            strokeStyle: { g: 255 },
                            fillStyle: { g: 255 },
                            lineWidth: 4
                        }
                        ]}
                    />
                    ))}
                    </div>
                    <div className={styles.paper_2}>
                        
                    </div>
                </div>
                <div className={styles.paper_all2}>
                    <div className={styles.paper_3}>
                        <div>
                            <img src="/func_p10.png"alt="" width="89px" height="92px"></img>
                            <font color="#34AB31" size="6">设备信息</font>
                        </div>
                        <div className={styles.textContent}>脑机接口设备：</div>
                        <div className={styles.textContent}>移动端设备：</div>
                        <div className={styles.SButton}>
                            <Button>
                                <h2>设备管理</h2>
                            </Button>
                        </div>
                    </div>
                    <div className={styles.paper_4}>
                        <div>
                            <img src="/func_p9.png"alt="" width="89px" height="92px"></img>
                            <font color="#34AB31" size="6">患者信息</font>
                        </div>
                        <div className={styles.textContent}>患者姓名：</div>
                        <div className={styles.textContent}>患者信息：</div>
                        <div className={styles.SButton}>
                            <Button>
                                <h2>联系患者</h2>
                            </Button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
