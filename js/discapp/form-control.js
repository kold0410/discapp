
function FormControl () {
    
    var openFavPlan = false, openFav = false;
    var openOfertas = false, openFavOfertas = false;
    
    // Metodos de la clase FormControl
    
    FormControl.prototype.openPlanObligatorio = function () {
        openFav = true;
    };
    
    FormControl.prototype.isOpenPlanObligatorio = function () {
        return openFav;
    };
    
    FormControl.prototype.openFavoritosPlan = function () {
        openFavPlan = true;
    };
    
    FormControl.prototype.isOpenFavoritosPlan = function () {
        return openFavPlan;
    };
    
    FormControl.prototype.openFavoritosOfertas = function () {
        openFavOfertas = true;
    };
    
    FormControl.prototype.isOpenFavoritosOfertas = function () {
        return openFavOfertas;
    };
    
    FormControl.prototype.openListaOfertas = function () {
        openOfertas = true;
    };
    
    FormControl.prototype.isOpenListaOfertas = function () {
        return openOfertas;
    };
};