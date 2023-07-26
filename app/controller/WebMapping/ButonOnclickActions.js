// some data used in the forms
Ext.namespace('Ext.flood');

Ext.require([
    'Ext.window.MessageBox',
    'Ext.tip.*'
]);

Ext.flood.countries = [
    ['Kenya'],
    ['Uganda'],
    ['Namibia'],
    ['Rwanda']
];

Ext.flood.basins = [
    ['Nzoia'],
    ['Tana'],
    ['Nyando'],
	//['Sondu'],
	//['Yala'],
    ['Manafwa'],
    ['Malaba'],
    ['Okavango'],
    ['Nyabarongo']

];

Ext.flood.sources = [
    ['gauged', 'Gauged Value'],
    ['crest', 'CREST Value']
   
];

var _country;

var countrydata = [
    {
        "name": "Kenya",
        "id": 0,
        "center": [38.051489, -0.7730859],
        "zoomlevel": 7,
        "basins": [
            {"name":"Nzoia", "id": 1, "zoomlevel": 10, "center": [34.0745, 0.1135], "threshold": 0, "link": "https://s3-us-west-2.amazonaws.com/crestdata/allresults/nzoia/Outlet_Nzoia_allresults.csv"}, 
            {"name":"Tana", "id": 2, "zoomlevel": 8, "center": [38.868, -1.184], "threshold": 3.5, "link": ""}, 
			 {"name":"Sondu", "id": 8, "zoomlevel": 10, "center": [35.2379, -0.6169], "threshold": 4.0, "link": ""},
			 {"name":"Yala", "id": 9, "zoomlevel": 10, "center": [34.770, 0.137], "threshold": 4.0, "link": ""},
            {"name":"Nyando", "id": 0, "zoomlevel": 9, "center": [35.2686, -0.1856], "threshold": 5.0, "link": "https://s3-us-west-2.amazonaws.com/crestdata/allresults/nyando/Outlet_nyando_allresults.csv"}] 
    },
    {
        "name": "Uganda",
        "id": 1,
        "center": [32.30465, 1.36515],
        "zoomlevel": 7,
        "basins": [{"name":"Manafwa", "id": 6, "zoomlevel": 9, "center": [34.2755, 0.9750], "threshold": 5, "link": "https://s3-us-west-2.amazonaws.com/crestdata/allresults/manafwa/Outlet_manafwa_log.csv"}, 
            {"name":"Malaba", "id": 5, "zoomlevel": 9, "center": [34.3126, 0.7069], "threshold": 5, "link": "https://s3-us-west-2.amazonaws.com/crestdata/allresults/malaba/Outlet_malaba_allresults.csv"}] 
    },
    {
        "name": "Namibia",
        "id": 2,
        "center": [17.091367, -22.600099],
        "zoomlevel": 6,
        "basins": [{"name":"Okavango", "id": 3, "zoomlevel": 7, "center": [17.997, -15.706], "threshold": 5, "link": "https://s3-us-west-2.amazonaws.com/crestdata/allresults/okavango/Outlet_Okavango_Rundu_allresults.csv"}] 
    },
    {
        "name": "Rwanda",
        "id": 3,
        "center": [29.893494, -1.971387],
        "zoomlevel": 9,
        "basins": [{"name":"Nyabarongo", "id": 4, "zoomlevel": 9, "center": [29.8549, -1.8356], "threshold": 5, "link": "https://s3-us-west-2.amazonaws.com/crestdata/allresults/nyabarongo/Outlet_ruliba_allresults.csv"} 
            //{"name":"Sebeya", "id": 1, "center": []}
            ] 
    }


];

var basinresults = ['Nyando', 'Nzoia', 'Malaba'];

var site_name = "crest.rcmrd.org";

var _threshold;

Highcharts.setOptions({
  global: {
    useUTC: false
  }
});

