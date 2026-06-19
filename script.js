// app.js - Layout Engine

document.addEventListener("DOMContentLoaded", () => {
    renderHeroSection();
    // Instantly display all local articles seamlessly
    displayGridContent(magazineArticles);
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
                    <button onclick="viewArticle('${article.id}')" class="text-xs font-bold text-[#FF9F43] hover:underline flex items-center gap-1">
                        Read Story ↗
                    </button>
                </div>
            </article>
        `;
    });
}

function filterArticles(category) {
    const titleElement = document.getElementById("grid-title");
    if (category === 'all') {
        if (titleElement) titleElement.innerText = "Latest Updates & Editorial Pieces";
        displayGridContent(magazineArticles);
    } else {
        if (titleElement) titleElement.innerText = `${category.charAt(0).toUpperCase() + category.slice(1)} Articles`;
        displayGridContent(magazineArticles.filter(a => a.category === category));
    }
}

// Simple router fallback to log selection for full-screen reading modes later
function viewArticle(postId) {
    console.log(`Loading single view layout for article ID: ${postId}`);
    alert("This will load your beautifully customized full-screen article page view next!");
}
// posts.js - Updated Content Database with Local Images
const magazineArticles = [
    {
        id: "post-1",
        title: "Why PWAs Are the Next Massive Step for E-Commerce Mobile Conversion",
        summary: "Traditional mobile applications are expensive to build and maintain. Progressive Web Apps bridge the gap, delivering lightning-fast rendering speeds, offline functionality, and app-like experiences directly inside the standard mobile browser.",
        category: "tech",
        date: "June 19, 2026",
        readTime: "5 min read",
        image: "Gemini_Generated_Image_wmpn6rwmpn6rwmpn.png" // Displays your high-tech workstation graphic
    },
    {
        id: "post-2",
        title: "3 UI Design Rules That Instantly Lower Checkout Abandonment Rates",
        summary: "Cluttered checkout processes bleed conversion values. Learn how simplifying input screens, deploying explicit trust badges, and pruning unnecessary navigation links can secure your profit margins.",
        category: "ecommerce",
        date: "June 18, 2026",
        readTime: "4 min read",
        image: "Bwwweeeeeeerr_20251226_122415_0000.jpg" // Links your clean style cover design
    },
    {
        id: "post-3",
        title: "Optimizing Portfolio Load Speeds for Ultra-High Client Acquisition",
        summary: "Discover why sub-second rendering times matter for modern digital agencies. We break down the exact image compression formats, asset minification tools, and caching steps used by Higherjess Business.",
        category: "tech",
        date: "June 15, 2026",
        readTime: "6 min read",
        image: "161c339b45e5a463d06d5e82d2b3c727.jpg" // Uses your interactive development lab setting photo
    }
];
