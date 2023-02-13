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

}

function ArmarMenu() {
  let hayToken = localStorage.getItem("apikey");
  if (!hayToken) {
  dqs("menu-opciones").innerHTML = `  <ion-item href="/" onclick="cerrarMenu()">HOME</ion-item>
  <ion-item href="/login" onclick="cerrarMenu()">LOGIN</ion-item>
  <ion-item href="/registro" onclick="cerrarMenu()">REGISTRAR</ion-item>`
  }else{
    dqs("menu-opciones").innerHTML = `  <ion-item href="/" onclick="cerrarMenu()">HOME</ion-item>`
  }
}

function setearDepto(evt){
  console.log(evt);
}

function setearCiudad(evt){
  console.log(evt);
}

function TomarDatosRegistro() {
    let u = dqs("txtRegistroUsuario").value;
    let p = dqs("txtRegistroPass").value;
    let d = dqs("txtRegistroDepto").value;
    let c = dqs("txtRegistroCiudad").value;
  
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
          dqs("pRegistroRes").innerHTML = "Registro exitoso";
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