function drawChart(rbasin, data1, data2){

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

            $('#chart_div').highcharts({

                credits: 
                {
                    text: 'Coordinated Universal Time (UTC)',
                    href: 'http://rcmrd.org'
                },
                /*
                data: {
                    csv: data1
                },
                */
                chart: 
                {
                    type: 'spline'
                },

                title:
                {
                    text: 'CREST Model Runoff Simulation for '+rbasin+' Basin'
                },

                xAxis:
                {
                    tickWidth: 1,
                    gridLineWidth: 1,
                    type: 'datetime',
                    //categories: [],
					dateTimeLabelFormats: {
           				day: '%Y-%m-%d'    //ex- 01 Jan 2017
        			},
                    labels:{
						 format: '{value:%d-%m-%Y}'
                        /*formatter : function(){
                            return Highcharts.dateFormat('%a %d %b', this.value);
                              //return this.value;
								//return Highcharts.dateFormat('%e %b', this.value*1000);
                        }*/
                    }
                },

                yAxis: [
						{
                            labels:{formatter:function(){return this.value+" m3/sec"},
                            style:{color:"#4572A7"}},
                            title:{text:"Runoff",style:{color:"#4572A7"}},
							//min: 2,
							//max: 309
							//opposite:!0,
                        },
						{
							labels:{
								formatter:function(){return this.value+" m"},
								style:{color:"#89A54E"}
							},
							title:{text:"Stage",style:{color:"#89A54E"}},
							//linkedTo : 0,
							opposite:true,
							//min: 0,
							//max: 6
						}
						/*{	
							labels:{formatter:function(){return this.value+" m3/sec"},
							style:{color:"#4572A7"}},
							title:{text:"Runoff",style:{color:"#4572A7"}}
						}*/
					/*{
                    // left y axis
					//min: 0.1,
					//max: 6.0,
                    title : 
                    {
                        text : 'Stage (M)'
                        
                    },
                    labels : 
                    {
                        format : '{value} m'
                        
                    }
					//opposite: true
                },*//* {
                    // right y axis
					//min: 2.0,
					//max: 310.0,
                    //linkedTo : 0,
                    //gridLineWidth : 1,
                    //opposite : true,
                    title : 
                    {
                        text : 'Runoff (m3/Sec',
                        
                    },
                    labels : 
                    {
                        format : '{value} m3/Sec',
                        
                    }
                    
                },
				{
                    // left y axis
                    //min: 0.1,
                    //max: 6.0,
                    title :
                    {
                        text : 'Stage (M)'

                    },
                    labels :
                    {
                        format : '{value} m'

                    },
                    opposite: true,
					linkedTo: 0
                 }*/
                
                ],

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },

                tooltip:{
                    shared: true,
                    crosshairs: true
                },

                plotOptions:{
                    series : 
                    {
                        cursor : 'pointer',
                        point : 
                        {
                            events : 
                            {
                                click : function(e){
                                    //var chart = $('#highcharts-container').highcharts();
                                    //$chartName = chart.series[0].options.name;
                                    if(this.series.name == "Stage"){
                                        
                                            
                                            //window.alert(this.y);
                                            var rbasin = Ext.getCmp('basin').getValue();
                                            rbasin = rbasin.toLowerCase();
                    
                                            var _riverstage = this.y;
                                            _riverstage = parseFloat(_riverstage);
                                            _riverstage = Ext.util.Format.number(_riverstage, '0.0');
                               
                                            //if(_riverstage > 3.88)

                                             
                                                Ext.MessageBox.show({
                                                    msg: 'Simulating flood, please wait...',
                                                    progressText: 'Processing...',
                                                    width:300,
                                                    wait:true,
                                                    waitConfig: {interval:200},
                                                    icon:'ext-mb-download', //custom class in msg-box.html
                                                    iconHeight: 50
                                                    //animateTarget: 'mb7'
                                                });
                    

                                                setTimeout(function(){

                                                    floodSim(rbasin, _riverstage);
                                                    Ext.MessageBox.hide();
                                                    Ext.example.msg('Done', 'inundation map generated!');
                                                }, 1000);
                                        
                                            
                                        
                                    }
                                }
                            }
                        },
                        marker : 
                        {
                            lineWidth : 1
                        }
                    }
                },
                series: [
                    {
                        name: 'Runoff',
                        data: data1,
						yAxis: 0
                    },
                    {
                        name: 'Stage',
                        data: data2,
						yAxis: 1
                    }
                   
                    
                ]

                
            });

}



