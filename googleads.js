(function () {
  const ADS_CLIENT = 'ca-pub-5525538810839147';
  const ADS_SLOT = '4345862479';

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

  function initTopAd() {
    const topWrap = document.getElementById('prePlayerAd');
    if (!topWrap) return;

    topWrap.innerHTML = '';
    topWrap.appendChild(createAdIns('top-responsive'));
  }

  function initStickyFooterAd() {
    const stickyWrap = document.getElementById('stickyAd');
    const stickySlot = document.getElementById('stickyAdSlot');
    const closeBtn = document.getElementById('stickyAdClose');

    if (!stickyWrap || !stickySlot || !closeBtn) return;

    stickySlot.innerHTML = '';
    stickySlot.appendChild(createAdIns('sticky-square'));
    stickyWrap.style.display = 'block';

    closeBtn.addEventListener('click', function () {
      stickyWrap.style.display = 'none';
    });
  }

  function pushAds() {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // Ignore ad-init errors to avoid breaking the page.
    }
  }

  function initGoogleAds() {
    loadAdsense();
    initTopAd();
    initStickyFooterAd();

    // Allow script load before pushing requests.
    setTimeout(pushAds, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGoogleAds);
  } else {
    initGoogleAds();
  }
})();
