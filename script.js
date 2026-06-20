// app.js - Optimized Magazine Engine with Branding Text Injection

document.addEventListener("DOMContentLoaded", () => {
    try {
        buildDesktopNavigation();
        buildMobileNavigation();
        renderHeroBranding(); // Load core brand layout & feature photo instantly
        filterData('all');
    } catch (e) {
        console.error("Layout compilation halted safely:", e);
    }
});

const categoryIcons = {
    "World": "🌍", "Arts & Culture": "🎨", "Photography": "📸", 
    "Entertainment": "🎬", "Food": "🍽️", "Technology": "💻", 
    "Africa": "🇨🇩", "Inspiration": "✝️"
};

// 1. BRAND HERO IMAGE AND TEXT RENDERING STRIP
function renderHeroBranding() {
    const target = document.getElementById("hero-branding-block");
    if (!target) return;

    target.innerHTML = `
        <div class="bg-[#071120] rounded-xl border border-gray-800 overflow-hidden flex flex-col lg:flex-row items-stretch shadow-2xl">
            <div class="lg:w-7/12 min-h-[260px] md:min-h-[360px] bg-cover bg-center" style="background-image: url('main-feature.png');"></div>
            
            <div class="p-6 md:p-10 lg:w-5/12 flex flex-col justify-center bg-gradient-to-br from-[#071120] to-[#0A192F]">
                <span class="text-[10px] font-mono tracking-widest font-bold text-[#FF9F43] bg-[#FF9F43]/10 px-2.5 py-1 rounded self-start uppercase">
                    Strategic Creative Workspace
                </span>
                <h1 class="text-xl md:text-2xl font-black mt-4 mb-3 text-white leading-tight">
                    Engineering Premium Fast-Loading Environments
                </h1>
                <p class="text-gray-400 text-xs md:text-sm leading-relaxed mb-4">
                    Higherjess Business integrates clean system code with elegant designs. We build modern landing fields, interactive multi-page catalogs, and performant web spaces that scale operations seamlessly.
                </p>
                <div class="flex items-center gap-3 pt-2 border-t border-gray-800/60 mt-2">
                    <img src="android-chrome-512x512.jpg" alt="" class="w-6 h-6 rounded-full border border-gray-700">
                    <span class="text-[11px] text-gray-500 font-mono">Higherjess Operational Desk • 2026</span>
                </div>
            </div>
        </div>
    `;
}

// 2. RENDER DESKTOP HOVER DROPDOWNS
function buildDesktopNavigation() {
    const hook = document.getElementById("desktop-menu-hook");
    if (!hook) return;

    hook.innerHTML = "";
    Object.keys(menuTaxonomy).forEach(section => {
        const icon = categoryIcons[section] || "📄";
        const dropdownContainer = document.createElement("div");
        dropdownContainer.className = "relative desktop-dropdown inline-block";
        
        dropdownContainer.innerHTML = `
            <button onclick="filterData('section', '${section}')" class="px-4 py-3 text-gray-300 hover:text-[#FF9F43] flex items-center gap-1 transition">
                ${icon} ${section} <span class="text-[9px] text-gray-600">▼</span>
            </button>
            <div class="desktop-dropdown-menu absolute hidden bg-[#071120] border border-gray-800 rounded shadow-2xl min-w-[200px] py-1 z-50">
                ${menuTaxonomy[section].map(sub => `
                    <button onclick="event.stopPropagation(); filterData('subsection', '${sub}')" class="w-full text-left px-4 py-2 text-xs text-gray-400 hover:bg-[#0D213F] hover:text-[#FF9F43] transition">
                        ${sub}
                    </button>
                `).join('')}
            </div>
        `;
        hook.appendChild(dropdownContainer);
    });
}

// 3. RENDER MOBILE TOGGLE DROPDOWNS
function buildMobileNavigation() {
    const hook = document.getElementById("mobile-menu-hook");
    if (!hook) return;

    hook.innerHTML = `
        <button onclick="toggleMobileDrawer(false); filterData('all');" class="w-full text-left py-3 px-2 text-gray-300 border-b border-gray-900 block font-bold">🏠 Home Feed</button>
    `;

    Object.keys(menuTaxonomy).forEach((section, index) => {
        const icon = categoryIcons[section] || "📄";
        const wrapper = document.createElement("div");
        wrapper.className = "border-b border-gray-900 py-1";

        wrapper.innerHTML = `
            <div class="flex items-center justify-between w-full py-2 px-2 text-gray-300 font-semibold" onclick="toggleMobileAccordion('acc-${index}')">
                <span onclick="event.stopPropagation(); toggleMobileDrawer(false); filterData('section', '${section}');" class="hover:text-[#FF9F43]">
                    ${icon} ${section}
                </span>
                <span class="text-xs text-gray-500 font-mono px-2">＋</span>
            </div>
            <div id="acc-${index}" class="hidden pl-6 pr-2 py-1 space-y-1 bg-[#0A192F]/40 rounded">
                ${menuTaxonomy[section].map(sub => `
                    <button onclick="toggleMobileDrawer(false); filterData('subsection', '${sub}');" class="w-full text-left py-2 text-xs text-gray-400 hover:text-[#FF9F43] block">
                        • ${sub}
                    </button>
                `).join('')}
            </div>
        `;
        hook.appendChild(wrapper);
    });
}

