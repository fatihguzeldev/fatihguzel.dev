export function getFocusSourceScript(): string {
  return `(function(){var r=document.documentElement;function p(){r.dataset.focusSource='pointer';}function k(e){if(e.key==='Tab'){r.dataset.focusSource='keyboard';}}r.dataset.focusSource='pointer';window.addEventListener('pointerdown',p,{capture:true,passive:true});window.addEventListener('touchstart',p,{capture:true,passive:true});window.addEventListener('keydown',k,true);}());`
}
