 

Ext.define('Result', {
     extend: 'Ext.data.Model',
     fields: [
         {name: 'label1', type: 'string'},
         {name: 'url1',  type: 'string'}
        
     ]
 });

Ext.define('Simulate', {
     extend: 'Ext.data.Model',
     fields: [
         {name: 'variable1', type: 'string'},
         {name: 'value1',  type: 'string'}
        
     ]
 });




 //var conservation_area_store_url;
layers_tree_store = Ext.create('Ext.data.TreeStore', {
	model: 'GeoExt.data.LayerTreeModel',
	root: {
		expanded: true,
		children: 
		[
			{
				text: "Base Maps",
				plugins: ['gx_baselayercontainer'],
				collapsed: true
			}, 
			{
				text: "Overlays",
				plugins: ['gx_overlaylayercontainer'],
				expanded: true
			}
		]
	}
});

layer_legend_tree = Ext.create('GeoExt.tree.Panel', 
{
	title: "Data",
    height: 300,
	autoScroll: true,
 	viewConfig:
	{
		plugins: [{
			ptype: 'treeviewdragdrop',
			appendOnly: false
		}]
	},
	store: layers_tree_store,
    listeners:{
        'checkchange': function(node, checked){
           
            var legend_container = document.getElementById('legend_items-innerCt'); 
            
            /*
            if(checked &&  (range_search_heatmap.visibility===true)){
                //console.log('Checked'); 
                Ext.get('heatmap_legend').show(); 
                legend_container.getElementsByTagName('div')[4].style.display='none'; //range_search_heatmap legend
            } else if (!checked && (range_search_heatmap.visibility===false)){
                //console.log('Unchecked'); 
                if ( Ext.get('heatmap_legend')) { 
                    Ext.get('heatmap_legend').hide();  
                }           
            }
            if (checked &&  (range_search_fire_layer.visibility===true)) {
              //  console.log('Checked'); 
                //legend_container.getElementsByTagName('div')[1].style.display='block'; 
            }else {
               // console.log('UnChecked'); 
            }
            */
        }
    },
	rootVisible: false,
	lines: false
});



LogoPanel = new Ext.Panel({  
    region: 'south',      
    xtype: 'panel',
    id: 'logopanelID',
    height: 90,
    width: 370,
    minWidth: 260,
   // collapsed:true,
   //animCollapse: true,
    collapsible: true,
    collapseMode: 'mini',
    preventHeader: true,
    split: true,
    items:[
        {
            xtype: 'panel',
            html:'<div class="logos"><a target="new" href="http://www.usaid.gov/"><img alt="USAID" width="134" height="40" src="assets/images/usaid.png"></a>'+
            '<a target="new" href="http://www.rcmrd.org/?page_id=5130"><img alt="SERVIR East and Southern Africa" width="240" height="35" src="assets/images/servir-easafricab.png"></a>'+
            '<a target="new" href="http://www.nasa.gov/"><img alt="NASA" width="49" height="40" src="assets/images/nasa.png"></a> </div>'
        }
    ]
}); 
	


SingleSearchForm = Ext.create('Ext.form.Panel', {
    height: 120,
    bodyPadding: 10,
    id: 'single_search_id', 
    //title: 'Basins',
    items: [
       
                {
                    xtype: 'combobox',
                    fieldLabel: 'Country',
                    name: 'country',
                    id: 'country',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_value'],
                        data : Ext.flood.countries 
                    }),
                    valueField: '_value',
                    displayField: '_value',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select country...',
                    listeners:{
                        'select': function(valueField){
                            
                        }
                    }
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Basin',
                    disabled: true,
                    name: 'basin',
                    id: 'basin',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_value'],
                        data : Ext.flood.basins 
                    }),
                    valueField: '_value',
                    displayField: '_value',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select basin...'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Simulation Source',
                    disabled: true,
                    name: '_source',
                    id: 'source',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_value', '_lable'],
                        data : Ext.flood.sources 
                    }),
                    valueField: '_value',
                    displayField: '_lable',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select source..'
                }
                
    ]/*,
    buttons:
	[
		{
            text: 'Update Graph',
            id:'graph_button',
            width: 100,
            //disabled: true,
            action: 'updateGraph'
            //action: 'singleSearchAction'
        }
	]*/
});

 SimForm = Ext.create('Ext.form.Panel', {
    height: 150,
    bodyPadding: 10,
    id: 'sim_form_id', 
    //title: 'Basins',
    items: [
       
                {
                    xtype: 'numberfield',
                    name: 'manual_input',
                    id: 'manual_input',
                    fieldLabel: 'Gauged Value',
                    disabled: true,
                    value: 4,
                    minValue: 4,
                    maxValue: 10,
                    step: 1
                },
                {
                     xtype: 'datefield',
                     anchor: '100%',
                     id: 'start_date',
                     fieldLabel: 'Start Date',
                     name: 'start_date',
                     disabled: true,
                     format:'Y-m-d',
                     submitFormat: 'ymd',
                     submitValue : true,
                     maxValue: new Date()  // limited to the current date or prior
                 },{
                     xtype: 'datefield',
                     anchor: '100%',
                     id: 'end_date',
                     fieldLabel: 'End Date',
                     name: 'end_date',
                     disabled: true,
                     format:'Y-m-d',
                     submitFormat: 'ymd',
                     submitValue : true,
                     maxValue: new Date()  // limited to the current date or prior
                 }
    ],
    buttons:
    [
        {
            text: 'Update Graph',
            id:'graph_button',
            width: 100,
            //disabled: true,
            action: 'updateGraph'
            //action: 'singleSearchAction'
        }
    ]
});

