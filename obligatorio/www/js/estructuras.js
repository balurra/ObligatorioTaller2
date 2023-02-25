const URLBASE = "https://dwallet.develotion.com/";
let UsuarioLogueado = false;
let gastos = new Array();
let ingresos = new Array();
let totalGastos = 0;
let totalIngresos = 0;
let balance = 0;
let MiLat = null;
let MiLong = null;

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

class Gasto{
  constructor(idUsuario,concepto,categoria,total,medio,fecha){
    this.concepto=concepto;
    this.categoria=categoria;
    this.medio=medio;
    this.total=total;
    this.fecha=fecha;
    this.idUsuario=idUsuario;
  }
}

class Ingreso{
  constructor(idUsuario,concepto,categoria,total,medio,fecha){
    this.concepto=concepto;
    this.categoria=categoria;
    this.medio=medio;
    this.total=total;
    this.fecha=fecha;
    this.idUsuario=idUsuario;
  }
}

class MovimientoGetDTO{
  constructor(concepto,categoria,medio,total,fecha,idUsuario){
    this.concepto=concepto;
    this.categoria=categoria;
    this.medio=medio;
    this.total=total;
    this.fecha=fecha;
    this.idUsuario=idUsuario;
  }
}

class MovimientoDTO{
  constructor(idUsuario,concepto,categoria,total,medio,fecha){
    this.concepto=concepto;
    this.categoria=categoria;
    this.medio=medio;
    this.total=total;
    this.fecha=fecha;
    this.idUsuario=idUsuario;
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
const INGRESO = document.querySelector("#pantalla-ingreso");
const MOVIMIENTOS = document.querySelector("#pantalla-movimientos");
const MONTOS = document.querySelector("#pantalla-montos");
const MAPA = document.querySelector("#pantalla-mapa");
const COMPARTIR = document.querySelector("#pantalla-compartir");

