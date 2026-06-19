// src/app.js

// 1. Core local content pool (Always displays instantly if AI stream fails or is loading)
let localArticles = [
    {
        id: "local-1",
        title: "3 UI Design Rules That Instantly Lower Checkout Abandonment Rates",
        summary: "Cluttered checkout processes bleed conversion values. Learn how simplifying input screens, deploying trust badges, and pruning unnecessary navigation items can secure your margins.",
        category: "ecommerce",
        date: "June 19, 2026",
        readTime: "4 min read",
        url: "https://www.higherjess.store"
    },
    {
        id: "local-2",
        title: "Optimizing Portfolio Load Speeds for Ultra-High Mobile Conversion",
        summary: "Discover why sub-second rendering times matter for modern creative agencies. We break down image optimization, asset minification, and caching steps used by Higherjess Business.",
        category: "tech",
        date: "June 18, 2026",
        readTime: "5 min read",
        url: "https://www.higherjess.com"
    }
];

let liveAiArticles = [];

// Initialize layout on page load
document.addEventListener("DOMContentLoaded", () => {
    renderHeroSection();
    
    // Instantly fill the layout with your local data first so it is never empty!
    filterArticles('all'); 
    
    // Now quietly try fetching the live AI news stream in the background
    fetchLiveTechNews();
});

function renderHeroSection() {
    const heroContainer = document.getElementById("hero-post");
    if (!heroContainer) return;
    
    heroContainer.innerHTML = `
        <div class="bg-[#0D213F] rounded-lg border border-gray-800 overflow-hidden flex flex-col lg:flex-row items-stretch hover:border-[#FF9F43] transition">
            <div class="lg:w-1/2 min-h-[250px] bg-cover bg-center bg-gray-900" style="background-image: url('main-feature.png');"></div>
            <div class="p-8 lg:w-1/2 flex flex-col justify-center">
                <span class="text-xs uppercase tracking-widest font-bold text-[#FF9F43] bg-[#FF9F43]/10 px-2.5 py-1 rounded self-start">
                    Featured Core Concept
                </span>
                <h1 class="text-xl md:text-3xl font-black mt-4 mb-3 text-white">
                    Engineering Fast-Loading Digital Environments for Scaling Enterprises
                </h1>
                <p class="text-gray-400 text-sm leading-relaxed mb-4">
                    At Higherjess Business, we combine performance optimizations with elegant layouts to bridge customer journeys seamlessly across web apps, portfolios, and e-commerce stores.
                </p>
                <div class="text-xs text-gray-500 font-medium font-mono">Official Notice • Permanent Exhibit</div>
            </div>
        </div>
    `;
}

async function fetchLiveTechNews() {
    const indicator = document.getElementById("live-indicator");
    
    // A highly reliable public open API endpoint that serves clean tech news JSON without keys
    const techNewsApiUrl = "https://actually-relevant-api.onrender.com/api/stories";

    try {
        const response = await fetch(techNewsApiUrl);
        if (!response.ok) throw new Error("Network response blocked or rate-limited");
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            // Map the fetched data to your magazine template design
            liveAiArticles = data.slice(0, 4).map((item, index) => ({
                id: `ai-${index}`,
                title: item.title,
                summary: item.blurb || item.summary || "Latest technological event breaking online. Read insights and technical community feedback surrounding this development via the external source link.",
                category: "ai-news",
                date: "LIVE NOW",
                readTime: "AI Feed",
                url: item.url || "https://www.higherjess.com"
            }));
            
            if (indicator) indicator.classList.remove("hidden");
            
            // Refresh feed to merge live items alongside your local ones seamlessly
            filterArticles('all');
        }
    } catch (error) {
        console.warn("Live API stream offline or CORS blocked. Staying safe with local content fallback stack.", error);
    }
}

function displayGridContent(items) {
    const gridContainer = document.getElementById("articles-grid");
    if (!gridContainer) return;
    
    gridContainer.innerHTML = "";

    items.forEach(article => {
        gridContainer.innerHTML += `
            <article class="bg-[#07172E] p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition flex flex-col justify-between">
                <div>
                    <span class="text-xs font-mono font-bold text-[#FF9F43] uppercase tracking-wider bg-[#FF9F43]/5 px-2 py-0.5 rounded">
                        ${article.category}
                    </span>
                    <h3 class="text-lg font-bold mt-3 mb-2 text-white line-clamp-2">
                        ${article.title}
                    </h3>
                    <p class="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                        ${article.summary}
                    </p>
                </div>
                <div class="flex items-center justify-between pt-4 border-t border-gray-800/50 mt-4">
                    <span class="text-xs text-gray-500 font-mono">${article.date} • ${article.readTime}</span>
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-[#FF9F43] hover:underline flex items-center gap-1">
                        Read Story ↗
                    </a>
                </div>
            </article>
        `;
    });
}

function filterArticles(category) {
    const titleElement = document.getElementById("grid-title");
    const fullPool = [...localArticles, ...liveAiArticles];

    if (category === 'all') {
        if (titleElement) titleElement.innerText = "Latest Updates & Editorial Pieces";
        displayGridContent(fullPool);
    } else if (category === 'ai-news') {
        if (titleElement) titleElement.innerText = "Live Automated Technology & AI Stream";
        displayGridContent(liveAiArticles);
    } else {
        if (titleElement) titleElement.innerText = `${category.charAt(0).toUpperCase() + category.slice(1)} Articles`;
        displayGridContent(fullPool.filter(a => a.category === category));
    }
}
