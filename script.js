// app.js - Magazine Core Engine

document.addEventListener("DOMContentLoaded", () => {
    buildNavigationMenu();
    renderHeroSection();
    filterData('all');
});

// 1. Generate Dropdown Menus Dynamically from menuTaxonomy Structure
function buildNavigationMenu() {
    const hook = document.getElementById("dynamic-menu-hook");
    if (!hook) return;

    // Emojis mapped to your exact header categories
    const icons = {
        "World": "🌍", "Arts & Culture": "🎨", "Photography": "📸", 
        "Entertainment": "🎬", "Food": "🍽️", "Technology": "💻", 
        "Africa": "🇨🇩", "Inspiration": "✝️"
    };

    Object.keys(menuTaxonomy).forEach(section => {
        const icon = icons[section] || "📄";
        
        const dropdownDiv = document.createElement("div");
        dropdownDiv.className = "relative dropdown inline-block";
        
        dropdownDiv.innerHTML = `
            <button onclick="filterData('section', '${section}')" class="px-3 py-3 text-gray-300 hover:text-[#FF9F43] transition flex items-center gap-1">
                ${icon} ${section} <span class="text-[10px] text-gray-500">▼</span>
            </button>
            <div class="dropdown-menu absolute hidden bg-[#071120] border border-gray-800 rounded shadow-xl min-w-[180px] py-1 z-50">
                ${menuTaxonomy[section].map(sub => `
                    <button onclick="event.stopPropagation(); filterData('subsection', '${sub}')" class="w-full text-left px-4 py-2 text-xs text-gray-400 hover:bg-[#0D213F] hover:text-[#FF9F43] transition">
                        ${sub}
                    </button>
                `).join('')}
            </div>
        `;
        hook.appendChild(dropdownDiv);
    });
}

function renderHeroSection() {
    const heroContainer = document.getElementById("hero-showcase");
    if (!heroContainer) return;

    heroContainer.innerHTML = `
        <div class="bg-[#0D213F] rounded-lg border border-gray-800 overflow-hidden flex flex-col lg:flex-row items-stretch">
            <div class="lg:w-2/3 min-h-[300px] bg-cover bg-center" style="background-image: url('main-feature.png');"></div>
            <div class="p-8 lg:w-1/3 flex flex-col justify-center bg-[#071120]/50">
                <span class="text-xs uppercase tracking-widest font-mono font-bold text-[#FF9F43]">Core Enterprise Mission</span>
                <h1 class="text-xl md:text-2xl font-black mt-3 mb-3 text-white">Engineering Fast-Loading Ecosystems</h1>
                <p class="text-gray-400 text-xs leading-relaxed mb-4">Connecting digital storefronts, customized profiles, and media visibility pipelines seamlessly under Higherjess Business rules.</p>
                <div class="text-[10px] text-gray-500 font-mono">Current Context: Kinshasa, DRC • Corporate Notice</div>
            </div>
        </div>
    `;
}

// 2. High-Performance Filtering Controller Block
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
        if(counter) counter.innerText = "Corporate Profile";
        return;
    } else if (type === 'section') {
        title.innerText = `${targetValue} Feed`;
        results = magazineArticles.filter(a => a.section === targetValue);
    } else if (type === 'subsection') {
        title.innerText = `Track: ${targetValue}`;
        results = magazineArticles.filter(a => a.subsection === targetValue);
    }

    if(counter) counter.innerText = `${results.length} Stories Found`;
    displayGridContent(results);
}

// 3. Grid Renderer Engine
function displayGridContent(items) {
    const gridContainer = document.getElementById("articles-grid");
    if (!gridContainer) return;

    if (items.length === 0) {
        gridContainer.innerHTML = `
            <div class="col-span-full py-12 text-center text-sm text-gray-500 italic bg-[#07172E]/30 rounded border border-gray-900">
                No articles published under this layout track yet. Check back soon!
            </div>
        `;
        return;
    }

    gridContainer.innerHTML = items.map(article => `
        <article class="bg-[#07172E] rounded-lg border border-gray-800 overflow-hidden hover:border-gray-700 transition flex flex-col justify-between group">
            <div>
                <div class="h-48 w-full overflow-hidden bg-gray-900 relative">
                    <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src='main-feature.png';">
                    <span class="absolute top-3 left-3 text-[10px] uppercase font-mono font-bold tracking-wider bg-[#0A192F]/80 text-[#FF9F43] px-2 py-0.5 rounded border border-gray-800">
                        ${article.subsection}
                    </span>
                </div>
                <div class="p-5">
                    <h3 class="text-base font-bold text-white group-hover:text-[#FF9F43] transition line-clamp-2 mb-2">${article.title}</h3>
                    <p class="text-gray-400 text-xs leading-relaxed line-clamp-3">${article.summary}</p>
                </div>
            </div>
            <div class="p-5 pt-0 mt-4 flex items-center justify-between text-[11px] font-mono text-gray-500 border-t border-gray-800/40">
                <span>${article.date}</span>
                <span class="text-[#FF9F43] font-sans font-bold cursor-pointer hover:underline">Read Info ↗</span>
            </div>
        </article>
    `).join('');
}

function renderAboutView() {
    const gridContainer = document.getElementById("articles-grid");
    if (!gridContainer) return;

    gridContainer.innerHTML = `
        <div class="col-span-full bg-[#07172E] p-8 rounded-lg border border-gray-800 max-w-3xl">
            <h3 class="text-lg font-bold text-[#FF9F43] mb-4">Digital Solutions Agency Structure</h3>
            <p class="text-gray-300 text-sm leading-relaxed mb-4">
                Higherjess Business specializes in building premium web applications, bespoke professional portfolios, and high-performance online stores via our dedicated division at <span class="text-white font-semibold">www.higherjess.store</span>.
            </p>
            <p class="text-gray-400 text-xs font-mono">
                For administrative operations, reach our desks directly via contact@higherjess.com.
            </p>
        </div>
    `;
}