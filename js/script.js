/* ==========================================================
   MOKEPON
   Reglas: Fuego gana a Tierra, Agua gana a Fuego, Tierra gana a Agua.
   Cada mascota empieza con 3 vidas; quien llegue a 0 pierde.
   ========================================================== */

/* ---------- ESTADO DEL JUEGO ----------
   Variables globales: las ven todas las funciones y conservan
   su valor entre un ataque y otro. */
let ataqueJugador;
let ataqueEnemigo;
let contador = 0; // Pendiente: ya no se usan, las vidas cuentan lo mismo
let contadorEnemigo = 0; // Pendiente: ya no se usan
let vidaEnemigo = 3;
let vidaJugador = 3;

/* ---------- INICIO ---------- */

// Se ejecuta cuando la página termina de cargar:
// oculta las secciones que aún no se usan y conecta cada botón con su función.
function iniciarJuego() {
  // Al inicio solo se ve la selección de mascota
  let sectionSelectAttack = document.getElementById("select-attack");
  sectionSelectAttack.style.display = "none";

  let sectionReiniciar = document.getElementById("Reiniciar");
  sectionReiniciar.style.display = "none";

  let SectionMensajes = document.getElementById("Mensajes");
  SectionMensajes.style.display = "none";

  // Botón "Jugar"
  let btnJugar = document.getElementById("btn-jugar");
  btnJugar.addEventListener("click", seleccionarMascotaJugador);

  // Botones de ataque
  let btnFuego = document.getElementById("btn-fuego");
  btnFuego.addEventListener("click", ataqueFuego);

  let btnAgua = document.getElementById("btn-agua");
  btnAgua.addEventListener("click", ataqueAgua);

  let btnTierra = document.getElementById("btn-tierra");
  btnTierra.addEventListener("click", ataqueTierra);

  // Botón "Volver a jugar"
  let reinicio = document.getElementById("btn-reiniciar");
  reinicio.addEventListener("click", reiniciar);
}

/* ---------- SELECCIÓN DE MASCOTAS ---------- */

function seleccionarMascotaJugador() {
  // "Bandera": guarda si el jugador eligió mascota o no
  let haymascota = false;

  let inputCharmander = document.getElementById("Charmander");
  let inputSquirtle = document.getElementById("Squirtle");
  let inputSandshrew = document.getElementById("Sandshrew");
  let spanMascotaJugador = document.getElementById("nombre-mascota-jugador");

  // Revisa cuál radio está marcado
  if (inputCharmander.checked) {
    spanMascotaJugador.innerHTML = "Charmander";
    haymascota = true;
  } else if (inputSquirtle.checked) {
    spanMascotaJugador.innerHTML = "Squirtle";
    haymascota = true;
  } else if (inputSandshrew.checked) {
    spanMascotaJugador.innerHTML = "Sandshrew";
    haymascota = true;
  } else {
    alert("debes seleccionar una mascota");
  }

  // Solo si eligió mascota: pasa a la pantalla de ataques y crea al enemigo
  if (haymascota) {
    let sectionSelectAttack = document.getElementById("select-attack");
    sectionSelectAttack.style.display = "flex";
    let sectionSelectPet = document.getElementById("select-pet");
    sectionSelectPet.style.display = "none";
    seleccionarMascotaEnemigo();
  }
}

// Elige una mascota aleatoria para el enemigo (1, 2 o 3)
function seleccionarMascotaEnemigo() {
  let spanMascotaEnemigo = document.getElementById("nombre-mascota-enemigo");
  let mascotaAleatorio = aleatorio(1, 3);

  if (mascotaAleatorio === 1) {
    spanMascotaEnemigo.innerHTML = "Charmander";
  } else if (mascotaAleatorio === 2) {
    spanMascotaEnemigo.innerHTML = "Squirtle";
  } else {
    spanMascotaEnemigo.innerHTML = "Sandshrew";
  }
}

/* ---------- ATAQUES ----------
   Cada botón guarda su ataque y ejecuta los mismos tres pasos:
   1) el enemigo elige ataque, 2) se muestra el del jugador, 3) se decide el resultado. */

function ataqueFuego() {
  ataqueJugador = "Fuego";
  ataqueAleatorioEnemigo();
  ataqueElegidoJugador();
  verificarFinal();
}

function ataqueAgua() {
  ataqueJugador = "Agua";
  ataqueAleatorioEnemigo();
  ataqueElegidoJugador();
  verificarFinal();
}

function ataqueTierra() {
  ataqueJugador = "Tierra";
  ataqueAleatorioEnemigo();
  ataqueElegidoJugador();
  verificarFinal();
}

// El enemigo elige un ataque al azar y se muestra en pantalla
function ataqueAleatorioEnemigo() {
  let spanAtaqueEnemigo = document.getElementById("ataque-mascota-enemigo");
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio === 1) {
    ataqueEnemigo = "Fuego";
  } else if (ataqueAleatorio === 2) {
    ataqueEnemigo = "Agua";
  } else {
    ataqueEnemigo = "Tierra";
  }

  spanAtaqueEnemigo.innerHTML = ataqueEnemigo;

  // Escribe data-ataque="Fuego" (o el que sea) en el HTML.
  // El CSS lee ese atributo para pintar el texto del color del ataque.
  spanAtaqueEnemigo.dataset.ataque = ataqueEnemigo;
}

