import React from "react";
import { TiDocumentText } from "react-icons/ti";
import { BsGithub } from "react-icons/bs";
import { FiMail } from "react-icons/fi";

import Logo from "../../images/Footer_Logo.png";
function Footer() {
  return (
    <>
      <footer>
        <section className="first-box">
          <img src={Logo} className="logo" alt="logo"></img>
          <span className="copyright">
            © Copyright 2022 KLJ. All rights reserved.
          </span>
        </section>

        <section className="second-box">
          <div className="box-title project">Project</div>
          <a
            className="box-text"
            href="https://github.com/codestates/EATO/wiki"
            target="blank"
          >
            <TiDocumentText size="20" className="icon"></TiDocumentText>
            Wiki
          </a>
          <a
            className="box-text"
            href="https://github.com/codestates/EATO"
            target="blank"
          >
            <TiDocumentText size="20" className="icon"></TiDocumentText>Github
          </a>
        </section>
        <section className="third-box">
          <div className="box-title">Team Members</div>
          <a
            className="box-text"
            href="https://github.com/sunwoong3"
            target="blank"
          >
            <BsGithub size="18" className="icon" />
            정선우
          </a>
          <a
            className="box-text"
            href="https://github.com/Jaekomplett"
            target="blank"
          >
            <BsGithub size="18" className="icon" />
            김제완
          </a>
          <a
            className="box-text"
            href="https://github.com/leesangsuk-cloud"
            target="blank"
          >
            <BsGithub size="18" className="icon" />
            이상석
          </a>
          <a
            className="box-text"
            href="https://github.com/seo-B"
            target="blank"
          >
            <BsGithub size="18" className="icon" />
            이승섭
          </a>
        </section>
        <section className="fourth-box">
          <div className="box-title">Contact</div>
          <div className="box-text">
            <FiMail size="18" className="icon"/>
            sunw339@gmail.com
          </div>
          <div className="box-text">
            <FiMail size="18" className="icon"/>
            skysangsuk@gmail.com
          </div>
          <div className="box-text">
            <FiMail size="18" className="icon" />
            wanzekim@gmail.com
          </div>
          <div className="box-text">
            <FiMail size="18" className="icon"/>
            abejaseop@gmail.com
          </div>
        </section>
      </footer>
    </>
  );
}

export default Footer;
