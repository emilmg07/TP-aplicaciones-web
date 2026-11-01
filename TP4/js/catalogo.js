
import { productos } from "./productos.js";

// ELEMENTOS DEL HTML
const contenedor = document.getElementById("contenedor-productos");
const formulario = document.querySelector(".form-panel");
const buscador = document.getElementById("buscar");
const filtroMarca = document.getElementById("marca");
const filtroFamilia = document.getElementById("familia");

// FUNCIÓN PARA MOSTRAR PRODUCTOS
function mostrarProductos(listaProductos) {

    contenedor.innerHTML = "";

    if (listaProductos.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent =
            "No se encontraron perfumes con esos filtros.";

        contenedor.appendChild(mensaje);
        return;
    }

    listaProductos.forEach((producto) => {

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("product-card");

        tarjeta.innerHTML = `
            <a href="producto.html?id=${producto.id}">
                <img
                    src="${producto.imagen}"
                    alt="Perfume ${producto.nombre} de ${producto.marca}"
                    onerror="this.style.display='none'"
                >
                <h3>${producto.nombre}</h3>
            </a>

            <p><strong>Marca:</strong> ${producto.marca}</p>
            <p><strong>Género:</strong> ${producto.genero}</p>
            <p>${producto.descripcion}</p>

            <a class="button button--primary"
               href="producto.html?id=${producto.id}">
                Ver producto
            </a>
        `;

        contenedor.appendChild(tarjeta);
    });
}

// FUNCIÓN PARA FILTRAR PRODUCTOS
function filtrarProductos() {

    const texto = buscador.value.toLowerCase().trim();
    const marca = filtroMarca.value.toLowerCase();
    const familia = filtroFamilia.value.toLowerCase();

    const resultados = productos.filter((producto) => {

        const coincideNombre =
            producto.nombre.toLowerCase().includes(texto) ||
            producto.marca.toLowerCase().includes(texto);

        const coincideMarca =
            marca === "" ||
            producto.marca.toLowerCase() === marca;

        const coincideFamilia =
            familia === "" ||
            producto.familia.toLowerCase() === familia;

        return coincideNombre && coincideMarca && coincideFamilia;
    });

    mostrarProductos(resultados);
}

// EVENTOS JAVASCRIPT
buscador.addEventListener("input", filtrarProductos);

filtroMarca.addEventListener("change", filtrarProductos);

filtroFamilia.addEventListener("change", filtrarProductos);

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    filtrarProductos();
});

// MOSTRAR PRODUCTOS AL CARGAR LA PÁGINA
mostrarProductos(productos);
