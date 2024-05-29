document.addEventListener('DOMContentLoaded', function() {
    const tableName = 'T_RTC_UO';  // Cambia esto según la tabla que necesites consultar

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
    .then(data => mostrarRTC_UO(data))
    .catch(error => console.error('Error al cargar los clientes:', error));
});

function mostrarRTC_UO(paises) {
    const tbody = document.querySelector('#tablaRTC_UO tbody');
    tbody.innerHTML = ''; // Este es el punto crítico

    paises.forEach(cliente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cliente.Codigo_RTC_UO}</td>
            <td>${cliente.Nombre_RTC_UO}</td>
        `;
        tbody.appendChild(fila);
    });
}
