
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
  document.querySelector("#btnAgregarGasto").addEventListener("click", TomarDatosGasto);
  document.querySelector("#btnAgregarIngreso").addEventListener("click", TomarDatosIngreso);
  document.querySelector("#btnVerIngresos").addEventListener("click", ListarSoloIngresos);
  document.querySelector("#btnVerGastos").addEventListener("click", ListarSoloGastos);


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
    <ion-item href="/ingreso" onclick="cerrarMenu()">AGREGAR INGRESO</ion-item>
    <ion-item href="/movimientos" onclick="cerrarMenu()">VER MOVIMIENTOS</ion-item>
    <ion-item href="/montos" onclick="cerrarMenu()">VER MONTOS TOTALES</ion-item>
    <ion-item href="/mapa" onclick="cerrarMenu()">CAJEROS CERCANOS</ion-item>
    <ion-item href="/compartir" onclick="cerrarMenu()">COMPARTIR</ion-item>
    <ion-item href="/logout" onclick="cerrarMenu()">LOGOUT</ion-item>`
  }
}


function CerrarSesion(){
  localStorage.clear();
  NAV.push("page-home");
  ArmarMenu();
}

function setearDepto(evt){
  localStorage.setItem("depto", null);
  localStorage.setItem("depto", parseInt(evt.detail.value));
  RecargarCiudades();
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
        localStorage.setItem("idUsuarioActual", dato.id);
        dqs("pLogin").innerHTML = "Login exitoso!";
        ArmarMenu();
    })

    .catch(function (error) {
      dqs("pLogin").innerHTML = "Datos incorrectos";
      
    });
}

function TomarDatosIngreso(){
  let idActual = localStorage.getItem("idUsuarioActual");
  let c = dqs("txtConceptoIngreso").value;
  let r = dqs("slcRubroIngreso").value;
  let m = dqs("slcMedioPagoIngreso").value;
  let i = dqs("txtImporteIngreso").value;
  let f = dqs("fechaIngreso").value;


  let ingreso = new MovimientoDTO(idActual,c,r,i,m,f);
  AgregarMovimiento(ingreso);

  console.log(ingreso);

  if(ingreso!=null){
    dqs("pIngreso").innerHTML = "Ingreso agregado correctamente!";
  }
}

function TomarDatosGasto(){
  let idActual = localStorage.getItem("idUsuarioActual");
  let c = dqs("txtConceptoGasto").value;
  let r = Number(dqs("slcRubrosGasto").value);
  let m = dqs("slcMedioPagoGasto").value;
  let i = dqs("txtImporteGasto").value;
  let f = dqs("fechaGasto").value;

  let gasto = new MovimientoDTO(idActual,c,r,i,m,f);
  AgregarMovimiento(gasto);


  console.log(gasto);

  if(gasto!=null){
    dqs("pGasto").innerHTML = "Gasto agregado correctamente!";
  }
}

function AgregarMovimiento(mov){
  fetch(`${URLBASE}movimientos.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": String(localStorage.getItem("apiKey")),
    },
    body: JSON.stringify(mov),
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
    localStorage.setItem("depto", d);
    console.log(localStorage.getItem("depto"));


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
        console.log(dato);
        localStorage.setItem("apiKey", dato.apiKey);
        localStorage.setItem("idUsuarioActual", dato.id);
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
    } else if (ruta == "/logout") {
     CerrarSesion();
    } 
    else if (ruta == "/gasto") {
      RecargarRubros();
      GASTO.style.display = "block";
    } else if (ruta == "/ingreso") {
      RecargarRubros();
      INGRESO.style.display = "block";
    } else if (ruta == "/movimientos") {
      MOVIMIENTOS.style.display="block";
      VerMovimientos();
    } else if (ruta == "/montos") {
      MONTOS.style.display="block";
      VerMontosTotales();   
    } else if (ruta == "/mapa") {
      MAPA.style.display="block";
      getLocation();
    } else if (ruta == "/compartir") {
      COMPARTIR.style.display="block";

  }
}

  function RecargarRubros() {
    dqs("slcRubrosGasto").innerHTML ="";
    dqs("slcRubroIngreso").innerHTML= "";
    console.log(localStorage.getItem("apiKey"));
    fetch(`${URLBASE}rubros.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "apikey": String(localStorage.getItem("apiKey")),
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
      .then(function (rubros) {
          console.log(rubros);
          for (let r of rubros.rubros){
            if(r.tipo=="gasto")
            dqs("slcRubrosGasto").innerHTML += `<ion-select-option value="${r.id}">${r.nombre}</ion-select-option>`
            else dqs("slcRubroIngreso").innerHTML += `<ion-select-option value="${r.id}">${r.nombre}</ion-select-option>`
          }
      })
  
      .catch(function (error) {
        console.log(error);
      });
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
    dqs("slcCiudades").innerHTML ="";

    fetch(`${URLBASE}ciudades.php?idDepartamento=${localStorage.getItem("depto")}`, {
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

  function VerMovimientos(){
    dqs("pMovimientos").innerHTML = "";
    let idUsuario = String(localStorage.getItem("idUsuarioActual"))
    fetch(`${URLBASE}movimientos.php?idUsuario=${idUsuario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "apikey": String(localStorage.getItem("apiKey")),
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
          console.log(dato.movimientos);
          ArmarListas(dato.movimientos);
          for (let d of dato.movimientos){
            FormatearMovimiento(d);         
          }
      })
  
      .catch(function (error) {
        console.log(error);
      });    
  }
  function VerMontosTotales(){
    dqs("pMontoTotalGastos").innerHTML = "";
    dqs("pMontoTotalIngresos").innerHTML = "";
    dqs("pSaldoRestante").innerHTML = "";

    let idUsuario = String(localStorage.getItem("idUsuarioActual"))
    fetch(`${URLBASE}movimientos.php?idUsuario=${idUsuario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "apikey": String(localStorage.getItem("apiKey")),
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
          console.log(dato.movimientos);
          ArmarMontosTotales(dato.movimientos);
      })
  
      .catch(function (error) {
        console.log(error);
      });    
  }

  function ArmarMontosTotales(movimientos){
    totalGastos = 0;
    totalIngresos = 0;
    balance = 0;

    for(let m of movimientos){
      if(m.categoria<7){
        totalGastos += m.total;
      }else{totalIngresos += m.total}
    }

    balance = totalIngresos - totalGastos;

    dqs("pMontoTotalGastos").innerHTML = "Gastos totales:  $" + totalGastos;
    dqs("pMontoTotalIngresos").innerHTML = "Ingresos totales:  $" + totalIngresos;
    dqs("pSaldoRestante").innerHTML = "Balance total:  $" + balance;

  }

  function FormatearMovimiento(d){
    dqs("pMovimientos").innerHTML += "idMovimiento: " + d.id + ", Concepto: " + d.concepto + 
    ", Categoria: " + d.categoria + ", MedioPago: " + d.medio + 
    ", Total: " + d.total + ", Fecha: " + d.fecha + ", idUsuario: " + d.idUsuario
    + `<ion-button expand="full" id="btnEliminarMov" onclick="EliminarMovimiento(${d.id})">Eliminar movimiento</ion-button>`;
  }

  function ArmarListas(movimientos){
    gastos = [];
    ingresos = [];
    for(let m of movimientos){
      if(m.categoria < 7)
      gastos.push(m);
     else ingresos.push(m);}
  }

  function ListarSoloGastos(){
    dqs("pMovimientos").innerHTML = "";
    for (let g of gastos){
      FormatearMovimiento(g);
    }  
  }
  function ListarSoloIngresos(){
    dqs("pMovimientos").innerHTML = "";
    for (let i of ingresos){
      FormatearMovimiento(i);
    }
  }


  function EliminarMovimiento(idMovimiento){
    fetch(`${URLBASE}movimientos.php`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "apikey": String(localStorage.getItem("apiKey")),
      },
      body:JSON.stringify({"idMovimiento":idMovimiento}),
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
          dqs("pMovimientos").innerHTML = "";
          VerMovimientos();
      })
  
      .catch(function (error) {
        console.log(error);
      });
  }

  function getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(mostrarMiUbicacion);
    } else {
      console.log("No soportado");
    }
  }

  function mostrarMiUbicacion(position) {
    MiLat = position.coords.latitude;
    MiLong = position.coords.longitude;
    setTimeout(function(){CrearMapa()}, 1000);
    //CrearMapa();
  }

  function CrearMapa() {
    //Crear Mapa
    var map = L.map("map").setView([MiLat, MiLong], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
  
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

        //Poner un icono negro a mi ubicación.
        var blackIcon = new L.Icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });
      
        L.marker([MiLat, MiLong], { icon: blackIcon }).addTo(map);

  
    fetch(`${URLBASE}cajeros.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
          for(let c of dato.cajeros){  
          if(getDistanciaMetros(c.latitud,c.longitud,MiLat,MiLong)<2000){
            let marcador4 = L.marker([c.latitud, c.longitud]).addTo(map);
            marcador4.bindPopup(`<strong>Id cajero: ${c.idCajero}</strong><br><span>Disponible: ${Boolean(c.disponible)}</span>`);
          }}    
      })
      .catch(function (error) {
        console.log(error);
      });
  
    //Crear un radio
    var circulo = L.circle([MiLat, MiLong], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.2,
      radius: 2000,
    }).addTo(map);
  }


  function getDistanciaMetros(lat1,lon1,lat2,lon2)
{
  rad = function(x) {return x*Math.PI/180;}
  var R = 6378.137; //Radio de la tierra en km 
  var dLat = rad( lat2 - lat1 );
  var dLong = rad( lon2 - lon1 );
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * 
  Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  //aquí obtienes la distancia en metros por la conversion 1Km =1000m
  var d = R * c * 1000; 
  return d ; 
}

function Share() {
  Capacitor.Plugins.Share.share({
      title: `Enviar`,
      text: `Descargala!`,
      url: 'https://dwallet.develotion.com/site/',
      dialogTitle: 'Gracias!',
  })
}
  

  function OcultarPantallas() {
    HOME.style.display = "block";
    LOGIN.style.display = "none";
    REGISTRO.style.display = "none";
    GASTO.style.display = "none";
    INGRESO.style.display = "none";
    MOVIMIENTOS.style.display = "none";
    MONTOS.style.display = "none";
    MAPA.style.display = "none";
    COMPARTIR.style.display = "none";
    //LOGOUT.style.display = "none";


  }

  function dqs(id) {
    return document.querySelector("#" + id);
  }