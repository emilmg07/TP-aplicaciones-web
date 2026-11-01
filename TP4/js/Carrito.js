
import { productos } from "./productos.js";

import {
    obtenerCarrito,
    cambiarCantidad,
    eliminarDelCarrito,
    vaciarCarrito
} from "./gestionCarrito.js";

const tabla = document.getElementById("productos-carrito");
const resumen = document.getElementById("resumen-carrito");
const botonVaciar = document.getElementById("vaciar-carrito");
const botonConfirmar = document.getElementById("confirmar-pedido");
const mensajePedido = document.getElementById("mensaje-pedido");

// Renderizar productos del carrito
function mostrarCarrito() {
    const carrito = obtenerCarrito();

    tabla.innerHTML = "";
    mensajePedido.replaceChildren();

    if (carrito.length === 0) {
        const fila = document.createElement("tr");
        const celda = document.createElement("td");

        celda.colSpan = 3;
        celda.textContent = "Tu carrito está vacío.";

        fila.appendChild(celda);
        tabla.appendChild(fila);

        resumen.textContent = "No tenés productos seleccionados.";
        botonConfirmar.disabled = true;
        botonVaciar.disabled = true;
        return;
    }

    botonConfirmar.disabled = false;
    botonVaciar.disabled = false;

    let cantidadTotal = 0;

    carrito.forEach((item) => {
        const producto = productos.find(
            (p) => p.id === item.id
        );

        if (!producto) return;

        cantidadTotal += item.cantidad;

        const fila = document.createElement("tr");

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent =
            `${producto.nombre} - ${producto.marca}`;

        const celdaCantidad = document.createElement("td");
        const selectorCantidad = document.createElement("input");

        selectorCantidad.type = "number";
        selectorCantidad.min = "1";
        selectorCantidad.max = "99";
        selectorCantidad.value = item.cantidad;
        selectorCantidad.className = "form-control";
        selectorCantidad.style.maxWidth = "85px";
        selectorCantidad.setAttribute(
            "aria-label",
            `Cantidad de ${producto.nombre}`
        );

        selectorCantidad.addEventListener("change", () => {
            const cantidad = Number(selectorCantidad.value);

            if (!Number.isInteger(cantidad) ||
                cantidad < 1 ||
                cantidad > 99) {
                selectorCantidad.value = item.cantidad;
                return;
            }

            cambiarCantidad(item.id, cantidad);
            mostrarCarrito();
        });

        celdaCantidad.appendChild(selectorCantidad);

        const celdaAcciones = document.createElement("td");
        const botonEliminar = document.createElement("button");

        botonEliminar.type = "button";
        botonEliminar.className = "button";
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", () => {
            eliminarDelCarrito(item.id);
            mostrarCarrito();
        });

        celdaAcciones.appendChild(botonEliminar);

        fila.append(
            celdaNombre,
            celdaCantidad,
            celdaAcciones
        );

        tabla.appendChild(fila);
    });

    resumen.textContent =
        `Cantidad total de unidades: ${cantidadTotal}. ` +
        "Precio a confirmar.";
}

// Vaciar el carrito
botonVaciar.addEventListener("click", () => {
    if (confirm("¿Querés vaciar el carrito?")) {
        vaciarCarrito();
        mostrarCarrito();
    }
});

// Preparar una consulta de pedido
botonConfirmar.addEventListener("click", () => {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) return;

    const lineas = carrito.map((item) => {
        const producto = productos.find(
            (p) => p.id === item.id
        );

        if (!producto) return null;

        return `- ${producto.nombre} (${producto.marca}) x${item.cantidad}`;
    }).filter(Boolean);

    const mensaje =
        "Hola, AMBER CLUB. Quisiera consultar por estos perfumes:\n\n" +
        lineas.join("\n") +
        "\n\n¿Me pueden confirmar disponibilidad y precios?";

    mensajePedido.replaceChildren();

    const titulo = document.createElement("p");
    titulo.textContent = "Tu consulta está lista:";

    const texto = document.createElement("textarea");
    texto.className = "form-control";
    texto.rows = 7;
    texto.readOnly = true;
    texto.value = mensaje;
    texto.setAttribute("aria-label", "Detalle de la consulta");

    const botonCopiar = document.createElement("button");
    botonCopiar.type = "button";
    botonCopiar.className = "button button--primary";
    botonCopiar.textContent = "Copiar consulta";

    botonCopiar.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(mensaje);
            botonCopiar.textContent = "¡Consulta copiada!";
        } catch (error) {
            texto.select();
            botonCopiar.textContent =
                "Seleccioná el texto y presioná Ctrl + C";
        }
    });

    mensajePedido.append(titulo, texto, botonCopiar);
});

// Mostrar el carrito al abrir la página
mostrarCarrito();
