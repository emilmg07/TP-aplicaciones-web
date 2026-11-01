
const CLAVE_CARRITO = "amberClubCarrito";

// Recuperar productos guardados
export function obtenerCarrito() {
    try {
        const datos = JSON.parse(
            localStorage.getItem(CLAVE_CARRITO) || "[]"
        );

        return Array.isArray(datos) ? datos : [];
    } catch (error) {
        console.error("Error al leer el carrito:", error);
        return [];
    }
}

// Guardar productos en el navegador
export function guardarCarrito(carrito) {
    localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
    );
}

// Agregar un producto por su ID
export function agregarAlCarrito(id) {
    const carrito = obtenerCarrito();

    const productoExistente = carrito.find(
        (item) => item.id === id
    );

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            id: id,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
}

// Cambiar la cantidad de un producto
export function cambiarCantidad(id, cantidad) {
    const carrito = obtenerCarrito();

    const actualizado = carrito
        .map((item) => {
            if (item.id === id) {
                return { ...item, cantidad: cantidad };
            }
            return item;
        })
        .filter((item) => item.cantidad > 0);

    guardarCarrito(actualizado);
}

// Eliminar un producto
export function eliminarDelCarrito(id) {
    const carrito = obtenerCarrito();

    guardarCarrito(
        carrito.filter((item) => item.id !== id)
    );
}

// Vaciar el carrito
export function vaciarCarrito() {
    guardarCarrito([]);
}
