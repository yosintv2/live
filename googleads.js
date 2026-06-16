(function () {
  // ===== AD CONFIG — flip these to control ads =====
  const CONFIG = {
    showAds: true,          // MASTER switch: false hides ALL ads (nothing loads)
    showTopAd: true,        // top banner ad (#prePlayerAd)
    showStickyAd: true,     // sticky footer ad (#stickyAd)
    adNetwork: 'adsterra'     // 'google'  = Google AdSense
                            // 'adsterra' = Adsterra
  };

  // ----- Google AdSense settings -----
  const ADS_CLIENT = 'ca-pub-7981191925382455';
  const ADS_SLOT = '3322637685';

  // ----- Adsterra settings (key + size per slot) -----
  const ADSTERRA = {
    top:    { key: '59fe9c4b56396dce66c5e0673b9721cf', width: 728, height: 90 },
    sticky: { key: '404fc8f3cacfd3432bb75ca06f2afb48', width: 300, height: 250 }
  };

  /* =====================================================================
     GOOGLE ADSENSE
     ===================================================================== */
  function loadAdsense() {
    if (document.querySelector('script[data-google-adsense="main"]')) {
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADS_CLIENT;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-google-adsense', 'main');
    document.head.appendChild(script);
  }

  function createAdIns(type) {
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    if (type === 'sticky-square') {
      ins.style.display = 'inline-block';
      ins.style.width = '300px';
      ins.style.height = '250px';
      ins.style.minWidth = '300px';
      ins.style.maxWidth = '300px';
      ins.style.minHeight = '250px';
      ins.style.maxHeight = '250px';
    } else {
      ins.style.display = 'block';
    }
    ins.setAttribute('data-ad-client', ADS_CLIENT);
    ins.setAttribute('data-ad-slot', ADS_SLOT);
    if (type === 'sticky-square') {
      ins.setAttribute('data-ad-format', '');
      ins.setAttribute('data-full-width-responsive', 'false');
    } else {
      ins.setAttribute('data-ad-format', 'auto');
      ins.setAttribute('data-full-width-responsive', 'true');
    }
    return ins;
  }

  function pushAds(count) {
    try {
      for (let i = 0; i < count; i++) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      // Ignore ad-init errors to avoid breaking the page.
    }
  }

  /* =====================================================================
     ADSTERRA
     Each unit runs in its own iframe so the global `atOptions` variable
     used by invoke.js can't collide between the two units.
     ===================================================================== */
  function createAdsterraFrame(unit) {
    const frame = document.createElement('iframe');
    frame.width = unit.width;
    frame.height = unit.height;
    frame.scrolling = 'no';
    frame.setAttribute('frameborder', '0');
    frame.style.border = '0';
    frame.style.display = 'block';
    frame.style.margin = '0 auto';
    frame.style.width = unit.width + 'px';
    frame.style.height = unit.height + 'px';
    frame.style.maxWidth = '100%'; // avoid horizontal overflow on narrow screens

    const opts = {
      key: unit.key,
      format: 'iframe',
      height: unit.height,
      width: unit.width,
      params: {}
    };

    frame.srcdoc =
      '<!DOCTYPE html><html><head><meta charset="utf-8">' +
      '<style>html,body{margin:0;padding:0;overflow:hidden;}</style></head><body>' +
      '<script type="text/javascript">atOptions = ' + JSON.stringify(opts) + ';<\/script>' +
      '<script type="text/javascript" src="https://www.highperformanceformat.com/' +
      unit.key + '/invoke.js"><\/script>' +
      '</body></html>';

    return frame;
  }

  /* =====================================================================
     SHARED SLOT WRAPPERS (work for either network)
     ===================================================================== */
  function fillTopSlot(node) {
    const topWrap = document.getElementById('prePlayerAd');
    if (!topWrap) return false;
    topWrap.innerHTML = '';
    topWrap.appendChild(node);
    return true;
  }

  function fillStickySlot(node) {
    const stickyWrap = document.getElementById('stickyAd');
    const stickySlot = document.getElementById('stickyAdSlot');
    const closeBtn = document.getElementById('stickyAdClose');
    if (!stickyWrap || !stickySlot || !closeBtn) return false;

    stickySlot.innerHTML = '';
    stickySlot.appendChild(node);
    stickyWrap.style.display = 'block';

    closeBtn.addEventListener('click', function () {
      stickyWrap.style.display = 'none';
    });
    return true;
  }

  /* =====================================================================
     INIT
     ===================================================================== */
  function initAds() {
    if (!CONFIG.showAds) return; // master switch off

    const useAdsterra = CONFIG.adNetwork === 'adsterra';

    if (!useAdsterra) loadAdsense();

    let googleCount = 0; // number of Google units rendered (for pushAds)

    if (CONFIG.showTopAd) {
      if (useAdsterra) {
        fillTopSlot(createAdsterraFrame(ADSTERRA.top));
      } else {
        fillTopSlot(createAdIns('top-responsive'));
        googleCount++;
      }
    }

    if (CONFIG.showStickyAd) {
      if (useAdsterra) {
        fillStickySlot(createAdsterraFrame(ADSTERRA.sticky));
      } else {
        fillStickySlot(createAdIns('sticky-square'));
        googleCount++;
      }
    }

    // Push exactly one request per rendered Google unit.
    if (googleCount > 0) {
      setTimeout(function () { pushAds(googleCount); }, 400);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAds);
  } else {
    initAds();
  }
})();
