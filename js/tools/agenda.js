
var dataBase = window.openDatabase("DiscappDB", "1.0", "Base de datos Discaap", 5*1024*1024);

function Agenda() {
    
    var result; favoritosPlan = []; favoritosOfertas = [];
    var tablaOfertas = 'FAVORITOS_OFERTAS', tablaPlan = 'FAVORITOS_PLAN';
    
    function successCreateTables() {
        console.log('Se creo tabla con exito!'); 
    };
    
    function errorCreateTables() {
        console.log('No se creo tabla, posiblemente ya existe!'); 
    };
    
    Agenda.prototype.initDatabaseDiscApp = function() {
//        var sentenceTableOferta = 'DROP TABLE ' + tablaOfertas + ';';
//        var sentenceTablePlan = ' DROP TABLE ' + tablaPlan + ';';
        
        var sentenceTableOferta = 'CREATE TABLE IF NOT EXISTS ' + tablaOfertas + ' (' + /* Tabla Ofertas */
                'RowKey PRIMARY KEY,' + /* Index : 0 */
                'sector TEXT NOT NULL,' + /* Index : 1 */
                'entidadoferta TEXT NOT NULL,' + /* Index : 2 */
                'nombredepartamento TEXT NOT NULL,' + /* Index : 3 */
                'nombremunicipio TEXT NOT NULL,' + /* Index : 4 */
                'nombreoferta TEXT NOT NULL,' + /* Index : 5 */
                'descripcionoferta TEXT NOT NULL,' + /* Index : 6 */
                'direccion TEXT NOT NULL,' + /* Index : 7 */
                'horarioatencion TEXT NOT NULL,' + /* Index : 8 */
                'requisitos TEXT NOT NULL,' + /* Index : 9 */
                'discapacidad TEXT NOT NULL,' + /* Index : 10 */
                'vigenciadese TEXT NOT NULL,' + /* Index : 11 */
                'vigenciahasta TEXT NOT NULL,' + /* Index : 12 */
                'nombrecontacto TEXT NOT NULL,' + /* Index : 13 */
                'cargocontacto TEXT NOT NULL,' + /* Index : 14 */
                'celularcontacto TEXT NOT NULL,' + /* Index : 15 */
                'correoelectronico TEXT NOT NULL,' + /* Index : 16 */
                'telefono1contacto TEXT NOT NULL,' + /* Index : 17 */
                'telefono2contacto TEXT NOT NULL,' + /* Index : 18 */
                'estado TEXT NOT NULL);';
                
        var sentenceTablePlan = 'CREATE TABLE IF NOT EXISTS ' + tablaPlan + ' (' + /* Tabla POS */
                'RowKey PRIMARY KEY,' + /* Index : 0 */
                'sector TEXT NOT NULL,' + /* Index : 1 */
                'incluidopos TEXT NOT NULL,' +  /* Index : 2 */
                'gruposervicios TEXT NOT NULL,' + /* Index : 3 */
                'servicio TEXT NOT NULL,' + /* Index : 4 */
                'descripcion TEXT NOT NULL,' +  /* Index : 5 */
                'estado TEXT NOT NULL)'; /* Index : 6 */
        
        if (dataBase) {
            dataBase.transaction(function (tx) {
                tx.executeSql(sentenceTableOferta,[],successCreateTables,errorCreateTables);
            });
            
            dataBase.transaction(function (tx) {
                tx.executeSql(sentenceTablePlan,[],successCreateTables,errorCreateTables);
            });
        } /* El dispositivo soporta WebSQL */
        
        else {
            discApp.showMessage('Este dispositivo no soporta el almacenamiento con WebSQL.');
        } /* El dispositivo no soporta WebSQL */
    };
    
    function createName(oferta) {
        return oferta.nombrecontacto + oferta.apellidoscontacto;
    }
    
    function createDiscapacidad(oferta) {
        var discapacidad = oferta.discfisica;
        discapacidad += ',' + oferta.discauditiva;
        discapacidad += ',' + oferta.discvisual;
        discapacidad += ',' + oferta.discmental;
        discapacidad += ',' + oferta.disccognitiva;
        discapacidad += ',' + oferta.discmultiple;
        
        return discapacidad;
    }
    
    function successInsertOferta () {
        discApp.showMessage('La oferta seleccionada fue agregada a la lista de favoritos.');
    }
    
    function errorInsertOferta () {
        discApp.showMessage('La oferta seleccionada ya existe en la lista de favoritos.');
    }
    
    Agenda.prototype.insertOferta = function (oferta) {
        var parametros = [oferta.RowKey, oferta.sector, oferta.entidadoferta,
            oferta.nombredepartamento, oferta.nombremunicipio, oferta.nombreoferta,
            oferta.descripcionoferta, oferta.direccion, oferta.horarioatencion, 
            oferta.requisitos, createDiscapacidad(oferta), oferta.vigenciadese,
            oferta.vigenciahasta, createName(oferta), oferta.cargocontacto, 
            oferta.celularcontacto, oferta.correoelectronico, oferta.telefono1contacto,
            oferta.telefono2contacto, 'PENDIENTE'];
        
        if (dataBase) {
            var sentence = 'INSERT INTO ' + tablaOfertas + ' VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
            dataBase.transaction(function(tx) {
                tx.executeSql(sentence,parametros,successInsertOferta,errorInsertOferta);
            });
        } /* El dispositivo soporta WebSQL */
        
        else {
            discApp.showMessage('Este dispositivo no soporta el almacenamiento con WebSQL.');
        } /* El dispositivo no soporta WebSQL */
        
        return result; // Resultado de Insertar los Datos
    };
    
   function createFavoritesListSupply(result) {
        var output = []; /* Lista de ofertas favoritas*/
        
        for (var index = 0; index < result.rows.length; index++) {
            output.push([
                result.rows.item(index).RowKey, 
                result.rows.item(index).sector, 
                result.rows.item(index).entidadoferta,
                result.rows.item(index).nombredepartamento, 
                result.rows.item(index).nombremunicipio, 
                result.rows.item(index).nombreoferta,
                result.rows.item(index).descripcionoferta, 
                result.rows.item(index).direccion, 
                result.rows.item(index).horarioatencion, 
                result.rows.item(index).requisitos, 
                result.rows.item(index).discapacidad, 
                result.rows.item(index).vigenciadese,
                result.rows.item(index).vigenciahasta, 
                result.rows.item(index).nombrecontacto, 
                result.rows.item(index).cargocontacto, 
                result.rows.item(index).celularcontacto, 
                result.rows.item(index).correoelectronico, 
                result.rows.item(index).telefono1contacto,
                result.rows.item(index).telefono2contacto,
                result.rows.item(index).estado]);
        } /* Cargando las ofertas favoritas en la lista */
        
        favoritosOfertas = output; /* Asignando lista a la variable global */
    };
    
    function errorLoadFavoritesList() {
        console.log('No se pudo cargar lista de favoritos');
    }
    
    Agenda.prototype.loadFavoritesList = function () {        
        if (dataBase) {
            var sentence = 'SELECT * FROM ' + tablaOfertas + ';'; /* Select */
            dataBase.transaction(function (tx) {
                tx.executeSql(sentence,[],function (tx, result) {createFavoritesListSupply(result);},errorLoadFavoritesList);
            });
        } /* El dispositivo soporta WebSQL */
        
        else {
            discApp.showMessage('Este dispositivo no soporta el almacenamiento con WebSQL.');
        } /* El dispositivo no soporta WebSQL */
    };
    
    Agenda.prototype.getFavoritesList = function () {
        return favoritosOfertas;
    };
        
    function errorDeleteFavoriteSupply () {
        discApp.showMessage('No se pudo eliminar oferta favorita.');
    }
    
    Agenda.prototype.deleteFavoriteSupply = function (RowKey, successFunction) {
        if (dataBase) {
            var sentence = 'DELETE FROM ' + tablaOfertas + ' WHERE RowKey = ?;';
            dataBase.transaction(function (tx) {
                tx.executeSql(sentence,[RowKey],function (result) { if (result.rowsAffected !== 0) {successFunction();} else {errorDeleteFavoriteSupply();}},errorDeleteFavoriteSupply);
            });    
        } /* El dispositivo soporta WebSQL */
       
        else {
            discApp.showMessage('Este dispositivo no soporta el almacenamiento con WebSQL.');
        } /* El dispositivo no soporta WebSQL */
    };
    
    function successInsertPOS () {
        discApp.showMessage('La oferta del plan obligatorio de salud fue agregada a la lista de favoritos.');
    }
    
    function errorInsertPOS () {
        discApp.showMessage('La oferta del plan obligatorio de salud seleccionada ya existe en la lista de favoritos.');
    }
    
    Agenda.prototype.insertPOS = function (plan) {
        var parametros = [plan.RowKey, plan.sector, plan.incluidopos,
            plan.gruposervicios, plan.servicio, plan.descripcion, 'PENDIENTE'];
        
        if (dataBase) {
            var sentence = 'INSERT INTO ' + tablaPlan + ' VALUES (?,?,?,?,?,?,?);';
            dataBase.transaction(function (tx) {
                tx.executeSql(sentence,parametros,successInsertPOS,errorInsertPOS);
            });    
        } /* El dispositivo soporta WebSQL */
        
        else {
            discApp.showMessage('Este dispositivo no soporta el almacenamiento con WebSQL.');
        } /* El dispositivo no soporta WebSQL */
    };
    
   function createFavoritesListPOS (resultSet) {
        var output = []; /* Lista de ofertas del POS favoritas*/
        
        for (var index = 0; index < resultSet.rows.length; index++) {
            output.push([
                resultSet.rows.item(index).RowKey,
                resultSet.rows.item(index).sector,
                resultSet.rows.item(index).incluidopos,
                resultSet.rows.item(index).gruposervicios,
                resultSet.rows.item(index).servicio,
                resultSet.rows.item(index).descripcion,
                resultSet.rows.item(index).estado
            ]);
        } /* Cargando las ofertas favoritas del POS en la lista */
        
        favoritosPlan = output; /* Asignando lista a la variable global */
    };
    
    function errorLoadFavoritesListPOS () {
        console.log('No se pudo cargar lista de favoritos del plan obligatorio de salud');
    }
    
    Agenda.prototype.loadFavoritesListPOS= function () {        
        if (dataBase) {
            var sentence = 'SELECT * FROM ' + tablaPlan + ';'; /* Select */
            
            dataBase.transaction(function (tx) {
                tx.executeSql(sentence,[],function (tx, result) {createFavoritesListPOS(result);},errorLoadFavoritesListPOS);
            });
        } /* El dispositivo soporta WebSQL */
        
        else {
            discApp.showMessage('Este dispositivo no soporta el almacenamiento con WebSQL.');
        } /* El dispositivo no soporta WebSQL */
    };
    
    Agenda.prototype.getFavoritesListPOS = function () {
        return favoritosPlan;
    };
    
    function errorDeleteFavoriteSupplyPOS () {
        discApp.showMessage('No se pudo eliminar oferta favorita del plan obligatorio de salud.');
    }
    
    Agenda.prototype.deleteFavoriteSupplyPOS = function (RowKey, successFunction) {
        if (dataBase) {
            var sentence = 'DELETE FROM ' + tablaPlan + ' WHERE RowKey = ?;'; /* Delete */
            dataBase.transaction(function (tx) {
                tx.executeSql(sentence,[RowKey],function (result) {if (result.rowsAffected !== 0) {successFunction();} else {errorDeleteFavoriteSupplyPOS();}},errorDeleteFavoriteSupplyPOS);
            });    
        } /* El dispositivo soporta WebSQL */
        
        else {
            discApp.showMessage('Este dispositivo no soporta el almacenamiento con WebSQL.');
        } /* El dispositivo no soporta WebSQL */
    };
}