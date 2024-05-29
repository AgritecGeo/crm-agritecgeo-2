document.addEventListener('DOMContentLoaded', function() {
    const tableName = 'Clientes';  // Cambia esto según la tabla que necesites consultar

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
    const tbody = document.querySelector('#tablaClientes tbody');
    tbody.innerHTML = ''; // Este es el punto crítico

    clientes.forEach(cliente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cliente.id_hash}</td>
            <td>${cliente.Nombre_Cliente}</td>
            <td>${cliente.Codigo_SAP }</td>
            <td>${cliente.Razon_Social }</td>
            <td>${cliente.NIT}</td>
            <td>${cliente.Direccion_Fiscal }</td>
            <td>${cliente.Telefono_Oficina  }</td>
            <td>${cliente.Contacto  }</td>
            <td>${cliente.Puesto }</td>
            <td>${cliente.email }</td>
            <td>${cliente.Celular }</td>
            <td>${cliente.Codigo_Pais }</td>
            <td>${cliente.Codigo_RTC_UO }</td>
            <td>${cliente.Codigo_RTC_SAA }</td>
            <td>${cliente.Codigo_Segmento_N1 }</td>
            <td>${cliente.Codigo_Segmento_N2 }</td>
            <td>${cliente.IsInforme }</td>
            <td>${cliente.IsBesafer }</td>
            <td>${cliente.Codigo_Categoria  }</td>
        `;
        tbody.appendChild(fila);
    });
}