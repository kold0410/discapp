
// Atributos dinamicos de la Página
var listaOfertas = [], listaOfertasFiltro = [], typeOferta, ofertaSelected;

jQuery(document).ready(function () {
    // Configurando los componentes del Dialog de Detalles
    jQuery('#etiOferta').focus(); jQuery('#btnCompletaOferta').hide();
    
    // Configurando Dialog para mostrar componentes necesarios
    jQuery('#btnCompartirFavOferta').hide(); jQuery('#btnCompartirOferta').show();
    jQuery('#btnAgendaOferta').show(); jQuery('#btnQuitarOferta').hide(); 
    
    jQuery('#btnAgendaOferta').html('Agregar a favoritos');  // Botón para Favoritos
    jQuery('#btnCompartirOferta').html('Compartir'); // Botón para compartir la Oferta
    jQuery('#btnAgendaOferta').attr('aria-label','Agregar a favoritos. Botón');
    jQuery('#btnCompartirOferta').attr('aria-label','Compartir. Botón');
    jQuery('#btnCompartirFavOferta').attr('aria-label',''); jQuery('#btnQuitarOferta').html('');
    jQuery('#btnQuitarOferta').attr('aria-label',''); jQuery('#btnCompartirFavOferta').html('');
    
    if (!formControl.isOpenListaOfertas()) {
        formControl.openListaOfertas(); // 
        
        jQuery(document).on('click','.btn-oferta', function () {
            discApp.showCargando(); focusComponent = this;
            
            var index = jQuery(this).attr('id'); // Determinando el Index de oferta
            ofertaSelected =  listaOfertasFiltro[index];

            // Cargando los datos en el Dialog
            jQuery("#titleDetail").html("<b>" + ofertaSelected.nombreoferta + "</b>");
            jQuery("#txtInstitucionOferta").html('<b>Institución de la oferta:</b> ' + ofertaSelected.entidadoferta);
            jQuery("#txtDescripcionOferta").html('<b>Descripción de la oferta:</b> ' + ofertaSelected.descripcionoferta);
            jQuery("#txtUbicacionOferta").html('<b>Ubicación de la oferta:</b> <br>' + getUbicacion(ofertaSelected));
            jQuery("#txtDireccionOferta").html(getDireccion(ofertaSelected));
            jQuery("#txtAplicaDiscp").html('<b>La oferta:</b> ' + getNoAplicaDiscapacidad(ofertaSelected));
            jQuery("#txtHorarioOferta").html('<b>Horario de atención de la oferta:</b> ' + ofertaSelected.horarioatencion);
            jQuery("#txtVigenciaOferta").html('<b>Vigencia de oferta:</b> ' + getVigencia(ofertaSelected));
            jQuery("#txtRequisitosOferta").html(getRequisitos(ofertaSelected));
            jQuery("#txtContactoOferta").html('<b>Datos del contacto de oferta:</b><br>' + getContacto(ofertaSelected));

            if (mapa) {
                mapa.insertar(getAddressMap(ofertaSelected));
            }
            else {
                console.log("No se ha cargado libreria del mapa");
            }

            posicionBody = document.body.scrollTop; // Posicion del Body en la Oferta
            jQuery('#dialogOferta').modal('show'); discApp.hideCargando();
            setTimeout("jQuery('#titleDetail').focus()",2000); // Enfocando titulo
        });

        jQuery('#btnAgendaOferta').click(function () {
            agenda.insertOferta(ofertaSelected); jQuery('#dialogOferta').modal('hide'); 
        });

        jQuery('#btnCompartirOferta').click(function () {
            window.plugins.socialsharing.share(getCompartir(ofertaSelected),'Oferta enviada desde DiscApp');
        });
    }

    jQuery("#btnFiltroOferta").click(function () {
        focusComponent = this; aplicarFiltroOfertas(jQuery("#txtFiltroOferta").val().trim()); 
    });

    jQuery("#btnCompletaOferta").click(function () {
        jQuery('#txtFiltroOferta').val(''); limpiarListaDeOfertas(); cargarOfertas(listaOfertas);
        listaOfertasFiltro = listaOfertas; jQuery('#btnCompletaOferta').hide();
        jQuery('#etiNumberOferta').focus(); // Enfocando boton Consultar
    });
    
    typeOferta = discApp.getTypeOferta(); // TIpo de Ofertas
    jQuery("#etiOferta").html("<b>Listado de ofertas en " + typeOferta + "</b>");
    listaOfertas = discApp.getListaDeOfertas(); 
    listaOfertasFiltro = listaOfertas; cargarOfertas(listaOfertas);
    
    $("#txtFiltroOferta").focusin(function() {
        jQuery("#footerApp").hide();
    });
    
    $("#txtFiltroOferta").focusout(function() {
        jQuery("#footerApp").show();
    });
});

