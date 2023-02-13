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
      RecargarDeptos();
      RecargarCiudades();
      REGISTRO.style.display = "block";
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
          for (let d of departamentos){
            dqs("slcDeptos").innerHTML += `<option value="${d.id}">${d.nombre}</option>`
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
          for (let d of dato){
            dqs("slcCiudades").innerHTML += `<option value="${d.id}">${d.nombre}</option>`
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