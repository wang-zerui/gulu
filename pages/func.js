import React from "react";
import Image from "next/image";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
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
    }
})

export default function FunctionPage(){
    const styles = useStyles();
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
        <div style={style.bgd}>
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
        </div>
    );

}