function toggleMobileDrawer(open) {
    const drawer = document.getElementById("mobile-drawer");
    if (!drawer) return;
    if (open) drawer.classList.remove("translate-x-full");
    else drawer.classList.add("translate-x-full");
}

function toggleMobileAccordion(id) {
    const panel = document.getElementById(id);
    if (panel) panel.classList.toggle("hidden");
}

// 4. CENTRAL FILTER SYSTEM
function filterData(type, targetValue = '') {
    const title = document.getElementById("view-title");
    const counter = document.getElementById("items-counter");
    const heroBox = document.getElementById("hero-branding-block");
    let results = [];

    // Only show the prominent hero graphic on the complete "Home" overview channel
    if (type === 'all' && heroBox) {
        heroBox.style.display = "block";
    } else if (heroBox) {
        heroBox.style.display = "none";
    }

    if (type === 'all') {
        title.innerText = "Latest Editorial Pieces";
        results = magazineArticles;
    } else if (type === 'About') {
        title.innerText = "About Higherjess Business";
        renderAboutView();
        if(counter) counter.innerText = "Company Logs";
        return;
    } else if (type === 'section') {
        title.innerText = `${targetValue}`;
        results = magazineArticles.filter(a => a.section === targetValue);
    } else if (type === 'subsection') {
        title.innerText = `${targetValue}`;
        results = magazineArticles.filter(a => a.subsection === targetValue);
    }

    if(counter) counter.innerText = `${results.length} Stories`;
    displayGridContent(results);
}

// 5. GRID CARD WRAPPER ENGINE
function displayGridContent(items) {
    const gridContainer = document.getElementById("articles-grid");
    if (!gridContainer) return;

    if (!items || items.length === 0) {
        gridContainer.innerHTML = `
            <div class="col-span-full py-16 text-center text-xs text-gray-500 italic bg-[#07172E]/40 rounded border border-gray-900">
                No articles published under this category track yet.
            </div>
        `;
        return;
    }

    gridContainer.innerHTML = items.map(article => `
        <article class="bg-[#07172E] rounded-lg border border-gray-800 overflow-hidden flex flex-col justify-between group shadow-lg hover:border-gray-700 transition">
            <div>
                <div class="h-52 w-full overflow-hidden bg-gray-900 relative">
                    <img 
                        src="${article.image}" 
                        alt="" 
                        class="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                        onerror="this.onerror=null; this.src='Bwwweeeeeeerr_20251226_122415_0000.jpg';"
                    />
                    <span class="absolute top-3 left-3 text-[9px] uppercase font-mono font-bold tracking-wider bg-[#0A192F]/90 text-[#FF9F43] px-2 py-0.5 rounded border border-gray-800/60 shadow-md">
                        ${article.subsection}
                    </span>
                </div>
                <div class="p-5">
                    <h3 class="text-base font-bold text-white group-hover:text-[#FF9F43] transition duration-200 mb-2 leading-snug">${article.title}</h3>
                    <p class="text-gray-400 text-xs leading-relaxed line-clamp-3">${article.summary}</p>
                </div>
            </div>
            <div class="p-5 pt-0 mt-2 flex items-center justify-between text-[10px] font-mono text-gray-500 border-t border-gray-800/30">
                <span>${article.date}</span>
                <span class="text-[#FF9F43] font-sans font-bold group-hover:underline cursor-pointer">Read ↗</span>
            </div>
        </article>
    `).join('');
}

function renderAboutView() {
    const gridContainer = document.getElementById("articles-grid");
    if (!gridContainer) return;

    gridContainer.innerHTML = `
        <div class="col-span-full bg-[#07172E] p-6 lg:p-8 rounded-lg border border-gray-800 max-w-3xl text-xs lg:text-sm text-gray-300 leading-relaxed shadow-xl">
            <h3 class="text-base font-bold text-[#FF9F43] mb-3 font-mono">Higherjess Business Architecture</h3>
            <p class="mb-4">Deploying custom, production-grade systems, tailored professional portfolios, and conversion-optimized e-commerce pipelines configured for global reach.</p>
            <p class="text-gray-500 font-mono text-[10px]">Environment Target: Native PC Workspace Build System</p>
        </div>
    `;
}
