Inicio();
function Inicio() {
  Eventos();
}

function Eventos() {
  ROUTER.addEventListener("ionRouteDidChange", Navegar);
  document.querySelector("#btnRegistrar").addEventListener("click", TomarDatosRegistro);
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
    }
  }

  function OcultarPantallas() {
    HOME.style.display = "none";
    LOGIN.style.display = "none";
    REGISTRO.style.display = "none";
  }

  function dqs(id) {
    return document.querySelector("#" + id);
  }