// create the Downloads Store
   var downstore = Ext.create('Ext.data.Store', {
    model: 'Result',
    data: [
        //{label1: 'Nzoia Results'}

    ]

   });
    
    var csv_downstore = Ext.create('Ext.data.Store', {
    model: 'Result',
    data: [
        //{label1: 'Nzoia Results'}

    ]

   });


   var simstore = Ext.create('Ext.data.Store', {
    model: 'Simulate',
    data: [
        {variable1: 'Threshold (Ht)'},
        {variable1: 'River Stage (Hc)'},
        {variable1: 'Simulation Stage (Hs)'},
        {variable1: 'Flooding'}

    ]

   });

    // create the grids

    var simgrid = Ext.create('Ext.grid.Panel', {
        store: simstore,
        title: 'Flood Determination',
        id: 'simgrid',
        columns: [
            {text: "Variable", width: 150, dataIndex: 'variable1'},
            {text: "Value", width: 150, dataIndex: 'value1'}
            
            
        ],
        //renderTo:'example-grid',
        width: 370,
        height: 170
    });


    var downloads = Ext.create('Ext.grid.Panel', {
        store: downstore,
        id: 'downgrid',
        columns: [
            {text: "Download Flood Map", width: 180, dataIndex: 'label1'}
            
            
        ],
        //renderTo:'example-grid',
        width: 200,
        height: 50
    });
    
    var csv_downloads = Ext.create('Ext.grid.Panel', {
        store: csv_downstore,
        id: 'downgrid1',
        columns: [
            {text: "Download Runoff data ", width: 180, dataIndex: 'label1'}


        ],
        
        width: 200,
        height: 60
    });

    



GeoExtPanel = new Ext.Panel ({
    region: 'west',
    xtype: 'panel',
    //width: 300,
    minWidth: 200,
    autoScroll: true,
    height: 650, 
    active:true,
   // maxWidth: 500,
    listeners: {
        resize: Ext.Function.bind(function(comp, width, height,
                oldWidth, oldHeight, eOpts) {
            comp.doLayout();
        }, this)
    },
    title: 'Time Query',
    collapsible: true,
    split: true,
    items: [
        SingleSearchForm, SimForm, csv_downloads, 
        simgrid, {
            xtype: 'button',
            text: 'Simulate Flood',
            id:'simulateButton',
            width: 150,
            action: 'simulateFlood'
        },
        downloads]

}); 


/*
var GeneralTabs = Ext.create('Ext.tab.Panel', {
	id: "generaltabsID",
	layout: 'card',
	region: 'west',
	width:370,
	minWidth:200,
    height: 400, 
	animate: true,
	preventHeader: true,
     hideCollapseTool: true,
	collapsible: true,
    activeTab: 0,
    split: true,
    tabPosition: 'top',
    items: [
    	    GeoExtPanel, 
        {
            title: 'Map',
            items:[layer_legend_tree]
        }
    ]
});
*/

var SimPanel = new Ext.Panel({  
    region: 'west',
    xtype: 'panel',
    //layout:'border',
    width: 370,
    autoScroll: true,
    minWidth: 200,
    //height: 400, 
    //active:true,
    collapsible: true,
    preventHeader: true,
    hideCollapseTool: true,
    split: true,
    items: [
        GeoExtPanel,
        layer_legend_tree
     ]

}); 

function fix_to_bottom(){

     if (legend_popup.collapsed){
         legend_popup.anchorTo("GeoExtMapPanelId", "bl", [0, -30]);
     }else {
         legend_popup.anchorTo("GeoExtMapPanelId", "bl", [0, -235]);
     }
 }

