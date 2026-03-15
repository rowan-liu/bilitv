(async function(){
  const res = await fetch('/api/channels');
  const channels = await res.json();
  let currentIndex = 0;

  // initialize per-channel play index
  channels.forEach(c => { if (typeof c.playIndex === 'undefined') c.playIndex = 0; });

  const guideEl = document.getElementById('guide');
  const playerEl = document.getElementById('player');

  function renderGuide(){
    guideEl.innerHTML = channels.map((c,i)=>{
      const currentItem = (c.items && c.items[c.playIndex]) ? c.items[c.playIndex].title : '';
      return `<div class="channel ${i===currentIndex?'active':''}" data-idx="${i}"><span class="num">${i+1}</span><span class="name">${c.name}</span><div style="font-size:12px;color:#ccc;margin-top:4px">${currentItem}</div></div>`;
    }).join('');
    document.querySelectorAll('.channel').forEach(el=>{
      el.addEventListener('click', ()=>{
        currentIndex = Number(el.dataset.idx);
        loadChannel(currentIndex);
      });
    });
  }

  function loadChannel(idx){
    const channel = channels[idx];
    if(!channel || !channel.items || channel.items.length===0){
      playerEl.innerHTML = '<div style="color:#fff;padding:20px">该频道暂无内容</div>';
      renderGuide();
      return;
    }
    const item = channel.items[channel.playIndex || 0];
    const src = `https://player.bilibili.com/player.html?bvid=${item.bvid}&page=1`;
    playerEl.innerHTML = `<div style="position:relative;height:100%"><div class="meta">${channel.name} — ${item.title}</div><iframe id="biliplayer" src="${src}" allowfullscreen></iframe></div>`;
    renderGuide();

    // attach a message listener to detect player events (Bilibili may post messages)
    // messages are logged for debugging; if an "ended"-like event is detected, go next
    window.addEventListener('message', function onMsg(e){
      try {
        // log for inspection in devtools
        console.debug('player message', e.data);
        const d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (d && (d.event === 'play_end' || d.type === 'ended' || d.action === 'ended')){
          const ch = channels[currentIndex];
          ch.playIndex = ( (ch.playIndex || 0) + 1 ) % (ch.items.length || 1);
          loadChannel(currentIndex);
        }
      } catch(err) {
        // ignore non-JSON messages
      }
    }, { once: false });
  }

  // Server-Sent Events: listen for remote control commands
  try {
    const es = new EventSource('/sse');
    es.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (data && data.type === 'control'){
          const p = data.payload || {};
          if (p.action === 'tune' && typeof p.idx === 'number'){
            currentIndex = p.idx % channels.length;
            loadChannel(currentIndex);
          }
          if (p.action === 'next'){
            const ch = channels[currentIndex];
            ch.playIndex = ( (ch.playIndex || 0) + 1 ) % ( (ch.items && ch.items.length) || 1 );
            loadChannel(currentIndex);
          }
          if (p.action === 'prev'){
            const ch = channels[currentIndex];
            ch.playIndex = ( (ch.playIndex || 0) - 1 + ( (ch.items && ch.items.length) || 1 ) ) % ( (ch.items && ch.items.length) || 1 );
            loadChannel(currentIndex);
          }
        }
      } catch(e) { console.warn('invalid SSE data', e); }
    };
  } catch(e){
    console.warn('SSE not supported', e);
  }

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowUp'){
      currentIndex = (currentIndex - 1 + channels.length) % channels.length;
      loadChannel(currentIndex);
    } else if(e.key === 'ArrowDown'){
      currentIndex = (currentIndex + 1) % channels.length;
      loadChannel(currentIndex);
    } else if(e.key === 'ArrowRight'){
      // next video in channel
      const ch = channels[currentIndex];
      ch.playIndex = ( (ch.playIndex || 0) + 1 ) % ( (ch.items && ch.items.length) || 1 );
      loadChannel(currentIndex);
    } else if(e.key === 'ArrowLeft'){
      const ch = channels[currentIndex];
      ch.playIndex = ( (ch.playIndex || 0) - 1 + ( (ch.items && ch.items.length) || 1 ) ) % ( (ch.items && ch.items.length) || 1 );
      loadChannel(currentIndex);
    } else if(e.key === 'g' || e.key === 'G'){
      guideEl.classList.toggle('hidden');
    }
  });

  renderGuide();
  loadChannel(0);
})();