// Muestra el ataque del jugador y hace visible la sección de mensajes
function ataqueElegidoJugador() {
  let SectionMensajes = document.getElementById("Mensajes");
  SectionMensajes.style.display = "flex";

  let ataqueHechoJugador = document.getElementById("ataque-mascota-jugador");
  ataqueHechoJugador.innerHTML = ataqueJugador;

  // Misma marca que arriba, para que el CSS lo pinte del color del ataque
  ataqueHechoJugador.dataset.ataque = ataqueJugador;
}

/* ---------- RESULTADO DEL TURNO ---------- */

// Decide quién ganó el turno, descuenta la vida al perdedor
// y actualiza el texto de resultado y las vidas en pantalla.
function verificarFinal() {
  let resultado = document.getElementById("resultado-juego");
  let spanVidasEnemigo = document.getElementById("vidas-mascota-enemigo");
  let spanVidasJugador = document.getElementById("vidas-mascota-jugador");

  // Cada rama cambia solo los datos (resultado y vidas)
  if (ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra") {
    resultado.innerHTML = "Ganaste";
    contador = contador + 1;
    vidaEnemigo = vidaEnemigo - 1;
  } else if (ataqueJugador == "Fuego" && ataqueEnemigo == "Agua") {
    resultado.innerHTML = "Perdiste";
    contadorEnemigo = contadorEnemigo + 1;
    vidaJugador = vidaJugador - 1;
  } else if (ataqueJugador == "Agua" && ataqueEnemigo == "Tierra") {
    resultado.innerHTML = "Perdiste";
    contadorEnemigo = contadorEnemigo + 1;
    vidaJugador = vidaJugador - 1;
  } else if (ataqueJugador == "Agua" && ataqueEnemigo == "Fuego") {
    resultado.innerHTML = "Ganaste";
    contador = contador + 1;
    vidaEnemigo = vidaEnemigo - 1;
  } else if (ataqueJugador == "Tierra" && ataqueEnemigo == "Agua") {
    resultado.innerHTML = "Ganaste";
    contador = contador + 1;
    vidaEnemigo = vidaEnemigo - 1;
  } else if (ataqueJugador == "Tierra" && ataqueEnemigo == "Fuego") {
    resultado.innerHTML = "Perdiste";
    contadorEnemigo = contadorEnemigo + 1;
    vidaJugador = vidaJugador - 1;
  } else {
    resultado.innerHTML = "Empate";
    contador = contador + 1;
    contadorEnemigo = contadorEnemigo + 1;
  }

  // Se muestran las vidas una sola vez, después del if/else.
  // "❤️".repeat(2) da ❤️❤️. Con 0 vidas repeat devuelve "" (falso en JS),
  // y entonces el operador || usa la calavera.
  spanVidasEnemigo.innerHTML = "❤️".repeat(vidaEnemigo) || "💀";
  spanVidasJugador.innerHTML = "❤️".repeat(vidaJugador) || "💀";

  revisarVidas();
}

/* ---------- FIN DE LA PARTIDA ---------- */

// Si alguna vida llegó a 0, muestra el mensaje final y cierra la partida
function revisarVidas() {
  let resultado = document.getElementById("resultado-juego");

  if (vidaEnemigo === 0) {
    resultado.innerHTML = "GANASTE";
    deshabilitaBotones();
  } else if (vidaJugador === 0) {
    resultado.innerHTML = "GANA EL ENEMIGO";
    deshabilitaBotones();
  }
}

// Oculta y bloquea los ataques, y muestra el resultado final con el botón de reinicio
function deshabilitaBotones() {
  let btnFuego = document.getElementById("btn-fuego");
  let btnAgua = document.getElementById("btn-agua");
  let btnTierra = document.getElementById("btn-tierra");

  btnFuego.disabled = true;
  btnAgua.disabled = true;
  btnTierra.disabled = true;
  btnFuego.style.display = "none";
  btnAgua.style.display = "none";
  btnTierra.style.display = "none";

  // Ya no hace falta mostrar "Usaste X y el enemigo usó Y"
  let SectionFinalMascotaJugador = document.getElementById(
    "descripcion-ataques",
  );
  SectionFinalMascotaJugador.style.display = "none";

  let SectionMensajeFinal = document.getElementById("resultado-juego");
  SectionMensajeFinal.style.display = "flex";

  let SectionReiniciar = document.getElementById("Reiniciar");
  SectionReiniciar.style.display = "flex";
}

/* ---------- UTILIDADES ---------- */

// Recarga la página: todo vuelve al estado inicial
function reiniciar() {
  location.reload();
}

// Devuelve un entero aleatorio entre min y max, ambos incluidos
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Arranque: espera a que cargue la página para ejecutar iniciarJuego
window.addEventListener("load", iniciarJuego);
