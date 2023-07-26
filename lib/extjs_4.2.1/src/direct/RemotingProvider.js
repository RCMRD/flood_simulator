Ext.define("Ext.direct.RemotingProvider",{extend:"Ext.direct.JsonProvider",alias:"direct.remotingprovider",requires:["Ext.util.MixedCollection","Ext.util.DelayedTask","Ext.direct.Transaction","Ext.direct.RemotingMethod"],enableBuffer:10,maxRetries:1,constructor:function(){var n=this;n.callParent(arguments);n.addEvents("beforecall","call","beforecallback");n.namespace=Ext.isString(n.namespace)?Ext.ns(n.namespace):n.namespace||Ext.global;n.transactions=new Ext.util.MixedCollection;n.callBuffer=[]},getNamespace:function(n,t){var r,u,i,f;for(n=n||Ext.global,r=t.toString().split("."),i=0,f=r.length;i<f;i++)if(u=r[i],n=n[u],typeof n=="undefined")return n;return n},createNamespaces:function(n,t){var u,i,r,f;for(n=n||Ext.global,u=t.toString().split("."),r=0,f=u.length;r<f;r++)i=u[r],n[i]=n[i]||{},n=n[i];return n},initAPI:function(){var i=this,f=i.actions,r=i.namespace,n,t,e,u,s,o;for(n in f)if(f.hasOwnProperty(n))for(i.disableNestedActions?(t=r[n],t||(t=r[n]={})):(t=i.getNamespace(r,n),t||(t=i.createNamespaces(r,n))),e=f[n],u=0,s=e.length;u<s;++u)o=new Ext.direct.RemotingMethod(e[u]),t[o.name]=i.createHandler(n,o)},createHandler:function(n,t){var r=this,u=Array.prototype.slice,i;return i=t.formHandler?function(i,u,f){r.configureFormRequest(n,t,i,u,f)}:function(){r.configureRequest(n,t,u.call(arguments,0))},i.directCfg={action:n,method:t},i},isConnected:function(){return!!this.connected},connect:function(){var n=this;n.url?(n.initAPI(),n.connected=!0,n.fireEvent("connect",n)):n.url||Ext.Error.raise('Error initializing RemotingProvider "'+n.id+'", no url configured.')},disconnect:function(){var n=this;n.connected&&(n.connected=!1,n.fireEvent("disconnect",n))},runCallback:function(n,t){var r=!!t.status,e=r?"success":"failure",i,u,f;n&&n.callback&&(i=n.callback,u=n.callbackOptions,f=typeof t.result!="undefined"?t.result:t.data,Ext.isFunction(i)?i(f,t,r,u):(Ext.callback(i[e],i.scope,[f,t,r,u]),Ext.callback(i.callback,i.scope,[f,t,r,u])))},onData:function(n,t,i){var r=this,f,o,s,e,u,h;if(t)for(s=r.createEvents(i),f=0,o=s.length;f<o;++f)e=s[f],u=r.getTransaction(e),r.fireEvent("data",r,e),u&&r.fireEvent("beforecallback",r,e,u)!==!1&&(r.runCallback(u,e,!0),Ext.direct.Manager.removeTransaction(u));else for(h=[].concat(n.transaction),f=0,o=h.length;f<o;++f)u=r.getTransaction(h[f]),u&&u.retryCount<r.maxRetries?u.retry():(e=new Ext.direct.ExceptionEvent({data:null,transaction:u,code:Ext.direct.Manager.exceptions.TRANSPORT,message:"Unable to connect to the server.",xhr:i}),r.fireEvent("data",r,e),u&&r.fireEvent("beforecallback",r,u)!==!1&&(r.runCallback(u,e,!1),Ext.direct.Manager.removeTransaction(u)))},getTransaction:function(n){return n&&n.tid?Ext.direct.Manager.getTransaction(n.tid):null},configureRequest:function(n,t,i){var r=this,u,c,e,s,o,f,h;u=t.getCallData(i);c=u.data;e=u.callback;s=u.scope;o=u.options||{};h=Ext.apply({},{provider:r,args:i,action:n,method:t.name,data:c,callbackOptions:o,callback:s&&Ext.isFunction(e)?Ext.Function.bind(e,s):e});o.timeout&&Ext.applyIf(h,{timeout:o.timeout});f=new Ext.direct.Transaction(h);r.fireEvent("beforecall",r,f,t)!==!1&&(Ext.direct.Manager.addTransaction(f),r.queueTransaction(f),r.fireEvent("call",r,f,t))},getCallData:function(n){return{action:n.action,method:n.method,data:n.data,type:"rpc",tid:n.id}},sendRequest:function(n){var t=this,i,r,f,e=t.enableUrlEncode,u,o;if(i={url:t.url,callback:t.onData,scope:t,transaction:n,timeout:t.timeout},n.timeout&&(i.timeout=n.timeout),Ext.isArray(n))for(r=[],u=0,o=n.length;u<o;++u)r.push(t.getCallData(n[u]));else r=t.getCallData(n);e?(f={},f[Ext.isString(e)?e:"data"]=Ext.encode(r),i.params=f):i.jsonData=r;Ext.Ajax.request(i)},queueTransaction:function(n){var t=this,i=t.enableBuffer;if(n.form){t.sendFormRequest(n);return}if(i===!1||typeof n.timeout!="undefined"){t.sendRequest(n);return}t.callBuffer.push(n);i?(t.callTask||(t.callTask=new Ext.util.DelayedTask(t.combineAndSend,t)),t.callTask.delay(Ext.isNumber(i)?i:10)):t.combineAndSend()},combineAndSend:function(){var n=this,t=n.callBuffer,i=t.length;i>0&&(n.sendRequest(i==1?t[0]:t),n.callBuffer=[])},configureFormRequest:function(n,t,i,r,u){var e=this,f,o,s;f=new Ext.direct.Transaction({provider:e,action:n,method:t.name,args:[i,r,u],callback:u&&Ext.isFunction(r)?Ext.Function.bind(r,u):r,isForm:!0});e.fireEvent("beforecall",e,f,t)!==!1&&(Ext.direct.Manager.addTransaction(f),o=String(i.getAttribute("enctype")).toLowerCase()=="multipart/form-data",s={extTID:f.id,extAction:n,extMethod:t.name,extType:"rpc",extUpload:String(o)},Ext.apply(f,{form:Ext.getDom(i),isUpload:o,params:r&&Ext.isObject(r.params)?Ext.apply(s,r.params):s}),e.fireEvent("call",e,f,t),e.sendFormRequest(f))},sendFormRequest:function(n){var t=this;Ext.Ajax.request({url:t.url,params:n.params,callback:t.onData,scope:t,form:n.form,isUpload:n.isUpload,transaction:n})}})