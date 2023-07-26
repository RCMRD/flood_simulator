Ext.define("Ext.data.JsonP",{singleton:!0,requestCount:0,requests:{},timeout:3e4,disableCaching:!0,disableCachingParam:"_dc",callbackKey:"callback",request:function(n){n=Ext.apply({},n);n.url||Ext.Error.raise("A url must be specified for a JSONP request.");var t=this,l=Ext.isDefined(n.disableCaching)?n.disableCaching:t.disableCaching,e=n.disableCachingParam||t.disableCachingParam,u=++t.requestCount,f=n.callbackName||"callback"+u,o=n.callbackKey||t.callbackKey,s=Ext.isDefined(n.timeout)?n.timeout:t.timeout,r=Ext.apply({},n.params),h=n.url,a=Ext.name,i,c;return l&&!r[e]&&(r[e]=Ext.Date.now()),n.params=r,r[o]=a+".data.JsonP."+f,c=t.createScript(h,r,n),t.requests[u]=i={url:h,params:r,script:c,id:u,scope:n.scope,success:n.success,failure:n.failure,callback:n.callback,callbackKey:o,callbackName:f},s>0&&(i.timeout=setTimeout(Ext.bind(t.handleTimeout,t,[i]),s)),t.setupErrorHandling(i),t[f]=Ext.bind(t.handleResponse,t,[i],!0),t.loadScript(i),i},abort:function(n){var i=this,t=i.requests,r;if(n)n.id||(n=t[n]),i.handleAbort(n);else for(r in t)t.hasOwnProperty(r)&&i.abort(t[r])},setupErrorHandling:function(n){n.script.onerror=Ext.bind(this.handleError,this,[n])},handleAbort:function(n){n.errorType="abort";this.handleResponse(null,n)},handleError:function(n){n.errorType="error";this.handleResponse(null,n)},cleanupErrorHandling:function(n){n.script.onerror=null},handleTimeout:function(n){n.errorType="timeout";this.handleResponse(null,n)},handleResponse:function(n,t){var i=!0;t.timeout&&clearTimeout(t.timeout);delete this[t.callbackName];delete this.requests[t.id];this.cleanupErrorHandling(t);Ext.fly(t.script).remove();t.errorType?(i=!1,Ext.callback(t.failure,t.scope,[t.errorType])):Ext.callback(t.success,t.scope,[n]);Ext.callback(t.callback,t.scope,[i,n,t.errorType]);Ext.EventManager.idleEvent.fire()},createScript:function(n,t){var i=document.createElement("script");return i.setAttribute("src",Ext.urlAppend(n,Ext.Object.toQueryString(t))),i.setAttribute("async",!0),i.setAttribute("type","text/javascript"),i},loadScript:function(n){Ext.getHead().appendChild(n.script)}})