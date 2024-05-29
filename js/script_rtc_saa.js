document.addEventListener('DOMContentLoaded', function() {
    const tableName = 'T_RTC_SAA';  // Cambia esto según la tabla que necesites consultar

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
    .then(data => mostrarRTC_SAA(data))
    .catch(error => console.error('Error al cargar los clientes:', error));
});

function mostrarRTC_SAA(paises) {
    const tbody = document.querySelector('#tablaRTC_SAA tbody');
    tbody.innerHTML = ''; // Este es el punto crítico

    paises.forEach(cliente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cliente.Nombre_RTC_SAA}</td>
            <td>${cliente.Codigo_RTC_SAA}</td>
        `;
        tbody.appendChild(fila);
    });
}

function agregarCategoria(nombre, codigo) {
    fetch('https://us-central1-agritecgeo-analytics.cloudfunctions.net/crm-agritecgeo-add-rtc-saa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Nombre_RTC_SAA: nombre, 
                            Codigo_RTC_SAA: codigo,
                            tabla:  "T_RTC_SAA"
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

    agregarCategoria(nombre, codigo);
}
