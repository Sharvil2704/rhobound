// Runs before paint so the saved or system theme applies without a flash. Also flags
// that JS is running (enables scroll reveals) and drops the flag if the reveal
// observer hasn't started within 4 s, so content is never left hidden. Deep links
// (a URL with a #hash) skip the opening intro, and the entry path is recorded so the
// intro only plays when the homepage itself was loaded. Any input skips the intro;
// the listeners live here so they work before hydration.
export const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('rb-theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t;}catch(e){d.dataset.theme='light';}d.dataset.js='1';window.__rbEntry=location.pathname;if(location.hash)d.dataset.nointro='1';['pointerdown','keydown','wheel','touchstart'].forEach(function(e){addEventListener(e,function(){d.dataset.introskip='1';},{passive:true,once:true});});setTimeout(function(){if(!window.__rv)delete d.dataset.js;},4000);})();`;
