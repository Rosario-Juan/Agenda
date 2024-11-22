
    document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.querySelector("table tbody");


    tabla.addEventListener("click", (event) => {
    const target = event.target;


    if (target.closest(".btn-success")) {
    const fila = target.closest("tr");
    const datos = obtenerDatosFila(fila);
    mostrarModalVer(datos);
}


    if (target.closest(".btn-warning")) {
    const fila = target.closest("tr");
    const datos = obtenerDatosFila(fila);
    mostrarModalEditar(datos, fila);
}


    if (target.closest(".btn-danger")) {
    const fila = target.closest("tr");
    if (confirm("¿Está seguro de que desea eliminar este contacto?")) {
    fila.remove();
    actualizarIndices();
}
}
});


    function obtenerDatosFila(fila) {
    return {
    id: fila.children[0].innerText,
    imagen: fila.children[1].querySelector("img").src,
    nombre: fila.children[2].innerText,
    apellido: fila.children[3].innerText,
    cedula: fila.children[4].innerText,
    telefono: fila.children[5].innerText,
    correo: fila.children[6].innerText,
    redes: fila.children[7].innerText,
    comentario: fila.children[8].innerText
};
}


    function mostrarModalVer(datos) {
    const modalHTML = `
                <div class="modal fade" id="modalVer" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Detalles del Contacto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p><strong>Nombre:</strong> ${datos.nombre}</p>
                                <p><strong>Apellido:</strong> ${datos.apellido}</p>
                                <p><strong>Cédula:</strong> ${datos.cedula}</p>
                                <p><strong>Teléfono:</strong> ${datos.telefono}</p>
                                <p><strong>Correo:</strong> ${datos.correo}</p>
                                <p><strong>Redes Sociales:</strong> ${datos.redes}</p>
                                <p><strong>Comentario:</strong> ${datos.comentario}</p>
                                <img src="${datos.imagen}" alt="Imagen" style="width: 100%; max-width: 300px;">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    const modal = new bootstrap.Modal(document.getElementById("modalVer"));
    modal.show();


    document.getElementById("modalVer").addEventListener("hidden.bs.modal", (e) => {
    e.target.remove();
});
}


    function mostrarModalEditar(datos, fila) {
    const modalHTML = `
                <div class="modal fade" id="modalEditar" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Editar Contacto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="formEditar">
                                    <label for="editarNombre">Nombre</label>
                                    <input type="text" id="editarNombre" class="form-control" value="${datos.nombre}">
                                    <label for="editarApellido">Apellido</label>
                                    <input type="text" id="editarApellido" class="form-control" value="${datos.apellido}">
                                    <label for="editarCedula">Cédula</label>
                                    <input type="text" id="editarCedula" class="form-control" value="${datos.cedula}">
                                    <label for="editarTelefono">Teléfono</label>
                                    <input type="text" id="editarTelefono" class="form-control" value="${datos.telefono}">
                                    <label for="editarCorreo">Correo</label>
                                    <input type="email" id="editarCorreo" class="form-control" value="${datos.correo}">
                                    <label for="editarRedes">Redes Sociales</label>
                                    <input type="text" id="editarRedes" class="form-control" value="${datos.redes}">
                                    <label for="editarComentario">Comentario</label>
                                    <textarea id="editarComentario" class="form-control">${datos.comentario}</textarea>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary" id="guardarCambios">Guardar Cambios</button>
                            </div>
                        </div>
                    </div>
                </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    const modal = new bootstrap.Modal(document.getElementById("modalEditar"));
    modal.show();

    // Guardar cambios
    document.getElementById("guardarCambios").addEventListener("click", () => {
    fila.children[2].innerText = document.getElementById("editarNombre").value.trim();
    fila.children[3].innerText = document.getElementById("editarApellido").value.trim();
    fila.children[4].innerText = document.getElementById("editarCedula").value.trim();
    fila.children[5].innerText = document.getElementById("editarTelefono").value.trim();
    fila.children[6].innerText = document.getElementById("editarCorreo").value.trim();
    fila.children[7].innerText = document.getElementById("editarRedes").value.trim();
    fila.children[8].innerText = document.getElementById("editarComentario").value.trim();

    modal.hide();
});


    document.getElementById("modalEditar").addEventListener("hidden.bs.modal", (e) => {
    e.target.remove();
});
}


    function actualizarIndices() {
    const filas = tabla.querySelectorAll("tr");
    filas.forEach((fila, index) => {
    fila.children[0].innerText = index + 1;
});
}
});

