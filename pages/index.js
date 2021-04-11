import Link from "next/link";
import Image from "next/image";
import Router from "next/router";
import styles from "../styles/Index.module.css";
import React from "react";
import Carousel from "nuka-carousel";

import { isLogin, logout, loginUserPhone } from "../components/user.js";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const ColorButton = withStyles((theme) => ({
  root: {
    fontSize: 20,
    marginRight: 5
  }
}))(Button);

const LoginButton = withStyles({
  root: {
    background: "#ff9800",
    borderRadius: 10,
    border: 0,
    color: "white",
    height: 46,
    fontSize: 18,
    width: 120,
    boxShadow: "0 3px 5px 2px rgba(50, 189, 254, .3)",
    "&:hover": {
      backgroundColor: "#ff9799"
    }
  }
})(Button);

export default function IndexPage() {
  const handleLogout = () => {
    logout();
    location.reload();
  };
  const toLogin = () => {
    Router.push("/login");
  };

  let button = null;
  if (isLogin()) {
    button = (
      <div className={styles.login_place}>
        <ColorButton>{loginUserPhone()}</ColorButton>
        <LoginButton onClick={handleLogout}>
          <span>注销</span>
        </LoginButton>
      </div>
    );
  } else {
    button = (
      <div className={styles.login_place}>
        <LoginButton onClick={toLogin}>
          <span>登录/注册</span>
        </LoginButton>
      </div>
    );
  }
  return (
    <div>
      <div className={styles.nav}>
        <Image
          src="/logo.png"
          alt="Picture of the author"
          width={258}
          height={97}
        />
        <Link href="#" className={styles.link}>
          首页
        </Link>
        <Link href="#" className={styles.link}>
          量表测试
        </Link>
        <Link href="#" className={styles.link}>
          医疗咨询
        </Link>
        <Link href="#" className={styles.link}>
          名师论坛
        </Link>
        <Link href="#" className={styles.link}>
          医学问答
        </Link>
        <Link href="#" className={styles.link}>
          团体方案
        </Link>
        <Link href="/about" className={styles.link}>
          关于
        </Link>
        {button}
      </div>
      <Carousel autoplay={true} height="100%" initialSlideHeight={500}>
        <img src="/big-image1.jpg" alt="Big1" height="500px" />
        <img src="/big-image2.jpg" alt="Big2" height="500px" />
      </Carousel>
      <div className={styles.content}>
        <div className={styles.content_title}>
          <div>团体测试方案</div>
        </div>
        <div className={styles.content_cards}>
          <div className={styles.content_card}>
            <img src="/card1.png" alt="" />
            <div className={styles.content_card_title}>卒中须知测试计划</div>
            <div className={styles.content_card_content}>
              简易疼痛化量量表SAS,SDS量表
            </div>
          </div>
          <div className={styles.content_card}>
            <img src="/card2.png" alt="" />
            <div className={styles.content_card_title}>卒中须知测试计划</div>
            <div className={styles.content_card_content}>
              简易疼痛化量量表SAS,SDS量表
            </div>
          </div>
          <div className={styles.content_card}>
            <img src="/card3.png" alt="" />
            <div className={styles.content_card_title}>卒中须知测试计划</div>
            <div className={styles.content_card_content}>
              简易疼痛化量量表SAS,SDS量表
            </div>
          </div>
          <div className={styles.content_card}>
            <img src="/card4.png" alt="" />
            <div className={styles.content_card_title}>卒中须知测试计划</div>
            <div className={styles.content_card_content}>
              简易疼痛化量量表SAS,SDS量表
            </div>
          </div>
          <div className={styles.content_card}>
            <img src="/card5.png" alt="" />
            <div className={styles.content_card_title}>卒中须知测试计划</div>
            <div className={styles.content_card_content}>
              简易疼痛化量量表SAS,SDS量表
            </div>
          </div>
          {/*
            <div class="content-card">
                <img src="images/card2.png" alt="">
                <div class="content-card-title">VR测试计划</div>
                <div class="content-card-content">简易疼痛化量量表SAS,SDS量表</div>
            </div>
            <div class="content-card">
                <img src="images/card3.png" alt="">
                <div class="content-card-title">医疗患者分类计划</div>
                <div class="content-card-content">简易疼痛化量量表SAS,SDS量表</div>
            </div>
            <div class="content-card">
                <img src="images/card4.png" alt="">
                <div class="content-card-title">胸肌接口训练计划</div>
                <div class="content-card-content">简易疼痛化量量表SAS,SDS量表</div>
            </div>
            <div class="content-card">
                <img src="images/card5.png" alt="">
                <div class="content-card-title">VR训练计划体系</div>
                <div class="content-card-content">简易疼痛化量量表SAS,SDS量表</div>
            </div> */}
        </div>
      </div>
    </div>
  );
}
