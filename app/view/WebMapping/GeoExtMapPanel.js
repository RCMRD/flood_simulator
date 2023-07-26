Ext.define('FloodSimulator.view.WebMapping.GeoExtMapPanel',
{
	extend: 'GeoExt.panel.Map',
	alias: 'widget.GeoExtMapPanel',
	id: 'GeoExtMapPanelId',
	border: 'false',
	layout: 'fit',
	region: 'center',
	width: '100%',
	height:'100%',
	center: '29.577899,3.443310',
	zoom: 11,
	initComponent: function() 
	{
		var me = this,
		items = [],
		ctrl;

		map = new OpenLayers.Map('map', options);
		map.addControl(new OpenLayers.Control.LayerSwitcher());
		map.addControl(new OpenLayers.Control.Navigation({dragPanOptions: {enableKinetic: true}})); 
		map.addControl(new OpenLayers.Control.Scale());
		map.addControl(new OpenLayers.Control.LoadingPanel()); 

        africa_outline = new OpenLayers.Layer.Vector( "Africa", {
            isBaseLayer: true, displayInLayerSwitcher: true, visibility: true,
            projection:  new OpenLayers.Projection('EPSG:4326'),
            strategies: [new OpenLayers.Strategy.Fixed()],
            protocol: new OpenLayers.Protocol.HTTP
            ({
                    url:  "data/webmapping/africa.json",
                    format: new OpenLayers.Format.GeoJSON
                    ({
                        extractStyles: true,
                        extractAttributes: true
                    })
                })
        });
        //Baselayers
        /*
        var gphy = new OpenLayers.Layer.Google(
            "Google Physical Terrain",
            {isBaseLayer: true, type: google.maps.MapTypeId.TERRAIN, visibility:false, transitionEffect: 'resize'}
            );

        var gmap = new OpenLayers.Layer.Google(
                    "Google Streets", // the default
                    {isBaseLayer: true,numZoomLevels: 20,visibility:false, transitionEffect: 'resize'}
                    );

        var ghyb = new OpenLayers.Layer.Google(
            "Google Hybrid",
            {isBaseLayer: true,type: google.maps.MapTypeId.HYBRID, numZoomLevels: 22,visibility:false, transitionEffect: 'resize'}
            );

        var gsat = new OpenLayers.Layer.Google(
            "Google Satellite",
            {isBaseLayer: true,type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 20,visibility:false, transitionEffect: 'resize'}
            );
        */
        var mapbox_street = new OpenLayers.Layer.XYZ("Mapbox Street",
            ["http://a.tiles.mapbox.com/v4/mapbox.streets/${z}/${x}/${y}.png?access_token=pk.eyJ1Ijoid29uZGllIiwiYSI6InlKcXpXT1UifQ.BQ3hMXdyffGusTRN8JnWOg"], {
                sphericalMercator: true,
                wrapDateLine: true,
                numZoomLevels: 20,
                transitionEffect: 'resize'
            });

        var esri_imagery = new OpenLayers.Layer.XYZ( "ESRI Imagery",
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}",
            {sphericalMercator: true} );

        var rgs = new OpenLayers.Layer.WMS("River Gauge Stations",
                    "http://tools.rcmrd.org/geoserver/wms",
                    {
                        layers: 'floods:rgs_locations',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: true,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );

        var malaba = new OpenLayers.Layer.WMS("Malaba",
                    "http://tools.rcmrd.org/geoserver/wms",
                    {
                        layers: 'floods:malaba_boundary',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );

        var manafwa = new OpenLayers.Layer.WMS("Manafwa",
                    "http://tools.rcmrd.org/geoserver/wms",
                    {
                        layers: 'floods:manafwa_boundary',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );

        var nyabarongo = new OpenLayers.Layer.WMS("Nyabarongo",
                    "http://tools.rcmrd.org/geoserver/wms",
                    {
                        layers: 'floods:nyabarongo_boundary',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );

        var nyando = new OpenLayers.Layer.WMS("Nyando",
                    "http://tools.rcmrd.org/geoserver/wms",
                    {
                        layers: 'floods:nyando_boundary',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );

        var nzoia = new OpenLayers.Layer.WMS("Nzoia",
                    "http://tools.rcmrd.org/geoserver/wms",
                    {
                        layers: 'floods:nzoia_boundary',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );

        var okavango = new OpenLayers.Layer.WMS("Okavango",
                    "http://tools.rcmrd.org/geoserver/wms",
                    {
                        layers: 'floods:okavango_boundary',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );

        var tana = new OpenLayers.Layer.WMS("Tana",
                    "http://tools.rcmrd.org/geoserver/wms",
                    {
                        layers: 'floods:tana_boundary',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );




        var maxExtent = new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508),
        restrictedExtent = maxExtent.clone();
        maxResolution = 156543.0339;

        var options = {
            projection: new OpenLayers.Projection("EPSG:900913"),
            displayProjection: new OpenLayers.Projection("EPSG:4326"),
            units: "m",
            numZoomLevels: 20,
            maxResolution: maxResolution,
			//maxExtent: maxExtent,
			sphericalMercator: true,
			restrictedExtent: restrictedExtent
		};

		map.addControl(new OpenLayers.Control.MousePosition
			(	{
				id:'MousePosition_id',
			
				numDigits: 6,
				prefix: '(Lon/Lat)',
				emptyString: '',
				displayProjection: "EPSG:4326"
			}
			));
		
		zoomInCtrl = new OpenLayers.Control.ZoomIn();
		map.addControl(zoomInCtrl);

		zoomOutCtrl = new OpenLayers.Control.ZoomOut();
		map.addControl(zoomOutCtrl);
		
		navigationHistoryCtrl = new OpenLayers.Control.NavigationHistory();
		map.addControl(navigationHistoryCtrl);

        // rgs layer symbology
        var rgs_select_style = new OpenLayers.Style({graphicYOffset: -24});
            var rgs_default_style = new OpenLayers.Style({graphicYOffset: -24});

            var rgs_style_map = new OpenLayers.StyleMap({
                'default': rgs_default_style,
                'select': rgs_select_style
            });

            //Start creating symbology rules
            var default_rgs_marker = new OpenLayers.Rule({
                title: "River Gauge Station",
                symbolizer: {
                    'pointRadius': 12,
                    'cursor': "pointer",
                    externalGraphic: "assets/images/markers/water.png"
                    //graphicYOffset: 2
                }
            });

            //Start creating symbology rules
            var selected_rgs_marker = new OpenLayers.Rule({
                title: "River Gauge Station",
                symbolizer: {
                    'pointRadius': 14,
                    'cursor': "pointer"
                }
            });

            rgs_default_style.addRules([default_rgs_marker]);
            rgs_select_style.addRules([selected_rgs_marker]);
            

        // Define proxy for getfeatureinfo
        //OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
        
       
        var rgs_url = "./rgs.geojson";

        var rgs_layer = new OpenLayers.Layer.Vector("River Gauge Stations", {
            isBaseLayer: false, displayInLayerSwitcher: true, visibility: true,
            styleMap: rgs_style_map,
            projection:  new OpenLayers.Projection('EPSG:4326'),
            //displayProjection: new OpenLayers.Projection("EPSG:4326"),
            transparent: true,
            strategies: [new OpenLayers.Strategy.Fixed()],
            protocol: new OpenLayers.Protocol.HTTP({
                url: rgs_url,
                format: new OpenLayers.Format.GeoJSON({
                        extractStyles: true,
                        extractAttributes: true
                    })
            })
        });

        function createPopup(feature) {

                var details = '<div class="popup_output">';
                details += '<div  class="marker_popup_content">'+

                 //'<div class="columnA" ><strong>Source: </strong>'+
                // feature.attributes.USER+'</div>'+
                 '<div class="columnA"><strong>Name: </strong>'+
                 feature.attributes.Station_Na+'</div>'+
                 '<div class="columnA" ><strong>Latitude: </strong>'+
                 feature.attributes.Lat+'</div>'+
                 '<div class="columnA" ><strong>Longitude: </strong>'+
                 feature.attributes.Lon+'</div><br>'+
                 
                 '<img src="assets/images/rwambwa.png" alt="Station" height="150" width="200">';
                
                 
                details += '</div>';
                details += '</div>';

                var markerPopup = new GeoExt.Popup({
                    title: 'River Gauge Station',
                    height:320,
                    width: 342,
                    location: feature,
                    cls:'popup_cls',
                    bodyPadding:'6px',
                    bodyStyle:'background:rgba(228, 225, 213, 0.83);',
                    html: details,
                    maximizable: true,
                    collapsible: true,
                    anchored: true,
                    moveable: true,
                    animCollapse: true,
                    shadow: true,
                    listeners: {
                        maximize: function (){
                            Ext.select('img.popup_img').setStyle('height',( (Ext.getBody().getViewSize().height*80 ) / 100)+'px');
                            Ext.select('img.popup_img').setStyle('width', 'auto');
                            Ext.select('img.popup_img').setStyle('max-height',( (Ext.getBody().getViewSize().height*80 ) / 100)+'px');
                        },
                        restore: function (){
                            Ext.select('img.popup_img').setStyle('width', '100%');
                            Ext.select('img.popup_img').setStyle('height', 'auto');
                            Ext.select('img.popup_img').setStyle('max-height', '320px');
                        }
                    }
                });


                // unselect feature when the popup
                // is closed
                markerPopup.on({
                    close: function () {
                        if (OpenLayers.Util.indexOf(rgs_layer.selectedFeatures, this.feature) > -1) {
                            unselect.unselect(rgs_layer.selectedFeatures.feature);
                        }
                    }
                });
                markerPopup.show();
            } 


        //When there is internet use this
        map.addLayers([rgs_layer, malaba, manafwa, nyabarongo, nyando, nzoia, okavango, tana, esri_imagery]);

        //No Internet
        //map.addLayers([africa_outline]);
        // create popup on "featureselected"
            rgs_layer.events.on({
                featureselected: function (e) {
                    createPopup(e.feature);
                }
            });

            var select_rgs = new OpenLayers.Control.SelectFeature(
                rgs_layer
            );
            map.addControl(select_rgs);
            select_rgs.activate();

		map.setCenter(new OpenLayers.LonLat(29.577899,3.443310).transform(
			new OpenLayers.Projection("EPSG:4326"),
			map.getProjectionObject()
			), 5 );


    Ext.apply(me, 
    {
    	map: map

    });


    me.callParent(arguments);
}
});
