document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = [
        { id: 'codigoSAP_add', table: 'Codigos_SAP', valueField: 'Codigo_SAP', textField: 'Razon_Social' },
        { id: 'codigoPais_add', table: 'T_Paises', valueField: 'Nombre_Pais', textField: 'Cod_Pais' },
        { id: 'codigoRTC_UO_add', table: 'T_RTC_UO', valueField: 'Nombre_RTC_UO', textField: 'Codigo_RTC_UO' },
        { id: 'codigoRTC_SAA_add', table: 'T_RTC_SAA', valueField: 'Nombre_RTC_SAA', textField: 'Codigo_RTC_SAA' },
        { id: 'acuerdo_add', table: 'Listado_de_Acuerdos', valueField: 'Acuerdo', textField: 'Acuerdo' },
        { id: 'orgTrimble_add', table: 'Organizaciones_Trimblel', valueField: 'name', textField: 'id' },
        { id: 'codigoCategoria_add', table: 'T_Categorias', valueField: 'Nombre_Categoria', textField: 'Codigo_Categoria' },
        { id: 'segmento1_add', table: 'T_Segmento_N1', valueField: 'Nombre_Segmento_N1', textField: 'Codigo_Segmento_N1' },
        { id: 'segmento2_add', table: 'T_Segmento_N2', valueField: 'Nombre_Segmento_N2', textField: 'Codigo_Segmento_N2' }
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

    if (elementId === 'codigoSAP_add') {
        select.onchange = () => {
            // Encontrar el item seleccionado basado en el código SAP
            const selectedItem = items.find(item => item[valueField] === select.value);
            // Actualizar la razón social basada en la selección
            document.getElementById('razonSocial_add').value = selectedItem ? selectedItem[textField] : '';
        };
    }
    if (elementId === 'orgTrimble_add') {
        select.onchange = () => {
            const selectedItem = items.find(item => item[valueField] === select.value);
            document.getElementById('org_id_display_add').value = selectedItem ? selectedItem[textField] : '';  // Asignar el 'id' al campo de texto
        };
    }
    if (elementId === 'codigoPais_add') {
        select.onchange = () => {
            const selectedItem = items.find(item => item[valueField] === select.value);
            document.getElementById('codigoPais_text').value = selectedItem ? selectedItem[textField] : '';  // Asignar el 'id' al campo de texto
        };
    }
    if (elementId === 'codigoRTC_UO_add') {
        select.onchange = () => {
            const selectedItem = items.find(item => item[valueField] === select.value);
            document.getElementById('codigoRTC_UO_text').value = selectedItem ? selectedItem[textField] : '';  // Asignar el 'id' al campo de texto
        };
    }
    if (elementId === 'codigoRTC_SAA_add') {
        select.onchange = () => {
            const selectedItem = items.find(item => item[valueField] === select.value);
            document.getElementById('codigoRTC_SAA_text').value = selectedItem ? selectedItem[textField] : '';  // Asignar el 'id' al campo de texto
        };
    }
    if (elementId === 'segmento1_add') {
        select.onchange = () => {
            const selectedItem = items.find(item => item[valueField] === select.value);
            document.getElementById('segmento1_text').value = selectedItem ? selectedItem[textField] : '';  // Asignar el 'id' al campo de texto
        };
    }
    if (elementId === 'segmento2_add') {
        select.onchange = () => {
            const selectedItem = items.find(item => item[valueField] === select.value);
            document.getElementById('segmento2_text').value = selectedItem ? selectedItem[textField] : '';  // Asignar el 'id' al campo de texto
        };
    }

    if (elementId === 'codigoCategoria_add') {
        select.onchange = () => {
            const selectedItem = items.find(item => item[valueField] === select.value);
            document.getElementById('codigoCategoria_text').value = selectedItem ? selectedItem[textField] : '';  // Asignar el 'id' al campo de texto
        };
    }
}


function buscarCliente() {
    const idHash = document.getElementById('buscador').value;
    if (idHash.length > 0) {
        document.getElementById('buscador').disabled = true;
        fetchClienteData(idHash);
    }
}

