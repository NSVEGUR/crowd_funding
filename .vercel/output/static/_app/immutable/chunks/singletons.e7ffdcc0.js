import{w as u}from"./index.fe92fa36.js";var _;const b=((_=globalThis.__sveltekit_v5cgak)==null?void 0:_.base)??"";var h;const v=((h=globalThis.__sveltekit_v5cgak)==null?void 0:h.assets)??b,k="1682421625222",R="sveltekit:snapshot",T="sveltekit:scroll",I="sveltekit:index",f={tap:1,hover:2,viewport:3,eager:4,off:-1};function S(e){let t=e.baseURI;if(!t){const n=e.getElementsByTagName("base");t=n.length?n[0].href:e.URL}return t}function y(){return{x:pageXOffset,y:pageYOffset}}function i(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const d={...f,"":f.hover};function g(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function x(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=g(e)}}function O(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const o=e instanceof SVGAElement?e.target.baseVal:e.target,l=!n||!!o||m(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external")||e.hasAttribute("download");return{url:n,external:l,target:o}}function U(e){let t=null,n=null,o=null,l=null,r=null,a=null,s=e;for(;s&&s!==document.documentElement;)o===null&&(o=i(s,"preload-code")),l===null&&(l=i(s,"preload-data")),t===null&&(t=i(s,"keepfocus")),n===null&&(n=i(s,"noscroll")),r===null&&(r=i(s,"reload")),a===null&&(a=i(s,"replacestate")),s=g(s);return{preload_code:d[o??"off"],preload_data:d[l??"off"],keep_focus:t==="off"?!1:t===""?!0:null,noscroll:n==="off"?!1:n===""?!0:null,reload:r==="off"?!1:r===""?!0:null,replace_state:a==="off"?!1:a===""?!0:null}}function p(e){const t=u(e);let n=!0;function o(){n=!0,t.update(a=>a)}function l(a){n=!1,t.set(a)}function r(a){let s;return t.subscribe(c=>{(s===void 0||n&&c!==s)&&a(s=c)})}return{notify:o,set:l,subscribe:r}}function E(){const{set:e,subscribe:t}=u(!1);let n;async function o(){clearTimeout(n);const l=await fetch(`${v}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(l.ok){const a=(await l.json()).version!==k;return a&&(e(!0),clearTimeout(n)),a}else throw new Error(`Version check failed: ${l.status}`)}return{subscribe:t,check:o}}function m(e,t){return e.origin!==location.origin||!e.pathname.startsWith(t)}let w;function L(e){w=e.client}const N={url:p({}),page:p({}),navigating:u(null),updated:E()};export{I,f as P,T as S,R as a,O as b,U as c,y as d,b as e,x as f,S as g,L as h,m as i,w as j,N as s};
