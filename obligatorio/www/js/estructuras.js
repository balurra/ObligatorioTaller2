const URLBASE = "https://dwallet.develotion.com/";
let UsuarioLogueado = false;

class Usuario {
    constructor(user, password, depto, ciudad) {
      this.usuario = user;
      this.password = password;
      this.idDepartamento = depto;
      this.idCiudad = ciudad;
    }
  }

class LoginDTO {
    constructor(user, password) {
      this.usuario = user;
      this.password = password;
    }
  }

const MENU = document.querySelector("#menu");
const ROUTER = document.querySelector("#ruteo");
const HOME = document.querySelector("#pantalla-home");
const LOGIN = document.querySelector("#pantalla-login");
const REGISTRO = document.querySelector("#pantalla-registro");
const LOGOUT = document.querySelector("#pantalla-logout");
const NAV = document.querySelector("ion-nav");
const GASTO = document.querySelector("#pantalla-gasto");