// Nos permite aplicar el Filtro al DataSet en el Formulario 
function aplicarFiltroOfertas(patronFiltro) {
    if (patronFiltro.length !== 0) {
        limpiarListaDeOfertas(); // Limpiamos la Lista

        patronFiltro = patronFiltro.toUpperCase();

        for (var index = 0; index < listaOfertas.length; index++) {
            if (isFiltrableOferta(listaOfertas[index],patronFiltro)) {
                listaOfertasFiltro.push(listaOfertas[index]);
            } // Determinando si la Oferta entra en el Filtro
        }

        if (listaOfertasFiltro.length === 0) {
            jQuery("#etiNumberOferta").html(message.datosCargados(0,listaOfertas.length));
            discApp.showMessage(message.sinOfertasPorFiltro());
        } // No se encontraron Ofertas con patrón Digitado

        else {
            cargarOfertas(listaOfertasFiltro); jQuery('#etiNumberOferta').focus();
        }
        
        jQuery('#btnCompletaOferta').show();
    } // Se ha digitado Datos para realizar Filtro
    
    else {
        discApp.showMessage(message.sinDatosFiltro());
    } // No se ha digitado Datos para realizar Filtro
};

// Permite Limpiar la Lista del Formulario
function limpiarListaDeOfertas() {
    jQuery("#listaOfertas").empty(); listaOfertasFiltro = [];
};

// Cargando datos del DataSet en la Lista del Formulario
function cargarOfertas(listaDatos) {
    for (var index = 0; index < listaDatos.length; index++) {
        var item = listaDatos[index]; // Cargando elemento de la Lista
        jQuery("#listaOfertas").append(crearComponentListaOfertas(item,index));
    } // Insertando componentes en la Lista
    
    jQuery("#etiNumberOferta").html(message.datosCargados(listaDatos.length,listaOfertas.length)); 
    discApp.adjustFontSizeClass('.compFiltro');
};

function getRequisitos(item) {
    if (item.requisitos === 'NA') {
        return 'La oferta no tiene requisitos definidos.';
    }
    
    return 'Requisitos de la oferta: ' + item.requisitos + ".";
};

function getDireccion(item) {
    if (item.direccion === '') {
        return 'La oferta: no cuenta con una dirección establecida.';
    }
    
    return 'Dirección de la oferta: ' + item.direccion + ".";
};

function getContacto(item) {
    var contacto = ''; // Variable a contener datos de Contacto
    
    if (item.nombrecontacto === '') {
        contacto = 'Nombre del contacto desconocido';
    }
    
    else {
        contacto = '<b>Nombre:</b> ' + item.nombrecontacto;
    }
    
    if (item.telefono1contacto === '' && item.telefono2contacto === '' && item.celularcontacto === '' ) {
        contacto += '<br>Teléfonos del contacto desconocido';
    }
    
    else {
        contacto += '<br><b>Teléfono:</b> ' + item.telefono1contacto + " " + item.telefono2contacto + " " + item.celularcontacto;
    }
    
    if(item.correoelectronico === ''){
        contacto += '<br>Correo del contacto desconocido';
    }
    
    else{
        contacto += '<br><b>Correo: </b>' + item.correoelectronico;
    }
    
    return contacto; // Retornando datos del Contacto
};

function getAddressMap(item) {
    return item.direccion + " - " + item.nombremunicipio + " (" + item.nombredepartamento + ")";
};

function getUbicacion(item) {
    return item.nombremunicipio + ", " + item.nombredepartamento;
}

function getVigencia(item) {
    if (item.vigenciadese === 'NA') {
        return 'indefinida';
    }
    
    return item.vigenciadese + ", " + item.vigenciahasta;
}

