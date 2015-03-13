
// Atributos dinamicos de la Página
var listaOfertas = [], listaOfertasFiltro = [];

jQuery(document).ready(function () {
    jQuery('#btnCompletaPlan').hide(); jQuery('#etiPlan').focus();
    
    if (!formControl.isOpenPlanObligatorio()) {
        formControl.openPlanObligatorio(); // Abrio Formulario de Plan
        
        jQuery(document).on('click','.btn-fav-plan', function () {
            focusComponent = this; /* Componente a enfocar */
            agenda.insertPOS(listaOfertasFiltro[(String(jQuery(this).attr('id'))).substring(1)]);
        });
        
        jQuery(document).on('click','.btn-comp-plan', function () {
            var planSelected =  listaOfertasFiltro[(String(jQuery(this).attr('id'))).substring(1)];
            window.plugins.socialsharing.share(getCompartirPOS(planSelected),'Oferta enviada desde DiscApp');
        });
    }

    jQuery("#btnFiltroPlan").click(function () {
        aplicarFiltroPOS(jQuery("#txtFiltroPlan").val().trim()); 
    });

    jQuery("#btnCompletaPlan").click(function () {
        jQuery('#txtFiltroPlan').val(''); limpiarListaPOS(); cargarOfertasPOS(listaOfertas);
        listaOfertasFiltro = listaOfertas; jQuery('#btnCompletaPlan').hide();
    });
    
    listaOfertas = discApp.getListaPlanObligatorio();
    listaOfertasFiltro = listaOfertas; cargarOfertasPOS(listaOfertas);
    
    $("#txtFiltroPlan").focusin(function() {
        jQuery("#footerApp").hide();
    });
    
    $("#txtFiltroPlan").focusout(function() {
        jQuery("#footerApp").show();
    });
});

// Nos permite aplicar el Filtro al DataSet en el Formulario 
function aplicarFiltroPOS(patronFiltro) {
    if (patronFiltro.length !== 0) {
        limpiarListaPOS(); // Limpiamos la Lista
        patronFiltro = patronFiltro.toUpperCase();

        for (var index = 0; index < listaOfertas.length; index++) {
            if (isFiltrableOfertaPOS(listaOfertas[index],patronFiltro)) {
                listaOfertasFiltro.push(listaOfertas[index]);
            }
        }

        if (listaOfertasFiltro.length === 0) {
            jQuery("#etiNumberPlan").html(message.datosCargados(0,listaOfertas.length));
            discApp.showMessage(message.sinOfertasPorFiltro());
        } // No se encontraron Ofertas con patrón Digitado

        else {
            cargarOfertasPOS(listaOfertasFiltro); jQuery('#etiNumberPlan').focus();
        }
        
        jQuery('#btnCompletaPlan').show();
    } // Se ha digitado Datos para realizar Filtro
    
    else {
        discApp.showMessage(message.sinDatosFiltro());
    } // No se ha digitado Datos para realizar Filtro
};

// Permite Limpiar la Lista del Formulario
function limpiarListaPOS() {
    jQuery("#listaPlan").empty(); listaOfertasFiltro = [];
};

// Cargando datos del DataSet en la Lista del Formulario
function cargarOfertasPOS(listaDatos) {
    for (var index = 0; index < listaDatos.length; index++) {
        var item = listaDatos[index]; // Cargando elemento de la Lista
        jQuery("#listaPlan").append(crearComponentPOS(item,index));
    } // Insertando componentes en la Lista
    
    jQuery("#etiNumberPlan").html(message.datosCargados(listaDatos.length,listaOfertas.length)); 
    discApp.adjustFontSizeClass('.compFiltro');
};

function getCompartirPOS(item) {
    var compartir = 'Esta oferta fue compartida desde app móvil DiscApp';
    compartir += '\nLa oferta pertenece al Plan Obligatorio de Salud\n';
    compartir += 'Grupo de Servicio: ' + item.gruposervicios + '\nServicio: ' + item.servicio; 
    
    return compartir; // Retornando el Mensaje a Compatir
};

function crearComponentPOS(item, index) {
    var isPOS; // Variable que determina el tipo de Oferta
    
    if (item.incluidopos === 'S') {
        isPOS = 'La oferta: pertenece al Plan Obligatorio de Salud';
    }
    
    else {
        isPOS = 'La oferta: no pertenece al Plan Obligatorio de Salud';
    }

    // Diseñando componente panel para mostrar Ofertas
    var newComponent = "<li class='list-group-item liRemove'><h2 class='compSmall compFiltro'>";
    
    // Header del Panel
    newComponent += "<b>Identificador de oferta de Salud: " + (index + 1) + "</b></h2></li>";
    
    // Body del Panel
    newComponent += "<li value='" + index + "' class='list-group-item liRemove'>";
    newComponent += "<p class='compSmall compFiltro' align='justify'>" + isPOS + "</p>";
    newComponent += "<p class='compSmall compFiltro' align='justify'><b>Servicio:</b> " + item.servicio + "</p>";
    newComponent += "<p class='compSmall compFiltro' align='justify'><b>Grupo de servicios</b>: " + item.gruposervicios + "</p>";
    newComponent += "<p class='compSmall compFiltro' align='justify'><b>Descripción:</b> " + item.descripcion + "</p>";
    
    //  Footer del Componente
    newComponent += "<div class='btn-group btn-group-justified'>";
    newComponent += "<div id='a" + index + "' tabindex='-1' class='btn btn-primary btn-group";
    newComponent += " btn-fav-plan compSmall compFiltro' aria-label='Agregar la oferta";
    newComponent += " número " + (index + 1) + " a favoritos. Botón'>Agregar a favoritos</div>";
    newComponent += "<div id='c" + index + "' class='btn btn-primary btn-group btn-comp-plan";
    newComponent += " compSmall compFiltro' aria-label='Compartir oferta";
    newComponent += " número " + (index + 1) + ". Botón'>Compartir oferta</div></li>";
    
    return newComponent; // Retornando componente para la Lista
};

function isFiltrableOfertaPOS(item, datoFiltro) {
    var arrayFiltro = datoFiltro.split(" "), index = 0, filtrable = false;
    
    while (!filtrable && (index < arrayFiltro.length )) {
        filtrable = applyFilterOfertaPOS(item,arrayFiltro[index]);
        if (!filtrable) {index++;} // El dato no se filtra por lo Digitado
    }
    
    return filtrable; // Retornando el valor si es Filtrable
};

function applyFilterOfertaPOS(item, patronFiltro) {
    if ((item.gruposervicios.toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Nombre de Oferta
    
    if ((item.servicio.toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Entidad de Oferta
    
    if ((item.descripcion.toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Departamento de Oferta
    
    return false; // No hay como Filtrar
};