function loadChart(){

	var results1 = [];
	var results2 = [];

	
	$.ajax({
    	type: "GET",
    	url: 'http://'+site_name+'/nzoia/nzoia/?dt_timestamp__gte=2017-09-01T03:00&dt_timestamp__lte=2017-10-05T09:00&limit=0&format=json',
    	async: false,
    	dataType: "json",
    	success: function(data){

        	for(var i = 0; i < data.objects.length; i++){
            	var _date = new Date(data.objects[i].dt_timestamp);
            	//var dt_time = _date.toUTCString();
                //var dt_time = _date;
            	var dt_time = Date.parse(data.objects[i].dt_timestamp);
            	

            	results1.push([dt_time, parseFloat(data.objects[i].runoff)]);
            	results2.push([dt_time, parseFloat(data.objects[i].stage)]);
        	}	

        	//console.log(results2[2]);

        	drawChart(results1, results2);


    	}
	});


}

//loadChart();

function drawBasinGraph(basin1, startdate, enddate ){

	//alert('Drawing graph');
	//dt_timestamp__gte=2015-09-01T03:00&dt_timestamp__lte=2015-10-05T09:00

	var results1 = [];
    var results2 = [];

	$.ajax({
	    type: "GET",
	    url: 'http://'+site_name+'/'+basin1+'/'+basin1+'/?dt_timestamp__gte='+startdate+'&dt_timestamp__lte='+enddate+'&limit=0&format=json',
	    async: false,
	    dataType: "json",
	    success: function(data){

	        
	        for(var i = 0; i < data.objects.length; i++){
	            var _date = new Date(data.objects[i].dt_timestamp);
                //var dt_time = _date;
	            //var dt_time = _date.toUTCString();
				var dt_time = Date.parse(data.objects[i].dt_timestamp);
	            

	            results1.push([dt_time, parseFloat(data.objects[i].runoff)]);
	            results2.push([dt_time, parseFloat(data.objects[i].stage)]);
	        }

	        //console.log(results1);

	        drawChart(basin1, results1, results2);
	       

	    }
	});


}


// define sld for generated inundation map
function defineLegend(floodmap, simstage){

	var sld = '';
	sld += '<sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0">';
	sld += '<sld:NamedLayer><sld:Name>frost:';
	sld += flood_map;
	sld += '</sld:Name><sld:UserStyle><sld:Name>query</sld:Name><sld:FeatureTypeStyle>';
	sld += '<sld:Rule><RasterSymbolizer><Opacity>1</Opacity><ColorMap>';
	sld += '<ColorMapEntry color="#FFFFFF" opacity="0" quantity="0" />';
	sld += '<ColorMapEntry color="#B6EDF0" opacity="1" quantity="0.5" label="Low : 0.5" />';
	sld += '<ColorMapEntry color="#A4DCED" opacity="1" quantity="1.0" label="1.0" />';
	sld += '<ColorMapEntry color="#A4DCED" opacity="1" quantity="1.0" label="1.0" />';
	sld += '<ColorMapEntry color="#A4DCED" opacity="1" quantity="1.0" label="1.0" />';
	sld += '<ColorMapEntry color="#A4DCED" opacity="1" quantity="1.0" label="1.0" />';
	sld += '<ColorMapEntry color="#A4DCED" opacity="1" quantity="1.0" label="1.0" />';

}


