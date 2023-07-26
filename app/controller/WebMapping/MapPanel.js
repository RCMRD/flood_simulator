Ext.require([
    'GeoExt.panel.Map',
    'GeoExt.data.FeatureStore',
    'GeoExt.grid.column.Symbolizer',
    'GeoExt.selection.FeatureModel',
    'Ext.tree.plugin.TreeViewDragDrop',
    'GeoExt.tree.OverlayLayerContainer',
    'GeoExt.tree.BaseLayerContainer',
    'GeoExt.data.LayerTreeModel',
    'GeoExt.tree.View',
    'GeoExt.tree.Column',
	'Ext.util.Point',
	'GeoExt.container.VectorLegend',
	'GeoExt.window.Popup',
	'GeoExt.panel.Legend',
    'GeoExt.container.WmsLegend'

]);

var map,africa_outline;
var LayerLegend, WestPanel, statusbar;
var zoomInCtrl, zoomOutCtrl, navigationHistoryCtrl;
var layer_legend_tree, layers_tree_store;
Ext.define('FloodSimulator.controller.WebMapping.MapPanel',
{
	extend: 'Ext.app.Controller',	
	views: 	['WebMapping.MapPanel','WebMapping.GeoExtMapPanel','WebMapping.MainToolbar' ],
	controllers: ['WebMapping.ButonOnclickActions', 'WebMapping.graphData'],
    initComponent: function() 
	{

	}
});
