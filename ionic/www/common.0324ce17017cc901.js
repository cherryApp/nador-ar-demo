"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[592],{5099:(J,g,u)=>{u.d(g,{q:()=>x});var n=u(5861),h=u(9127),y=u(2014),c=u(5619),p=u(6973),v=u(305),d=u(2181);let x=(()=>{class l{constructor(){this.storage=(0,h.f3M)(y.K),this._storage=null,this.hasStorage=new c.X(!1),this.list$=new c.X([]),this.selected=new c.X(null),this.initStorage()}initStorage(){var e=this;return(0,n.Z)(function*(){const r=yield e.storage.create();e._storage=r,e.hasStorage.next(!0)})()}waitForStorage(){return!0===this.hasStorage.value?Promise.resolve(!0):function S(l,f){const e="object"==typeof f;return new Promise((r,t)=>{const s=new v.Hp({next:i=>{r(i),s.unsubscribe()},error:t,complete:()=>{e?r(f.defaultValue):t(new p.K)}});l.subscribe(s)})}(this.hasStorage.pipe((0,d.h)(e=>!0===e)))}getAll(e="machineHistory"){var r=this;return(0,n.Z)(function*(){yield r.waitForStorage(),r._storage?.get(e).then(t=>{r.list$.next(t?JSON.parse(t):[])}).catch(t=>{console.error(t)})})()}get(e,r="machineHistory"){var t=this;return(0,n.Z)(function*(){yield t.waitForStorage(),t._storage?.get(r).then(s=>{t.selected.next(s?JSON.parse(s).find(i=>i.id===e):null)})})()}add(e,r="machineHistory"){var t=this;return(0,n.Z)(function*(){yield t.waitForStorage();const s=t.list$.value.find(i=>i.values.guid===e.values.guid);if(s)return e.id=s.id,yield t.update(e,r);t._storage?.get(r).then(function(){var i=(0,n.Z)(function*(o){if(o){const a=JSON.parse(o),m=Math.max(...a.map(w=>w.id),0);e.id=m+1,a.push(e),yield t._storage?.set(r,JSON.stringify(a)),t.list$.next(a)}else e.id=1,yield t._storage?.set(r,JSON.stringify([e])),t.list$.next([e])});return function(o){return i.apply(this,arguments)}}())})()}update(e,r="machineHistory"){var t=this;return(0,n.Z)(function*(){yield t.waitForStorage(),t._storage?.get(r).then(function(){var s=(0,n.Z)(function*(i){if(i){const o=JSON.parse(i).map(a=>a.id===e.id?e:a);yield t._storage?.set(r,JSON.stringify(o)),t.list$.next(o)}});return function(i){return s.apply(this,arguments)}}())})()}remove(e,r="machineHistory"){var t=this;return(0,n.Z)(function*(){yield t.waitForStorage(),t._storage?.get(r).then(function(){var s=(0,n.Z)(function*(i){if(i){const o=JSON.parse(i).filter(a=>a.id!==e);yield t._storage?.set(r,JSON.stringify(o)),t.list$.next(o)}});return function(i){return s.apply(this,arguments)}}())})()}static#t=this.\u0275fac=function(r){return new(r||l)};static#e=this.\u0275prov=h.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"})}return l})()}}]);