Inicio();
function Inicio() {
  Eventos();
  ArmarMenu();
}

function Eventos() {
  ROUTER.addEventListener("ionRouteDidChange", Navegar);
  document.querySelector("#btnRegistrar").addEventListener("click", TomarDatosRegistro);
  document.querySelector("#slcDeptos").addEventListener('ionChange',setearDepto);
  document.querySelector("#slcCiudades").addEventListener('ionChange',setearCiudad);
  document.querySelector("#btnLogin").addEventListener("click", TomarDatosLogin);


}

function ArmarMenu() {
  let hayToken = localStorage.getItem("apiKey");
  if (!hayToken) {
  dqs("menu-opciones").innerHTML = `  <ion-item href="/" onclick="cerrarMenu()">HOME</ion-item>
  <ion-item href="/login" onclick="cerrarMenu()">LOGIN</ion-item>
  <ion-item href="/registro" onclick="cerrarMenu()">REGISTRAR</ion-item>`
  }else{
    dqs("menu-opciones").innerHTML = `  <ion-item href="/" onclick="cerrarMenu()">HOME</ion-item>
    <ion-item href="/gasto" onclick="cerrarMenu()">AGREGAR GASTO</ion-item>
    <ion-item href="/logout" onclick="cerrarMenu()">LOGOUT</ion-item>`
  }
}

function CerrarSesion(){
  localStorage.clear();
  NAV.push("page-home");
  ArmarMenu();
}

function setearDepto(evt){
  console.log(evt);
}

function setearCiudad(evt){
  console.log(evt);
}

function TomarDatosLogin(){
  let u = dqs("txtLoginUsuario").value;
  let p = dqs("txtLoginPass").value;
  let usuLog = new LoginDTO(u,p);
  console.log(usuLog);

  fetch(`${URLBASE}login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuLog),
  })
    .then(function (response) {
      console.log(response);
      if (response.status == 200) {
        return response.json();
      }else{
         throw response;
      }
    })
    .then(function (dato) {
        localStorage.setItem("apiKey", dato.apiKey);
        dqs("pLogin").innerHTML = "Login exitoso!";
        ArmarMenu();
    })

    .catch(function (error) {
      console.log(error);
    });
}

function TomarDatosRegistro() {
    let u = dqs("txtRegistroUsuario").value;
    let p = dqs("txtRegistroPass").value;
    let d = Number(dqs("slcDeptos").value);
    let c = Number(dqs("slcCiudades").value);
  
    let usuario = new Usuario(u, p, d, c);
  
    console.log(usuario);
  
    fetch(`${URLBASE}usuarios.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then(function (response) {
        console.log(response);
        if (response.status == 200) {
          return response.json();
        }else{
           throw response;
        }
      })
      .then(function (dato) {
        localStorage.setItem("apiKey", dato.apiKey);
        dqs("pRegistroRes").innerHTML = "Registro exitoso!";
        ArmarMenu();
      })
  
      .catch(function (error) {
        console.log(error);
      });
  }

  function cerrarMenu() {
    MENU.close();
  }
  
  function Navegar(evt) {
    const ruta = evt.detail.to;
    console.log(evt);
    OcultarPantallas();
  
    if (ruta == "/") {
      HOME.style.display = "block";
    } else if (ruta == "/login") {
      LOGIN.style.display = "block";
    } else if (ruta == "/registro") {
      REGISTRO.style.display = "block";
      RecargarDeptos();
      RecargarCiudades();
    } else if (ruta == "/logout") {
     CerrarSesion();
    } 
  }


   function RecargarDeptos() {
    fetch(`${URLBASE}departamentos.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(function (response) {
        console.log(response);
        if (response.status == 200) {
          return response.json();
        }else{
           throw response;
        }
      })
      .then(function (departamentos) {
          console.log(departamentos);
          for (let d of departamentos.departamentos){
            dqs("slcDeptos").innerHTML += `<ion-select-option value="${d.id}">${d.nombre}</ion-select-option>`
          }
      })
  
      .catch(function (error) {
        console.log(error);
      });
  }
  function RecargarCiudades() {
    fetch(`${URLBASE}ciudades.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(function (response) {
        console.log(response);
        if (response.status == 200) {
          return response.json();
        }else{
           throw response;
        }
      })
      .then(function (dato) {
          console.log(dato);
          for (let d of dato.ciudades){
            dqs("slcCiudades").innerHTML += `<ion-select-option value="${d.id}">${d.nombre}</ion-select-option>`
          }
      })
  
      .catch(function (error) {
        console.log(error);
      });
  }

  function OcultarPantallas() {
    HOME.style.display = "none";
    LOGIN.style.display = "none";
    REGISTRO.style.display = "none";
  }

  function dqs(id) {
    return document.querySelector("#" + id);
  }