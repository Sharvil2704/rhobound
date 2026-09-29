// Runs before paint so the saved or system theme applies without a flash. Also flags
// that JS is running (enables scroll reveals) and drops the flag if the reveal
// observer hasn't started within 4 s, so content is never left hidden.
export const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('rb-theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t;}catch(e){d.dataset.theme='light';}d.dataset.js='1';setTimeout(function(){if(!window.__rv)delete d.dataset.js;},4000);})();`;
