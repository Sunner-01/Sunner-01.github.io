// Mostrar y ocultar la ventana emergente
const btnDetalles = document.getElementById('btnDetalles');
const ventanaEmergente = document.getElementById('ventanaEmergente');

btnDetalles.addEventListener('click', () => {
    ventanaEmergente.style.display = 'flex';
});

ventanaEmergente.addEventListener('click', (e) => {
    if (e.target === ventanaEmergente) {
        ventanaEmergente.style.display = 'none';
    }
});
