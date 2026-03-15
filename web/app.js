(async function(){
  async function fetchChannels(){ const r = await fetch('/api/channels'); return await r.json(); }
  let channels = await fetchChannels();
  let currentIndex = 0;
  channels.forEach(c => { if (typeof c.playIndex === 'undefined') c.playIndex = 0; });
  const RANDOM_START_MAX_SEC = 480;
  function randomIndexExcluding(size, exclude){
    if (!size || size <= 0) return 0;
    if (size === 1) return 0;
    let n = Math.floor(Math.random() * size);
    while (n === exclude) n = Math.floor(Math.random() * size);
    return n;
  }

  // TV mode: cycles channels automatically to simulate channel-surfing
  let tvMode = false;
  let tvIntervalMs = 60 * 1000; // 60s per channel by default
  let tvTimer = null;
  function startTv(){
    if (tvMode) return;
    if (!poweredOn) powerOnTv();
    tvMode = true;
    // enable fullscreen styling
    try { document.body.classList.add('tv-full'); } catch(e){}
    updateTvButton();
    // hide guide visually
    try{ guideEl && guideEl.classList.add('hidden'); }catch(e){}
    // choose a random channel (different from current if possible)
    if (channels.length > 0){
      currentIndex = randomIndexExcluding(channels.length, currentIndex);
      loadChannel(currentIndex);
    }
    tvTimer = setInterval(()=>{
      if (channels.length > 0){
        currentIndex = randomIndexExcluding(channels.length, currentIndex);
        loadChannel(currentIndex);
      }
    }, tvIntervalMs);
  }
  function stopTv(){
    if (!tvMode) return;
    tvMode = false;
    try { document.body.classList.remove('tv-full'); } catch(e){}
    updateTvButton();
    try{ guideEl && guideEl.classList.remove('hidden'); }catch(e){}
    if (tvTimer){ clearInterval(tvTimer); tvTimer = null; }
  }
  function toggleTv(){ if (tvMode) stopTv(); else startTv(); }
  function updateTvButton(){ const btn = document.getElementById('tvBtn'); if (btn) btn.textContent = tvMode ? '电视模式: 开 (T)' : '电视模式: 关 (T)'; }

  const guideEl = document.getElementById('guide');
  const channelsListEl = document.getElementById('channelsList');
  const playerEl = document.getElementById('player');
  const osdEl = document.getElementById('osd');
  const remoteBtn = document.getElementById('remoteBtn');
  const remoteModal = document.getElementById('remoteModal');
  const mouselessBtn = document.getElementById('mouselessBtn');
  let switchFxTimer = null;
  let zapTimer = null;
  let poweredOn = true;
  let mouselessMode = true;

  function showOsd(channel, item){
    if (!osdEl) return;
    const idx = currentIndex + 1;
    const name = channel && channel.name ? channel.name : 'Unknown';
    const title = item && item.title ? item.title : '';
    osdEl.textContent = `CH ${String(idx).padStart(2, '0')}  ${name}${title ? ' | ' + title : ''}`;
  }

  function triggerSwitchFx(){
    document.body.classList.add('switching');
    if (switchFxTimer) clearTimeout(switchFxTimer);
    switchFxTimer = setTimeout(() => document.body.classList.remove('switching'), 220);
  }

  function powerOffTv(){
    if (!poweredOn) return;
    poweredOn = false;
    stopTv();
    if (osdEl) osdEl.textContent = 'OFF';
    document.body.classList.add('powering-off');
    setTimeout(() => {
      document.body.classList.remove('powering-off');
      document.body.classList.add('power-off');
    }, 560);
  }

  function powerOnTv(){
    if (poweredOn) return;
    poweredOn = true;
    document.body.classList.remove('power-off');
    document.body.classList.add('booting');
    setTimeout(() => document.body.classList.remove('booting'), 1150);
    loadChannel(currentIndex);
  }

  function togglePower(){ if (poweredOn) powerOffTv(); else powerOnTv(); }

  function toggleRemoteModal(show){
    if (!remoteModal) return;
    const shouldShow = typeof show === 'boolean' ? show : remoteModal.classList.contains('hidden');
    remoteModal.classList.toggle('hidden', !shouldShow);
  }

  function applyMouselessMode(){
    document.body.classList.toggle('mouseless', mouselessMode);
    if (mouselessBtn) mouselessBtn.textContent = mouselessMode ? '无鼠标: 开 (M)' : '无鼠标: 关 (M)';
  }

  function toggleMouselessMode(){
    mouselessMode = !mouselessMode;
    applyMouselessMode();
  }

  const importBtn = document.getElementById('importBtn');
  const importForm = document.getElementById('importForm');
  const importSubmit = document.getElementById('importSubmit');

  importBtn.addEventListener('click', ()=>{ importForm.style.display = importForm.style.display === 'none' ? 'block' : 'none'; });
  const tvBtn = document.getElementById('tvBtn');
  if (tvBtn){ tvBtn.addEventListener('click', ()=>{ toggleTv(); }); updateTvButton(); }
  if (mouselessBtn){ mouselessBtn.addEventListener('click', ()=> toggleMouselessMode()); }
  if (remoteBtn){ remoteBtn.addEventListener('click', ()=> toggleRemoteModal()); }
  if (remoteModal){
    remoteModal.addEventListener('click', (e)=>{
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      if (target === remoteModal) { toggleRemoteModal(false); return; }
      const cmd = target.getAttribute('data-cmd');
      if (!cmd) return;
      if (cmd === 'close') { toggleRemoteModal(false); return; }
      if (cmd === 'power') { togglePower(); return; }
      if (!poweredOn) return;
      if (cmd === 'ch-up'){ currentIndex = (currentIndex - 1 + channels.length) % channels.length; loadChannel(currentIndex); }
      else if (cmd === 'ch-down'){ currentIndex = (currentIndex + 1) % channels.length; loadChannel(currentIndex); }
      else if (cmd === 'next'){ const ch = channels[currentIndex]; if (ch && ch.items && ch.items.length > 0) ch.playIndex = randomIndexExcluding(ch.items.length, ch.playIndex || 0); loadChannel(currentIndex); }
      else if (cmd === 'prev'){ const ch = channels[currentIndex]; if (ch && ch.items && ch.items.length > 0) ch.playIndex = ((ch.playIndex || 0) - 1 + ch.items.length) % ch.items.length; loadChannel(currentIndex); }
      else if (cmd === 'guide'){ guideEl.classList.toggle('hidden'); }
      else if (cmd === 'tv'){ toggleTv(); }
    });
  }

  importSubmit.addEventListener('click', async ()=>{
    const name = document.getElementById('importName').value.trim() || ('Imported ' + Date.now());
    const raw = document.getElementById('importArea').value.trim();
    if (!raw){ alert('请粘贴 BV 列表或 URL'); return; }
    const lines = raw.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
    const payload = { name: name, items: lines };
    const res = await fetch('/api/import', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const j = await res.json();
    if (res.ok && j.ok){ channels = await fetchChannels(); currentIndex = channels.length - 1; renderGuide(); loadChannel(currentIndex); importForm.style.display='none'; document.getElementById('importArea').value=''; document.getElementById('importName').value=''; }
    else { alert('导入失败: ' + JSON.stringify(j)); }
  });

  function renderGuide(){
    channelsListEl.innerHTML = channels.map((c,i)=>{
      const currentItem = (c.items && c.items[c.playIndex]) ? c.items[c.playIndex].title : '';
      return `<div class="channel ${i===currentIndex?'active':''}" data-idx="${i}"><span class="num">${i+1}</span><span class="name">${c.name}</span><div style="font-size:12px;color:#ccc;margin-top:4px">${currentItem}</div></div>`;
    }).join('');
    document.querySelectorAll('.channel').forEach(el=>{ el.addEventListener('click', ()=>{ currentIndex = Number(el.dataset.idx); loadChannel(currentIndex); }); });
  }

  async function loadChannel(idx){
    if (!poweredOn) return;
    const channel = channels[idx];
    if(!channel || !channel.items || channel.items.length===0){ playerEl.innerHTML = '<div style="color:#fff;padding:20px">该频道暂无内容</div>'; renderGuide(); return; }
    const item = channel.items[channel.playIndex || 0];
    const randomStart = Math.floor(Math.random() * RANDOM_START_MAX_SEC);
    const src = `https://player.bilibili.com/player.html?bvid=${item.bvid}&page=1&autoplay=1&t=${randomStart}`;
    triggerSwitchFx();
    showOsd(channel, item);
    document.body.classList.add('zapping');
    if (zapTimer) clearTimeout(zapTimer);
    playerEl.innerHTML = `
      <div style="position:relative;height:100%;width:100%;">
        <iframe id="biliplayer" src="${src}" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;margin:0;padding:0;opacity:0;"></iframe>
        <div id="controlMask"></div>
        <div id="interactionBlock"></div>
        <div class="meta" id="metaBlock"><img id="cover" src="${item.pic || ''}" style="height:48px;width:80px;object-fit:cover;border-radius:4px;margin-right:8px;vertical-align:middle;background:#222" onerror="this.style.display='none'"/><span id="metaText">${channel.name} — ${item.title}</span></div>
      </div>`;
    zapTimer = setTimeout(() => {
      const frame = document.getElementById('biliplayer');
      if (frame) frame.style.opacity = '1';
      document.body.classList.remove('zapping');
    }, 300);
    renderGuide();

    // fetch metadata
    fetch('/api/metadata/' + encodeURIComponent(item.bvid)).then(r=>r.json()).then(meta=>{
      if (meta && meta.title){
        const metaText = document.getElementById('metaText');
        metaText.textContent = `${meta.title} — ${meta.owner || ''}`;
        const cover = document.getElementById('cover');
        if (meta.pic) cover.src = meta.pic;
        showOsd(channel, { title: meta.title });
      }
      item.title = (meta && meta.title) ? meta.title : item.title;
      renderGuide();
    }).catch(()=>{});

    // message listener for embedded player
    window.addEventListener('message', function onMsg(e){
      try {
        const d = (typeof e.data === 'string') ? (()=>{ try { return JSON.parse(e.data); } catch(e){ return null; } })() : e.data;
        if (d && (d.event === 'play_end' || d.type === 'ended' || d.action === 'ended')){
          const ch = channels[currentIndex];
          if (ch && ch.items && ch.items.length > 0){
            ch.playIndex = randomIndexExcluding(ch.items.length, ch.playIndex || 0);
          }
          loadChannel(currentIndex);
        }
      } catch(err){}
    }, { once: false });
  }

  // SSE remote control
  try{
    const es = new EventSource('/sse');
    es.onmessage = function(ev){
      try{
        const data = JSON.parse(ev.data);
        if (!data) return;
        if (data.type === 'control'){
          const p = data.payload || {};
          if (p.action === 'tune' && typeof p.idx === 'number'){
            currentIndex = ((p.idx % channels.length) + channels.length) % channels.length; loadChannel(currentIndex);
          } else if (p.action === 'next'){
            const ch = channels[currentIndex];
            if (ch && ch.items && ch.items.length > 0) ch.playIndex = randomIndexExcluding(ch.items.length, ch.playIndex || 0);
            loadChannel(currentIndex);
          } else if (p.action === 'prev'){
            const ch = channels[currentIndex]; ch.playIndex = ((ch.playIndex || 0) - 1 + (ch.items.length || 1)) % (ch.items.length || 1); loadChannel(currentIndex);
          } else if (p.action === 'up'){
            currentIndex = (currentIndex - 1 + channels.length) % channels.length; loadChannel(currentIndex);
          } else if (p.action === 'down'){
            currentIndex = (currentIndex + 1) % channels.length; loadChannel(currentIndex);
          }
        } else if (data.type === 'metadata'){
          const p = data.payload || {};
          const bvid = p.bvid || (p.meta && p.meta.bvid);
          const meta = p.meta || p;
          if (bvid && meta){
            // update local channels cache
            for (const ch of channels){
              if (!ch.items) continue;
              for (const it of ch.items){
                if (it.bvid === bvid){
                  it.title = meta.title || it.title || '';
                  it.pic = meta.pic || it.pic || '';
                  it.owner = meta.owner || it.owner || '';
                  it.lastFetchedAt = meta.lastFetchedAt || it.lastFetchedAt || Date.now();
                }
              }
            }
            renderGuide();
            // update currently displayed meta if matching
            const item = channels[currentIndex] && channels[currentIndex].items && channels[currentIndex].items[channels[currentIndex].playIndex || 0];
            if (item && item.bvid === bvid){
              const metaText = document.getElementById('metaText');
              if (metaText) metaText.textContent = `${meta.title} — ${meta.owner || ''}`;
              const cover = document.getElementById('cover');
              if (cover && meta.pic) cover.src = meta.pic;
            }
          }
        }
      }catch(e){}
    };
  }catch(e){ console.warn('SSE not supported', e); }

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'p' || e.key === 'P'){ togglePower(); return; }
    if(e.key === 'r' || e.key === 'R'){ toggleRemoteModal(); return; }
    if(e.key === 'm' || e.key === 'M'){ toggleMouselessMode(); return; }
    if(!poweredOn) return;
    if(e.key === 'ArrowUp'){ currentIndex = (currentIndex - 1 + channels.length) % channels.length; loadChannel(currentIndex); }
    else if(e.key === 'ArrowDown'){ currentIndex = (currentIndex + 1) % channels.length; loadChannel(currentIndex); }
    else if(e.key === 'ArrowRight'){ const ch = channels[currentIndex]; if (ch && ch.items && ch.items.length > 0) ch.playIndex = randomIndexExcluding(ch.items.length, ch.playIndex || 0); loadChannel(currentIndex); }
    else if(e.key === 'ArrowLeft'){ const ch = channels[currentIndex]; ch.playIndex = ((ch.playIndex || 0) - 1 + (ch.items.length || 1)) % (ch.items.length || 1); loadChannel(currentIndex); }
    else if(e.key === 'g' || e.key === 'G'){ guideEl.classList.toggle('hidden'); }
    else if(e.key === 'i' || e.key === 'I'){ importForm.style.display = importForm.style.display === 'none' ? 'block' : 'none'; }
    else if(e.key === 't' || e.key === 'T'){ toggleTv(); }
  });

  renderGuide();
  applyMouselessMode();
  document.body.classList.add('booting');
  setTimeout(() => document.body.classList.remove('booting'), 1150);
  loadChannel(0);
})();
