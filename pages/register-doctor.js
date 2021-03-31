import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
// import styles from "../styles/register.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

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
  const [gender, setGender] = React.useState("male");
  const handleGender = (event, newGender) => {
    setGender(newGender);
  };
  // choice of marriage
  const [marriage, setMarriage] = React.useState("married");
  const handleMarriage = (event, newMarriage) => {
    setMarriage(newMarriage);
  };
  return (
    <div style={style.bgd}>
      <div className={styles.register_card}>
        <div className={styles.register_title}>医生注册</div>
        <TextField
          id="outlined-basic"
          label="真实姓名"
          variant="outlined"
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
            <StyledToggleButton value="male" aria-label="male">
              男
            </StyledToggleButton>
            <StyledToggleButton
              value="female"
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
            value={marriage}
            exclusive
            onChange={handleMarriage}
            aria-label="marriage"
          >
            <StyledToggleButton value="married" aria-label="married">
              内科
            </StyledToggleButton>
            <StyledToggleButton
              value="unmarried"
              aria-label="unmarried"
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
          defaultValue="1970-01-01"
          InputLabelProps={{
            shrink: true
          }}
          style={{ marginTop: 19 }}
          fullWidth
        />
        <StyledTextField
          id="outlined-basic"
          label="手机号"
          variant="outlined"
          fullWidth
        />
        <StyledTextField
          id="outlined-basic"
          label="邮箱"
          variant="outlined"
          fullWidth
        />
        <StyledTextField
          id="outlined-basic"
          label="密码"
          type="password"
          variant="outlined"
          fullWidth
        />
        <StyledTextField
          id="outlined-basic"
          label="确认密码"
          type="password"
          variant="outlined"
          fullWidth
        />
        <StyledTextField
          id="outlined-basic"
          label="组织邀请码"
          type="password"
          variant="outlined"
          fullWidth
        />
        {/* <div className={styles.submit_box}> */}
        <div>
          <LoginButton type="submit" variant="contained" color="primary">
            注册
          </LoginButton>
        </div>
      </div>
    </div>
  );
}
