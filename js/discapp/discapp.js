
// Clase Discapp del Script discapp.js

function DiscApp() {
    
    // Metodos de la Clase DiscApp
    
    //<editor-fold defaultstate="collapsed" desc="'Atributos y Metodos para confuigurar Estado de Conexión de la Aplicación'">
    
    var statusConexion = navigator.onLine;
    
    // Este método nos permite obtener el estado de la conexión
    
    DiscApp.prototype.getConexion = function () {
        return statusConexion;
    };
    
    // Este método nos permite modificar el estado de la conexión
    
    DiscApp.prototype.setConexion = function (conexion) {
        statusConexion = conexion; // Estableciendo el estado
    };
    
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="'Atributos y Metodos para configurar y realizar Geolocalización en la Aplicación'">
    
    var address, geolocation;
    
    // Este método nos permite obtener destino
    
    DiscApp.prototype.getAddress = function () {
        return address;
    };
    
    // Este método nos permite cargar destino
    DiscApp.prototype.setAddress = function (ad) {
        address =  new google.maps.LatLng(); address = ad;
    };
    
    // Este método nos permite obtener Geolocalización
    DiscApp.prototype.getLocation = function () {
        return geolocation;
    };
    
    // Este método nos permite cargar Geolocalización
    DiscApp.prototype.setLocation = function (loc) {
        geolocation =  new google.maps.LatLng(); geolocation = loc;
    };
    
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="'Atributos y Metodos para configurar Tamaño de Fuentes en la Aplicación'">
    
    var sizeFont; // Tamaño de la Fuente
    //var listaClases = ['.btn','.h2px','.h4px','.hpx','.ppx','.labelpx','.form-control','.compSmall','.compMedium','.compBig'];
    var listaClases = ['.compSmallIndex','.compMediumIndex','.compBigIndex','.compSuperBigIndex','.compSmall','.compMedium','.compBig','.compSuperBig'];
    var listaClasesForm = ['.compSmall','.compMedium','.compBig','.compSuperBig'];
     
    // Este método nos permite cargar el valor del Tamaño de
    // la Fuente establecida por el Usuario en la Aplicación.
    
    DiscApp.prototype.loadFontSize = function () {
        if (localStorage.sizeFont) {
            sizeFont = localStorage.sizeFont;
        } // La variable 'sizeFont' existe en LocalStorage
        
        else {
            sizeFont = 0; localStorage.sizeFont = sizeFont;
        } // La variable 'sizeFont' no existe en LocalStorage
    };

    // Permite cambiar el tamaño de la Fuente en un porcentaje determinado.
    
    function changedFontSize(nameClass, percentage) {
        var sizeFont= jQuery(nameClass).css('font-size');
        var sizeActualValue = parseFloat(sizeFont,10);
        sizeFont = (sizeActualValue * percentage);
        
        jQuery(nameClass).css('font-size',sizeFont); // Nuevo Tamaño
    };
    
    // Permite aumentar el tamaño de la Fuente en un 10% de un componente,
    // donde este se referencia a traves de su clase.
    
    function increaseFontSize(nameClass) {
        changedFontSize(nameClass,1.1);
    }
    
    // Permite disminuir el tamaño de la Fuente en un 10% de un componente,
    // donde este se referencia a traves de su clase.
    
    function decreaseFontSize(nameClass) {
        changedFontSize(nameClass,0.90909);
    }
    
    // Permite ajustar el tamaño de la Fuente de un componente, a traves de
    // una resolución, donde este se referencia a traves de su clase.
    
    function adjustFontSize(nameClass, resolucion) {
        var porcentaje = 1.0; // Porcentaje inicial
        
        for (var index = 0; index < resolucion; index++) {
            porcentaje = porcentaje + (0.1 * porcentaje);
        } // Estableciendo Porcentaje de Incremento

        changedFontSize(nameClass,porcentaje); // Cambiando Fuente
    }
    
    // Permite aumentar el tamaño de la Fuente en un 10% de una lista de
    // componentes, donde estos se referencian a traves de su clase.
    
    DiscApp.prototype.increaseFontSizeList = function (lista) {
        for (var index = 0; index < lista.length; index++) {
            increaseFontSize(lista[index]);
        }
    };
    
    // Permite aumentar el tamaño de la Fuente en un 10% de una 
    // lista de componentes por defecto de la aplicacion, donde 
    // estos se referencian a traves de su clase.
    
    DiscApp.prototype.increaseFontSizeListDefault = function () {
        this.increaseFontSizeList(listaClases);
    };
    
    // Aumenta el Tamaño de la Fuente de un componente de la Aplicación.
    
    DiscApp.prototype.increaseFontSize = function () {
        if (sizeFont < 4) {
            this.increaseFontSizeListDefault();
            sizeFont++; localStorage.sizeFont = sizeFont;
        } // Puede aumentar el Tamaño de Fuente
    };
    
    // Permite disminuir el tamaño de la Fuente en un 10% de una lista
    // de componentes, donde estos se referencian a traves de su clase.
    
    DiscApp.prototype.decreaseFontSizeList = function (lista) {
        for (var index = 0; index < lista.length; index++) {
            decreaseFontSize(lista[index]);
        }
    };
    
    // Permite disminuir el tamaño de la Fuente en un 10% de una 
    // lista de componentes por defecto de la aplicacion, donde 
    // estos se referencian a traves de su clase.
    
    DiscApp.prototype.decreaseFontSizeListDefault = function () {
        this.decreaseFontSizeList(listaClases);
    };
    
    // Disminuye el Tamaño de la Fuente de la Aplicación
    
    DiscApp.prototype.decreaseFontSize = function () {
        if (sizeFont > 0) {
            this.decreaseFontSizeListDefault();
            sizeFont--; localStorage.sizeFont = sizeFont;
        } // Puede disminuir el Tamaño de Fuente
    };

    // Permite ajustar el tamaño de la Fuente de una lista de componentes, 
    // a traves de una resolución, donde estos se referencian a traves de 
    // su clase.
    
    DiscApp.prototype.adjustFontSizeList = function (lista, resolucion) {
        for (var index = 0; index < lista.length; index++) {
            adjustFontSize(lista[index],resolucion);
        }    
    };
    
    // Permite ajustar el tamaño de la Fuente de una lista de componentes 
    // pot defecto a traves de una resolución, donde estos se referencian 
    // a traves de su clase.
    
    DiscApp.prototype.adjustFontSizeListDefault = function (resolucion) {
        this.adjustFontSizeList(listaClases,resolucion);
    };
    
    // Permite ajustar el tamaño de la Fuente de una lista de componentes 
    // pot defecto a traves de una resolución, donde estos se referencian 
    // a traves de su clase.
    
    DiscApp.prototype.adjustFontSizeListForm = function () {
        this.adjustFontSizeList(listaClasesForm,sizeFont);
    };
    
    // Permite ajustar el tamaño de la Fuente de una lista de componentes 
    // pot defecto a traves de una resolución, donde estos se referencian 
    // a traves de su clase.
    
    DiscApp.prototype.adjustFontSizeDefault = function () {
        this.adjustFontSizeListDefault(sizeFont);
    };
    
    // Permite ajustar el tamaño de la Fuente de un componente, a traves de
    // una resolución, donde este se referencia a traves de su clase.
    
    DiscApp.prototype.adjustFontSizeClass = function (nameClass) {
        adjustFontSize(nameClass,sizeFont);
    };
    
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="'Atributos y Metodos para configurar Lista de Datos de la Aplicación'">
    
    var listaPlanObligatorio = new Array(), listaOfertas = new Array();
    var listaTrabajo = new Array(), listaSalud = new Array(), listaEducacion = new Array();
    
    var isPlan = 0, isTrabajo = 0, isSalud = 0, ofertaProceso;
    var isEducacion = 0, isOfertas = 0, typeOferta;
    
    // 
    
    DiscApp.prototype.setListaDeOfertas = function (type, lista) {
        switch (type) {
            case (0) :
                listaPlanObligatorio = lista; isPlan = 3;
            break;
            
            case (1) :
                listaTrabajo  = lista; isTrabajo = 3;
            break;
            
            case (2) :
                listaSalud = lista; isSalud = 3;
            break;
            
            case (3) :
                listaEducacion  = lista; isEducacion = 3;
            break;
        }
    };
    
    DiscApp.prototype.setStatusData = function (type, status) {
        switch (type) {
            case (0) :
                isPlan = status;
            break;
            
            case (1) :
                isTrabajo = status;
            break;
            
            case (2) :
                isSalud = status;
            break;
            
            case (3) :
                isEducacion = status;
            break;
        }
        
        ofertaProceso = type;
    };
    
    DiscApp.prototype.setInformacionCargandoDatos = function (type) {
        switch (type) {
            case (1) :
                listaOfertas = listaTrabajo; isOfertas = isTrabajo;
            break;
            
            case (2) :
                listaOfertas = listaSalud; isOfertas = isSalud;
            break;
            
            case (3) :
                listaOfertas = listaEducacion; isOfertas = isEducacion;
            break;
        }
    };
    
    DiscApp.prototype.getListaPlanObligatorio = function () {
        return listaPlanObligatorio;
    };
    
    DiscApp.prototype.isPlanObligatorioCargando = function () {
        return isPlan;
    };
    
    DiscApp.prototype.getListaDeOfertas = function () {
        return listaOfertas;
    };
    
    DiscApp.prototype.isOfertasCargando = function () {
        return isOfertas;
    };
    
    DiscApp.prototype.setTypeOferta = function (type) {
        typeOferta = type;
    };
    
    DiscApp.prototype.getTypeOferta = function () {
        return typeOferta;
    };    
    
    DiscApp.prototype.getOfertaProcess = function () {
        return ofertaProceso;
    };
    
    DiscApp.prototype.isDatosOfertasCargados = function () {
        var cargados = true; // Determina resultado
        
        cargados = cargados && (listaPlanObligatorio.length > 0);
        cargados = cargados && (listaSalud.length > 0);
        cargados = cargados && (listaTrabajo.length > 0);
        
        return cargados; // Retorna resultado de la Operación
    };
    
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="'Atributos y Metodos para ejecutar Funcionalidades en la Aplicación'">
    
    // Atributos.
    
    var componentFocus = "btnInicio";
    
    // Este método nos permite rediccionar aplicación a una Página deseada.
    
    DiscApp.prototype.setComponentFocus = function (component) {
        componentFocus = component;
    };
    
    DiscApp.prototype.setFocus = function (component) {
        component.focus();
    };
    
    // Este método nos permite insertar un HTML en un div.
    
    DiscApp.prototype.insertComponent = function (url, component) {
        jQuery.ajax({
            mimeType: 'text/html; charset=utf-8', 
            url: url,
            type: 'GET',
            dataType: "html",
            async: false,
            success: function (data) {
                jQuery('#' + component).html(data); jQuery('#' + componentFocus).focus();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    };
    
    // 
    
    DiscApp.prototype.eventClick = function (idComponent, event) {
        jQuery('#' + idComponent).click(event);
    };
    
    // Este metodo nos permite mostrar un mensaje del Sistema

    DiscApp.prototype.showMessage = function (message) {
        jQuery("#messageDialog").html(message); jQuery('#dialogMessage').modal('show');
        setTimeout("jQuery('#messageDialog').focus()",2000);
    };
    
    DiscApp.prototype.posicionarContent = function () {
        var heightHeader = jQuery('#header').innerHeight();
        var heightFooter = jQuery('#footerApp').innerHeight();
        
        jQuery("#content").css({
            'margin-top' : (heightHeader + 5)+ 'px',
            'margin-bottom' : (heightFooter + 10) + 'px',
            'display' : 'block'
        });
    };
    
    DiscApp.prototype.showCargando = function () {
        jQuery('#cargando').show(); jQuery('#titleDiscApp').hide();
    };
    
    DiscApp.prototype.hideCargando = function () {
        jQuery('#cargando').hide(); jQuery('#titleDiscApp').show();
    };
    
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="'Atributos y Metodos para ejecutar Evento de Android en la Aplicación'">
    
    var contadorPages = -1, arrayPages = ["","","",""], pageTemp = 'inicio.html';
    
    DiscApp.prototype.getBackPage = function () {
        return arrayPages[contadorPages];
    };
    
    DiscApp.prototype.getContadorPage = function () {
        return contadorPages;
    };
    
    DiscApp.prototype.decreaseContadorPage = function () {
        contadorPages--;
    };
    
    DiscApp.prototype.addBackPage = function (backPage) {
        if (contadorPages < 3) {
            contadorPages++; arrayPages[contadorPages] = pageTemp; pageTemp = backPage;
        } // No ha llegado el numero Máximo de Páginas
        
        else {
            arrayPages[0] = arrayPages[1]; arrayPages[1] = arrayPages[2]; 
            arrayPages[2] = arrayPages[3]; arrayPages[3] = pageTemp; pageTemp = backPage;
        } // Alcanzó el numero Máximo de Páginas
    };
    
    //</editor-fold>
};