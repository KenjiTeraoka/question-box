(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{6429:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return e(4984)}])},4984:function(n,t,e){"use strict";e.r(t),e.d(t,{AuthStateChanged:function(){return r},default:function(){return i}});var u=e(5893),o=e(8578),c=e(7294),s=e(694),l=e(1163);function r(n){let{auth:t}=n,[e,u]=(0,c.useState)(null);return(0,c.useEffect)(()=>{let n=(0,o.Aj)(t,n=>{u(n)});return()=>{n()}},[t]),(0,c.useEffect)(()=>{console.log("User:",e)},[e]),null}function i(){let n=new o.hJ,t=(0,l.useRouter)(),e=()=>{(0,o.rh)(s.I,n).then(n=>{console.log(n.user.displayName),t.push("/")}).catch(n=>{console.log(n)})},c=()=>(0,o.w7)(s.I).then(()=>{console.log("Sign-out successful.")}).catch(n=>{console.log(n)});return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(r,{auth:s.I}),(0,u.jsx)("button",{onClick:e,children:"sign in"}),(0,u.jsx)("button",{onClick:c,children:"sign out"})]})}},1163:function(n,t,e){n.exports=e(387)}},function(n){n.O(0,[774,888,179],function(){return n(n.s=6429)}),_N_E=n.O()}]);