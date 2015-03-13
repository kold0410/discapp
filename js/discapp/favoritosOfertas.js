
// Atributos dinamicos de la Página
var listaFavOfertas = [], listaFavOfertasFiltro = [], indexFavOfertas = [];
var indexSelected, ofertaSelected;

jQuery(document).ready(function () {
    // Configurando los componentes del Dialog de Detalles
    jQuery('#etiFavOferta').focus(); jQuery('#btnCompletaFavOferta').hide();
    
    function successDeleteFavoriteSupply () {
        limpiarListaFavoritoOfertas(); listaFavOfertas.splice(indexFavOfertas[indexSelected],1);
        listaFavOfertasFiltro = listaFavOfertas; indexFavOfertas = [];

        for (var index = 0; index < listaFavOfertas.length; index++) {
            indexFavOfertas.push(index);
        } // Cargando index de la Lista Completa

        cargarFavoritoOfertas(listaFavOfertasFiltro); cerrarDetailsOfertas(); 
        jQuery('#btnCompletaFavOferta').hide(); // Ocultando Boton
        discApp.showMessage('La oferta fue removida de la lista de favoritos');
    };
    
    // Configurando Dialog para mostrar componentes necesarios
    jQuery('#btnAgendaOferta').hide(); jQuery('#btnQuitarOferta').show();
    jQuery('#btnCompartirOferta').hide(); jQuery('#btnCompartirFavOferta').show();
    
    jQuery('#btnQuitarOferta').html('Remover de favoritos'); // Botón para Favoritos
    jQuery('#btnCompartirFavOferta').html('Compartir'); // Botón para compartir oferta
    jQuery('#btnQuitarOferta').attr('aria-label','Remover de favoritos. Botón');
    jQuery('#btnCompartirFavOferta').attr('aria-label','Compartir, Botón');
    jQuery('#btnCompartirOferta').attr('aria-label',''); jQuery('#btnAgendaOferta').html('');
    jQuery('#btnAgendaOferta').attr('aria-label',''); jQuery('#btnCompartirOferta').html('');
    
    if (!formControl.isOpenFavoritosOfertas()) {
        formControl.openFavoritosOfertas(); // Abrio Formulario de Favoritos
        
        jQuery(document).on('click','.btn-fav-oferta', function () {
            discApp.showCargando(); focusComponent = this;
            
            indexSelected = jQuery(this).attr('id'); // Determinando el Index de oferta
            ofertaSelected =  listaFavOfertasFiltro[indexSelected];

            // Cargando los datos en el Dialog
            jQuery("#titleDetail").html("<b>" + ofertaSelected[5] + "</b>");
            jQuery("#txtInstitucionOferta").html('<b>Institución de la oferta</b>: ' + ofertaSelected[2]);
            jQuery("#txtDescripcionOferta").html('<b>Descripción de la oferta:</b> ' + ofertaSelected[6]);
            jQuery("#txtUbicacionOferta").html('<b>Ubicación de la oferta:</b> ' + getFavoritoUbicacion(ofertaSelected));
            jQuery("#txtDireccionOferta").html(getFavoritoDireccion(ofertaSelected));
            jQuery("#txtAplicaDiscp").html('<b>La oferta:</b> ' + getFavoritoNoAplicaDiscapacidad(ofertaSelected));
            jQuery("#txtHorarioOferta").html('<b>Horario de atención de la oferta:</b> ' + ofertaSelected[8]);
            jQuery("#txtVigenciaOferta").html('<b>Vigencia de oferta:</b> ' + getFavoritoVigencia(ofertaSelected));
            jQuery("#txtRequisitosOferta").html(getFavoritoRequisitos(ofertaSelected));
            jQuery("#txtContactoOferta").html('<b>Datos del contacto de oferta:</b><br>' + getFavoritoContacto(ofertaSelected));

            if (mapa) {
                mapa.insertar(getFavoritoAddressMap(ofertaSelected));
            }
            else {
                console.log("No se ha cargado libreria del mapa");
            }

            posicionBody = document.body.scrollTop; // Posicion del Body en la Oferta
            jQuery('#dialogOferta').modal('show'); discApp.hideCargando();
            setTimeout("jQuery('#titleDetail').focus()",2000); // Enfocando titulo
        });

        jQuery('#btnQuitarOferta').click(function () {
            jQuery('#dialogOferta').modal('hide'); agenda.deleteFavoriteSupply(ofertaSelected[0],successDeleteFavoriteSupply);
        });

        jQuery('#btnCompartirFavOferta').click(function () {
            window.plugins.socialsharing.share(getFavoritoCompartir(ofertaSelected),'Oferta enviada desde DiscApp');
        });
    }

    jQuery("#btnFiltroFavOferta").click(function () {
        focusComponent = this; aplicarFiltroFavoritoOfertas(jQuery("#txtFiltroFavOferta").val().trim()); 
    });

    jQuery("#btnCompletaFavOferta").click(function () {
        jQuery('#txtFiltroFavOferta').val(''); limpiarListaFavoritoOfertas(); cargarFavoritoOfertas(listaFavOfertas);
        listaFavOfertasFiltro = listaFavOfertas; jQuery('#btnCompletaFavOferta').hide();
        jQuery('#etiNumberOfertaFav').focus(); // Enfocando boton Consultar
    });
    
    listaFavOfertas = agenda.getFavoritesList(); listaFavOfertasFiltro = listaFavOfertas; 
    
    for (var index = 0; index < listaFavOfertas.length; index++) {
        indexFavOfertas.push(index);
    } // Cargando index de la Lista Completa
    
    cargarFavoritoOfertas(listaFavOfertas); // Cargando Ofertas
    
    $("#txtFiltroFavOferta").focusin(function() {
        jQuery("#footerApp").hide();
    });
    
    $("#txtFiltroFavOferta").focusout(function() {
        jQuery("#footerApp").show();
    });
});

