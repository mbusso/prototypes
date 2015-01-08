// inspired by: https://github.com/coomsie/topomap.co.nz/blob/master/Resources/leaflet/TileLayer.DB.js
L.TileLayer.MBTiles = L.TileLayer.extend({
	mbTilesDB: null,

	initialize: function(url, options, cordovaSQLite, dbName) {
		this.cordovaSQLite = cordovaSQLite;
		this.mbTilesDB = this.cordovaSQLite.openDB(dbName);		
		L.Util.setOptions(this, options);
	},
	getTileUrl: function (tilePoint, tileSource) {
		var z = tilePoint.z
		var x = tilePoint.x;
		var y = tilePoint.y;
		var base64Prefix = 'data:image/gif;base64,';
		var layer = this;

		//console.log("tiles-> tile_column " + x + ", tile_row " + y + ",zoom " + z);
		
		this.cordovaSQLite.execute(this.mbTilesDB, 
			"SELECT tile_data FROM tiles WHERE (zoom_level = ? AND tile_column = ? AND tile_row = ?)", [z, x, y]).then(function (res) {
			//console.log(JSON.stringify(res));
			if(res.rows.length > 0) {
				tileSource(base64Prefix + res.rows.item(0).tile_data, layer);
			}
		}, function (er) {
			console.log('error with executeSql', JSON.stringify(er));
		});
	},

	_loadTile: function (tile, tilePoint) {
		tile._layer  = this;
		tile.onload  = this._tileOnLoad;
		tile.onerror = this._tileOnError;

		this._adjustTilePoint(tilePoint);

		this.getTileUrl(tilePoint, function(src, layer) {
			tile.src = src;
				layer.fire('tileloadstart', {
				tile: tile,
				url: tile.src
				});
		});	
	},
	
});