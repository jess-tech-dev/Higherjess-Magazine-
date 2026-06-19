// Hardcoded core marketing and agency data objects
let localArticles = [
    {
        id: "local-1",
        title: "3 UI Design Rules That Instantly Lower Checkout Abandonment Rates",
        summary: "Cluttered checkout processes bleed conversion values. Learn how simplifying input screens, deploying trust badges, and pruning navigation items can secure your margins.",
        category: "ecommerce",
        date: "June 15, 2026",
        readTime: "4 min read",
        url: "https://www.higherjess.store"
    }
];

let liveAiArticles = [];

document.addEventListener("DOMContentLoaded", () => {
    renderHeroSection();
    fetchLiveTechNews();
});

// 1. Static Layout Render using the verbatim referenced image main-feature.png
function renderHeroSection() {
    const heroContainer = document.getElementById("hero-post");
    heroContainer.innerHTML = `
        <div class="bg-[#0D213F] rounded-lg border border-gray-800 overflow-hidden flex flex-col lg:flex-row items-stretch hover:border-[#FF9F43] transition">
            <!-- Verbatim referencing of asset file main-feature.png -->
            <div class="lg:w-1/2 min-h-[250px] bg-cover bg-center" style="background-image: url('main-feature.png');"></div>
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

// 2. Automated AI Fetch Mechanism for Tech News Updates
async function fetchLiveTechNews() {
    const gridContainer = document.getElementById("articles-grid");
    const indicator = document.getElementById("live-indicator");
    
    // Fallback public RSS-to-JSON engine parsing open technology feeds
    const backupTechFeedUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://news.ycombinator.com/rss";

    try {
        const response = await fetch(backupTechFeedUrl);
        const data = await response.json();
        
        if (data.status === "ok" && data.items) {
            // Map incoming news items to unified schema formatting
            liveAiArticles = data.items.slice(0, 4).map((item, index) => ({
                id: `ai-${index}`,
                title: item.title,
                summary: `Latest technological event breaking online. Read insights and technical community feedback surrounding this development via the external source link.`,
                category: "ai-news",
                date: item.pubDate ? item.pubDate.split(' ')[0] : "Recently",
                readTime: "Live Stream",
                url: item.link
            }));
            
            indicator.classList.remove("hidden");
        }
    } catch (error) {
        console.warn("Could not load automated news directly, displaying default data stack.", error);
    }

    // Default view joins local static articles and live fetched feeds together
    filterArticles('all');
}

// 3. UI Render Loop Engine
function displayGridContent(items) {
    const gridContainer = document.getElementById("articles-grid");
    gridContainer.innerHTML = "";

    if (items.length === 0) {
        gridContainer.innerHTML = `<p class="text-gray-500 text-sm italic col-span-2">No articles available in this specific track.</p>`;
        return;
    }

    items.forEach(article => {
        gridContainer.innerHTML += `
            <article class="bg-[#07172E] p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition flex flex-col justify-between">
                <div>
                    <span class="text-xs font-mono font-bold text-[#FF9F43] uppercase tracking-wider bg-[#FF9F43]/5 px-2 py-0.5 rounded">
                        ${article.category}
                    </span>
                    <h3 class="text-lg font-bold mt-3 mb-2 text-white">
                        ${article.title}
                    </h3>
                    <p class="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                        ${article.summary}
                    </p>
                </div>
                <div class="flex items-center justify-between pt-4 border-t border-gray-800/50 mt-4">
                    <span class="text-xs text-gray-500 font-mono">${article.date}</span>
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-[#FF9F43] hover:underline flex items-center gap-1">
                        Read Story ↗
                    </a>
                </div>
            </article>
        `;
    });
}

// 4. Filtering controller
function filterArticles(category) {
    const titleElement = document.getElementById("grid-title");
    const fullPool = [...localArticles, ...liveAiArticles];

    if (category === 'all') {
        titleElement.innerText = "Latest Updates & Editorial Pieces";
        displayGridContent(fullPool);
    } else if (category === 'ai-news') {
        titleElement.innerText = "Live Automated Technology & AI Stream";
        displayGridContent(liveAiArticles);
    } else {
        titleElement.innerText = `${category.charAt(0).toUpperCase() + category.slice(1)} Articles`;
        displayGridContent(fullPool.filter(a => a.category === category));
    }
}