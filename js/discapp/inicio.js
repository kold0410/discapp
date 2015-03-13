
jQuery(document).ready(function () {
    
    if (discApp.isDatosOfertasCargados()) {
        jQuery('#btnReload').hide(); // Ocultando boton de Navegación
        var reload = 'Toda la información de las ofertas, estan';
        reload += ' cargadas completamente en la aplicación';
        jQuery('#etiReload').html(reload);
    }
    
    jQuery('#btnReload').click(function () {
        discApp.setComponentFocus('divAlertOfertaPlan'); insertComponent('estadoDatos.html'); 
        discApp.adjustFontSizeClass('.compSmall');  discApp.posicionarContent(); 
        discApp.addBackPage('estadoDatos.html'); jQuery('body').animate({scrollTop: '0px'},100);
    });

    jQuery('#btnAcerca').click(function () {
        discApp.setComponentFocus('titleAcercaDe'); insertComponent('acerca-de.html'); 
        discApp.adjustFontSizeClass('.compSmall'); discApp.adjustFontSizeClass('.compBig');  
        discApp.posicionarContent(); discApp.addBackPage('acerca-de.html'); 
        jQuery('body').animate({scrollTop: '0px'},100);
    });
});