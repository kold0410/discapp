
jQuery(document).ready(function () {
    
    // Cargando Favoritos de las Ofertas
    agenda.loadFavoritesListPOS(); agenda.loadFavoritesList();
    
    jQuery('#btnFavPlan').click(function () {
        discApp.showCargando(); setTimeout('loadFavoritosPlan()',500);
    });
    
    jQuery('#btnFavOfertas').click(function () {
        discApp.showCargando(); setTimeout('loadFavoritosOferta()',500);
    });
});

function loadFavoritosPlan() {
    discApp.setComponentFocus('etiFavPlan'); 
    insertComponent('favoritosPlan.html'); discApp.adjustFontSizeListForm(); 
    jQuery('body').animate({scrollTop: '0px'},100); discApp.hideCargando();
};

function loadFavoritosOferta() {
    discApp.setComponentFocus('etiFavOferta'); 
    insertComponent('favoritosOfertas.html'); discApp.adjustFontSizeListForm(); 
    jQuery('body').animate({scrollTop: '0px'},100); discApp.hideCargando();
};