// Seleccionar elementos
const modal = document.getElementById('aboutModal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');

// Abrir la ventana modal
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Cerrar la ventana modal
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar la ventana modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});





/* Carrito*/

// Variables para el carrito
let carrito = [];

// Función para actualizar la tabla del carrito
function actualizarTablaCarrito() {
    const tablaCarrito = document.querySelector("#tabla-carrito tbody");
    const precioTotal = document.querySelector("#precio-total");
    let total = 0;

    // Limpiar tabla antes de actualizar
    tablaCarrito.innerHTML = "";

    // Llenar la tabla con los productos del carrito
    carrito.forEach((producto, index) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>
                <input type="number" min="1" value="${producto.cantidad}" class="cantidad-producto" data-indice="${index}" />
            </td>
            <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
            <td>
                <button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;

        tablaCarrito.appendChild(fila);

        total += producto.precio * producto.cantidad;
    });

    // Actualizar el precio total
    precioTotal.textContent = `Total: $${total.toFixed(2)}`;

    // Escuchar cambios en la cantidad
    document.querySelectorAll(".cantidad-producto").forEach(input => {
        input.addEventListener("change", cambiarCantidadProducto);
    });
}

// Función para agregar un producto al carrito
function agregarProductoAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    actualizarTablaCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    actualizarTablaCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarTablaCarrito();
}

// Función para realizar la compra
function realizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos para realizar la compra.");
        return;
    }

    alert("¡Compra realizada con éxito!");
    vaciarCarrito();
}

// Función para cambiar la cantidad de un producto
function cambiarCantidadProducto(event) {
    const indice = event.target.getAttribute("data-indice");
    const nuevaCantidad = parseInt(event.target.value);

    if (nuevaCantidad > 0) {
        carrito[indice].cantidad = nuevaCantidad;
        actualizarTablaCarrito();
    } else {
        alert("La cantidad debe ser mayor a cero.");
    }
}
