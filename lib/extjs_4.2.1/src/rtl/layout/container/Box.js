Ext.define("Ext.rtl.layout.container.Box",{override:"Ext.layout.container.Box",initLayout:function(){var n=this;n.owner.getHierarchyState().rtl&&(n.names=Ext.Object.chain(n.names),Ext.apply(n.names,n.rtlNames));n.callParent(arguments)},getRenderData:function(){var n=this.callParent();return this.owner.getHierarchyState().rtl&&(n.targetElCls=(n.targetElCls||"")+" "+Ext.baseCSSPrefix+"rtl"),n}})