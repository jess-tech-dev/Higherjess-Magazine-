// posts.js - Custom Article Database for Higherjess Magazine
const magazineArticles = [
    {
        id: "post-1",
        title: "Artificial Intelligence in Modern Full-Stack Workflows",
        summary: "How engineers leverage model generation and headless engines to build lightweight frontends fast.",
        section: "Technology",
        subsection: "AI",
        date: "June 20, 2026",
        readTime: "5 min",
        image: "Gemini_Generated_Image_wmpn6rwmpn6rwmpn.png"
    },
    {
        id: "post-2",
        title: "The Launch of New Denim Style Collections Online",
        summary: "Exploring trends in minimalist layout presentations and e-commerce growth structures.",
        section: "Arts & Culture",
        subsection: "Design",
        date: "June 19, 2026",
        readTime: "4 min",
        image: "Bwwweeeeeeerr_20251226_122415_0000.jpg"
    },
    {
        id: "post-3",
        title: "Inside the Development Labs: Collaborative Ecosystems",
        summary: "Building performant localized portals and training teams on agile engineering architectures.",
        section: "Technology",
        subsection: "Web Development",
        date: "June 18, 2026",
        readTime: "7 min",
        image: "161c339b45e5a463d06d5e82d2b3c727.jpg"
    },
    {
        id: "post-4",
        title: "Authentic Indian Vegetable Spring Rolls Recipe",
        summary: "A crisp, fresh guide to assembling, rolling, and frying golden standard vegetable spring rolls perfectly.",
        section: "Food",
        subsection: "Recipes",
        date: "June 17, 2026",
        readTime: "3 min",
        image: "47e158198d1929025b3457d9ef9dca33.jpg"
    },
    {
        id: "post-5",
        title: "The Vivid Expressionism of Colorful Traditional Headwraps",
        summary: "Analyzing the striking canvas art and historical cultural identity embedded in modern oil portraitures.",
        section: "Arts & Culture",
        subsection: "Painting",
        date: "June 15, 2026",
        readTime: "6 min",
        image: "f5d632798191ab4a2e96a0da460e82ee.jpg"
    }
];

// Complete taxonomy structure for generating navigation dynamically
const menuTaxonomy = {
    "World": ["Countries", "Cities", "Traditions", "Discoveries"],
    "Arts & Culture": ["Painting", "Drawing", "Museums", "Design"],
    "Photography": ["Nature", "Cities", "People", "Wildlife"],
    "Entertainment": ["Movies", "Animation", "Documentaries"],
    "Food": ["African Cuisine", "International Cuisine", "Recipes"],
    "Technology": ["AI", "Web Development", "Startups", "Innovation"],
    "Africa": ["Culture", "Business", "Tourism", "Success Stories"],
    "Inspiration": ["Faith", "Quotes", "Personal Growth", "Testimonies"]
};
