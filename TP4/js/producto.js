
import { productos } from "./productos.js";


import { agregarAlCarrito } from "./gestionCarrito.js";


// Obtener el ID del perfume desde la URL
const parametros = new URLSearchParams(window.location.search);
const idProducto = Number(parametros.get("id"));

// Buscar el producto seleccionado
const producto = productos.find((item) => item.id === idProducto);

// Seleccionar los elementos HTML
const contenedor = document.getElementById("detalle-producto");
const titulo = document.getElementById("titulo-producto");

// Mostrar los datos del perfume
if (producto) {

    titulo.textContent = producto.nombre;

    const tarjeta = document.createElement("article");
    tarjeta.classList.add("product-card");

    tarjeta.innerHTML = `
        <img
            src="${producto.imagen}"
            alt="Perfume ${producto.nombre}"
            onerror="this.style.display='none'"
        >

        <h2>${producto.nombre}</h2>

        <p><strong>Marca:</strong> ${producto.marca}</p>

        <p><strong>Género:</strong> ${producto.genero}</p>

        <p><strong>Categoría:</strong> ${producto.categoria}</p>

        <p><strong>Familia olfativa:</strong> ${producto.familia}</p>

        <p>${producto.descripcion}</p>

        <a class="button button--primary"
           href="contacto.html">
            Consultar disponibilidad
        </a>
    `;

    contenedor.appendChild(tarjeta);

    
// Botón para agregar el perfume al carrito
const botonAgregar = document.createElement("button");

botonAgregar.type = "button";
botonAgregar.className = "button button--primary";
botonAgregar.textContent = "Agregar al carrito";

botonAgregar.addEventListener("click", () => {
    agregarAlCarrito(producto.id);

    botonAgregar.textContent = "¡Agregado al carrito!";
});

contenedor.appendChild(botonAgregar);


} else {

    titulo.textContent = "Producto no encontrado";

    const mensaje = document.createElement("p");
    mensaje.textContent =
        "El perfume solicitado no existe en nuestro catálogo.";

    contenedor.appendChild(mensaje);
}
