/**
 * OpenReplay session replay, self-hosted at visit.monakes.com.
 *
 * The vendor snippet, unchanged apart from indentation. It only queues a start
 * command and appends an async <script>, so it neither blocks paint nor writes
 * to the DOM React is hydrating — which matters on this page, where a DOM write
 * landing mid-hydration is what killed every animation once already.
 */
const SCRIPT = `var initOpts = {
  projectKey: "lEesi1ErU9dHT5YL1ZP7",
  ingestPoint: "https://visit.monakes.com/ingest",
  defaultInputMode: 0,
  obscureTextNumbers: false,
  obscureTextEmails: false,
};
var startOpts = { userID: "" };
(function(A,s,a,y,e,r){
  r=window.OpenReplay=[e,r,y,[s-1, e]];
  s=document.createElement('script');s.src=A;s.async=!a;
  document.getElementsByTagName('head')[0].appendChild(s);
  r.start=function(v){r.push([0])};
  r.stop=function(v){r.push([1])};
  r.setUserID=function(id){r.push([2,id])};
  r.setUserAnonymousID=function(id){r.push([3,id])};
  r.setMetadata=function(k,v){r.push([4,k,v])};
  r.event=function(k,p,i){r.push([5,k,p,i])};
  r.issue=function(k,p){r.push([6,k,p])};
  r.isActive=function(){return false};
  r.getSessionToken=function(){};
})("//static.openreplay.com/18.0.17/openreplay-assist.js",1,0,initOpts,startOpts);`

export function OpenReplay() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
}
