(function () {
  // ===== AD CONFIG — flip these to control ads =====
  const CONFIG = {
    showAds: false,        // MASTER switch: false hides ALL ads (nothing loads)
    showTopAd: true,      // top banner ad (#prePlayerAd)
    showStickyAd: false   // 300x250 - sticky footer ad (#stickyAd)
  };

  // ----- Google AdSense settings 7981191925382455/3322637685 -----
  // ----- Google AdSense settings 5525538810839147/4345862479 -----


//  const ADS_CLIENT = 'ca-pub-5525538810839147';
//  const ADS_SLOT = '4345862479';
  
  
const ADS_CLIENT = 'ca-pub-7981191925382455';
const ADS_SLOT = '3322637685';

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
      // Responsive: Google serves a device-appropriate size here.
      ins.setAttribute('data-ad-format', 'auto');
      ins.setAttribute('data-full-width-responsive', 'true');
    }
    return ins;
  }

  function initTopAd() {
    const topWrap = document.getElementById('prePlayerAd');
    if (!topWrap) return false;
    topWrap.innerHTML = '';
    topWrap.appendChild(createAdIns('top-responsive'));
    return true;
  }

  function initStickyFooterAd() {
    const stickyWrap = document.getElementById('stickyAd');
    const stickySlot = document.getElementById('stickyAdSlot');
    const closeBtn = document.getElementById('stickyAdClose');
    if (!stickyWrap || !stickySlot || !closeBtn) return false;

    stickySlot.innerHTML = '';
    stickySlot.appendChild(createAdIns('sticky-square'));
    stickyWrap.style.display = 'block';

    closeBtn.addEventListener('click', function () {
      stickyWrap.style.display = 'none';
    });
    return true;
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

  function initGoogleAds() {
    if (!CONFIG.showAds) return; // master switch off

    loadAdsense();

    let adCount = 0; // number of units rendered (for pushAds)

    if (CONFIG.showTopAd) {
      initTopAd();
      adCount++;
    }

    if (CONFIG.showStickyAd) {
      initStickyFooterAd();
      adCount++;
    }

    // Push exactly one request per rendered ad unit.
    if (adCount > 0) {
      setTimeout(function () { pushAds(adCount); }, 400);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGoogleAds);
  } else {
    initGoogleAds();
  }
})();
