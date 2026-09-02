/**
 * OpenReplay session replay, self-hosted at visit.monakes.com.
 *
 * The vendor snippet, unchanged apart from indentation, followed by the
 * metadata we can honestly supply. It only queues commands and appends an async
 * <script>, so it neither blocks paint nor writes to the DOM React is
 * hydrating — which matters on this page, where a DOM write landing
 * mid-hydration is what killed every animation once already.
 *
 * No setUserID call: the site has no accounts, no login and no forms, so there
 * is no identifier to pass and a placeholder would only pollute the dashboard.
 * When one exists, it is one line here:
 *
 *   window.OpenReplay.setUserID(theEmailOrInternalId)
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
})("//static.openreplay.com/18.0.17/openreplay-assist.js",1,0,initOpts,startOpts);

// Metadata. The stub above queues these until the recorder loads, so they can
// be set synchronously here. Only non-identifying traits: this site has no
// accounts, so there is no user id to bind — see setUserID in the comment above.
// Each key must also be declared in the OpenReplay project under
// Preferences -> Metadata, or the backend drops it.
try {
  var q = new URLSearchParams(location.search);
  var meta = {
    locale: document.documentElement.lang,
    source: q.get("utm_source"),
    medium: q.get("utm_medium"),
    campaign: q.get("utm_campaign"),
    referrer: document.referrer ? new URL(document.referrer).hostname : "direct"
  };
  for (var k in meta) if (meta[k]) window.OpenReplay.setMetadata(k, String(meta[k]));
} catch (e) {}`

export function OpenReplay() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
}
