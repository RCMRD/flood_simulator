Ext.define("Ext.AbstractPlugin",{disabled:!1,isPlugin:!0,constructor:function(n){this.pluginConfig=n;Ext.apply(this,n)},clonePlugin:function(n){return new this.self(Ext.apply({},n,this.pluginConfig))},setCmp:function(n){this.cmp=n},getCmp:function(){return this.cmp},init:Ext.emptyFn,destroy:Ext.emptyFn,enable:function(){this.disabled=!1},disable:function(){this.disabled=!0},onClassExtended:function(n,t){var i=t.alias;i&&!t.ptype&&(Ext.isArray(i)&&(i=i[0]),n.prototype.ptype=i.split("plugin.")[1])}})