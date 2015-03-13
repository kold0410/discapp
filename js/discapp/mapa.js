
var trazoRuta = false; // Dato para controlar el ingreso al Mapa

jQuery(document).ready(function() {
    configurarComponent(); mapa.initialize(); 
    
    jQuery('#btnRutas').click(function () {
        if (!trazoRuta) {
            trazoRuta = true; discApp.showCargando(); 
            jQuery('#cargando').focus(); setTimeout('eventComoLlegar()',1000);
        }
        
        else {
            if (mapa.getResult()) {
                if (jQuery('#panel').hasClass('panelCollect')) {
                    jQuery('#panel').addClass('panelExtend');
                    jQuery('#panel').removeClass('panelCollect');
                    jQuery(this).attr('aria-label','Presionar botón para visualizar la ruta en el mapa');
                    jQuery(this).html('Mostrar mapa'); return;
                }

                if (jQuery('#panel').hasClass('panelExtend')) {
                    jQuery('#panel').addClass('panelCollect');
                    jQuery('#panel').removeClass('panelExtend');
                    jQuery(this).attr('aria-label','Presionar botón para describir la ruta de la oferta');
                    jQuery(this).html('Describir ruta'); return;
                }
            } // Se ha establecido ruta Correctamente
        }
    });
    
    jQuery('#btnBack').click(function () {
        isMapEnabled = false; discApp.showCargando(); setTimeout('eventBack()',1000);
    });
    
    function configurarComponent() {
        var heightComponent = window.innerHeight;
        heightComponent = heightComponent - jQuery('#header').innerHeight();
        heightComponent = heightComponent - jQuery('#footerMap').innerHeight() -10;
        var widthContent = jQuery('#content').innerWidth(), property = '100%';

        // Configurando Alto de los Componentes del Mapa
        jQuery(".content-map").css({'height' : (heightComponent) + 'px'});
        jQuery("#map").css({'height' : (heightComponent) + 'px'});
        
        // Configurando Ancho del Descriptor de Rutas
        if (widthContent > 350) {property = '350px';}
        jQuery("#panel").css({'width' : property});
        
        // Configurando Dimensiones de la Imagen
        var processImage = new ProcessImage();
        heightComponent = heightComponent - jQuery('#titleError').innerHeight();
        processImage.calcularDimensiones(400,256,widthContent,heightComponent);
         jQuery("#imagenError").css({
             'width' : processImage.getWidth() + 'px',
             'height' : processImage.getHeigth() + 'px'
         });
    };
});

function eventBack() {
    jQuery('#index-content').show(); jQuery('#mapa-content').hide(); jQuery('#footerApp').show(); 
    jQuery('#footerMap').hide(); jQuery('#groupOne').show(); jQuery('#groupTwo').show(); 
    discApp.posicionarContent(); discApp.hideCargando(); discApp.setFocus(focusComponent);
    jQuery('body').animate({scrollTop: posicionBody + 'px'},100);
}

function eventComoLlegar() {
    mapa.geolocalizar(); 
}