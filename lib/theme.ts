// Runs before paint so the saved or system theme applies without a flash.
export const themeScript = `(function(){try{var t=localStorage.getItem('rb-theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;
