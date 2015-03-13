
jQuery(document).ready(function () {
    
    var widthContentApp = jQuery('#divLogoApp').innerWidth();
    var widthContentApoyo = jQuery('#divLogoApoyo').innerWidth();
    
    var processImage = new ProcessImage();
    processImage.calcularDimensiones(96,96,widthContentApp,96);
    
     jQuery("#logoApp").css({
         'width' : processImage.getWidth() + 'px',
         'height' : processImage.getHeigth() + 'px'
     });
    
    processImage.calcularDimensiones(700,576,widthContentApoyo,576);
    
     jQuery("#logoApoyo").css({
         'width' : processImage.getWidth() + 'px',
         'height' : processImage.getHeigth() + 'px'
     });
});