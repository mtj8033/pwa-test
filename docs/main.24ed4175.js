parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"QGXO":[function(require,module,exports) {
"use strict";function e(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/pwa-test/sw.js").then(e=>{console.log("Registration succeeded")}).catch(e=>{console.log("Registration failed with error",e)})})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.setupServiceWorker=e;
},{"./sw.js":[["sw.js","NqYy"],"sw.js.map","NqYy"]}],"pNKq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.a=I,exports.b=v,exports.e=exports.d=exports.c=void 0;const e=(e,t)=>t.some(t=>e instanceof t);let t,r;function n(){return t||(t=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function o(){return r||(r=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}exports.c=e;const s=new WeakMap,a=new WeakMap,i=new WeakMap,c=new WeakMap,u=new WeakMap;function p(e){const t=new Promise((t,r)=>{const n=()=>{e.removeEventListener("success",o),e.removeEventListener("error",s)},o=()=>{t(I(e.result)),n()},s=()=>{r(e.error),n()};e.addEventListener("success",o),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&s.set(t,e)}),u.set(t,e),t}function f(e){if(a.has(e))return;const t=new Promise((t,r)=>{const n=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",s),e.removeEventListener("abort",s)},o=()=>{t(),n()},s=()=>{r(e.error),n()};e.addEventListener("complete",o),e.addEventListener("error",s),e.addEventListener("abort",s)});a.set(e,t)}exports.d=u;let d={get(e,t,r){if(e instanceof IDBTransaction){if("done"===t)return a.get(e);if("objectStoreNames"===t)return e.objectStoreNames||i.get(e);if("store"===t)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return I(e[t])},has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function v(e){d=e(d)}function D(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?o().includes(e)?function(...t){return e.apply(B(this),t),I(s.get(this))}:function(...t){return I(e.apply(B(this),t))}:function(t,...r){const n=e.call(B(this),t,...r);return i.set(n,t.sort?t.sort():[t]),I(n)}}function m(t){return"function"==typeof t?D(t):(t instanceof IDBTransaction&&f(t),e(t,n())?new Proxy(t,d):t)}function I(e){if(e instanceof IDBRequest)return p(e);if(c.has(e))return c.get(e);const t=m(e);return t!==e&&(c.set(e,t),u.set(t,e)),t}const B=e=>u.get(e);exports.e=B;
},{}],"sI9i":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.openDB=t,exports.deleteDB=n,Object.defineProperty(exports,"unwrap",{enumerable:!0,get:function(){return e.e}}),Object.defineProperty(exports,"wrap",{enumerable:!0,get:function(){return e.a}});var e=require("./chunk.js");function t(t,n,{blocked:r,upgrade:o,blocking:a}={}){const s=indexedDB.open(t,n),d=(0,e.a)(s);return o&&s.addEventListener("upgradeneeded",t=>{o((0,e.a)(s.result),t.oldVersion,t.newVersion,(0,e.a)(s.transaction))}),r&&s.addEventListener("blocked",()=>r()),a&&d.then(e=>e.addEventListener("versionchange",a)),d}function n(t,{blocked:n}={}){const r=indexedDB.deleteDatabase(t);return n&&r.addEventListener("blocked",()=>n()),(0,e.a)(r).then(()=>void 0)}const r=["get","getKey","getAll","getAllKeys","count"],o=["put","add","delete","clear"],a=new Map;function s(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(a.get(t))return a.get(t);const n=t.replace(/FromIndex$/,""),s=t!==n,d=o.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!d&&!r.includes(n))return;const i=async function(e,...t){const r=this.transaction(e,d?"readwrite":"readonly");let o=r.store;s&&(o=o.index(t.shift()));const a=o[n](...t);return d&&await r.done,a};return a.set(t,i),i}(0,e.b)(e=>({get:(t,n,r)=>s(t,n)||e.get(t,n,r),has:(t,n)=>!!s(t,n)||e.has(t,n)}));
},{"./chunk.js":"pNKq"}],"kJfG":[function(require,module,exports) {
"use strict";var e=require("./chunk.js");const t=["continue","continuePrimaryKey","advance"],n={},r=new WeakMap,i=new WeakMap,s={get(e,s){if(!t.includes(s))return e[s];let a=n[s];return a||(a=n[s]=function(...e){r.set(this,i.get(this)[s](...e))}),a}};async function*a(...t){let n=this;if(n instanceof IDBCursor||(n=await n.openCursor(...t)),!n)return;n=n;const a=new Proxy(n,s);for(i.set(a,n),e.d.set(a,(0,e.e)(n));n;)yield a,n=await(r.get(a)||n.continue()),r.delete(a)}function c(t,n){return n===Symbol.asyncIterator&&(0,e.c)(t,[IDBIndex,IDBObjectStore,IDBCursor])||"iterate"===n&&(0,e.c)(t,[IDBIndex,IDBObjectStore])}(0,e.b)(e=>({get:(t,n,r)=>c(t,n)?a:e.get(t,n,r),has:(t,n)=>c(t,n)||e.has(t,n)}));
},{"./chunk.js":"pNKq"}],"nw8M":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./build/esm/index.js");Object.keys(e).forEach(function(r){"default"!==r&&"__esModule"!==r&&Object.defineProperty(exports,r,{enumerable:!0,get:function(){return e[r]}})}),require("./build/esm/async-iterators.js");
},{"./build/esm/index.js":"sI9i","./build/esm/async-iterators.js":"kJfG"}],"ogM3":[function(require,module,exports) {
var e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(e){var o=new Uint8Array(16);module.exports=function(){return e(o),o}}else{var r=new Array(16);module.exports=function(){for(var e,o=0;o<16;o++)0==(3&o)&&(e=4294967296*Math.random()),r[o]=e>>>((3&o)<<3)&255;return r}}
},{}],"O4sp":[function(require,module,exports) {
for(var r=[],o=0;o<256;++o)r[o]=(o+256).toString(16).substr(1);function t(o,t){var n=t||0,u=r;return[u[o[n++]],u[o[n++]],u[o[n++]],u[o[n++]],"-",u[o[n++]],u[o[n++]],"-",u[o[n++]],u[o[n++]],"-",u[o[n++]],u[o[n++]],"-",u[o[n++]],u[o[n++]],u[o[n++]],u[o[n++]],u[o[n++]],u[o[n++]]].join("")}module.exports=t;
},{}],"37UO":[function(require,module,exports) {
var r=require("./lib/rng"),n=require("./lib/bytesToUuid");function e(e,i,u){var a=i&&u||0;"string"==typeof e&&(i="binary"===e?new Array(16):null,e=null);var l=(e=e||{}).random||(e.rng||r)();if(l[6]=15&l[6]|64,l[8]=63&l[8]|128,i)for(var o=0;o<16;++o)i[a+o]=l[o];return i||n(l)}module.exports=e;
},{"./lib/rng":"ogM3","./lib/bytesToUuid":"O4sp"}],"2wN2":[function(require,module,exports) {
"use strict";var e=/["'&<>]/;function r(r){var a,t=""+r,s=e.exec(t);if(!s)return t;var c="",n=0,u=0;for(n=s.index;n<t.length;n++){switch(t.charCodeAt(n)){case 34:a="&quot;";break;case 38:a="&amp;";break;case 39:a="&#39;";break;case 60:a="&lt;";break;case 62:a="&gt;";break;default:continue}u!==n&&(c+=t.substring(u,n)),u=n+1,c+=a}return u!==n?c+t.substring(u,n):c}module.exports=r;
},{}],"uD46":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setupIndexedDB=s;var t=require("idb/with-async-ittr.js"),e=n(require("uuid/v4")),o=n(require("escape-html"));function n(t){return t&&t.__esModule?t:{default:t}}function a(t){var e;if("undefined"!=typeof Symbol){if(Symbol.asyncIterator&&null!=(e=t[Symbol.asyncIterator]))return e.call(t);if(Symbol.iterator&&null!=(e=t[Symbol.iterator]))return e.call(t)}throw new TypeError("Object is not async iterable")}const l=s(),r=document.querySelector(".new-todo"),d=document.querySelector(".todo-list"),c=new Headers({"Content-Type":"application/json; charset=UTF-8"}),i="//jsonplaceholder.typicode.com/todos";function s(){return"indexedDB"in window?(0,t.openDB)("pwa-test-db",1,{upgrade(t,e,o,n){if(console.log(e),console.log(n),!t.objectStoreNames.contains("todos")){t.createObjectStore("todos")}}}):null}function u(){r.addEventListener("change",async t=>{const o=t.target.value.trim();r.value="",console.log("adding todo?",o);const n=(0,e.default)();let a={userId:1,title:o,completed:!1,localKey:n,saved:!1};fetch(i,{method:"POST",body:JSON.stringify(a),headers:c}).then(t=>t.json()).then(t=>{t.saved=!0,b([t],n),w(t,n)}),b([a]),f(a,n)})}async function y(t){let o=(await l).transaction("todos","readwrite"),n=o.objectStore("todos");return await n.clear(),t.forEach(t=>{const o=(0,e.default)();n.add(t,o)}),o.done}async function f(t,e){let o=(await l).transaction("todos","readwrite");o.objectStore("todos").add(t,e),await o.done,console.log("Added a todo to the store",e)}async function w(t,e){let o=(await l).transaction("todos","readwrite");o.objectStore("todos").put(t,e),await o.done,console.log("Added a todo to the store",e)}function b(t,e){t.forEach(t=>{if(e){const t=document.querySelector(`li[data-id="${e}"]`);t&&t.remove()}const n=`<li data-id="${t.id?t.id:t.localKey}" ${t.completed?' class="completed"':""}>\n                <input class="toggle" type="checkbox" ${t.completed?"checked":""}>\n                <label>${(0,o.default)(t.title)}</label>\n                <button ${t.saved?' class="saved"':t.localKey?' class="local"':""}></button>\n                <button class="destroy"></button>\n            </li>`;d.insertAdjacentHTML("afterbegin",n)}),d.parentElement.style.display="block"}function h(){d.addEventListener("click",async t=>{let e=t.target;if(e.classList.contains("destroy")){const t=e.parentElement;let o=(await l).transaction("todos","readwrite"),n=o.objectStore("todos");await n.delete(Number(t.getAttribute("data-id"))),d.removeChild(t),0===d.children.length&&(d.parentElement.style.display="none"),await o.done,console.log("deleted a todo from the store")}})}async function p(){try{let e=await fetch(i,{method:"GET",headers:c}),o=await e.json();b(o),y(o)}catch(t){throw navigator.onLine||(console.log("offline so loading from indexeddb"),m()),t}}async function m(){const t=(await l).transaction("todos");var e,o=!0,n=!1;try{for(var r,d,c=a(t.store);o=(r=await c.next()).done,d=await r.value,!o;o=!0){const t=d;if(!t)return;let e=t.value;e.id||(e.localKey=t.key),b([e]),t.continue()}}catch(i){n=!0,e=i}finally{try{o||null==c.return||await c.return()}finally{if(n)throw e}}await t.done,console.log("done")}u(),h(),p();
},{"idb/with-async-ittr.js":"nw8M","uuid/v4":"37UO","escape-html":"2wN2"}],"epB2":[function(require,module,exports) {
"use strict";var e=require("./setupServiceWorker.js"),r=require("./setupIndexedDB.js");(0,e.setupServiceWorker)(),(0,r.setupIndexedDB)();
},{"./setupServiceWorker.js":"QGXO","./setupIndexedDB.js":"uD46"}]},{},["epB2"], null)
//# sourceMappingURL=/pwa-test/main.24ed4175.js.map