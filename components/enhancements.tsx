import type { SiteContent } from "@/lib/content/types"

/**
 * Every interaction on this page is imperative DOM work: reveal on scroll,
 * append to the spine, toggle the menu. Doing it in one inline script keeps the
 * page free of client components, so nothing has to hydrate before it responds.
 */
const SCRIPT = `(function(){
  var d=document, reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- scroll reveal: a sweep, so a fast scroll or an anchor jump can never
  // strand an element at opacity 0 ---
  var pending=[].slice.call(d.querySelectorAll(".reveal"));
  function revealAll(){for(var i=0;i<pending.length;i++)pending[i].classList.add("is-visible");pending=[];}
  if(reduced){revealAll();}else{
    var queued=false;
    var sweep=function(){
      queued=false;
      var limit=innerHeight*0.94,next=[];
      for(var i=0;i<pending.length;i++){
        if(pending[i].getBoundingClientRect().top>limit){next.push(pending[i]);}
        else{pending[i].classList.add("is-visible");}
      }
      pending=next;
      if(!pending.length)stopSweep();
    };
    var onScroll=function(){if(!queued){queued=true;requestAnimationFrame(sweep);}};
    var stopSweep=function(){removeEventListener("scroll",onScroll);removeEventListener("resize",onScroll);};
    addEventListener("scroll",onScroll,{passive:true});
    addEventListener("resize",onScroll);
    sweep();
  }

  // --- audit spine ---
  var spine=d.querySelector(".spine"), log=spine&&spine.querySelector("ol");
  if(spine&&log&&!reduced&&matchMedia("(min-width: 1280px)").matches&&"IntersectionObserver" in window){
    var marks=JSON.parse(spine.getAttribute("data-spine")||"[]"), seen={};
    var pad=function(n){return n<10?"0"+n:""+n;};
    var io=new IntersectionObserver(function(entries){
      entries.filter(function(e){return e.isIntersecting;})
        .sort(function(a,b){return a.target.compareDocumentPosition(b.target)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1;})
        .forEach(function(e){
          var id=e.target.id; if(seen[id])return; seen[id]=1;
          var mark=marks.filter(function(m){return m.id===id;})[0]; if(!mark)return;
          var t=new Date(), li=d.createElement("li");
          li.innerHTML='<span class="spine__time">'+pad(t.getHours())+":"+pad(t.getMinutes())+":"+pad(t.getSeconds())+
            '</span> ENTERED<span class="spine__label"><span class="spine__tick">\\u25AA</span> '+mark.label+"</span>";
          log.appendChild(li);
        });
    },{rootMargin:"-30% 0px -60% 0px"});
    marks.forEach(function(m){var el=d.getElementById(m.id); if(el)io.observe(el);});
  }

  // --- nav: menu toggle and active section ---
  var toggle=d.querySelector(".nav__toggle"), panel=d.getElementById("nav-panel");
  if(toggle&&panel){
    toggle.addEventListener("click",function(){
      var open=toggle.getAttribute("aria-expanded")==="true";
      toggle.setAttribute("aria-expanded",String(!open));
      panel.hidden=open;
    });
    panel.addEventListener("click",function(e){
      if(e.target.tagName==="A"){toggle.setAttribute("aria-expanded","false");panel.hidden=true;}
    });
  }
  var links=[].slice.call(d.querySelectorAll(".nav__link"));
  if(links.length&&"IntersectionObserver" in window){
    var nav=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting)return;
        links.forEach(function(a){
          if(a.getAttribute("href")==="#"+e.target.id)a.setAttribute("aria-current","true");
          else a.removeAttribute("aria-current");
        });
      });
    },{rootMargin:"-45% 0px -50% 0px"});
    links.forEach(function(a){var el=d.getElementById(a.getAttribute("href").slice(1)); if(el)nav.observe(el);});
  }
})();`

export function Enhancements(_: { content: SiteContent }) {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
}
