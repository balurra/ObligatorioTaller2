const URLBASE = "https://dwallet.develotion.com/";
let UsuarioLogueado = false;

class Usuario {
    constructor(user, password, depto, ciudad) {
      this.user = user;
      this.password = password;
      this.depto = depto;
      this.ciudad = ciudad;
    }
  }

class LoginDTO {
    constructor(user, password) {
      this.user = user;
      this.password = password;
    }
  }

const MENU = document.querySelector("#menu");
const ROUTER = document.querySelector("#ruteo");
const HOME = document.querySelector("#pantalla-home");
const LOGIN = document.querySelector("#pantalla-login");
const REGISTRO = document.querySelector("#pantalla-registro");