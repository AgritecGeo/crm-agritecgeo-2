document.addEventListener('DOMContentLoaded', function() {
    const tableName = 'Organizaciones_Trimblel';  // Cambia esto según la tabla que necesites consultar

    fetch('https://us-central1-agritecgeo-analytics.cloudfunctions.net/crm-agritecgeo-query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ table: tableName })  // Enviar el nombre de la tabla como parte del cuerpo de la solicitud
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Respuesta de red no fue ok');
        }
        return response.json();
    })
    .then(data => {
        mostrarPaises(data);
        // Añadir evento de escucha al campo de búsqueda
        document.getElementById('buscador').addEventListener('input', function() {
            filtrarPaises(data, this.value);
        });
    })
    .catch(error => console.error('Error al cargar los clientes:', error));
});

function mostrarPaises(paises) {
    const tbody = document.querySelector('#tablaPaises tbody');
    tbody.innerHTML = ''; // Este es el punto crítico

    paises.forEach(cliente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.name}</td>
        `;
        tbody.appendChild(fila);
    });
}

function filtrarPaises(paises, texto) {
    const tbody = document.querySelector('#tablaPaises tbody');
    tbody.innerHTML = ''; // Limpiar la tabla antes de mostrar los resultados filtrados

    const textoMayuscula = texto.toUpperCase();

    paises.filter(cliente => cliente.name.toUpperCase().includes(textoMayuscula))
          .forEach(cliente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.name}</td>
        `;
        tbody.appendChild(fila);
    });
}


function mostrarMensajeAgregado() {
    Swal.fire({
        title: 'Éxito!',
        text: 'El país ha sido agregada correctamente.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
    });
}


function validarYAgregarCategoria() {
    var nombre = document.getElementById('nombre').value.trim();
    var codigo = document.getElementById('descripcion').value.trim();

    if (nombre === "" || codigo === "") {
        Swal.fire({
            title: 'Error!',
            text: 'Todos los campos deben ser llenados.',
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Luego de la validación, agregar la categoría si todo está correcto
    agregarCategoria(nombre, codigo);
}