function floodSim(rbasin, riverstage){
	/*
	Ext.MessageBox.show({
			           msg: 'Simulating flood, please wait...',
			           progressText: 'Processing...',
			           width:300,
			           wait:true,
			           waitConfig: {interval:200},
			           icon:'ext-mb-download', //custom class in msg-box.html
			           iconHeight: 50
			           //animateTarget: 'mb7'
			       });
	*/
	// clear existing flood layer
    var currentlayer = map.getLayersByName("Flood Depth");
    if(currentlayer.length != 0){
        map.removeLayer(currentlayer[0]);
    }

	// inun_map
	var _url = 'http://crest.rcmrd.org/wps/'+rbasin+'/'+riverstage+'/';

	$.ajax({
        type: "GET",
        url: _url,
        async: false,
        dataType: "json",
        crossDomain: true,
        //dataType: 'jsonp',
        success: function(data){
                                    
            //alert(data.inundation);
            var inun_map = data.inundation;   

            var flood_layer = 'frost:'+inun_map;
			// load flood map
			flood_map = new OpenLayers.Layer.WMS("Flood Depth", 
							"http://tools.rcmrd.org/geoserver/wms",
							{
			                    layers: flood_layer,
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
						map.addLayer(flood_map);
            
			
			// load map download link
			var _downgrid = Ext.getCmp('downgrid').getStore();
			_downgrid.removeAll();      

			var map_link = 'http://crest.rcmrd.org/maps/'+rbasin+'/'+inun_map;
			var map_url = "<a href='" + map_link + "'>Inundation Map</a>";
			var mapdata = [
				{label1: map_url}
			];

			_downgrid.loadData(mapdata);               
                                  
            }

			



    });

	
	

}


Ext.define('FloodSimulator.controller.WebMapping.ButonOnclickActions', {
	extend: 'Ext.app.Controller',
	init: function(){
		
		this.control(
		{		
			'WebMappingViewport button[action=simulateFlood]':
			{
				click:function() {

					//alert('simulation');
                    var rbasin = Ext.getCmp('basin').getValue();
                    rbasin = rbasin.toLowerCase();
                    
					var _riverstage = Ext.getCmp('manual_input').getValue();
					_riverstage = parseFloat(_riverstage);

					if(_riverstage < _threshold){
						Ext.Msg.alert('Alert', 'No flooding!');
					} 
					else {

					_riverstage = _riverstage - parseFloat(_threshold);

					_riverstage = Ext.util.Format.number(_riverstage, '0.0');

					//alert(_riverstage);
								
					Ext.MessageBox.show({
			           msg: 'Simulating flood, please wait...',
			           progressText: 'Processing...',
			           width:300,
			           wait:true,
			           waitConfig: {interval:200},
			           icon:'ext-mb-download', //custom class in msg-box.html
			           iconHeight: 50
			           //animateTarget: 'mb7'
			       });
					

            		setTimeout(function(){

						floodSim(rbasin, _riverstage);
                		Ext.MessageBox.hide();
                		Ext.Msg.alert('Done', 'inundation map generated!');
                		}, 1000);

					//var _riverstage = Ext.getCmp('manual_input').getValue();
					//_riverstage = parseFloat(_riverstage);
					//_riverstage = Ext.util.Format.number(_riverstage, '0.0');

					// carry out simulation
					//floodSim(_riverstage);
					
					//Ext.MessageBox.hide();
            		//Ext.flood.msg('Done', 'Inundation map was generated!');
					
					}
				}
			},

			'WebMappingViewport combobox[name=country]': {
				select:function(valueField) {
					//Ext.Msg.alert('Alert', valueField.value);
					_country = valueField.value;
					// pan to country and zoom
					for(var i=0; i < countrydata.length; i++){
						if(countrydata[i].name == _country){
							map.setCenter(
                            	new OpenLayers.LonLat(countrydata[i].center[0], countrydata[i].center[1]).transform(
                                	new OpenLayers.Projection("EPSG:4326"),
                                	map.getProjectionObject() ), countrydata[i].zoomlevel);

									// turn off basin boundaries
									for(var k=0; k < Ext.flood.basins.length; k++){
										var basinlayer = map.getLayersByName(Ext.flood.basins[k]);
										basinlayer[0].setVisibility(false);
									}

							// load basins store
							var _basin = Ext.getCmp('basin');
							_basin.clearValue();

							var store = _basin.getStore();
							store.removeAll();

							var newstore = [];
							for(var j=0; j < countrydata[i].basins.length; j++){
				                newstore.push([countrydata[i].basins[j].name]);
				                //alert('Push');
			              	}
			              	store.loadData(newstore);

			              	// enable basins and sources
							_basin.enable();
							


						}
					}


					
				}
			},   
			'WebMappingViewport combobox[name=basin]': {
				select:function(valueField) {
					var _basin = valueField.value;
					Ext.getCmp('source').enable();
					//Ext.getCmp('manual_input').enable();
					// pan to basin and zoom
					for(var i=0; i < countrydata.length; i++){
						if(countrydata[i].name == _country){
							for(var j=0; j < countrydata[i].basins.length; j++){
								if(countrydata[i].basins[j].name == _basin){
									
									map.setCenter(
		                            	new OpenLayers.LonLat(countrydata[i].basins[j].center[0], countrydata[i].basins[j].center[1]).transform(
		                                	new OpenLayers.Projection("EPSG:4326"),
		                                	map.getProjectionObject() ), countrydata[i].basins[j].zoomlevel);

									// turn on selected basin boundary and turn off other basins
									for(var k=0; k < Ext.flood.basins.length; k++){
										var basinlayer = map.getLayersByName(Ext.flood.basins[k]);
										basinlayer[0].setVisibility(false);
									}

									var _layer = map.getLayersByName(_basin);
									_layer[0].setVisibility(true);

									// clear downloads grid
									var _downgrid = Ext.getCmp('downgrid').getStore();
									_downgrid.removeAll();

                                    var _downgrid1 = Ext.getCmp('downgrid1').getStore();
                                    _downgrid1.removeAll();

									
									// clear simulate grid
									var _simgrid = Ext.getCmp('simgrid');
									var _simstore = _simgrid.getStore();
									_simstore.removeAll();

									// set grid title
									var _title = "Flood Determination for " + _basin + " basin";
									_simgrid.setTitle(_title);

									// 
									var simdata = [
										{variable1: 'Threshold (Ht)'},
								        {variable1: 'River Stage (Hc)'},
								        {variable1: 'Simulation Stage (Hs)'},
								        {variable1: 'Flooding'}
									];

									_simstore.loadData(simdata);

									var _start = '2017-08-08T03:00';
									var _end = '2017-09-08T03:00';

									var _basin = _basin.toLowerCase();

									// load basin graph
									// 2015-09-01T03:00&dt_timestamp__lte=2015-10-05T09:00
                                    Ext.getCmp('chartpanel').expand();
									drawBasinGraph(_basin, _start, _end);

                                    // load basin runoff csv
                                    var csv_link = countrydata[i].basins[j].link;
                                    var csv_url = "<a href='" + csv_link + "'>CSV File</a>";
                                    var csvdata = [
                                        {label1: csv_url}
                                    ];

                                    _downgrid1.loadData(csvdata);     

	
								}
							}
						}
					}
					
					
					
					
				}
			}, 
			'WebMappingViewport numberfield[name=manual_input]': {
				change:function(value) {

					var stage = value.value;

					var _basin = Ext.getCmp('basin').getValue();
					//Ext.getCmp('source').enable();
					Ext.getCmp('manual_input').enable();
					// get flood threshold
					for(var i=0; i < countrydata.length; i++){
						if(countrydata[i].name == _country){
							for(var j=0; j < countrydata[i].basins.length; j++){
								if(countrydata[i].basins[j].name == _basin){
									
									var threshold = countrydata[i].basins[j].threshold;
									//alert (threshold + ' ' + stage);

									// load simulate grid
									var _simgrid = Ext.getCmp('simgrid');
									var _simstore = _simgrid.getStore();
									_simstore.removeAll();

									// set grid title
									var _title = "Flood Determination for " + _basin + " basin";
									_simgrid.setTitle(_title);

									var _stage = stage - threshold;		

									_threshold = threshold;										
									// 
									var simdata = [
										{variable1: 'Threshold (Ht)', value1: threshold},
								        {variable1: 'River Stage (Hc)', value1: stage},
								        {variable1: 'Simulation Stage (Hs)', value1: _stage.toFixed(2)},
								        {variable1: 'Flooding', value1: _stage.toFixed(2)}
									];

									_simstore.loadData(simdata);
	

								}
							}
						}
					}
					
					
					
					
				}
			}, 
			'WebMappingViewport combobox[name=_source]': {
				select:function(valueField) {
					if(valueField.value == 'crest'){
						// disable input radio, spinner and graph button
						Ext.getCmp('manual_input').disable();
						Ext.getCmp('start_date').enable();
						Ext.getCmp('end_date').enable();
						//Ext.getCmp('graph_button').enable();
						
					} else {
						Ext.getCmp('manual_input').enable();
						//Ext.getCmp('graph_button').disable();
					}
					
					
				}
			},  			

			'WebMappingViewport button[action=updateGraph]':
			{
				click: function() 
				{
					
 					var start_date = Ext.getCmp('start_date').getValue();
					var start_date = Ext.Date.format(start_date, 'Y-m-d');
					var start_date = start_date + 'T03:00';
			
					var end_date = Ext.getCmp('end_date').getValue();
					var end_date = Ext.Date.format(end_date, 'Y-m-d');	
					var end_date = end_date + 'T09:00';				
	
					//alert(start_date + '  ' + end_date);
 					var _basin = Ext.getCmp('basin').getValue();
					var _basin = _basin.toLowerCase();
					
					drawBasinGraph(_basin, start_date, end_date);
 					
					
				
				}
			},
			'WebMappingViewport button[action=customSearchAction]':
			{
				click: function() 
				{

					var loadingPanel = new OpenLayers.Control.LoadingPanel();
					map.addControl(loadingPanel);    
					//show the control
					loadingPanel.maximizeControl();
					// load your layers here
					// remove it as the above function returns
					
					//flag="no_flag";
					custom_search();

					loadingPanel.minimizeControl();
					
				}
			},
			'MapPanel button[action=map_zoom_in]':
			{
				click:function()
				{	
					zoomInCtrl.trigger();
				}
			},
			'MapPanel button[action=map_zoom_out]':
			{
				click:function()
				{	
					zoomOutCtrl.trigger();
				}
			},
			'MapPanel button[action=navigation_history_previous]':
			{
				click:function()
				{	
					navigationHistoryCtrl.previousTrigger();
				}
			},
			'MapPanel button[action=navigation_history_next]':
			{
				click:function()
				{	
					navigationHistoryCtrl.nextTrigger();
				}
			},
			'MapPanel button[action=about_us]':
			{
				click: function ()
				{
					var win = new Ext.Window
					({
						width:500,
						height:500,
						autoScroll:true,
						title: 'About the Application',
						autoLoad:{
							url:'pages/about_us.html'
						}
					});
					win.show();
				}
			},
			'MapPanel button[action=useful_links]':
			{
				click: function ()
				{
					
					var win = new Ext.Window({
						width:270,
						height:130,
						autoScroll:true,
						title: 'Useful Links',
						autoLoad:{
							url:'pages/useful_links.html'
						}
					});
					win.show();
				}
			},
			'MapPanel button[action=help_action]':
			{
				click: function ()
				{
					var win = new Ext.Window
					({
						width:500,
						height:500,
						autoScroll:true,
						title: 'Help',
						autoLoad:{
							url:'pages/help.html'
						}
					});
					win.show();
				}
			},
			'MapPanel button[action=map_default_map_extent]':
			{
				click: function() 
				{
					map.setCenter(
						new OpenLayers.LonLat(29.577899,3.443310).transform(
							new OpenLayers.Projection("EPSG:4326"),
							map.getProjectionObject()
							), 
						5);
				}
			},

			'MapPanel button[action=zoom_to_countries]':
			{
				click: function() 
				{
					var selected_country=Ext.getCmp('Zoom_to_Countries_Id').getValue();
					if(selected_country==null)
					{
						Ext.Msg.alert("No selection","Please select a country you want to Zoom to");
					}
					else if(selected_country=="All Countries")
					{
						map.setCenter(
							new OpenLayers.LonLat(29.577899,3.443310).transform(
								new OpenLayers.Projection("EPSG:4326"),
								map.getProjectionObject() ), 
							5);
					}	
					else if(selected_country=="Burundi")
					{
						map.setCenter(
							new OpenLayers.LonLat(29.90, -3.5).transform(
								new OpenLayers.Projection("EPSG:4326"),
								map.getProjectionObject() ), 
							9);
					}
					else if(selected_country=="Djibouti")
					{
						map.setCenter(
							new OpenLayers.LonLat(42.61, 11.77).transform(
								new OpenLayers.Projection("EPSG:4326"),
								map.getProjectionObject() ), 
							9);
					}
					else if(selected_country=="Eritrea")
					{
						map.setCenter(
							new OpenLayers.LonLat(39.59, 14.84).transform(
								new OpenLayers.Projection("EPSG:4326"),
								map.getProjectionObject() ), 
							7);
					}
					else if(selected_country=="Ethiopia")
					{
						map.setCenter(
							new OpenLayers.LonLat(38.58, 8.98).transform(
								new OpenLayers.Projection("EPSG:4326"),
								map.getProjectionObject() ), 
							6);
					}

					else if(selected_country=="Kenya")
					{
						map.setCenter(
							new OpenLayers.LonLat(38.224663, 0.009370).transform(
								new OpenLayers.Projection("EPSG:4326"),
								map.getProjectionObject() ), 
							7);
					}
					else if(selected_country=="Rwanda")
					{
						map.setCenter(
							new OpenLayers.LonLat(29.99, -1.9370).transform(
								new OpenLayers.Projection("EPSG:4326"),
								map.getProjectionObject() ), 
							9);
					}
					else if(selected_country=="Somalia")
					{
						map.setCenter(
							new OpenLayers.LonLat(46.76, 5.5).transform(
								new OpenLayers.Projection("EPSG:4326"),
								map.getProjectionObject() ), 
							6);
					}

					else if(selected_country=="Sudan")
					{
						map.setCenter(
							new OpenLayers.LonLat(29.75,15.98).transform(
								new OpenLayers.Projection("EPSG:4326"),
								map.getProjectionObject() ), 
							6);
					}
					else if(selected_country=="South Sudan")
					{
						map.setCenter(
							new OpenLayers.LonLat(29.44, 7.84).transform(
								new OpenLayers.Projection("EPSG:4326"),
								map.getProjectionObject() ), 
							7);
					}
					else if(selected_country=="Tanzania")
					{
						map.setCenter(
							new OpenLayers.LonLat(34.77, -6.32).transform(
								new OpenLayers.Projection("EPSG:4326"),
								map.getProjectionObject() ), 
							6);
					}
					else if(selected_country=="Uganda")
					{
						map.setCenter(
							new OpenLayers.LonLat(32.71, 1.23).transform(
								new OpenLayers.Projection("EPSG:4326"),
								map.getProjectionObject() ), 
							7);
					}

				}
				
			}

		});
	}

});