function fetchClienteData(idHash) {
    fetch('https://us-central1-agritecgeo-analytics.cloudfunctions.net/crm-query-clientes-hash', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_hash: idHash })
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0) {
            llenarFormularioCliente(data[0]);
        } else {
            console.error('Cliente no encontrado');
        }
    })
    .catch(error => console.error('Error fetching client data:', error));
}

function llenarFormularioCliente(cliente) {
    document.getElementById('nombreCliente').value = cliente.Nombre_Cliente || '';
    document.getElementById('codigoSAP').value = cliente.Codigo_SAP || '';
    document.getElementById('razonSocial').value = cliente.Razon_Social || '';
    document.getElementById('nit').value = cliente.NIT || '';
    document.getElementById('direccionFiscal').value = cliente.Direccion_Fiscal || '';
    document.getElementById('telefonoOficina').value = cliente.Telefono_Oficina || '';
    document.getElementById('contacto').value = cliente.Contacto || '';
    document.getElementById('puesto').value = cliente.Puesto || '';
    document.getElementById('email').value = cliente.email || '';
    document.getElementById('celular').value = cliente.Celular || '';
    document.getElementById('codigoPais').value = cliente.Codigo_Pais || '';
    document.getElementById('codigoRTC_UO').value = cliente.Codigo_RTC_UO || '';
    document.getElementById('codigoRTC_SAA').value = cliente.Codigo_RTC_SAA || '';
    document.getElementById('segmento1').value = cliente.Codigo_Segmento_N1 || '';
    document.getElementById('segmento2').value = cliente.Codigo_Segmento_N2 || '';
    document.getElementById('isInforme').value = cliente.IsInforme || '';
    document.getElementById('isBesafer').value = cliente.IsBesafer || '';
    document.getElementById('codigoCategoria').value = cliente.Codigo_Categoria || '';
    deshabilitarCampos();
}

function deshabilitarCampos() {
    const fields = document.querySelectorAll('#formularioCliente input');
    fields.forEach(field => {
        field.disabled = true;
    });
}

function habilitarCampos() {
    const fields = document.querySelectorAll('#formularioCliente input, #formularioCliente select');
    fields.forEach(field => field.disabled = false);
}


function mostrarMensajeAgregado() {
    Swal.fire({
        title: '¡Éxito!',
        text: 'La categoría ha sido agregada correctamente.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(); // Recargar la página automáticamente
        }
    });
}
async function enviarFormulario(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener los datos del formulario
    const formData = {
        id_hash: document.getElementById('buscador').value,
        Nombre_Cliente: document.getElementById('nombreCliente_add').value,
        Codigo_SAP: document.getElementById('codigoSAP_add').value,
        Razon_Social: document.getElementById('razonSocial_add').value,
        NIT: document.getElementById('nit_add').value,
        Direccion_Fiscal: document.getElementById('direccionFiscal_add').value,
        Telefono_Oficina: document.getElementById('telefonoOficina_add').value,
        Contacto: document.getElementById('contacto_add').value,
        Puesto: document.getElementById('puesto_add').value,
        email: document.getElementById('email_add').value,
        Celular: document.getElementById('celular_add').value,
        Codigo_Pais: document.getElementById('codigoPais_text').value,
        Codigo_RTC_UO: document.getElementById('codigoRTC_UO_text').value,
        Codigo_RTC_SAA: document.getElementById('codigoRTC_SAA_text').value,
        Codigo_Segmento_N1: document.getElementById('segmento1_text').value,
        Codigo_Segmento_N2: document.getElementById('segmento2_text').value,
        Codigo_Categoria: document.getElementById('codigoCategoria_text').value,
        org_id: document.getElementById('org_id_display_add').value,
        acuerdo: document.getElementById('acuerdo_add').value
    };

    try {
        const response = await fetch('https://us-central1-agritecgeo-analytics.cloudfunctions.net/crm-agritecgeo-update-clientes-id-hash', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            mostrarMensajeAgregado();
        } else {
            console.error('Error en la respuesta del servidor');
        }
    } catch (error) {
        console.error('Error al enviar los datos', error);
    }
}