document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = [
        { id: 'codigoSAP', table: 'Codigos_SAP', valueField: 'Codigo_SAP', textField: 'Razon_Social' },
        { id: 'codigoPais', table: 'T_Paises', valueField: 'Nombre_Pais', textField: 'Nombre_Pais' },
        { id: 'codigoRTC_UO', table: 'T_RTC_UO', valueField: 'Nombre_RTC_UO', textField: 'Nombre_RTC_UO' },
        { id: 'codigoRTC_SAA', table: 'T_RTC_SAA', valueField: 'Nombre_RTC_SAA', textField: 'Nombre_RTC_SAA' },
        { id: 'acuerdo', table: 'Listado_de_Acuerdos', valueField: 'Acuerdo', textField: 'Acuerdo' },
        { id: 'orgTrimble', table: 'Organizaciones_Trimblel', valueField: 'name', textField: 'id' },
        { id: 'segmento1', table: 'T_Segmento_N1', valueField: 'Nombre_Segmento_N1', textField: 'Nombre_Segmento_N1' },
        { id: 'segmento2', table: 'T_Segmento_N2', valueField: 'Nombre_Segmento_N2', textField: 'Nombre_Segmento_N2' }
    ];

    dropdowns.forEach(dropdown => {
        fetchDropdownData(dropdown.id, dropdown.table, dropdown.valueField, dropdown.textField);
    });
});

function fetchDropdownData(elementId, tableName, valueField, textField) {
    fetch('https://us-central1-agritecgeo-analytics.cloudfunctions.net/crm-agritecgeo-query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ table: tableName })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        populateDropdown(elementId, data, valueField, textField);
    })
    .catch(error => console.error('Error loading data for ' + tableName + ':', error));
}

function populateDropdown(elementId, items, valueField, textField) {
    const select = document.getElementById(elementId);
    select.innerHTML = '';  // Limpiar opciones previas
    items.forEach(item => {
        // Crear opción con el valor del código SAP y el texto también del código SAP
        const option = new Option(item[valueField], item[valueField]);
        select.add(option);
    });

    // Añadir manejador de evento 'change' para el menú desplegable de código SAP
    if (elementId === 'codigoSAP') {
        select.onchange = () => {
            // Encontrar el item seleccionado basado en el código SAP
            const selectedItem = items.find(item => item[valueField] === select.value);
            // Actualizar la razón social basada en la selección
            document.getElementById('razonSocial').value = selectedItem ? selectedItem[textField] : '';
        };
    }

    if (elementId === 'orgTrimble') {
        select.onchange = () => {
            const selectedItem = items.find(item => item[valueField] === select.value);
            document.getElementById('org_id_display').value = selectedItem ? selectedItem[textField] : '';  // Asignar el 'id' al campo de texto
        };
    }
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

