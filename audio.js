/* 판소리대학교 3곡 플레이어 — MP3 파일은 audio/소리1.mp3 등 직접 업로드 */
(() => {
 'use strict';
 const tracks = ['소리1','소리2','소리3'].map(name => ({ name, url: `audio/${name}.mp3` }));
 let current = 0, repeat = false, fallbackTried = false;
 const get = id => document.getElementById(id);
 const time = n => Number.isFinite(n) ? `${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,'0')}` : '0:00';
 const start = async () => {
   const audio = get('pansori-audio');
   try { await audio.play(); get('audio-status').textContent = '재생 중'; }
   catch (e) { get('audio-status').textContent = '음원 파일을 확인해 주세요 (audio 폴더)'; }
 };
 const load = (i, play = false) => {
   current = (i + tracks.length) % tracks.length;
   fallbackTried = false;
   const audio = get('pansori-audio');
   audio.pause(); audio.src = tracks[current].url; audio.load();
   get('audio-track-title').textContent = tracks[current].name;
   get('audio-status').textContent = '재생 준비';
   get('audio-progress').value = '0'; get('audio-current').textContent='0:00'; get('audio-total').textContent='0:00';
   get('audio-toggle').textContent = '▶';
   if(play) start();
 };
 document.addEventListener('DOMContentLoaded', () => {
   const audio=get('pansori-audio'); audio.volume=.7;
   load(0);
   get('audio-toggle').addEventListener('click', () => audio.paused ? start() : audio.pause());
   get('audio-prev').addEventListener('click', () => load(current-1,true));
   get('audio-next').addEventListener('click', () => load(current+1,true));
   get('audio-volume').addEventListener('input', e => audio.volume=Number(e.target.value)/100);
   get('audio-repeat').addEventListener('click', () => { repeat=!repeat; get('audio-repeat').setAttribute('aria-pressed',String(repeat)); });
   get('audio-progress').addEventListener('input', e => { if(Number.isFinite(audio.duration) && audio.duration>0) audio.currentTime=audio.duration*Number(e.target.value)/1000; });
   get('audio-panel-toggle').addEventListener('click', () => { const panel=get('audio-player'); const collapsed=panel.classList.toggle('is-collapsed'); get('audio-panel-toggle').setAttribute('aria-expanded',String(!collapsed)); });
   audio.addEventListener('play', () => {get('audio-toggle').textContent='Ⅱ';get('audio-toggle').setAttribute('aria-label','음악 일시정지');get('audio-status').textContent='재생 중';});
   audio.addEventListener('pause', () => {get('audio-toggle').textContent='▶';get('audio-toggle').setAttribute('aria-label','음악 재생');if(!audio.ended)get('audio-status').textContent='일시정지';});
   audio.addEventListener('loadedmetadata', () => {get('audio-total').textContent=time(audio.duration);get('audio-status').textContent=audio.paused?'재생 준비':'재생 중';});
   audio.addEventListener('timeupdate', () => {get('audio-current').textContent=time(audio.currentTime);get('audio-progress').value=audio.duration>0?String(Math.round(1000*audio.currentTime/audio.duration)):'0';});
   audio.addEventListener('ended', () => { if(repeat || current < tracks.length-1)load((current+1)%tracks.length,true);else{audio.currentTime=0;get('audio-status').textContent='재생 완료';} });
   audio.addEventListener('error', () => { if(!fallbackTried){fallbackTried=true; const wasPlaying=!audio.paused; audio.src=`./${tracks[current].name}.mp3`;audio.load();if(wasPlaying)start();return;}get('audio-status').textContent=`${tracks[current].name}.mp3 파일이 없습니다`; });
   document.addEventListener('click', e => {const btn=e.target.closest('[data-audio-play]');if(!btn)return; load(Number(btn.dataset.audioPlay),true);});
 });
})();
