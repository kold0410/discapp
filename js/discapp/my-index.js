
// Atributos del Script index.js

var discApp = new DiscApp(), tools = new IndexTools();
var message = new Message(), agenda = new Agenda();
var formControl = new FormControl(), posicionBody;
var isMapEnabled = false, libraryMaps = false, focusComponent;

// Maneja el evento del botón "Atrás"
function onBackKeyDown() {
    if (discApp.getContadorPage() < 0) {
        if (discApp.getContadorPage() === -1) {
            insertComponent('inicio.html'); jQuery('#footerApp').show();
            discApp.adjustFontSizeListForm(); discApp.decreaseContadorPage();
            jQuery('#index-content').show(); jQuery('#mapa-content').hide();
            jQuery('#groupOne').show(); jQuery('#groupTwo').show(); discApp.posicionarContent(); 
            discApp.hideCargando(); 
        } // Insertando página de Inicio
        
        else {
            navigator.app.exitApp();
        } // Saliendo de Aplicación
    }
    
    else {
        insertComponent(discApp.getBackPage()); jQuery('#footerApp').show(); 
        discApp.adjustFontSizeListForm(); discApp.decreaseContadorPage();
        jQuery('#index-content').show(); jQuery('#mapa-content').hide();
        jQuery('#groupOne').show(); jQuery('#groupTwo').show(); discApp.posicionarContent(); 
        discApp.hideCargando(); 
    } // Retornando a Página anterior
}

jQuery(document).ready(function () {
    // Cargando Pagina de Inicio en la Aplicación
    insertComponent('inicio.html'); agenda.initDatabaseDiscApp(); 
    
    // Configurando Fuente de la Aplicación
    discApp.loadFontSize(); discApp.adjustFontSizeDefault(); discApp.posicionarContent();
    
    // Establecer eventos de Botones del Header
    discApp.eventClick('btnInicio',cargarFormularioInicio);
    discApp.eventClick('btnOfertas',cargarFormularioOfertas);
    discApp.eventClick('btnFavoritos', cargarFormularioFavoritos);
    discApp.eventClick('btnAyuda', cargarFormularioAyuda);
    
    //Establecer eventos de Botones del Modal
    discApp.eventClick('btnMapaOferta',cargarMapaOferta);
    discApp.eventClick('btnCloseOferta',cerrarDetailsOfertas);
    
    // Establecer eventos de Botones del Footer
    discApp.eventClick('btnAumentarFont',increaseFontSize);
    discApp.eventClick('btnDisminuirFont',decreaseFontSize);
    
    jQuery('#btnCloseAlert').click(function () {
        jQuery('#dialogMessage').modal('hide'); setTimeout('focusComponentPage()',1000);
    });
    
    jQuery("#titleDiscApp").focus(); // Enfocando primer elemento de la Página
    
    //Establece los eventos de conexión de la Aplicación
    document.addEventListener('backbutton',onBackKeyDown,false);
    document.addEventListener("online",onOnline,false); 
    document.addEventListener("offline",onOffline,false);  
});

// Eventos de la clase Index

var decreaseFontSize =  function () {
    discApp.decreaseFontSize(); discApp.posicionarContent();
};

var increaseFontSize = function () {
    discApp.increaseFontSize(); discApp.posicionarContent();
};

var cargarFormularioInicio = function () {
    discApp.setComponentFocus('nameApp'); insertComponent('inicio.html');  
    jQuery('#footerApp').show(); discApp.adjustFontSizeListForm(); 
    discApp.addBackPage('inicio.html'); discApp.posicionarContent(); 
    jQuery('#detail-content').hide(); jQuery('#index-content').show();
    jQuery('body').animate({scrollTop: '0px'},100);
};

var cargarFormularioOfertas = function () {
    discApp.setComponentFocus('btnPlan'); insertComponent('selectorOfertas.html'); 
    jQuery('#footerApp').show(); discApp.adjustFontSizeListForm(); 
    discApp.addBackPage('selectorOfertas.html'); discApp.posicionarContent(); 
    jQuery('#detail-content').hide(); jQuery('#index-content').show();
    jQuery('body').animate({scrollTop: '0px'},100);
};

var cargarFormularioFavoritos = function () {
    discApp.setComponentFocus('btnFavPlan'); insertComponent('favoritos.html'); 
    jQuery('#footerApp').show(); discApp.adjustFontSizeListForm(); 
    discApp.addBackPage('favoritos.html'); discApp.posicionarContent(); 
    jQuery('#detail-content').hide(); jQuery('#index-content').show();
    jQuery('body').animate({scrollTop: '0px'},100);
};

var cargarFormularioAyuda = function () {
    discApp.setComponentFocus('nameApp'); insertComponent('ayuda.html'); 
    jQuery('#footerApp').show(); discApp.adjustFontSizeListForm(); 
    discApp.posicionarContent(); discApp.addBackPage('ayuda.html'); 
    jQuery('#detail-content').hide();  jQuery('#index-content').show(); 
    jQuery('body').animate({scrollTop: '0px'},100);
};

var cargarMapaOferta = function () {
    if (discApp.getConexion()) {
            jQuery('#dialogOferta').modal('hide'); setTimeout('configurateProcesoMapa()',1000);
    } // Existe conexión a Internet
    
    else {
        jQuery('#dialogOferta').modal('hide'); discApp.showMessage(message.offlineMapa());
    } // No existe conexión a Internet
};

var cerrarDetailsOfertas = function () {
    jQuery('#dialogOferta').modal('hide'); jQuery(focusComponent).focus();
    discApp.posicionarContent();  jQuery('body').animate({scrollTop: posicionBody + 'px'},100);
};

// Metodos del Script index.js

function insertComponent(url) {
    jQuery('#content-component').remove(); discApp.insertComponent(url,'index-content'); 
};

function focusComponentPage() {
    if (!isMapEnabled) {
        discApp.setFocus(focusComponent);
    }
    
    else {
        jQuery('#btnBack').focus();
    }
};

function configurateProcesoMapa() {
    discApp.showCargando(); jQuery('#index-content').hide(); isMapEnabled = true;
    jQuery('#mapa-content').show(); jQuery('#groupOne').hide(); 
    jQuery('#groupTwo').hide(); discApp.setComponentFocus('btnBack'); 
    discApp.insertComponent('mapa.html','mapa-content'); 
    discApp.adjustFontSizeClass('.compMapSmall'); discApp.posicionarContent();
}

function onOffline() {
    discApp.setConexion(false); discApp.showMessage(message.appOffline());
}

function onOnline() {
    discApp.setConexion(true); //discApp.showMessage(message.appOnline());
}