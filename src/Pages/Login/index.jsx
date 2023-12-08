import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.module.css";
import Axios from "axios";

// Import dos assets
import video from "../../assets/LoginAssets/video.mp4";
import logo from "../../assets/LoginAssets/logo.png";

// Import dos icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

const Login = () => {
  // UseState faz um Hook em credenciais armazenadas
  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const navigateTo = useNavigate();

  const [loginStatus, setLoginStatus] = useState("");
  const [statusHolder, setStatusHolder] = useState("message");

  const loginUser = (e) => {
    // Precisaremos de um Axios para criar uma API que se conecte ao servidor
    // Use npm install axios

    e.preventDefault();

    Axios.post("http://localhost:3002/login", {
      // Crie uma variável para enviar ao servidor através da rota
      LoginEmail: LoginEmail,
      LoginPassword: LoginPassword,
    }).then((response) => {
      console.log();

      if (response.data.message || LoginEmail == "" || LoginPassword == "") {
        // Se as credenciais não estiverem certas
        navigateTo("/Login"); // Permanecerá na mesma pagina
        setLoginStatus("Essas credenciais não existem"); // Irá emitir um aviso
      } else {
        navigateTo("/"); // Se as credenciais estiverem certas o User será redirecionado para a Home
      }
    });
  };

  useEffect(() => {
    if (loginStatus !== "") {
      setStatusHolder("showMessage");
      setStatusHolder("Message");
      setTimeout(() => {
      }, 4000); // O Aviso ficará na tela durante 4 segundo
    }
  }, [loginStatus]);

  const onSubmit = () => {
    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className="title">Na AMA</h2>
            <p>Cada gota faz diferença</p>
          </div>

          <div className="footerDiv flex">
            <span className="text">Não tem conta?</span>
            <Link to={"/cadastro-usuario"}>
              <button className="btn users">Seja Usuário</button>
            </Link>
            <Link to={"/cadastro-profissional"}>
              <button className="btn profs">Seja Profissional</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Bem vindo(a) de volta!</h3>
          </div>

          <form action="" className="form grid" onSubmit={onSubmit}>
            <span className={statusHolder}>{loginStatus}</span>

            <div className="inputDiv">
              <label htmlFor="username">Email</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Digite o seu email"
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Senha</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Digite a sua senha"
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <button type="submit" className="btn flex" onClick={loginUser}>
              <span>Entrar</span>
              <AiOutlineSwapRight className="icon" />
            </button>

            <span className="forgotPassword">
              Esqueceu sua senha? <a href="">Clique aqui!</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
