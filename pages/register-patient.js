import React, { useState } from "react";
import Router from "next/router";
import { withStyles, makeStyles } from "@material-ui/core/styles";
// import styles from "../styles/register.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import { ToggleButton, Alert, ToggleButtonGroup } from "@material-ui/lab";
import API_CONFIG from "../components/API_CONFIG";
import Cookies from "js-cookie";
import { useForm } from 'react-hook-form';

const useStyles = makeStyles({
  register_card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    width: 320,
    height: 970,
    borderRadius: 25,
    boxShadow: "rgb(34 34 34 / 10%) 0px 8px 22px 6px",
    border: "1px solid rgba(225, 225, 225, 0)",
    padding: "0 65px 0 65px"
  },
  register_title: {
    fontSize: 28,
    color: "black",
    marginBottom: 65
  },
  item_title: {
    textAlign: "left",
    fontSize: 16,
    color: "black"
  },
  choose_gender: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  }
});

export default function IndexPage() {
  const styles = useStyles();
  const style = {
    bgd: {
      margin: "0",
      padding: "0",
      color: "rgba(0,0,0,.25)",
      backgroundImage: `url("/big-image2.jpg")`,
      width: "100%",
      paddingTop: "55px",
      paddingBottom: "55px",
      backgroundRepeat: "no-repeat"
    }
  };

  const StyledTextField = withStyles((theme) => ({
    root: {
      marginTop: 25
    }
  }))(TextField);

  const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
      display: "inline-block",
      margin: theme.spacing(2),
      border: "none",
      "&:not(:first-child)": {
        borderRadius: theme.shape.borderRadius
      },
      "&:first-child": {
        borderRadius: theme.shape.borderRadius
      }
    }
  }))(ToggleButtonGroup);

  const StyledToggleButton = withStyles((theme) => ({
    root: {
      border: "none",
      boxShadow: "inset 0px 9px 9px -9px gray,inset 0px -9px 9px -9px gray",
      width: 116,
      height: 50,
      fontSize: 16,
      marginLeft: 0,
      "&.Mui-selected": {
        backgroundColor: "#32BDFE",
        "&:hover": {
          backgroundColor: "#32AEFE"
        }
      }
    }
  }))(ToggleButton);

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
      marginTop: 67,
      boxShadow: "0 3px 5px 2px rgba(50, 189, 254, .3)",
      "&:hover": {
        backgroundColor: "rgba(40, 170, 250, 58)"
      }
    }
  })(Button);

  // choice of gender
  const [gender, setGender] = React.useState("");
  const handleGender = (event, newGender) => {
    setGender(newGender);
  };
  // choice of marriage
  const [marriage, setMarriage] = React.useState("");
  const handleMarriage = (event, newMarriage) => {
    setMarriage(newMarriage);
  };
  // choice of education
  const [education, setEducation] = React.useState("");
  const handleEducation = (event, newEducation) => {
    setEducation(newEducation);
  };
  // 注册逻辑
  const showAlert = (type, msg) => {
    setAlertType(type);
    setMessage(msg);
    setOpen(true);
  }
  const [alertType, setAlertType] = useState("error");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit } = useForm();
  const handleRegister = (data, e) => {
    let error = false;
    if(gender === null){
      showAlert("error", "请选择性别");
      error = true;
    }
    if(marriage === null){
      showAlert("error", "请选择婚姻状况");
      error = true;
    }
    if(education === null) {
      showAlert("error", "请选择学历");
      error = true;
    }
    if(data.password != data.confirm){
      showAlert("error", "密码输入不匹配");
      error = true;
    }
    if(error) {
      return;
    }
    
    setLoading(true);
    let millisecond = new Date().getTime();
    let expiresTime = new Date(millisecond + 60 * 1000 * 120);
    let url =
      API_CONFIG.patientRegister +
      "?name=" + data.name +
      "&sex=" + gender +
      "&marry=" + marriage +
      "&edu=" + education +
      "&birth=" + data.date +
      "&phone=" + data.phone +
      "&password=" + data.password;
    const requestOptions = {
      method: "POST"
    };
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setLoading(false);
        if(result === "true"){
          console.log(result);
          Cookies.set("phone", data.phone, {
            expires: expiresTime
          });
          console.log(result);
          setAlertType("success");
          setMessage("注册成功，即将跳转");
          setOpen(true);
          setTimeout(() => {Router.push('/')}, 1500);
        }else{
          showAlert("error", "该手机号已注册过");
        }
      })
      .catch((result) => {
        setLoading(false);
        setAlertType("error");
        setMessage("接口调用失败！");
        setOpen(true);
      });
  }
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
      <div className={styles.register_card}>
        <div className={styles.register_title}>患者注册</div>
        <form onSubmit={handleSubmit(handleRegister)}>
          <TextField
            id="outlined-basic"
            label="真实姓名"
            variant="outlined"
            name="name"
            inputRef={register}
            required
            fullWidth
          />
          <div className={styles.choose_gender}>
            <span className={styles.item_title}>性别</span>
            <StyledToggleButtonGroup
              size="small"
              value={gender}
              exclusive
              onChange={handleGender}
              aria-label="gender"
            >
              <StyledToggleButton value="男" aria-label="male">
                男
              </StyledToggleButton>
              <StyledToggleButton
                value="女"
                aria-label="female"
                style={{ marginRight: 0 }}
              >
                女
              </StyledToggleButton>
            </StyledToggleButtonGroup>
          </div>
          <div className={styles.choose_gender}>
            <span className={styles.item_title}>婚姻</span>
            <StyledToggleButtonGroup
              size="small"
              value={marriage}
              exclusive
              onChange={handleMarriage}
              aria-label="marriage"
            >
              <StyledToggleButton value="已婚" aria-label="married">
                已婚
              </StyledToggleButton>
              <StyledToggleButton
                value="未婚"
                aria-label="unmarried"
                style={{ marginRight: 0 }}
              >
                未婚
              </StyledToggleButton>
            </StyledToggleButtonGroup>
          </div>
          <div className={styles.choose_gender}>
            <span className={styles.item_title}>文化程度</span>
            <StyledToggleButtonGroup
              size="small"
              value={education}
              exclusive
              onChange={handleEducation}
              aria-label="education"
            >
              <StyledToggleButton value="初中" aria-label="middle">
                初中
              </StyledToggleButton>
              <StyledToggleButton
                value="高中"
                aria-label="high"
                style={{ marginRight: 0 }}
              >
                高中
              </StyledToggleButton>
            </StyledToggleButtonGroup>
          </div>
          <div className={styles.choose_gender}>
            <span className={styles.item_title}></span>
            <StyledToggleButtonGroup
              size="small"
              value={education}
              exclusive
              onChange={handleEducation}
              aria-label="education"
            >
              <StyledToggleButton
                value="专科"
                aria-label="junior"
                style={{ marginTop: 0 }}
              >
                专科
              </StyledToggleButton>
              <StyledToggleButton
                value="本科以上"
                aria-label="undergraduate"
                style={{ marginRight: 0, marginTop: 0 }}
              >
                本科以上
              </StyledToggleButton>
            </StyledToggleButtonGroup>
          </div>
          <TextField
            id="date"
            label="出生年月日"
            type="date"
            defaultValue="1970-01-01"
            InputLabelProps={{
              shrink: true
            }}
            style={{ marginTop: 19 }}
            name="date"
            inputRef={register}
            required
            fullWidth
          />
          <StyledTextField
            id="phone"
            label="手机号"
            variant="outlined"
            name="phone"
            inputRef={register}
            required
            fullWidth
          />
          <StyledTextField
            id="password"
            label="密码"
            type="password"
            variant="outlined"
            name="password"
            inputRef={register}
            required
            fullWidth
          />
          <StyledTextField
            id="confirm"
            label="确认密码"
            type="password"
            variant="outlined"
            name="confirm"
            inputRef={register}
            required
            fullWidth
          />
          {/* <div className={styles.submit_box}> */}
          <div>
            <LoginButton type="submit" disabled={loading} variant="contained" color="primary">
              注册
            </LoginButton>
          </div>
        </form>
      </div>
    </div>
  );
}
