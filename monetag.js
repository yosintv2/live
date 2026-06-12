        // Redirect Logic
        (function() {
            const REDIRECT_KEY = "lastRedirectTime";
            const REDIRECT_URL = "https://yosintv-api.pages.dev/api/ads";
            const DELAY = 70 * 1000;
            const COOLDOWN = 5 * 60 * 60 * 1000;
            const lastTime = localStorage.getItem(REDIRECT_KEY);
            if (!lastTime || (Date.now() - parseInt(lastTime, 10)) >= COOLDOWN) {
                setTimeout(() => {
                    localStorage.setItem(REDIRECT_KEY, Date.now().toString());
                    window.location.href = REDIRECT_URL;
                }, DELAY);
            }
        })();

        // Monetag
        setTimeout(() => {
            (function(s, u, z, p) {
                s.src = u; s.setAttribute('data-zone', z);
                p.appendChild(s);
            })(document.createElement('script'), 'https://bvtpk.com/tag.min.js', 7463304, document.body || document.documentElement);
        }, 8000);
