/**
 * Every behaviour on this page is imperative DOM work run from one inline
 * script: the grain, the reveal, the scramble, the Doha clock, the case-file
 * rail, the hash chain, the count-ups, the evidence scale, the magnetic CTA,
 * the seal ceremony and the page's own SHA-256. Keeping it here means the page
 * ships no client components and nothing has to hydrate before it responds.
 */
const SCRIPT = `(function(){
function boot(){
  var d=document, rm=matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Arming the reveal here rather than in <head> is what keeps this safe: the
  // page ships visible, and the class that hides un-scrolled elements lands in
  // the same task as the first sweep, so nothing ever paints blank.
  d.documentElement.classList.add("js");
  var $$=function(s){return [].slice.call(d.querySelectorAll(s));};
  var pad=function(n){return n<10?"0"+n:""+n;};
  var stamp=function(t){return pad(t.getHours())+":"+pad(t.getMinutes())+":"+pad(t.getSeconds());};
  var IO=window.IntersectionObserver;

  // --- film grain: applied at runtime so the turbulence URI never blocks paint
  var GRAIN="url('data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27240%27%20height%3D%27240%27%3E%3Cfilter%20id%3D%27n%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.9%27%20numOctaves%3D%272%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27240%27%20height%3D%27240%27%20filter%3D%27url(%23n)%27%2F%3E%3C%2Fsvg%3E')";
  $$("[data-grain]").forEach(function(g){g.style.backgroundImage=GRAIN;});

  // --- reveal: a sweep as well as an observer, so a fast scroll or an anchor
  // jump can never strand an element at opacity 0
  var pending=$$(".reveal");
  var show=function(el){el.classList.add("is-visible");};
  if(rm||!IO){pending.forEach(show);pending=[];}
  else{
    var sweep=function(){
      var next=[];
      for(var i=0;i<pending.length;i++){
        var r=pending[i].getBoundingClientRect();
        if(r.top<innerHeight*0.97&&r.bottom>-20)show(pending[i]);else next.push(pending[i]);
      }
      pending=next;
    };
    var revIO=new IO(function(es){es.forEach(function(e){
      if(e.isIntersecting){show(e.target);revIO.unobserve(e.target);}
    });},{threshold:0.05,rootMargin:"0px 0px -6% 0px"});
    pending.forEach(function(el){revIO.observe(el);});
    sweep();
  }

  // --- scramble-settle, mono labels only. Skipped in RTL: scrambling Arabic
  // through a Latin alphabet reorders the line while it settles.
  if(!rm&&IO&&d.documentElement.getAttribute("dir")!=="rtl"){
    var chars="0123456789ABCDEF\\u00A7\\u25AA";
    var scrIO=new IO(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return;
      scrIO.unobserve(e.target);
      var nodes=[], walk=d.createTreeWalker(e.target,NodeFilter.SHOW_TEXT), n;
      while((n=walk.nextNode()))nodes.push([n,n.nodeValue]);
      var t0=performance.now(), dur=620;
      var tick=function(now){
        var p=Math.min((now-t0)/dur,1);
        nodes.forEach(function(nn){
          var fin=nn[1], cut=Math.floor(fin.length*p), out=fin.slice(0,cut);
          for(var i=cut;i<fin.length;i++)out+=fin[i]===" "?" ":chars[(Math.random()*chars.length)|0];
          nn[0].nodeValue=out;
        });
        if(p<1)requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });},{threshold:0.3});
    $$("[data-scramble]").forEach(function(el){scrIO.observe(el);});
  }

  // --- Doha clock
  var clocks=$$("[data-clock]");
  if(clocks.length){
    var setT=function(){
      var s;
      try{s=new Date().toLocaleTimeString("en-GB",{timeZone:"Asia/Qatar",hour12:false});}
      catch(e){s=new Date().toLocaleTimeString("en-GB",{hour12:false});}
      clocks.forEach(function(c){c.textContent=s;});
    };
    setT();
    setInterval(setT,1000);
  }

  // --- case-file rail: fills as the reader descends, each entry stamped with
  // the clock time it was reached and never rewritten
  var rail=d.querySelector("[data-rail]");
  var rows=$$("[data-rail-row]").map(function(row){
    return {id:row.getAttribute("data-rail-row"),row:row,time:row.querySelector("[data-rail-time]"),seen:false};
  });
  var cases=$$("[data-case]");
  if(rows.length&&IO){
    var caseIO=new IO(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return;
      var idx=rows.findIndex(function(r){return r.id===e.target.id;});
      if(idx<0)return;
      rows.forEach(function(r,i){
        r.row.classList.toggle("is-current",i===idx);
        r.row.classList.toggle("is-passed",i<idx);
        if(i===idx&&!r.seen){r.seen=true;if(r.time)r.time.textContent=stamp(new Date());}
      });
    });},{rootMargin:"-35% 0px -50% 0px",threshold:0});
    cases.forEach(function(s){caseIO.observe(s);});
  }

  // --- nav: current section, and the bar settling onto a rule past 100px
  var nav=d.querySelector("[data-nav]");
  var links=$$("[data-navlink]"), byId={};
  links.forEach(function(a){byId[a.getAttribute("href").slice(1)]=a;});
  if(links.length&&IO){
    var navIO=new IO(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return;
      links.forEach(function(a){a.removeAttribute("aria-current");});
      var a=byId[e.target.id];
      if(a)a.setAttribute("aria-current","true");
    });},{rootMargin:"-38% 0px -52% 0px",threshold:0});
    Object.keys(byId).forEach(function(id){var s=d.getElementById(id);if(s)navIO.observe(s);});
  }

  // --- §04: the chain seals as you read
  var chainCount=d.querySelector("[data-chaincount]"), sealed=0;
  var chainLinks=$$("[data-link]");
  if(rm||!IO){
    chainLinks.forEach(function(l){l.classList.add("is-sealed");});
    if(chainCount)chainCount.textContent=String(chainLinks.length);
  }else{
    var chainIO=new IO(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return;
      chainIO.unobserve(e.target);
      e.target.classList.add("is-sealed");
      sealed++;
      if(chainCount)chainCount.textContent=String(sealed);
    });},{rootMargin:"-42% 0px -42% 0px",threshold:0});
    chainLinks.forEach(function(l){chainIO.observe(l);});
  }

  // --- monuments count up
  if(!rm&&IO){
    var cIO=new IO(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return;
      cIO.unobserve(e.target);
      var end=+e.target.getAttribute("data-count"), t0=performance.now(), dur=1200;
      var tick=function(now){
        var p=Math.min((now-t0)/dur,1);
        e.target.textContent=String(Math.round(end*(1-Math.pow(1-p,3))));
        if(p<1)requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });},{threshold:0.5});
    $$("[data-count]").forEach(function(el){cIO.observe(el);});
  }

  // --- §02: the evidence scale reads out the grade under the pointer
  var readEl=d.querySelector("[data-scale-read]");
  var host=d.querySelector("[data-readouts]");
  if(readEl&&host){
    var defs={};
    try{defs=JSON.parse(host.getAttribute("data-readouts"));}catch(e){}
    var setRead=function(k){if(defs[k])readEl.textContent=defs[k];};
    $$("[data-deg]").forEach(function(cell){
      var k=cell.getAttribute("data-deg");
      ["mouseenter","focus","click"].forEach(function(ev){cell.addEventListener(ev,function(){setRead(k);});});
      ["mouseleave","blur"].forEach(function(ev){cell.addEventListener(ev,function(){setRead("def");});});
    });
  }

  // --- the one action pulls toward the pointer
  if(!rm){
    $$("[data-mag]").forEach(function(wrap){
      var btn=wrap.querySelector("a");
      if(!btn)return;
      wrap.addEventListener("mousemove",function(ev){
        var r=wrap.getBoundingClientRect();
        var dx=ev.clientX-(r.left+r.width/2), dy=ev.clientY-(r.top+r.height/2);
        btn.style.transform="translate("+(dx*0.12).toFixed(1)+"px,"+(dy*0.18).toFixed(1)+"px) scale(1.02)";
      });
      wrap.addEventListener("mouseleave",function(){btn.style.transform="none";});
    });
  }

  // --- the seal ceremony
  var stage=d.querySelector("[data-sealstage]");
  if(stage){
    var nodes=$$("[data-schain]"), slinks=$$("[data-slink]");
    var stampEl=d.querySelector("[data-stamp]"), stime=d.querySelector("[data-sealtime]");
    var fire=function(){
      if(stime)stime.textContent=stamp(new Date());
      nodes.forEach(function(sq,i){
        setTimeout(function(){
          sq.classList.add("is-closed");
          if(slinks[i])slinks[i].classList.add("is-closed");
        },rm?0:160*i);
      });
      setTimeout(function(){if(stampEl)stampEl.classList.add("is-struck");},rm?0:160*nodes.length+150);
    };
    if(!IO)fire();
    else{
      var sealIO=new IO(function(es){es.forEach(function(e){
        if(e.isIntersecting){sealIO.unobserve(e.target);fire();}
      });},{threshold:0.35});
      sealIO.observe(stage);
    }
  }

  // --- scroll: nav compress, reveal sweep, and the rail flipping to light
  // while its band sits over a vault section
  var darks=$$("[data-dark]"), raf=0, light=null;
  var onScroll=function(){
    if(raf)return;
    raf=requestAnimationFrame(function(){
      raf=0;
      if(pending&&pending.length)sweep();
      if(nav)nav.classList.toggle("is-scrolled",scrollY>100);
      if(rail&&darks.length){
        var h=rail.offsetHeight||280, top=120, bot=120+h, overlap=0;
        darks.forEach(function(el){
          var r=el.getBoundingClientRect();
          overlap+=Math.max(0,Math.min(bot,r.bottom)-Math.max(top,r.top));
        });
        var on=overlap>h*0.5;
        if(on!==light){light=on;rail.classList.toggle("is-light",on);}
      }
    });
  };
  addEventListener("scroll",onScroll,{passive:true});
  addEventListener("resize",onScroll);
  onScroll();

  // --- mobile menu
  var btn=d.querySelector("[data-menubtn]"), panel=d.querySelector("[data-menupanel]");
  if(btn&&panel){
    btn.addEventListener("click",function(){
      var open=panel.style.display==="block";
      panel.style.display=open?"none":"block";
      btn.setAttribute("aria-expanded",String(!open));
    });
    $$("[data-menupanel] a").forEach(function(a){a.addEventListener("click",function(){
      panel.style.display="none";
      btn.setAttribute("aria-expanded","false");
    });});
  }

  // --- the page hashes itself. Exhibit A carries the same property every
  // Decision Record does.
  var hashes=[d.querySelector("[data-herohash]"),d.querySelector("[data-pagehash]")].filter(Boolean);
  if(hashes.length&&window.crypto&&crypto.subtle){
    crypto.subtle.digest("SHA-256",new TextEncoder().encode(d.body.innerText)).then(function(buf){
      var hex=Array.prototype.map.call(new Uint8Array(buf),function(b){
        return b.toString(16).padStart(2,"0");
      }).join("");
      hashes.forEach(function(e){e.textContent="SHA-256 "+hex.slice(0,20)+"\\u2026";});
    }).catch(function(){hashes.forEach(function(e){e.style.visibility="hidden";});});
  }else{
    hashes.forEach(function(e){e.style.visibility="hidden";});
  }
}
// React owns every node on this page, so nothing may touch the DOM until
// hydration has finished — a text node changed underneath React makes it throw
// the whole tree away and re-render, discarding all of the above.
if(document.readyState==="complete")boot();
else addEventListener("load",boot);
})();`

export function Enhancements() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
}
