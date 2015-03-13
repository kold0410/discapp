
// URL de los DataSet de Ofertas

var urlPlan = 'http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Salud/servicsaludpcd1?$format=json';
var urlTrabajo = 'http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Salud/ofertainstpcd1?$filter=sector=%27Trabajo%27&$format=json';
var urlEducacion = 'http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Salud/ofertainstpcd1?$filter=sector=%27Educaci%C3%B3n%27&$format=json';
var urlSalud = 'http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Salud/ofertainstpcd1?$filter=sector=%27Salud%27&$top=3000&$format=json';

function success (typeOferta) {
    var mensajeAlert = message.alertOfertaSuccess(typeOferta);
    tools.processSuccess('alertCargando','divAlertCargando',mensajeAlert);
    jQuery('#btnOpen').show(); discApp.hideCargando(); jQuery('#btnOpen').focus();
};

function waiting (typeOferta) {
    var mensajeAlert = message.alertOfertaWaiting(typeOferta);
    tools.processWaiting('alertCargando','divAlertCargando',mensajeAlert);
};

function error (typeOferta) {
    var mensajeAlert = message.alertOfertaError(typeOferta);
    tools.processError('alertCargando','divAlertCargando',mensajeAlert);
};

var planSuccess = function () {
    success('plan obligatorio de salud');
};

var planError = function () {
    error('plan obligatorio de salud');
};

var trabajoSuccess = function () {
    success('trabajo');
};

var trabajoError = function () {
    error('trabajo');
};

var saludSuccess = function () {
    success('servicio de salud');
};

var saludError = function () {
    error('servicio de salud');
};

var educacionSuccess = function () {
    success('educación');
};

var educacionError = function () {
    error('educación');
};

jQuery(document).ready(function () {
    
    jQuery('#btnOpen').hide(); discApp.setInformacionCargandoDatos(discApp.getOfertaProcess());
    
    switch (discApp.getOfertaProcess()) {
        // Oferta del Plan Obligatorio
        case (0) :
            if (discApp.isPlanObligatorioCargando() === 1) {
                waiting('plan obligatorio de salud'); discApp.setStatusData(0,2);
                tools.cargarDatosOferta(urlPlan,0,planSuccess,planError);
            }
            
            else {
                if (discApp.isPlanObligatorioCargando() === 2) {
                    waiting('plan obligatorio de salud'); 
                }
                
                else if (discApp.isPlanObligatorioCargando() === 3) {
                    success('plan obligatorio de salud');
                }
            }
        break;
        
        // Oferta de Trabajo
        case (1) :
            if (discApp.isOfertasCargando() === 1) {
                waiting('trabajo'); discApp.setStatusData(1,2);
                tools.cargarDatosOferta(urlTrabajo,1,trabajoSuccess,trabajoError);
            }
            
            else {
                if (discApp.isOfertasCargando() === 2) {
                    waiting('trabajo'); 
                }
                
                else if (discApp.isOfertasCargando() === 3) {
                    success('trabajo');
                }
            }
        break;
        
        // Oferta de Salud
        case (2) :
            if (discApp.isOfertasCargando() === 1) {
                waiting('servicio de salud'); discApp.setStatusData(2,2);
                tools.cargarDatosOferta(urlSalud,2,saludSuccess,saludError);
            }
            
            else {
                if (discApp.isOfertasCargando() === 2) {
                    waiting('servicio de salud'); 
                }
                
                else if (discApp.isOfertasCargando() === 3) {
                    success('servicio de salud');
                }
            }
        break;
        
        // Oferta de Educación
        case (3) :
            if (discApp.isOfertasCargando() === 1) {
                waiting('educación'); discApp.setStatusData(3,2);
                tools.cargarDatosOferta(urlEducacion,3,educacionSuccess,educacionError);
            }
            
            else {
                if (discApp.isOfertasCargando() === 2) {
                    waiting('educación'); 
                }
                
                else if (discApp.isOfertasCargando() === 3) {
                    success('educación');
                }
            }
        break;
    };
    
    jQuery('#btnOpen').click(function () {
        discApp.setInformacionCargandoDatos(discApp.getOfertaProcess());
        discApp.showCargando(); jQuery('#cargando').focus();
        setTimeout('cargarDatosOfertaSeleccionada()',1000);
    });
});
    
function cargarDatosOfertaSeleccionada() {
    switch (discApp.getOfertaProcess()) {
        // Oferta del Plan Obligatorio
        case (0) :
            discApp.setComponentFocus('etiPlan'); insertComponent('servicsaludpcd.html'); 
            discApp.adjustFontSizeListForm();
        break;

        // Oferta del Trabajo
        case (1) :
            discApp.setTypeOferta('trabajo'); discApp.setComponentFocus('etiOferta'); 
            insertComponent('ofertainstpcd.html'); discApp.adjustFontSizeListForm();
        break;

        // Oferta del Salud
        case (2) :
            discApp.setTypeOferta('servicio de salud'); discApp.setComponentFocus('etiOferta'); 
            insertComponent('ofertainstpcd.html'); discApp.adjustFontSizeListForm();
        break;

        // Oferta del Educación
        case (3) :
            discApp.setTypeOferta('educación'); discApp.setComponentFocus('etiOferta'); 
            insertComponent('ofertainstpcd.html'); discApp.adjustFontSizeListForm();
        break;
    }
    
    discApp.hideCargando();
}