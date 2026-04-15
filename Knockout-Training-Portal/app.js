document.addEventListener('DOMContentLoaded', () => {
    // === STATE ===
    const COMPANY_PASSWORD = "ko"; // Simple requested password
    let isLoggedIn = false;
    
    // === DOM ELEMENTS ===
    const els = {
        loginOverlay: document.getElementById('login-overlay'),
        passwordInput: document.getElementById('password-input'),
        loginBtn: document.getElementById('login-btn'),
        loginError: document.getElementById('login-error'),
        logoutBtn: document.getElementById('logout-btn'),
        
        appDashboard: document.getElementById('app-dashboard'),
        navLinks: document.querySelectorAll('.nav-link'),
        viewSections: document.querySelectorAll('.view-section'),
        
        searchBar: document.getElementById('global-search'),
        
        recentContainer: document.getElementById('recent-content'),
        sopDirectory: document.getElementById('sop-directory'),
        videoDirectory: document.getElementById('video-directory'),
        
        totalSops: document.getElementById('total-sops-count'),
        totalVideos: document.getElementById('total-videos-count'),
        
        itemViewer: document.getElementById('view-item'),
        itemContainer: document.getElementById('item-content-container'),
        backBtn: document.getElementById('back-btn')
    };

    // === INITIALIZATION ===
    function init() {
        renderCounts();
        renderRecent();
        renderSopDirectory();
        renderVideoDirectory();
        
        // Listeners for Auth
        els.loginBtn.addEventListener('click', handleLogin);
        els.passwordInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') handleLogin();
        });
        els.logoutBtn.addEventListener('click', handleLogout);

        // Listeners for Navigation
        els.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(e.target.dataset.target);
            });
        });

        // Listeners for Viewer functionality
        els.backBtn.addEventListener('click', () => {
            document.querySelector('.nav-link.active').click();
        });

        // Listeners for Search
        els.searchBar.addEventListener('input', handleSearch);
    }

    // === AUTHENTICATION LOGIC ===
    function handleLogin() {
        const val = els.passwordInput.value;
        if(val === COMPANY_PASSWORD || val.toLowerCase() === 'knockout') {
            isLoggedIn = true;
            els.loginOverlay.classList.add('fade-out');
            els.appDashboard.classList.remove('hidden');
            document.body.classList.remove('locked');
            els.loginError.innerText = "";
            els.passwordInput.value = "";
        } else {
            els.loginError.innerText = "Incorrect Password";
        }
    }

    function handleLogout() {
        isLoggedIn = false;
        els.loginOverlay.classList.remove('fade-out');
        els.appDashboard.classList.add('hidden');
        document.body.classList.add('locked');
    }

    // === NAVIGATION LOGIC ===
    function navigateTo(targetId) {
        // Update nav links
        els.navLinks.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        if(activeLink) activeLink.classList.add('active');

        // Update views
        els.viewSections.forEach(s => s.classList.add('hidden'));
        document.getElementById(`view-${targetId}`).classList.remove('hidden');
        
        els.searchBar.value = '';
        renderSopDirectory();
        renderVideoDirectory();
    }

    // === RENDERING DATA ===
    function renderCounts() {
        els.totalSops.innerText = PORTAL_CONTENT.sops.length;
        els.totalVideos.innerText = PORTAL_CONTENT.videos.length;
    }

    function renderRecent() {
        els.recentContainer.innerHTML = '';
        
        // Get newest 2 SOPs and newest Video
        const recentSops = [...PORTAL_CONTENT.sops].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0,2);
        const recentVids = [...PORTAL_CONTENT.videos].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0,1);
        
        recentSops.forEach(item => {
            const el = document.createElement('div');
            el.className = 'content-card';
            el.innerHTML = `
                <span class="content-badge badge-sop">SOP</span>
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <small style="color: var(--text-muted)">Updated: ${item.date}</small>
            `;
            el.addEventListener('click', () => openSop(item));
            els.recentContainer.appendChild(el);
        });

        recentVids.forEach(item => {
            const el = document.createElement('div');
            el.className = 'content-card';
            el.innerHTML = `
                <span class="content-badge badge-video">VIDEO</span>
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                 <small style="color: var(--text-muted)">Updated: ${item.date}</small>
            `;
            el.addEventListener('click', () => openVideo(item));
            els.recentContainer.appendChild(el);
        });
    }

    function renderSopDirectory(filterQuery = '') {
        els.sopDirectory.innerHTML = '';
        const search = filterQuery.toLowerCase();
        
        const filtered = PORTAL_CONTENT.sops.filter(s => 
            s.title.toLowerCase().includes(search) || 
            s.description.toLowerCase().includes(search)
        );

        if(filtered.length === 0) {
            els.sopDirectory.innerHTML = '<p style="color: var(--text-muted)">No SOPs found.</p>';
            return;
        }

        filtered.forEach(item => {
            const row = document.createElement('div');
            row.className = 'sop-row';
            row.innerHTML = `
                <div class="sop-info">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
                <div class="sop-meta">
                    <span class="ghost-btn" style="border:none; pointer-events: none;">Read -></span>
                </div>
            `;
            row.addEventListener('click', () => openSop(item));
            els.sopDirectory.appendChild(row);
        });
    }

    function renderVideoDirectory(filterQuery = '') {
        els.videoDirectory.innerHTML = '';
        const search = filterQuery.toLowerCase();

        const filtered = PORTAL_CONTENT.videos.filter(v => 
            v.title.toLowerCase().includes(search) || 
            v.description.toLowerCase().includes(search)
        );

        if(filtered.length === 0) {
            els.videoDirectory.innerHTML = '<p style="color: var(--text-muted)">No videos found.</p>';
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'video-card';
            card.innerHTML = `
                <div class="video-thumbnail">
                    <img src="${item.thumbnail}" alt="${item.title}">
                    <div class="play-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                </div>
                <div class="video-info">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            `;
            card.addEventListener('click', () => openVideo(item));
            els.videoDirectory.appendChild(card);
        });
    }

    // === CONTENT VIEWING LOGIC ===
    async function openSop(sopData) {
        // Show viewer section
        els.viewSections.forEach(s => s.classList.add('hidden'));
        els.itemViewer.classList.remove('hidden');
        
        els.itemContainer.innerHTML = '<p>Loading SOP...</p>';
        
        try {
            // Fetch the markdown text file
            const response = await fetch(sopData.filename);
            if(!response.ok) throw new Error('File not found');
            const markdownText = await response.text();
            
            // Parse with Marked.js
            const htmlContent = marked.parse(markdownText);
            
            els.itemContainer.innerHTML = `
                <div class="markdown-body">
                    ${htmlContent}
                </div>
            `;
        } catch (error) {
            // Fallback if local fetch fails (e.g. running from file:// without a server)
            els.itemContainer.innerHTML = `
                <div class="markdown-body">
                    <h1>${sopData.title}</h1>
                    <p style="color: var(--brand-primary)">Could not load ${sopData.filename}.</p>
                    <p><em>Note: If you are opening this file simply by double-clicking it on your computer (file:// protocol), standard security restrictions may prevent the browser from loading text files. Please open this app using a local development server or deploy it to Vercel/Netlify.</em></p>
                </div>
            `;
            console.error(error);
        }
    }

    function openVideo(vidData) {
        els.viewSections.forEach(s => s.classList.add('hidden'));
        els.itemViewer.classList.remove('hidden');
        
        els.itemContainer.innerHTML = `
            <div class="markdown-body">
                <h1>${vidData.title}</h1>
                <div class="video-wrapper">
                    <iframe src="${vidData.embedUrl}" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
                <p>${vidData.description}</p>
            </div>
        `;
    }

    // === SEARCH ===
    function handleSearch(e) {
        const query = e.target.value;
        const activeNav = document.querySelector('.nav-link.active');
        
        // Let's force navigation to 'sops' or 'videos' if they search from home
        if(activeNav.dataset.target === 'home' && query.length > 0) {
            navigateTo('sops');
        }

        renderSopDirectory(query);
        renderVideoDirectory(query);
    }

    init();
});
