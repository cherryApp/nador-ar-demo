"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[312],{1312:(Z,s,n)=>{n.r(s),n.d(s,{DeviceComponent:()=>C});var d=n(6814),e=n(6242),i=n(3403),p=n(4525),o=n(8890),v=n(9862),m=n(553);let l=(()=>{class t{get url(){return`${this.apiUrl}${this.entityName}`}constructor(){this.http=(0,e.f3M)(v.eN),this.apiUrl=m.N.apiUrl,this.entityName=""}getAll(){return this.http.get(this.url)}static#e=this.\u0275fac=function(c){return new(c||t)};static#t=this.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var h=n(2096);let u=(()=>{class t extends l{constructor(){super(),this.entityName="devices"}getAll(){return(0,h.of)([{id:1,name:"Device 1",code:"D1",active:!0,company:"Company 1"},{id:2,name:"Device 2",code:"D2",active:!1,company:"Company 2"},{id:3,name:"Device 3",code:"D3",active:!0,company:"Company 3"},{id:4,name:"Device 4",code:"D4",active:!0,company:"Company 4"},{id:5,name:"Device 5",code:"D5",active:!1,company:"Company 5"},{id:6,name:"Device 6",code:"D6",active:!0,company:"Company 6"},{id:7,name:"Device 7",code:"D7",active:!0,company:"Company 7"},{id:8,name:"Device 8",code:"D8",active:!0,company:"Company 8"},{id:9,name:"Device 9",code:"D9",active:!0,company:"Company 9"}])}static#e=this.\u0275fac=function(c){return new(c||t)};static#t=this.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();const y=(t,r)=>r.id;function f(t,r){if(1&t&&(e.TgZ(0,"ion-card")(1,"ion-card-header")(2,"ion-card-title"),e._uU(3),e.qZA(),e.TgZ(4,"ion-card-subtitle"),e._uU(5),e.qZA()(),e.TgZ(6,"ion-card-content")(7,"div"),e._uU(8),e.qZA(),e.TgZ(9,"div"),e._uU(10),e.qZA()(),e.TgZ(11,"ion-button",0),e._UZ(12,"ion-icon",1),e._uU(13," M\xe9r\xe9sek "),e.qZA()()),2&t){const a=r.$implicit;e.xp6(3),e.hij(" ",a.name," "),e.xp6(2),e.hij(" #",a.code," "),e.xp6(3),e.hij("C\xe9g: ",a.company,""),e.xp6(2),e.hij("St\xe1tusz: ",a.active?"Akt\xedv":"Inakt\xedv",""),e.xp6(2),e.Q6J("ios","bar-chart-outline")("md","bar-chart-sharp")}}function D(t,r){1&t&&e._uU(0," Nincsenek m\xe9r\u0151egys\xe9gek ")}let C=(()=>{class t{constructor(){this.deviceService=(0,e.f3M)(u),this.devices$=this.deviceService.getAll(),(0,p.a)({barChartOutline:o.sES,barChartSharp:o.vP6,briefcaseOutline:o.SVL,briefcaseSharp:o.jLW})}ngOnInit(){}static#e=this.\u0275fac=function(c){return new(c||t)};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-device"]],standalone:!0,features:[e._Bn([u]),e.jDz],decls:5,vars:3,consts:[["fill","clear"],["aria-hidden","true","slot","start",3,"ios","md"]],template:function(c,g){1&c&&(e.TgZ(0,"ion-content"),e.SjG(1,f,14,6,"ion-card",null,y,!1,D,1,0),e.ALo(4,"async"),e.qZA()),2&c&&(e.xp6(1),e.wJu(e.lcZ(4,1,g.devices$)))},dependencies:[i.PM,i.Zi,i.tO,i.Dq,i.FN,i.YG,i.W2,i.gu,d.Ov]})}return t})()}}]);