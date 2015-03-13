
// Atributos dinamicos de la Página
var listaFavPlan = [], listaFiltroFavPlan = [], indexFavPlan = [];

jQuery(document).ready(function () {
    jQuery('#btnCompletaFavPlan').hide(); var index;
    
    function successDeleteFavoriteSupplyPOS () {
        limpiarListaFavoritoPOS(); listaFavPlan.splice(indexFavPlan[index],1);
        listaFiltroFavPlan = listaFavPlan; indexFavPlan = [];
        
        for (var i = 0; i < listaFavPlan.length; i++) { indexFavPlan.push(i); } /*Cargando index de la Lista Completa*/
        
        cargarFavoritoPOS(listaFiltroFavPlan); jQuery('#btnCompletaFavPlan').hide(); /* Ocultando Boton */
        discApp.showMessage('La oferta favorita fue removida de la lista correctamente');
    };
    
    if (!formControl.isOpenFavoritosPlan()) {
        formControl.openFavoritosPlan(); // Abrio Formulario de Favoritos
        
        jQuery(document).on('click','.btn-rev-plan', function () {
            focusComponent = jQuery('#etiNumberPlanFav'); 
            index = (String(jQuery(this).attr('id'))).substring(1); 
            var planSelected =  listaFiltroFavPlan[index];
            agenda.deleteFavoriteSupplyPOS(planSelected[0],successDeleteFavoriteSupplyPOS);
        });
        
        jQuery(document).on('click','.btn-comp-fav-plan', function () {
            index = (String(jQuery(this).attr('id'))).substring(1); 
            var planSelected =  listaOfertasFiltro[index];
            window.plugins.socialsharing.share(getFavoritoCompartirPOS(planSelected),'Oferta enviada desde DiscApp');
        });
    }
    
    jQuery("#btnFiltroFavPlan").click(function () {
        aplicarFiltroFavoritoPOS(jQuery("#txtFiltroFavPlan").val().trim()); 
    });

    jQuery("#btnCompletaFavPlan").click(function () {
        jQuery('#txtFiltroFavPlan').val(''); limpiarListaFavoritoPOS(); cargarFavoritoPOS(listaFavPlan);
        listaFiltroFavPlan = listaFavPlan; jQuery('#btnCompletaFavPlan').hide();
    });
    
    listaFavPlan = agenda.getFavoritesListPOS(); listaFiltroFavPlan = listaFavPlan;
    
    for (var index = 0; index < listaFavPlan.length; index++) {
        indexFavPlan.push(index);
    } // Cargando index de la Lista Completa
    
    cargarFavoritoPOS(listaFavPlan);
    
    $("#txtFiltroFavPlan").focusin(function() {
        jQuery("#footerApp").hide();
    });
    
    $("#txtFiltroFavPlan").focusout(function() {
        jQuery("#footerApp").show();
    });
});

// Nos permite aplicar el Filtro al DataSet en el Formulario 
function aplicarFiltroFavoritoPOS(patronFiltro) {
    indexFavPlan = []; // Index de Listado General de Favoritos
    
    if (patronFiltro.length !== 0) {
        limpiarListaFavoritoPOS(); // Limpiamos la Lista

        patronFiltro = patronFiltro.toUpperCase();

        for (var index = 0; index < listaFavPlan.length; index++) {
            if (isFiltrableFavoritoOfertaPOS(listaFavPlan[index],patronFiltro)) {
                listaFiltroFavPlan.push(listaFavPlan[index]);
                indexFavPlan.push(index);
            }
        }

        if (listaFiltroFavPlan.length === 0) {
            jQuery("#etiDataFiltro").html(message.datosCargados(0,listaFavPlan.length));
            discApp.showMessage(message.sinOfertasPorFiltro());
        } // No se encontraron Ofertas con patrón Digitado

        else {
            cargarFavoritoPOS(listaFiltroFavPlan); jQuery('#etiNumberPlanFav').focus();
        }
        
        jQuery('#btnCompletaFavPlan').show();
    } // Se ha digitado Datos para realizar Filtro
    
    else {
        discApp.showMessage(message.sinDatosFiltro());
    } // No se ha digitado Datos para realizar Filtro
};

