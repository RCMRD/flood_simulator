Ext.Loader.setConfig
({
    enabled: true,
	disableCaching: false,
    paths: {
        GeoExt: "lib/geoext2-2.0.2b/src/GeoExt"
    }
});
Ext.application({
    name: 'FloodSimulator',
    appFolder: 'app',
	extend: 'Ext.app.Application',
    controllers: 
	[
        'FloodSimulator.controller.WebMapping.MapPanel'
    ],
    launch: function() 
	{
        Ext.tip.QuickTipManager.init();	
		Ext.create('FloodSimulator.view.WebMappingViewport');
    }
});