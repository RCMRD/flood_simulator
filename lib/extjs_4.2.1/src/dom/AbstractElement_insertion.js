Ext.define("Ext.dom.AbstractElement_insertion",{override:"Ext.dom.AbstractElement",appendChild:function(n,t){var u=this,i,f,r,e;if(n.nodeType||n.dom||typeof n=="string")return n=Ext.getDom(n),u.dom.appendChild(n),t?n:Ext.get(n);if(n.length){for(i=Ext.fly(document.createDocumentFragment(),"_internal"),f=n.length,Ext.DomHelper.useDom=!0,r=0;r<f;r++)i.appendChild(n[r],t);return Ext.DomHelper.useDom=e,u.dom.appendChild(i.dom),t?i.dom:i}return u.createChild(n,null,t)},appendTo:function(n){return Ext.getDom(n).appendChild(this.dom),this},insertBefore:function(n){return n=Ext.getDom(n),n.parentNode.insertBefore(this.dom,n),this},insertAfter:function(n){return n=Ext.getDom(n),n.parentNode.insertBefore(this.dom,n.nextSibling),this},insertFirst:function(n,t){return n=n||{},n.nodeType||n.dom||typeof n=="string"?(n=Ext.getDom(n),this.dom.insertBefore(n,this.dom.firstChild),t?n:Ext.get(n)):this.createChild(n,this.dom.firstChild,t)},insertSibling:function(n,t,i){var r=this,f=Ext.core.DomHelper,c=f.useDom,e=(t||"before").toLowerCase()=="after",u,s,h,o;if(Ext.isArray(n)){for(s=Ext.fly(document.createDocumentFragment(),"_internal"),h=n.length,f.useDom=!0,o=0;o<h;o++)u=s.appendChild(n[o],i);return f.useDom=c,r.dom.parentNode.insertBefore(s.dom,e?r.dom.nextSibling:r.dom),u}return n=n||{},n.nodeType||n.dom?(u=r.dom.parentNode.insertBefore(Ext.getDom(n),e?r.dom.nextSibling:r.dom),i||(u=Ext.get(u))):u=e&&!r.dom.nextSibling?f.append(r.dom.parentNode,n,!i):f[e?"insertAfter":"insertBefore"](r.dom,n,!i),u},replace:function(n){return n=Ext.get(n),this.insertBefore(n),n.remove(),this},replaceWith:function(n){var t=this;return n.nodeType||n.dom||typeof n=="string"?(n=Ext.get(n),t.dom.parentNode.insertBefore(n.dom,t.dom)):n=Ext.core.DomHelper.insertBefore(t.dom,n),delete Ext.cache[t.id],Ext.removeNode(t.dom),t.id=Ext.id(t.dom=n),Ext.dom.AbstractElement.addToCache(t.isFlyweight?new Ext.dom.AbstractElement(t.dom):t),t},createChild:function(n,t,i){return n=n||{tag:"div"},t?Ext.core.DomHelper.insertBefore(t,n,i!==!0):Ext.core.DomHelper.append(this.dom,n,i!==!0)},wrap:function(n,t,i){var r=Ext.core.DomHelper.insertBefore(this.dom,n||{tag:"div"},!0),u=r;return i&&(u=Ext.DomQuery.selectNode(i,r.dom)),u.appendChild(this.dom),t?r.dom:r},insertHtml:function(n,t,i){var r=Ext.core.DomHelper.insertHtml(n,this.dom,t);return i?Ext.get(r):r}})