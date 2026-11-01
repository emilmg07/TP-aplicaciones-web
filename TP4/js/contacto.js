
// TP4 - AMBER CLUB
// Validación y preparación de consultas

const formulario = document.getElementById("formulario-contacto");
const resultado = document.getElementById("resultado-contacto");

// Validar que el nombre tenga al menos 3 caracteres
function validarNombre(nombre) {
    return nombre.trim().length >= 3;
}

// Validar que el mensaje tenga al menos 10 caracteres
function validarMensaje(mensaje) {
    return mensaje.trim().length >= 10;
}

// Evento de envío del formulario
formulario.addEventListener("submit", (evento) => {

    // Evitar recargar la página
    evento.preventDefault();

    // Obtener los valores ingresados
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const motivo = document.getElementById("motivo").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    // Limpiar mensajes anteriores
    resultado.replaceChildren();

    // Validar el nombre
    if (!validarNombre(nombre)) {
        resultado.textContent =
            "El nombre debe tener al menos 3 caracteres.";
        return;
    }

    // Validar el correo usando HTML5
    const campoCorreo = document.getElementById("correo");

    if (!campoCorreo.checkValidity()) {
        resultado.textContent =
            "Ingresá un correo electrónico válido.";
        return;
    }

    // Validar el motivo
    if (motivo === "") {
        resultado.textContent =
            "Seleccioná un motivo de consulta.";
        return;
    }

    // Validar el mensaje
    if (!validarMensaje(mensaje)) {
        resultado.textContent =
            "El mensaje debe tener al menos 10 caracteres.";
        return;
    }

    // Preparar el texto de la consulta
    const consulta =
        `Consulta para AMBER CLUB\n\n` +
        `Nombre: ${nombre}\n` +
        `Correo: ${correo}\n` +
        `Motivo: ${motivo}\n\n` +
        `Mensaje:\n${mensaje}`;

    // Crear título de confirmación
    const titulo = document.createElement("h3");
    titulo.textContent = "Tu consulta está lista";

    // Crear una vista previa del mensaje
    const vistaPrevia = document.createElement("textarea");
    vistaPrevia.className = "form-control";
    vistaPrevia.rows = 9;
    vistaPrevia.readOnly = true;
    vistaPrevia.value = consulta;
    vistaPrevia.setAttribute(
        "aria-label",
        "Vista previa de la consulta"
    );

    // Crear botón para copiar
    const botonCopiar = document.createElement("button");
    botonCopiar.type = "button";
    botonCopiar.className = "button button--primary";
    botonCopiar.textContent = "Copiar consulta";

    botonCopiar.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(consulta);

            botonCopiar.textContent = "¡Consulta copiada!";
        } catch (error) {
            vistaPrevia.select();
            botonCopiar.textContent =
                "Seleccioná el texto y presioná Ctrl + C";
        }
    });

    // Mostrar los elementos en la página
    resultado.append(
        titulo,
        vistaPrevia,
        botonCopiar
    );
});
