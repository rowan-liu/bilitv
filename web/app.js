(async function(){
  const res = await fetch('/api/channels');
  const channels = await res.json();
  let currentIndex = 0;

  const guideEl = document.getElementById('guide');
  const playerEl = document.getElementById('player');

  function renderGuide(){
    guideEl.innerHTML = channels.map((c,i)=>{
      return `<div class="channel ${i===currentIndex?'active':''}" data-idx="${i}"><span class="num">${i+1}</span><span class="name">${c.name}</span></div>`;
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
      return;
    }
    const first = channel.items[0];
    playerEl.innerHTML = `<iframe id="biliplayer" src="https://player.bilibili.com/player.html?bvid=${first.bvid}&page=1" allowfullscreen></iframe>`;
    renderGuide();
  }

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowUp'){
      currentIndex = (currentIndex - 1 + channels.length) % channels.length;
      loadChannel(currentIndex);
    }
    if(e.key === 'ArrowDown'){
      currentIndex = (currentIndex + 1) % channels.length;
      loadChannel(currentIndex);
    }
    if(e.key === 'g' || e.key === 'G'){
      guideEl.classList.toggle('hidden');
    }
  });

  renderGuide();
  loadChannel(0);
})();