function getNoAplicaDiscapacidad(item) {
    var discapacidad = '', arrayDiscp = [];
    
    if (item.discfisica === 'N') {
        arrayDiscp.push('discapacidad física');
    }
    
    if (item.discauditiva === 'N') {
        arrayDiscp.push('discapacidad auditiva');
    }
    
    if (item.discvisual === 'N') {
        arrayDiscp.push('discapacidad visual');
    }
    
    if (item.discmental === 'N') {
        arrayDiscp.push('discapacidad mental');
    }
    
    if (item.disccognitiva === 'N') {
        arrayDiscp.push('discapacidad cognitiva');
    }
    
    if (item.discmultiple === 'N') {
        arrayDiscp.push('discapacidad múltiple');
    }
    
    if (arrayDiscp.length === 0) {
        discapacidad = 'aplica para todas las categorías de discapacidad';
    }
    
    else {
        discapacidad = 'no aplica para ';
        for (var index = 0; index < arrayDiscp.length; index++) {
            discapacidad += arrayDiscp[index];
            
            if ((index + 1) < arrayDiscp.length) {
                discapacidad += ', ';
            }
        }
    }
    
    return discapacidad;
}

function crearComponentListaOfertas(item, index) {
    // Diseñando componente panel para mostrar Ofertas
    var newComponent = "<li class='list-group-item liRemove'><h2 class='compSmall compFiltro'>";
    
    // Header del Componente
    newComponent += "<b>Oferta en " + typeOferta + " número " + (index + 1) + "</b></h2></li>";
    
    // Body del Componente
    newComponent += "<li value='" + index + "' class='list-group-item liRemove'>";
    newComponent += "<p class='compSmall compFiltro'><b>Entidad:</b> " + item.entidadoferta + "</p>";
    newComponent += "<p class='compSmall compFiltro' align='justify'><b>Nombre de oferta:</b> " + item.nombreoferta + "</p>";
    newComponent += "<p class='compSmall compFiltro' align='justify'><b>Descripción:</b> " + item.descripcionoferta + "</p>";
    newComponent += "<p class='compSmall compFiltro' align='justify'><b>Ubicación de oferta:</b> " + getUbicacion(item) + "</p>";
    newComponent += "<p class='compSmall compFiltro' align='justify'><b>Esta oferta</b>: " + getNoAplicaDiscapacidad(item) + "</p>";
    
    // Footer del Componente
    newComponent += "<div id='" + index + "' tabindex='-1' class='btn btn-primary btn-oferta compSmall compFiltro'";
    newComponent += " aria-label='Ver detalles de la oferta número " + (index +1) + ". Botón'>Ver detalles</div></li>";
    
    return newComponent; // Retornando componente para la Lista
};

function isFiltrableOferta(item, datoFiltro) {
    var arrayFiltro = datoFiltro.split(" "), index = 0, filtrable = false;
    
    while (!filtrable && (index < arrayFiltro.length )) {
        filtrable = applyFilterOferta(item,arrayFiltro[index]);
        if (!filtrable) {index++;} // El dato no se filtra por lo Digitado
    }
    
    return filtrable; // Retornando el valor si es Filtrable
};

function applyFilterOferta(item, patronFiltro) {
    if ((item.nombreoferta.toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Nombre de Oferta
    
    if ((item.entidadoferta.toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Entidad de Oferta
    
    if ((item.nombredepartamento.toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Departamento de Oferta
    
    if ((item.nombremunicipio.toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Municipio de Oferta
    
    if ((item.descripcionoferta.toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Descripción de Oferta
    
    return false; // No hay como Filtrar
};

function getCompartir(ofertaSelected) {
    var compartir = "Esta oferta fue compartida desde app móvil DiscApp\nOferta de " + typeOferta;
    compartir += "\nNombre de la Oferta: " + ofertaSelected.nombreoferta + "\n";
    compartir += "Descripcion de la Oferta: " + ofertaSelected.descripcionoferta + "\n";
    compartir += "Dirección de la Oferta: " + getDireccion(ofertaSelected) + "\n";
    compartir += "Ubicación de la Oferta: " + ofertaSelected.nombremunicipio+ ", " + ofertaSelected.nombredepartamento;
    
    return compartir; // Retornar el Parrafo Compartir
};