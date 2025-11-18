// ==============================
//  GUARDAR NOMBRE DEL JUGADOR
// ==============================
function guardarNombre() {
    const nombre = document.getElementById("nombre").value.trim();

    if (nombre === "") {
        alert("Por favor, ingresá tu nombre antes de continuar.");
        return false;
    }

    localStorage.setItem("jugador", nombre);
    return true;
}


// ==============================
//  RESPUESTAS CORRECTAS
// ==============================
const respuestasCorrectas = {
    1: { id: "1a", texto: "Hassan Emilio Kabande Laija" },
    2: { id: "2b", texto: "México" },
    3: { id: "3d", texto: "Todas las anteriores" },
    4: { id: "4b", texto: "Corridos tumbados" },
    5: { id: "5b", texto: "1999" },
    6: { id: "6a", texto: "Eslabón Armado" },
    7: { id: "7a", texto: "Jalisco" },
    8: { id: "8a", texto: "Natanael Cano" },
    9: { id: "9a", texto: "Bizarrap" },
    10: { id: "10d", texto: "Despacito" }
};


// ==============================
//  CALCULAR PUNTAJE Y GUARDAR RESPUESTAS
// ==============================
function calcularPuntaje() {

    let puntos = 0;
    let respuestasJugador = {};

    for (let i = 1; i <= 10; i++) {

        let seleccionada = document.querySelector(`input[name="${i}"]:checked`);
        respuestasJugador[i] = seleccionada ? seleccionada.id : null;

        if (seleccionada && seleccionada.id === respuestasCorrectas[i].id) {
            puntos++;
        }
    }

    localStorage.setItem("puntaje", puntos);
    localStorage.setItem("respuestasJugador", JSON.stringify(respuestasJugador));
}


// ==============================
//  FINALIZAR CUESTIONARIO
// ==============================
function finalizarCuestionario() {

    if (!guardarNombre()) return;

    calcularPuntaje();

    window.location.href = "fin.html";
}


// ==============================
//  MOSTRAR RESULTADO FINAL
// ==============================
function mostrarResultadoFinal() {

    const nombre = localStorage.getItem("jugador") || "Jugador";
    const puntaje = localStorage.getItem("puntaje") || 0;

    document.getElementById("felicitacion").textContent = `¡Bien hecho, ${nombre}!`;
    document.getElementById("puntaje").textContent = `Tu puntaje final es: ${puntaje} / 10`;

    const respuestasJugador = JSON.parse(localStorage.getItem("respuestasJugador"));

    const contenedor = document.getElementById("detalle-respuestas");

    let html = `<h2>Detalle de tus respuestas:</h2><br>`;

    for (let i = 1; i <= 10; i++) {

        const correcta = respuestasCorrectas[i];
        const elegida = respuestasJugador[i];

        // Determinar si acertó
        const acierto = elegida === correcta.id;

        const emoji = acierto ? "✔️" : "❌";
        const color = acierto ? "lightgreen" : "red";
        const textoResultado = acierto ? "Correcto" : "Incorrecto";

        html += `
            <div style="border:1px solid white; padding:15px; border-radius:10px; margin-bottom:15px; background-color:rgba(0,0,0,0.45);">
                <h3>Pregunta ${i}</h3>

                <p><strong>Resultado:</strong> 
                    <span style="color:${color};">${emoji} ${textoResultado}</span>
                </p>

                <p><strong>Respuesta correcta:</strong> ✔️ ${correcta.texto}</p>
            </div>
        `;
    }

    contenedor.innerHTML = html;
}
