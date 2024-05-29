document.addEventListener('DOMContentLoaded', function() {
    const tableName = 'T_Categorias';  // Cambia esto según la tabla que necesites consultar

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
    .then(data => mostrarClientes(data))
    .catch(error => console.error('Error al cargar los clientes:', error));
});

function mostrarClientes(clientes) {
    const tbody = document.querySelector('#tablaCategorias tbody');
    tbody.innerHTML = ''; // Este es el punto crítico

    clientes.forEach(cliente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cliente.Nombre_Categoria}</td>
            <td>${cliente.Codigo_Categoria}</td>
        `;
        tbody.appendChild(fila);
    });
}

function mostrarMensajeAgregado() {
    Swal.fire({
        title: 'Éxito!',
        text: 'La categoría ha sido agregada correctamente.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
    });
}


function agregarCategoria(nombre, codigo) {
    fetch('https://us-central1-agritecgeo-analytics.cloudfunctions.net/crm_agritecgeo_insert_categorias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Nombre_Categoria: nombre, 
                            Codigo_Categoria: codigo,
                            tabla:  "T_Categorias"
                            })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Respuesta de red no fue ok. Estado HTTP: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            Swal.fire({
                title: 'Error!',
                text: data.error,
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
            });
        } else {
            mostrarMensajeAgregado();
        }
    })
    .catch(error => console.error('Error al agregar la categoría:', error));
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


