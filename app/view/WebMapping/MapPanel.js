Ext.define('FloodSimulator.view.WebMapping.MapPanel',
{
	extend: 'Ext.panel.Panel',
	alias: 'widget.MapPanel',
	id: 'MapPanelId',
    layout: 'border',
	frame: true,
	region: 'center',
    initComponent: function() 
	{
        var me = this;
        Ext.applyIf(me, 
		{
            items: 
			[	
				{
					xtype: 'MainToolbar'
				},
				{
					xtype: 'GeoExtMapPanel'
				}
            ]
        });
        me.callParent(arguments);
    }
});