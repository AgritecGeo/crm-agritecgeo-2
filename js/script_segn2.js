document.addEventListener('DOMContentLoaded', function() {
    const tableName = 'T_Segmento_N2';  // Cambia esto según la tabla que necesites consultar

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
    .then(data => mostrarSegmento2(data))
    .catch(error => console.error('Error al cargar los clientes:', error));
});

function mostrarSegmento2(paises) {
    const tbody = document.querySelector('#tablaSegmento2 tbody');
    tbody.innerHTML = ''; // Este es el punto crítico

    paises.forEach(cliente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cliente.Nombre_Segmento_N2}</td>
            <td>${cliente.Codigo_Segmento_N2}</td>
        `;
        tbody.appendChild(fila);
    });
}