// Nos permite aplicar el Filtro al DataSet en el Formulario 
function aplicarFiltroFavoritoOfertas(patronFiltro) {
    indexFavOfertas = []; // Index de Listado General de Favoritos
    
    if (patronFiltro.length !== 0) {
        limpiarListaFavoritoOfertas(); // Limpiamos la Lista

        patronFiltro = patronFiltro.toUpperCase();

        for (var index = 0; index < listaFavOfertas.length; index++) {
            if (isFiltrableFavoritoOferta(listaFavOfertas[index],patronFiltro)) {
                listaFavOfertasFiltro.push(listaFavOfertas[index]);
                indexFavOfertas.push(index);
            } // Determinando si la Oferta entra en el Filtro
        }

        if (listaFavOfertasFiltro.length === 0) {
            jQuery("#etiNumberOfertaFav").html(message.datosCargados(0,listaFavOfertas.length));
            discApp.showMessage(message.sinOfertasPorFiltro());
        } // No se encontraron Ofertas con patrón Digitado

        else {
            cargarFavoritoOfertas(listaFavOfertasFiltro); jQuery('#etiNumberOfertaFav').focus();
        }
        
        jQuery('#btnCompletaFavOferta').show();
    } // Se ha digitado Datos para realizar Filtro
    
    else {
        discApp.showMessage(message.sinDatosFiltro());
    } // No se ha digitado Datos para realizar Filtro
};

// Permite Limpiar la Lista del Formulario
function limpiarListaFavoritoOfertas() {
    jQuery("#listaFavOfertas").empty(); listaFavOfertasFiltro = [];
};

// Cargando datos del DataSet en la Lista del Formulario
function cargarFavoritoOfertas(listaDatos) {
    for (var index = 0; index < listaDatos.length; index++) {
        var item = listaDatos[index]; // Cargando elemento de la Lista
        jQuery("#listaFavOfertas").append(crearComponentFavoritoOfertas(item,index));
    } // Insertando componentes en la Lista
    
    jQuery("#etiNumberOfertaFav").html(message.datosCargados(listaDatos.length,listaFavOfertas.length)); 
    discApp.adjustFontSizeClass('.compFiltro');
};

function getFavoritoRequisitos(item) {
    if (item[9] === 'NA') {
        return 'La oferta: no tiene requisitos definidos.';
    }
    
    return 'Requisitos de la oferta: ' + item.requisitos +'.';
};

function getFavoritoDireccion(item) {
    if (item[7] === '') {
        return 'La oferta: no cuenta con una dirección establecida.';
    }
    
    return 'Dirección de la oferta: ' + item[7] + '.';
};

function getFavoritoContacto(item) {
    var contacto = ''; // Variable a contener datos de Contacto
    
    if (item[13] === '') {
        contacto = 'Nombre del contacto desconocido';
    }
    
    else {
        contacto = '<b>Nombre:</b> ' + item[13];
    }
    
    if (item[17] === '' && item[18] === '') {
        contacto += '<br>Teléfonos del contacto desconocido';
    }
    
    else {
        contacto += '<br><b>Teléfono: </b> ' + item[17] + " " + item[18];
    }
    
    if (item[15] === '') {
        contacto += '<br>Célular del contacto desconocido';
    }
    
    else {
        contacto += '<br><b>Célular: </b>' + item[15];
    }
    
    return contacto;
};

