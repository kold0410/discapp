
jQuery(document).ready(function () {
    
    // Establecer eventos de Botones de las Ofertas
    
    jQuery('#btnPlan').click(function () {
        discApp.showCargando(); jQuery('#cargando').focus(); setTimeout('cargarDatosPOS()',1000);
    });
    
    jQuery('#btnTrabajo').click(function () {
        discApp.showCargando(); jQuery('#cargando').focus(); setTimeout('cargarDatosEmpleo()',1000);
    });
    
    jQuery('#btnSalud').click(function () {
        discApp.showCargando(); jQuery('#cargando').focus(); setTimeout('cargarDatosSalud()',1000);
    });
    
    jQuery('#btnEducacion').click(function () {
        discApp.showCargando(); jQuery('#cargando').focus(); setTimeout('cargarDatosEducacion()',1000);
    });
});
    
function cargarDatosOfertas(tipoOferta, nameOferta) {
    discApp.setInformacionCargandoDatos(tipoOferta);

    if (discApp.getListaDeOfertas().length > 0) {
        discApp.setTypeOferta(nameOferta); discApp.setComponentFocus('etiOferta'); 
        insertComponent('ofertainstpcd.html'); 
        discApp.adjustFontSizeListForm(); discApp.hideCargando();
        jQuery('body').animate({scrollTop: '0px'},100); 
    } // Han cargado Correctamente Trabajo

    else {
        if (discApp.getConexion()) {
            discApp.setStatusData(tipoOferta,1); discApp.setComponentFocus('divAlertCargando');
            insertComponent('cargarDatos.html'); discApp.adjustFontSizeListForm(); 
        } // Existe una conexión a Internet
        
        else {
            discApp.hideCargando(); discApp.showMessage(message.offline(nameOferta));
        } // No existe una conexión a Internet
    }
};

function cargarDatosSalud() {
    cargarDatosOfertas(2,'servicio de salud');
};

function cargarDatosEmpleo() {
    cargarDatosOfertas(1,'trabajo');
};

function cargarDatosEducacion() {
    cargarDatosOfertas(3,'educación');
};

function cargarDatosPOS() {
    if (discApp.getListaPlanObligatorio().length > 0) {
        discApp.setComponentFocus('etiPlan'); insertComponent('servicsaludpcd.html');
        discApp.adjustFontSizeListForm(); jQuery('body').animate({scrollTop: '0px'},100); 
        discApp.hideCargando(); 
    }// Han cargado Correctamente Plan Obligatorio

    else {
        if (discApp.getConexion()) {
            discApp.setStatusData(0,1); discApp.setComponentFocus('divAlertCargando');
            insertComponent('cargarDatos.html'); discApp.adjustFontSizeListForm(); 
        } // Existe una conexión a Internet

        else {
            discApp.hideCargando(); discApp.showMessage(message.offline("Plan Obligatorio de Salud"));
        } // No existe una conexión a Internet
    } // Vamos a cargar los Datos de Internet
}