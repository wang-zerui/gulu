import React, { useState } from "react";
import Image from "next/image";
import { withStyles, makeStyles } from "@material-ui/core/styles";
// import styles from "../styles/login.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import DoneIcon from "@material-ui/icons/Done";
import { useRequest } from "ahooks";

const useStyles = makeStyles({
  logincard: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    width: 700,
    height: 748,
    borderRadius: 25,
    backgroundColor: "transparent",
    boxShadow: "rgb(34 34 34 / 10%) 0px 8px 22px 6px",
    border: "1px solid rgba(225, 225, 225, 0)"
  },
  loginLogo: {
    height: 160,
    width: 160
  },
  login_choice: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 54,
    width: 284
  },
  choice_warp1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 126,
    height: 44,
    borderRadius: 38,
    color: "#475aab",
    border: "2px solid #475aab",
    marginLeft: 36
  },
  choice_warp: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 126,
    height: 44,
    borderRadius: 38,
    color: "#475aab",
    border: "2px solid #475aab"
  },
  login_choice_span: {
    fontSize: 17
  },
  choice_circle: {
    display: "inline-block",
    height: 30,
    width: 30,
    marginLeft: 6,
    borderRadius: 16,
    border: "2px solid #63ba83"
  },
  form: {
    marginTop: 47
  },
  submit_style: {
    width: 321,
    height: 50
  },
  text: {
    width: 310,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row"
  },
  text1: {
    marginTop: 31,
    width: 310,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row"
  },
  submit_box: {
    display: "flex",
    justifyContent: "center",
    marginTop: 55,
    marginBottom: 55
  },
  foot: {
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "normal",
    width: "100%",
    bottom: 0
  },
  foot_item: {
    margin: 36,
    fontSize: 28,
    color: "rgba(74, 71, 71, 100)"
  }
});

export default function IndexPage() {
  const styles = useStyles();

  function handleLogin() {
    var requestOptions = {
      method: "POST"
    };

    fetch(
      "http://8.131.62.53:8089/gulu/login?phone=" +
        phone +
        "&password=" +
        password,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        return { success: true };
      })
      .catch((error) => {
        return { success: true };
      });
  }

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { loading, run } = useRequest(handleLogin, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        alert("登录成功");
      }
    }
  });

  const style = {
    bgd: {
      margin: "0",
      padding: "0",
      color: "rgba(0,0,0,.25)",
      backgroundImage: `url("/big-image2.jpg")`,
      width: "100%",
      paddingTop: "139px",
      paddingBottom: "193px"
    }
  };
  const ColorButton = withStyles((theme) => ({
    root: {
      fontSize: 26
    }
  }))(Button);
  const LoginButton = withStyles({
    root: {
      background: "rgba(50, 189, 254, 58)",
      borderRadius: 10,
      border: 0,
      color: "white",
      height: 50,
      fontSize: 20,
      width: 321,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(50, 189, 254, .3)",
      "&:hover": {
        backgroundColor: "rgba(40, 170, 250, 58)"
      }
    }
  })(Button);

  const StyledToggleButton = withStyles((theme) => ({
    root: {
      height: 30,
      width: 30,
      marginLeft: 6,
      borderRadius: 16,
      color: "transparent",
      border: "2px solid #63ba83",
      "&.Mui-selected": {
        color: "white",
        backgroundColor: "#63ba83",
        "&:hover": {
          backgroundColor: "#63ba83"
        }
      }
    }
  }))(ToggleButton);
  const [identity, setIdentity] = React.useState("patient");
  const handleIdentity = (event, newIdentity) => {
    setIdentity(newIdentity);
  };

  return (
    <div style={style.bgd}>
      <div className={styles.logincard}>
        <div className={styles.loginLogo}>
          <Image src="/login-logo.png" height={160} width={160}></Image>
        </div>
        <div className={styles.login_choice}>
          <div className={styles.choice_warp}>
            <span>患者</span>
            {/* <div className={styles.choice_circle}></div> */}
            <ToggleButtonGroup
              size="small"
              exclusive
              value={identity}
              onChange={handleIdentity}
              aria-label="identity"
            >
              <StyledToggleButton value="patient" aria-label="patient">
                <DoneIcon></DoneIcon>
              </StyledToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className={styles.choice_warp1}>
            <span>医生</span>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={identity}
              onChange={handleIdentity}
              aria-label="identity"
            >
              <StyledToggleButton value="doctor" aria-label="doctor">
                <DoneIcon></DoneIcon>
              </StyledToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <form noValidate autoComplete="off" className={styles.form}>
          <div className={styles.text}>
            <Image src="/username.png" height={60} width={60}></Image>
            <div>
              <TextField
                id="outlined-basic"
                label="账号"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
              />
            </div>
          </div>
          <div className={styles.text1}>
            <Image src="/password.png" height={60} width={60}></Image>
            <div width="250px">
              <TextField
                id="outlined-basic"
                label="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                type="password"
                fullWidth
              />
            </div>
          </div>
          <div className={styles.submit_box}>
            <LoginButton
              variant="contained"
              color="primary"
              className={styles.submit_style}
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? "登录中" : "登录"}
            </LoginButton>
          </div>
        </form>
        <div className={styles.foot}>
          <div className={styles.foot_item}>
            <ColorButton href={"/register-" + identity}>注册</ColorButton>
          </div>
          <div className={styles.foot_item}>
            <ColorButton href="#">忘记密码</ColorButton>
          </div>
        </div>
      </div>
    </div>
  );
}