function getFavoritoAddressMap(item) {
    return item[7] + " - " + item[4] + " (" + item[3] + ")";
};

function getFavoritoUbicacion(item) {
    return item[4] + ", " + item[3];
}

function getFavoritoVigencia(item) {
    if (item[11] === 'NA') {
        return 'indefinida';
    }
    
    return item[11] + ", " + item[12];
}

function getFavoritoNoAplicaDiscapacidad(item) {
    var dataSplit = item[10].split(',');
    var discapacidad = '', arrayDiscp = [];
    
    if (dataSplit[0] === 'N') {
        arrayDiscp.push('discapacidad física');
    }
    
    if (dataSplit[1] === 'N') {
        arrayDiscp.push('discapacidad auditiva');
    }
    
    if (dataSplit[2] === 'N') {
        arrayDiscp.push('discapacidad visual');
    }
    
    if (dataSplit[3] === 'N') {
        arrayDiscp.push('discapacidad mental');
    }
    
    if (dataSplit[4] === 'N') {
        arrayDiscp.push('discapacidad cognitiva');
    }
    
    if (dataSplit[5] === 'N') {
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

function crearComponentFavoritoOfertas(item, index) {
    // Diseñando componente panel para mostrar Ofertas
    var newComponent = "<li class='list-group-item liRemove'><h2 class='compSmall compFiltro'>";
    
    // Header del Componente
    newComponent += "<b>Oferta en " + item[1].toLowerCase() + " número " + (index + 1) + "</b></h2></li>";
    
    // Body del Componente
    newComponent += "<li value='" + index + "' class='list-group-item liRemove'>";
    newComponent += "<p class='compSmall compFiltro'><b>Entidad:</b> " + item[2] + "</p>";
    newComponent += "<p class='compSmall compFiltro' align='justify'><b>Nombre de oferta:</b> " + item[5] + "</p>";
    newComponent += "<p class='compSmall compFiltro' align='justify'><b>Descripción:</b> " + item[6] + "</p>";
    newComponent += "<p class='compSmall compFiltro' align='justify'><b>Ubicación de oferta:</b> " + getFavoritoUbicacion(item) + "</p>";
    newComponent += "<p class='compSmall compFiltro' align='justify'><b>Esta oferta:</b> " + getFavoritoNoAplicaDiscapacidad(item) + "</p>";
    
    // Footer del Componente
    newComponent += "<div id='" + index + "' tabindex='-1' class='btn btn-primary btn-fav-oferta compSmall compFiltro'";
    newComponent += " aria-label='Ver detalles de la oferta número " + (index +1) + ". Botón'>Ver detalles</div></li>";
   
    return newComponent; // Retornando componente para la Lista
};

function isFiltrableFavoritoOferta(item, datoFiltro) {
    var arrayFiltro = datoFiltro.split(" "), index = 0, filtrable = false;
    while (!filtrable && (index < arrayFiltro.length )) {
        
        filtrable = applyFilterFavoritoOferta(item,arrayFiltro[index]);
        if (!filtrable) {index++;} // El dato no se filtra por lo Digitado
    }
    
    return filtrable; // Retornando el valor si es Filtrable
};

function applyFilterFavoritoOferta(item, patronFiltro) {
    if ((item[1].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Sector de Oferta
    
    if ((item[5].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Nombre de Oferta
    
    if ((item[2].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Entidad de Oferta
    
    if ((item[3].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Departamento de Oferta
    
    if ((item[4].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Municipio de Oferta
    
    if ((item[6].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Descripción de Oferta
    
    return false; // No hay como Filtrar
};

function getFavoritoCompartir(ofertaSelected) {
    var compartir = "Información compartida desde app móvil DiscApp\nOferta de " + typeOferta;
    compartir += "\nNombre de la Oferta: " + ofertaSelected[5] + "\n";
    compartir += "Descripcion de la Oferta: " + ofertaSelected[6] + "\n";
    compartir += "Dirección de la Oferta: " + getFavoritoDireccion(ofertaSelected[7]) + "\n";
    compartir += "Ubicación de la Oferta: " + ofertaSelected[4] + ", " + ofertaSelected[3];
    
    return compartir; // Retornar el Parrafo Compartir
};