// Permite Limpiar la Lista del Formulario
function limpiarListaFavoritoPOS() {
    jQuery("#listaFavPlan").empty(); listaFiltroFavPlan = [];
};

// Cargando datos del DataSet en la Lista del Formulario
function cargarFavoritoPOS(listaDatos) {
    for (var index = 0; index < listaDatos.length; index++) {
        var item = listaDatos[index]; // Cargando elemento de la Lista
        jQuery("#listaFavPlan").append(crearComponentFavoritoPOS(item,index));
    } // Insertando componentes en la Lista
    
    jQuery("#etiNumberPlanFav").html(message.datosCargados(listaDatos.length,listaFavPlan.length)); 
    discApp.adjustFontSizeClass('.compFiltro');
};

function getFavoritoCompartirPOS(item) {
    var compartir = 'Esta oferta fue compartida desde app móvil DiscApp';
    compartir += '\nLa oferta pertenece al Plan Obligatorio de Salud\n';
    compartir += 'Grupo de Servicio: ' + item[3] + '\nServicio: ' + item[4]; 
    
    return compartir; // Retornando el Mensaje a Compatir
};

function crearComponentFavoritoPOS(item, index) {
    var isPOS; // Variable que determina el tipo de Oferta
    
    if (item[2] === 'S') {
        isPOS = 'Esta oferta: pertenece al plan obligatorio de salud';
    }
    
    else {
        isPOS = 'Esta oferta: no pertenece al plan obligatorio de salud';
    }

    // Diseñando componente panel para mostrar Ofertas
    var newComponent = "<li class='list-group-item liRemove'><h2 class='compSmall compFiltro'>";
    
    // Header del Panel
    newComponent += "<b>Identificador de oferta de Salud: " + (index + 1) + "</b></h2></li>";
    
    // Body del Panel
    newComponent += "<li value='" + index + "' class='list-group-item liRemove'>";
    newComponent += "<p class='compSmall compFiltro' align='justify'>" + isPOS + "</p>";
    newComponent += "<p class='compSmall compFiltro' align='justify'><b>Servicio:</b> " + item[4] + "</p>";
    newComponent += "<p class='compSmall compFiltro' align='justify'><b>Grupo de servicios:</b> " + item[3] + "</p>";
    newComponent += "<p class='compSmall compFiltro' align='justify'><b>Descripción:</b> " + item[5] + "</p>";
    
    //  Footer del Componente
    newComponent += "<div class='btn-group btn-group-justified'>";
    newComponent += "<div id='r" + index + "' tabindex='-1' class='btn btn-primary btn-group";
    newComponent += " btn-rev-plan compSmall compFiltro' aria-label='Remover la oferta";
    newComponent += " número " + (index + 1) + " de favoritos. Botón'>Remover favorito</div>";
    newComponent += "<div id='c" + index + "' class='btn btn-primary btn-group btn-comp-fav";
    newComponent += "-plan compSmall compFiltro' aria-label='Compartir la oferta favorita";
    newComponent += " número " + (index + 1) + ". Botón'>Compartir oferta</div></li>";
    
    return newComponent; // Retornando componente para la Lista
};

function isFiltrableFavoritoOfertaPOS(item, datoFiltro) {
    var arrayFiltro = datoFiltro.split(" "), index = 0, filtrable = false;
    
    while (!filtrable && (index < arrayFiltro.length )) {
        filtrable = applyFilterFavoritoOfertaPOS(item,arrayFiltro[index]);
        if (!filtrable) {index++;} // El dato no se filtra por lo Digitado
    }
    
    return filtrable; // Retornando el valor si es Filtrable
};

function applyFilterFavoritoOfertaPOS(item, patronFiltro) {
    if ((item[3].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Nombre de Oferta
    
    if ((item[4].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Entidad de Oferta
    
    if ((item[5].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Departamento de Oferta
    
    return false; // No hay como Filtrar
};