WestPanel = new Ext.Panel({  
    region: 'west',
    xtype: 'panel',
    layout:'border',
    width: 370,
    minWidth: 200,
    //height: 400, 
    active:true,
    collapsible: true,
    preventHeader: true,
    hideCollapseTool: true,
    split: true,
    items: [SimPanel, LogoPanel]

}); 



 	statusbar = new Ext.Panel({
        region: 'south',
        id: 'statusbar', 
		xtype: 'panel',
        width: 370,
        height: 35,
        bbar: Ext.create('Ext.ux.StatusBar', {
            defaultText: '',
             height: 35,
             bodyStyle: 'padding-top:25px;',
            // bodyStyle: 'padding:15px;',
            id: 'statusbar_content_id',
            cls: 'statusbar_content'

        })
    });

    legendPanel = Ext.create ('GeoExt.LegendPanel', {
     bodyStyle: 'padding:5px',
     autoScroll: true,
     header:false,
     id:"legend_id",
     width:200,
     height:205,
     collapsible: true,
     defaults: {
         style: 'padding:5px',
         baseParams: {
             FORMAT: 'image/png',
             LEGEND_OPTIONS: 'forceLabels:on;fontName=Verdana;fontSize:12',
             WIDTH:'16',
             HEIGHT:'12'
         }
     },
     lines: false,
     layers: ["River Gauge Stations"]
 });

 legend_popup = new Ext.Window({
     extend: 'Ext.window.Window',
     title:'Legend',
     width: 200,
     id:'legend_popup_id',
     minimizable: true,
     //collapsed: true,
     closable:false,
     collapseDirection: Ext.Component.DIRECTION_BOTTOM,
     items:[legendPanel],
     listeners: {
         show: function() {
             Ext.select('#legend_popup_id .x-tool-restore').setStyle('display', 'none');
             Ext.select('#legend_popup_id .x-tool-minimize').setStyle('display', 'block');
         },
         "minimize": function (window, opts) {
             window.collapse();
             window.setWidth(150);
             window.anchorTo("GeoExtMapPanelId", "bl", [0, -30]);
             Ext.select('#legend_popup_id .x-tool-restore').setStyle('display', 'block');
             Ext.select('#legend_popup_restore_id').setStyle('left', '122px');
             Ext.select('#legend_popup_restore_id').setStyle('z-index', '100');
             Ext.select('#legend_popup_id .x-tool-minimize').setStyle('display', 'none');
         }
     },
     tools: [{
         type: 'restore',
         id: 'legend_popup_restore_id',
         handler: function (evt, toolEl, owner, tool) {
             var window = owner.up('window');
             window.setWidth(200);
             window.expand('', false);
             window.anchorTo("GeoExtMapPanelId", "bl", [0, -250]);
             Ext.select('#legend_popup_id .x-tool-restore').setStyle('display', 'none');
             Ext.select('#legend_popup_id .x-tool-minimize').setStyle('display', 'block');
         }
     }]
 });

 Ext.onReady(function(){


     legend_popup.show();
     legend_popup.collapse();
     legend_popup.anchorTo("GeoExtMapPanelId", "bl", [0, -250]);
     window.onresize = function() {
         fix_to_bottom();
     };

 });



Ext.define('FloodSimulator.view.WebMappingViewport',
{
    extend: 'Ext.container.Viewport',
    alias: 'widget.WebMappingViewport',
	id: 'viewportId',
	renderTo: Ext.getBody(),
    layout: {
        type: 'border'
    },
    initComponent: function() 
	{
        var me = this;
        Ext.applyIf(me, {
		items: 
			[
				{
					xtype: 'panel',
					region: 'north',
					height: 60, //orignal 60
					html: '<div class="fire"><div class="satimage"><div class="fireimage"><div class="topcont">' +
                    '<div class="logobox"><a href=""><img alt="RCMRD" width="153"' +
                    ' height="53" class="rcmrd" src="assets/images/rcmrd.png"></a></div><h1 class="topheader">'+
					'CREST Streamflow Viewer & Flood Simulator</h1></div></div></div></div>'
				},
				{
					xtype: 'MapPanel'
				},{
                    region: 'south',
                    height: 400,
                    split: true,
                    collapsible: true,
                    collapsed: true,
                    title: 'Graph',
                    //minHeight: 60,
                    //html: 'center south',
                    weight: -100,
                    id: 'chartpanel',
                    contentEl: 'chart_div'
                },
                //Navigation,
                 WestPanel
                 
				//statusbar
			]
        });
        me.callParent(arguments);
    }
});
