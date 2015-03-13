
var mapa = new geocode();

function geocode() {
    
    var result;
    
    var rendererOptions = {
      draggable: false
    };
    
    var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    var directionsService = new google.maps.DirectionsService();
    var lat, lng, geocoder, map, marker, infowindow;
    geocode.prototype.getResult = function () {
        return result;
    };
    
    geocode.prototype.initialize = function () {
        jQuery('#footerApp').hide();
        map = null; var address = discApp.getAddress();
        console.log(address);
        var mapOptions = {
            zoom: 15,
            center: address,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        //map.setCenter(address); mapa.geolocalizar();
        infowindow = new google.maps.InfoWindow({
            content: 'Georeferenciación de la oferta'
        });
        marker  = new google.maps.Marker({
            position: address,
            map: map,
            content: 'Georeferenciación de la oferta',
            animation: google.maps.Animation.DROP
        });
        //infowindow.open(map, marker);
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
        discApp.hideCargando();
    };

    geocode.prototype.geolocalizar = function() {
        navigator.geolocation.getCurrentPosition(CoordenadasGPS,geoError);
    };

    var CoordenadasGPS = function (position) {
        lat = position.coords.latitude; lng = position.coords.longitude;
        ini = new google.maps.LatLng(lat,lng);
        console.log("Coordenadas: " + ini); discApp.setLocation(ini);
        calcRoute(discApp.getLocation(), discApp.getAddress());
    };

    var geoError = function (PositionError) {
        console.log(PositionError.message); return null;
    };

    geocode.prototype.insertar = function (address) {
        geocoder = new google.maps.Geocoder(); var location;
        geocoder.geocode({'address' : address}, function (results, status) {
            location= results[0].geometry.location;
            if (status === google.maps.GeocoderStatus.OK) {
                discApp.setAddress(location); console.log(address + "=" + location);
            }
            
            else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    };
    
    var calcRoute = function (origin, destination) {
        console.log("Trazando ruta desde: " + origin); console.log("hasta: " + destination);
        
        var request = {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true
        };
        
        directionsService.route(request, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(map);
                directionsDisplay.setPanel(document.getElementById('panel'));
                marker.setMap(null); infowindow.setMap(null);
                console.log("Ruta trazada"); result = true;
            }
            
            else{
                console.log("Error al trazar ruta"); result = false;
                discApp.showMessage('No se pudo realizar georeferenciación de la oferta');
                jQuery('#panelError').show(); jQuery('#map').hide(); 
            }
            
            jQuery('#btnRutas').html('Describir ruta'); jQuery('#footerApp').hide();
            discApp.hideCargando(); jQuery('#btnBack').focus();
        });
    };
}