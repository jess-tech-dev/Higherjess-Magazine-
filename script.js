// app.js - Universal Cross-Device Magazine Layout Engine

document.addEventListener("DOMContentLoaded", () => {
    try {
        buildDesktopNavigation();
        buildMobileNavigation();
        filterData('all');
    } catch (e) {
        console.error("Layout compilation halted safely:", e);
    }
});

// Category Icon Configuration Maps
const categoryIcons = {
    "World": "🌍", "Arts & Culture": "🎨", "Photography": "📸", 
    "Entertainment": "🎬", "Food": "🍽️", "Technology": "💻", 
    "Africa": "🇨🇩", "Inspiration": "✝️"
};

// 1. RENDER DESKTOP HOVER DROPDOWN STRIPS
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

// 2. RENDER MOBILE TOGGLE DROPDOWNS & ACCORDIONS
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

// Mobile Interface Interaction Control Logic
function toggleMobileDrawer(open) {
    const drawer = document.getElementById("mobile-drawer");
    if (!drawer) return;
    if (open) {
        drawer.classList.remove("translate-x-full");
    } else {
        drawer.classList.add("translate-x-full");
    }
}

function toggleMobileAccordion(id) {
    const panel = document.getElementById(id);
    if (!panel) return;
    panel.classList.toggle("hidden");
}

// 3. CENTRAL FILTER CONTROLLER PIPELINE
function filterData(type, targetValue = '') {
    const title = document.getElementById("view-title");
    const counter = document.getElementById("items-counter");
    let results = [];

    if (type === 'all') {
        title.innerText = "Latest Editorial Pieces";
        results = magazineArticles;
    } else if (type === 'About') {
        title.innerText = "About Higherjess Business";
        renderAboutView();
        if(counter) counter.innerText = "Company Logs";
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. SECURE CARD RENDERING GRID ENGINE
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
        <article class="bg-[#07172E] rounded-lg border border-gray-800 overflow-hidden flex flex-col justify-between group shadow-lg">
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
