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

// 两个样式分别对应全局样式和背景样式
// 与其他login.js页面定义方式一样
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


// 这个页面感觉做的还是不错的， 没啥太要说的
export default function IndexPage() {
  // 样式定义
  const styles = useStyles();

  // 自定义组件
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

  // 几个useState
  // 跟后面几个选项绑定
  const [gender, setGender] = useState("男");
  const [loading, setLoading] = useState(false);
  const handleGender = (event, newGender) => {
    setGender(newGender);
  };
  const [department, setDepartment] = useState("");
  const handleDepartment = (event, newDepartment) => {
    setDepartment(newDepartment);
  };

  // alert提示框
  const [alertType, setAlertType] = useState("error");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const showAlert = (type, msg) => {
    setAlertType(type);
    setMessage(msg);
    setOpen(true);
  }

  // 用到了一个useForm钩子，https://www.jianshu.com/p/fa6e3d76bcaa
  // 不是很难理解
  // yysy这里不用也行
  const { register, handleSubmit } = useForm();
  const handleRegister = (data, e) => {
    let error = false;
    if(department === null){
      showAlert("error", "请选择科室");
      error = true;
    }
    if(gender === null) {
      showAlert("error", "请选择性别");
      error = true;
    }
    if(data.password != data.confirm){
      error = true;
    }
    if(error) {
      return;
    }
    setLoading(true);
    let millisecond = new Date().getTime();
    let expiresTime = new Date(millisecond + 60 * 1000 * 120);
    let url =
      API_CONFIG.doctorRegister +
      "?name=" + data.name +
      "&sex=" + gender +
      "&department=" + department +
      "&birth=" + data.date +
      "&phone=" + data.phone +
      "&email=" + data.email +
      "&password=" + data.password +
      "&invite_code=" + data.inviteCode;
    const requestOptions = {
      method: "POST"
    };
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setLoading(false);
        if(result === "true"){
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
        <div className={styles.register_title}>医生注册</div>
        <form onSubmit={handleSubmit(handleRegister)}>
          <TextField
            id="name"
            name="name"
            inputRef={register}
            label="真实姓名"
            variant="outlined"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <div className={styles.choose_gender}>
            <span className={styles.item_title}>性别</span>
            {/* 这里的StyleToggleButtonGroup是个挺巧妙地玩意
            具体参考 https://mui.com/zh/components/toggle-button/
            BTW, 用的时候的文档可能和现在的不大一样了，应该也差不太多*/}
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
            <span className={styles.item_title}>科室</span>
            <StyledToggleButtonGroup
              size="small"
              value={department}
              exclusive
              onChange={handleDepartment}
              aria-label="department"
            >
              <StyledToggleButton value="内科" aria-label="外科">
                内科
              </StyledToggleButton>
              <StyledToggleButton
                value="外科"
                aria-label="外科"
                style={{ marginRight: 0 }}
              >
                外科
              </StyledToggleButton>
            </StyledToggleButtonGroup>
          </div>

          <TextField
            id="date"
            label="出生年月日"
            type="date"
            name="date"
            inputRef={register}
            InputLabelProps={{
              shrink: true
            }}
            style={{ marginTop: 19 }}
            required
            fullWidth
          />
          <StyledTextField
            id="phone"
            label="手机号"
            type="number"
            variant="outlined"
            name="phone"
            inputRef={register}
            required
            fullWidth
          />
          <StyledTextField
            id="email"
            label="邮箱"
            variant="outlined"
            type="email"
            name="email"
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
            id="passwordConfirm"
            label="确认密码"
            type="password"
            variant="outlined"
            name="confirm"
            inputRef={register}
            required
            fullWidth
          />
          <StyledTextField
            id="inviteCode"
            label="组织邀请码"
            type="text"
            variant="outlined"
            name="inviteCode"
            inputRef={register}
            fullWidth
          />
          {/* <div className={styles.submit_box}> */}
          <div>
            <LoginButton
              type="submit"
              variant="contained"
              color="primary"
              // onClick={handleRegister}
            >
              注册
            </LoginButton>
          </div>
        </form>
      </div>
    </div>
  );
}
