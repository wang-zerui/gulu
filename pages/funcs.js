import React from "react";
import Image from "next/image";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Container,Link } from "@material-ui/core";
const useStyles = makeStyles((theme)=> ({
    logo:{
        marginLeft: "1764px",
        marginTop: "0px",
    },
    left_card:{
        flexDirection:"column",
        display: "flex",
        positon:"relative",
        alignItems:"left",
        marginLeft:"0px"
    },
    choice_card:{
        marginTop:"35px",
        width: "200px",
        height: "100px",
        lineHeight: "52px",
        backgroundColor: "rgba(255, 255, 255, 68)",
        color: "rgba(16, 16, 16, 100)",
        fontSize: "36px",
        textAlign: "center",
        fontFamily: "Roboto",
        border: "1px solid rgba(255, 255, 255, 100)"
    },
    center_card1:{
        display: "flex",
        position:"relative",
        marginLeft:"229px",
        marginTop:"-645px"
        
    },
    center_card2:{
        display: "flex",
        position:"relative",
        marginLeft:"229px",
        marginTop:"58px"
        
    },
    center_choiceCards:{
        width: "522px",
        height: "370px",
        lineHeight: "20px",
        backgroundColor: "rgba(154, 157, 159, 18)",
        color: "rgba(16, 16, 16, 100)",
        fontSize: "14px",
        textAlign: "left",
        boxShadow: "0px 2px 6px 0px rgba(79, 82, 79, 100)",
        fontFamily: "Roboto",
        border: "1px solid rgba(187, 187, 187, 100)",
        marginLeft:"55.5px",
        marginRight:"55.5px",
        opacity:"0.8"
    },
    textTitle:{
        width: "192px",
        height: "72px",
        color: "rgba(16, 16, 16, 100)",
        fontSize:" 48px",
        textAlign: "left",
        fontFamily:" SourceHanSansSC-regular"
    },
    textContent:{
        left: "507px",
        top: "293px",
        width: "407px",
        height: "160px",
        color: "rgba(16, 16, 16, 100)",
        fontSize: "36px",
        textAlign: "left",
        fontFamily: "SourceHanSansSC-regular",
        marginTop:"49px"
    }
}));

export default function FuncsPage(){
    const styles = useStyles();
    const [spacing, setSpacing] = React.useState(15);
    const style = {
        bgd: {
            margin: "0",
            color: "rgba(0,0,0,.25)",
            backgroundImage: `url("/functionpage.png")`,
            width: "100%",
            paddingTop: "139px",
            paddingBottom: "193px"
        }
    };
    return(
        <div className={style.bgd}>
            <div className={styles.logo}>
                <img src="/function_logo.png" width= "154px" height="139px"></img>
            </div>
            <div className={styles.left_card}>
                <div className={styles.choice_card}>
                    <Button href="\#" height="100px" width="200px">
                    <img src="/func_p5.png" alt="" height="84px" width="89px"/>
                    <h1 align="center">首页</h1>
                    </Button>
                </div>
                <div className={styles.choice_card}>
                    <Button href="\#"height="100px" width="200px">
                    <img src="/func_p6.png" alt="" height="84px" width="89px"/>
                    <h1 align="center">消息</h1>
                    </Button>
                </div>
                <div className={styles.choice_card}>
                    <Button href="\funcs" height="100px" width="200px">
                    <img src="/func_p7.png" alt="" height="84px" width="89px"/>
                    <h1>功能</h1>
                    </Button>
                </div>
                <div className={styles.choice_card}>
                    <Button href="\#" height="100px" width="200px">
                    <img src="/func_p8.png" alt="" height="84px" width="89px"/>
                    <h1>我的</h1>
                    </Button>
                </div>
            </div>
            
            <div className={styles.center_card1}>
                <div className={styles.center_choiceCards}>
                    <Link href="\brainpower">
                        <img src="/func_p1.png"alt="" height="113px" width="104px"></img> 
                        <div className={styles.textTitle}>脑电监测</div>
                    </Link>
                    <div className={styles.textContent}>
                        <p>
                           通过脑电帽及信息传输设备，掌握患者的脑电信息 
                        </p>
                    
                    </div>
    

                </div>
                <div className={styles.center_choiceCards}>
                    <Link href="\brainpower">
                        <img src="/func_p2.png"alt="" height="113px" width="104px"></img> 
                        <div className={styles.textTitle}>VR康复</div>
                    </Link>
                </div>
            </div>

            <div className={styles.center_card2}>
                <div className={styles.center_choiceCards}>
                    <Link href="\brainpower">
                        <img src="/func_p3.png"alt="" height="113px" width="104px"></img> 
                        <div className={styles.textTitle}>体征监测</div>
                    </Link>
                </div>
                <div className={styles.center_choiceCards}>
                    <Link href="\brainpower">
                        <img src="/func_p4.png"alt="" height="113px" width="104px"></img> 
                        <div className={styles.textTitle}>健康管理</div>
                    </Link>
                </div>
            </div>

        </div>
    );

}