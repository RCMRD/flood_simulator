Ext.define("Ext.tip.Tip",{extend:"Ext.panel.Panel",alternateClassName:"Ext.Tip",minWidth:40,maxWidth:500,shadow:"sides",defaultAlign:"tl-bl?",constrainPosition:!0,autoRender:!0,hidden:!0,baseCls:Ext.baseCSSPrefix+"tip",floating:{shadow:!0,shim:!0},focusOnToFront:!1,closeAction:"hide",ariaRole:"tooltip",alwaysFramed:!0,frameHeader:!1,initComponent:function(){var n=this;n.floating=Ext.apply({},{shadow:n.shadow,constrain:n.constrainPosition},n.self.prototype.floating);n.callParent(arguments);n.constrain=n.constrain||n.constrainPosition},showAt:function(n){var t=this;this.callParent(arguments);t.isVisible()&&(t.setPagePosition(n[0],n[1]),(t.constrainPosition||t.constrain)&&t.doConstrain(),t.toFront(!0))},initDraggable:function(){var n=this;n.draggable={el:n.getDragEl(),delegate:n.header.el,constrain:n,constrainTo:n.el.dom.parentNode};Ext.Component.prototype.initDraggable.call(n)},ghost:undefined,unghost:undefined})