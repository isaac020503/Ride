import { useState, useMemo } from "react";
import { 
  Sparkles, MapPin, Droplets, Gem, Utensils, 
  Compass, Music, Image as ImageIcon, Briefcase, 
  Map as MapIcon, Search, Heart, ShoppingBag, 
  Trash2, Plus, Minus, Check, ArrowRight, X, 
  Thermometer, ShieldAlert, Award, PhoneCall, Info,
  ChevronRight, ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import AIChatbot from "./components/AIChatbot";
import { destinationsData, foodsData, famousDiamondsData, historyTimeline } from "./data";
import { Destination, FoodItem, CartItem, TravelChecklistItem } from "./types";

export default function App() {
  // Page routing
  const [activeTab, setActiveTab] = useState<string>("home");
  
  // Smart Search logic
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Marketplace state
  const [foodCategory, setFoodCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [viewedFood, setViewedFood] = useState<FoodItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [trackingStep, setTrackingStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState<"4x4" | "pony">("4x4");

  // Destination page state
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [destBookingText, setDestBookingText] = useState("");
  const [bookedDest, setBookedDest] = useState<string | null>(null);

  // Gallery view mode
  const [galleryFilter, setGalleryFilter] = useState<string>("all");
  const [activeMediaUrl, setActiveMediaUrl] = useState<string | null>(null);

  // Travel Planner spreadsheet
  const [budgetTransport, setBudgetTransport] = useState(150);
  const [budgetLodge, setBudgetLodge] = useState(240);
  const [budgetFood, setBudgetFood] = useState(100);
  const [budgetActivities, setBudgetActivities] = useState(180);
  const conversionRate = 18.42; // USD to LSL

  // Travel Packing Checklist state
  const [checklist, setChecklist] = useState<TravelChecklistItem[]>([
    { id: "c1", task: "Valid Passport & Border visa documents", category: "documents", completed: true },
    { id: "c2", task: "Warm winter layers & Windproof thermal jacket", category: "clothing", completed: false },
    { id: "c3", task: "Heavy hiking boots & trail socks", category: "gear", completed: true },
    { id: "c4", task: "South African Rands (ZAR/LSL combo cash)", category: "finances", completed: false },
    { id: "c5", task: "Yellow Fever card & personal medicines", category: "health", completed: false },
    { id: "c6", task: "Flashlight / Headlamp for village nights", category: "gear", completed: false },
    { id: "c7", task: "Camera with extra powerbank", category: "gear", completed: true }
  ]);
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [checklistCategory, setChecklistCategory] = useState<"documents" | "clothing" | "gear" | "finances" | "health">("gear");

  // Interactive local map coordinate hover/click details
  const [mapHoveredPoint, setMapHoveredPoint] = useState<string | null>(null);

  // Interactive Custom Meal Plate builder
  const [plateIncludePapa, setPlateIncludePapa] = useState(true);
  const [plateIncludeMoroho, setPlateIncludeMoroho] = useState(true);
  const [plateNama, setPlateNama] = useState<"mutton" | "beef" | "none">("mutton");

  // Cart helper functions
  const addToCart = (food: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.food.id === food.id);
      if (existing) {
        return prev.map(item => item.food.id === food.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { food, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.food.id === id) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.food.id !== id));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.food.price * item.quantity, 0);
  }, [cart]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]);
  };

  // Checklist helper functions
  const toggleChecklist = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const addChecklistItem = () => {
    if (!newChecklistItem.trim()) return;
    setChecklist(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        task: newChecklistItem.trim(),
        category: checklistCategory,
        completed: false
      }
    ]);
    setNewChecklistItem("");
  };

  // Smart Search logic across products and destinations
  const searchResults = useMemo(() => {
    if (!queryClean(searchQuery)) return { dests: [], foods: [], diamonds: [] };
    const q = searchQuery.toLowerCase().trim();
    return {
      dests: destinationsData.filter(d => d.name.toLowerCase().includes(q) || d.summary.toLowerCase().includes(q)),
      foods: foodsData.filter(f => f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)),
      diamonds: famousDiamondsData.filter(d => d.name.toLowerCase().includes(q) || d.notes.toLowerCase().includes(q))
    };
  }, [searchQuery]);

  function queryClean(str: string) {
    return str && str.trim().length > 0;
  }

  // Budget calculations
  const totalUSD = budgetTransport + budgetLodge + budgetFood + budgetActivities;
  const totalLSL = totalUSD * conversionRate;

  // Static news array
  const newsStories = [
    {
      id: "n1",
      date: "May 15, 2026",
      title: "Letseng Mine Unveils High-Purity 150-Carat Diamond",
      source: "Mountain News",
      summary: "A pristine colorless type IIa crystal has been retrieved from the Main Pipe, reflecting stellar premium clarity.",
    },
    {
      id: "n2",
      date: "May 10, 2026",
      title: "Maloti-Drakensberg Park Expands Echo Wilderness Trails",
      source: "Lesotho Tourism",
      summary: "Newly marked paths connect Thaba Bosiu landmarks to hidden San rock galleries beneath beautiful high ranges.",
    },
    {
      id: "n3",
      date: "Apr 28, 2026",
      title: "LHWP Phase II Pipeline Excavation Ahead of Schedule",
      source: "Water Authority",
      summary: "The majestic Polihali Reservoir development marks major milestone generating high-altitude clean-power flow.",
    }
  ];

  // Map interactive points list
  const mapHotspots = [
    { destId: "thaba-bosiu", label: "Thaba Bosiu Fortress", x: "32%", y: "45%", desc: "Seat of King Moshoeshoe" },
    { destId: "katse-dam", label: "Katse Dam", x: "50%", y: "38%", desc: "Highlands Water Tower" },
    { destId: "maletsunyane", label: "Maletsunyane Falls", x: "42%", y: "68%", desc: "192m Epic Waterfall (Semonkong)" },
    { destId: "sani-pass", label: "Sani Pass Summit", x: "82%", y: "58%", desc: "The Gateway & Highest Pub" },
    { destId: "sehlabathebe", label: "Sehlabathebe National Park", x: "74%", y: "82%", desc: "UNESCO Wilderness" },
    { destId: "afriski", label: "Afriski High Resort", x: "65%", y: "22%", desc: "Alpine Snow Arena" },
    { destId: "liphofung", label: "Liphofung Caves", x: "52%", y: "20%", desc: "Ancient San Rock Art" }
  ];

  // Gather photos dynamically for the media center
  const allMediaItems = useMemo(() => {
    const items: Array<{ url: string; category: "mountains" | "villages" | "waterfalls" | "culture" | "food"; title: string }> = [
      { url: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Maletsunyanefalls.JPG", category: "waterfalls", title: "Maletsunyane Canyon Vista" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/4/47/Katse_Dam.jpg", category: "waterfalls", title: "Katse Spillway Basin" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Thaba_Bosiu.jpg", category: "villages", title: "Thaba Bosiu Sacred Plateau" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/2/26/Sehlabathebe_National_Park.jpg", category: "mountains", title: "Sehlabathebe Rock Towers" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/3/35/Lesotho_-_Thatch_hut_village.jpg", category: "villages", title: "Heritage Rondavel Homesteads" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/4/42/Old_Lesotho_clay_huts.jpg", category: "culture", title: "Ancient Clay Dwellings" },
      { url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80", category: "food", title: "Traditional Papa cooking" },
      { url: "https://images.unsplash.com/photo-1598958223659-1f4ec3da5393?auto=format&fit=crop&w=800&q=80", category: "food", title: "Red Sorghum fermentation" },
      { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", category: "mountains", title: "Drakensberg Escarpment Dawn" }
    ];
    return items;
  }, []);

  const filteredMedia = allMediaItems.filter(item => galleryFilter === "all" || item.category === galleryFilter);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans relative overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      {/* Dynamic Background Noise Accent */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-purple-900/10 blur-3xl rounded-full pointer-events-none z-0"></div>
      <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full pointer-events-none z-0"></div>

      {/* HEADER NAVIGATION - GLASSMORPHISM */}
      <header className="sticky top-0 h-20 px-4 md:px-10 flex items-center justify-between border-b border-white/10 bg-black/85 backdrop-blur-md z-40 transition-all">
        <div className="flex items-center gap-8 lg:gap-12">
          <div 
            onClick={() => setActiveTab("home")}
            className="text-xl md:text-2xl font-black tracking-widest text-white cursor-pointer hover:opacity-90"
          >
            VISIT<span className="text-purple-500 bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent">LESOTHO</span>
          </div>
          
          <nav className="hidden lg:flex gap-6 xl:gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-white/60">
            <button 
              onClick={() => setActiveTab("about")} 
              className={`hover:text-white transition-colors py-1 ${activeTab === "about" ? "text-purple-400 border-b border-purple-500 font-bold" : ""}`}
            >
              The Kingdom & History
            </button>
            <button 
              onClick={() => setActiveTab("water")} 
              className={`hover:text-white transition-colors py-1 ${activeTab === "water" ? "text-purple-400 border-b border-purple-500 font-bold" : ""}`}
            >
              Water Legacy
            </button>
            <button 
              onClick={() => setActiveTab("diamonds")} 
              className={`hover:text-white transition-colors py-1 ${activeTab === "diamonds" ? "text-purple-400 border-b border-purple-500 font-bold" : ""}`}
            >
              Diamond Mines
            </button>
            <button 
              onClick={() => setActiveTab("destinations")} 
              className={`hover:text-white transition-colors py-1 ${activeTab === "destinations" ? "text-purple-400 border-b border-purple-500 font-bold" : ""}`}
            >
              Destinations
            </button>
            <button 
              onClick={() => setActiveTab("marketplace")} 
              className={`hover:text-white transition-colors py-1 ${activeTab === "marketplace" ? "text-purple-400 border-b border-purple-500 font-bold" : ""}`}
            >
              Food Market
            </button>
            <button 
              onClick={() => setActiveTab("culture")} 
              className={`hover:text-white transition-colors py-1 ${activeTab === "culture" ? "text-purple-400 border-b border-purple-500 font-bold" : ""}`}
            >
              Culture & Media
            </button>
            <button 
              onClick={() => setActiveTab("planner")} 
              className={`hover:text-white transition-colors py-1 ${activeTab === "planner" ? "text-purple-400 border-b border-purple-500 font-bold" : ""}`}
            >
              Planner & Map
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Menu dropdown selector */}
          <div className="lg:hidden relative">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="bg-white/5 border border-white/15 text-xs text-white rounded-lg px-3 py-2 font-mono"
            >
              <option value="home">Home</option>
              <option value="about">About & History</option>
              <option value="water">Water Legacy</option>
              <option value="diamonds">Diamond Mines</option>
              <option value="destinations">Destinations</option>
              <option value="marketplace">Food Market</option>
              <option value="culture">Culture & Media</option>
              <option value="planner">Planner & Map</option>
            </select>
          </div>

          <button 
            onClick={() => setSearchOpen(true)}
            className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-purple-400"
            title="Search Platform"
          >
            <Search className="w-4 h-4" />
          </button>

          <button 
            onClick={() => setActiveTab("marketplace")}
            className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-amber-400 relative"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 text-[9px] font-bold rounded-full flex items-center justify-center text-white scale-110 animate-bounce">
                {cart.reduce((s, c) => s + c.quantity, 0)}
              </span>
            )}
          </button>

          <button 
            onClick={() => setActiveTab("planner")}
            className="hidden md:block px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-white shadow-lg shadow-purple-600/20 hover:scale-[1.03] active:scale-95 transition-all"
          >
            Plan Journey
          </button>
        </div>
      </header>

      {/* VIEWPORT CONTROLLER */}
      <main className="flex-1 z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
        
        {/* TAB 1: HOME PAGE */}
        {activeTab === "home" && (
          <div className="space-y-12">
            {/* HERO MODULE */}
            <div className="flex flex-col lg:flex-row gap-8 items-stretch pt-4">
              <div className="w-full lg:w-[45%] flex flex-col justify-between py-6">
                <div>
                  <div className="text-xs text-amber-500 font-extrabold uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" /> The Kingdom in the Sky
                  </div>
                  <h1 className="text-5xl md:text-[5.4rem] font-serif italic font-light leading-none mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/30">
                    Pure <br/><span>Highlands</span>
                  </h1>
                  <p className="text-white/60 leading-relaxed text-sm md:text-base max-w-md mb-8">
                    Rising 3,000 meters above sea level, Lesotho invites you to a majestic sanctuary of untouched mountain ranges, roaring waterfalls, sparkling diamonds, and ancient fortress legacies.
                  </p>
                  
                  {/* Dynamic Indicators */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="text-2xl font-serif italic text-amber-500 font-semibold">3,482m</div>
                      <div className="text-[9px] uppercase tracking-widest text-white/40 font-bold mt-1">Thabana Ntlenyana Peak</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="text-2xl font-serif italic text-purple-400 font-semibold">192m</div>
                      <div className="text-[9px] uppercase tracking-widest text-white/40 font-bold mt-1">Maletsunyane Drop</div>
                    </div>
                  </div>
                </div>

                {/* Sky Concierge Box */}
                <div className="p-5 rounded-2xl bg-indigo-950/20 border border-purple-500/20 shadow-md backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-xl rounded-full"></div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">Sky Concierge Active</div>
                  </div>
                  <p className="text-xs text-white/80 italic leading-relaxed">
                    &quot;Lekhetho Morena! Winter snow is setting peacefully onto the high peaks of Afriski. All mountain roads are currently clear and perfect for pony trekking Semonkong canyon paths.&quot;
                  </p>
                  <button 
                    onClick={() => {
                      const tg = document.getElementById("applet-ai-chatbot-toggle");
                      if (tg) (tg as HTMLElement).click();
                    }}
                    className="mt-3 text-[10px] text-purple-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Chat with Morena Bot <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* HERO VISUAL MEDIA PREVIEW */}
              <div className="w-full lg:w-[55%] rounded-3xl overflow-hidden border border-white/10 relative min-h-[350px] lg:min-h-[500px] flex flex-col justify-end p-8 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.85)), url('https://upload.wikimedia.org/wikipedia/commons/8/8d/Maletsunyanefalls.JPG')" }}>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                  Semonkong Highlands
                </div>
                <div className="max-w-md">
                  <h3 className="text-2xl font-serif mb-2">Maletsunyane Canyon</h3>
                  <p className="text-white/70 text-xs leading-relaxed mb-4">
                    The place of mist and spirits. Witness Africa&apos;s longest single-drop waterfall gorge where the roar of pristine mountain rivers echoes eternally.
                  </p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        setSelectedDest(destinationsData[0]);
                        setActiveTab("destinations");
                      }}
                      className="px-4 py-2 bg-white text-black text-[10px] font-bold uppercase rounded-lg tracking-widest hover:bg-gray-200 transition-colors"
                    >
                      Explore Guides
                    </button>
                    <button 
                      onClick={() => setActiveTab("planner")}
                      className="px-4 py-2 border border-white/20 text-[10px] font-bold uppercase rounded-lg tracking-widest hover:bg-white/5 transition-colors"
                    >
                      Calculate Budget
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* TOURISM QUICK HIGHLIGHT STATISTICS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-y border-white/10">
              <div className="text-center p-4">
                <div className="text-3xl font-serif italic text-white/30 mb-1">01.</div>
                <div className="text-sm font-bold text-white mb-0.5">300+ Days</div>
                <div className="text-xs text-white/50">Luminous Highland Sun</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-serif italic text-white/30 mb-1">02.</div>
                <div className="text-sm font-bold text-white mb-0.5">LSL 18.42</div>
                <div className="text-xs text-white/50">Maseru Exchange rate</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-serif italic text-white/30 mb-1">03.</div>
                <div className="text-sm font-bold text-white mb-0.5">UNESCO World</div>
                <div className="text-xs text-white/50">National Park status</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-serif italic text-white/30 mb-1">04.</div>
                <div className="text-sm font-bold text-white mb-0.5">Type IIa Gems</div>
                <div className="text-xs text-white/50">Letseng World Record</div>
              </div>
            </div>

            {/* QUICK FEATURE NAVIGATION CARDS */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-purple-400">Discover More</h3>
                  <h2 className="text-2xl font-serif italic mt-1">Platform Modules</h2>
                </div>
                <span className="text-xs text-white/40">Select cards below</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                  onClick={() => setActiveTab("water")}
                  className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 hover:border-purple-500/20 hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold mb-1 group-hover:text-purple-300 transition-colors">Water Legacy</h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Unveil the engineering beauty of Katse Dam and why Lesotho is Southern Africa&apos;s supreme Water Tower.
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[10px] text-purple-400 tracking-wider font-bold">
                    EXPLORE HYDRO <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab("diamonds")}
                  className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 hover:border-amber-500/20 hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                    <Gem className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold mb-1 group-hover:text-amber-300 transition-colors">Precious Diamonds</h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Search the Top 10 world-record diamonds retrieved from the high Kimberlite tubes of the Maloti Ranges.
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[10px] text-amber-500 tracking-wider font-bold">
                    EXPLORE DIAMONDS <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab("marketplace")}
                  className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 hover:border-purple-500/20 hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold mb-1 group-hover:text-rose-300 transition-colors">Traditional Food Marketplace</h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Order legendary fermented Motoho, organic Highland Mutton stews, or baked local dishes directly online.
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[10px] text-purple-400 tracking-wider font-bold">
                    ORDER FOODS <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURED DESTINATIONS TEASER CAROUSEL */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-amber-500">Alpine Wonders</h3>
                  <h2 className="text-2xl font-serif italic mt-1">Featured Highlands</h2>
                </div>
                <button 
                  onClick={() => setActiveTab("destinations")} 
                  className="text-xs text-purple-400 hover:underline flex items-center gap-1"
                >
                  View All {destinationsData.length} <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {destinationsData.filter(d => d.featured).map(dest => (
                  <div 
                    key={dest.id}
                    className="group rounded-3xl overflow-hidden border border-white/10 bg-[#0c0c0c] flex flex-col hover:border-white/20 transition-all"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={dest.image} 
                        alt={dest.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/60 text-[10px] uppercase font-bold tracking-widest text-[#b46cff]">
                        {dest.category}
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/75 text-[9px] font-mono text-gray-300">
                        {dest.elevation}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-lg font-bold font-serif mb-1 group-hover:text-purple-300 transition-colors">{dest.name}</h4>
                        <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{dest.summary}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">
                          192m Drop View
                        </span>
                        <button 
                          onClick={() => {
                            setSelectedDest(dest);
                            setActiveTab("destinations");
                          }}
                          className="p-1 text-white hover:text-purple-400 transition-colors"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TASTE OF THE HIGHLANDS & CULINARY HERITAGE */}
            <div className="py-12 border-y border-white/5 my-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#b46cff]">Basotho Comfort Cuisine</span>
                  <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-2">Taste of the Highlands</h2>
                  <p className="text-xs md:text-sm text-white/55 max-w-2xl leading-relaxed">
                    Discover the culinary traditions of Lesotho. Hearty, slow-simmered stews cooked over open fires, healthy fermented grains, and organic highland ingredients that sustain mountain life in the Kingdom in the Sky.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("marketplace")}
                  className="mt-4 md:mt-0 text-[11px] text-[#b46cff] font-bold tracking-widest hover:text-[#c48cff] transition-colors flex items-center gap-1 uppercase"
                >
                  Enter Food Marketplace <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Traditional Stews Showcase */}
                <div className="lg:col-span-7 space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-[#b46cff]" /> Featured Traditional Stews
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Highland Mutton Stew */}
                    <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-white/10 hover:border-purple-500/20 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-3">
                          <h4 className="font-bold text-white text-base">Highland Mutton Stew</h4>
                          <span className="px-2.5 py-1 rounded bg-purple-500/10 text-[#b46cff] text-xs font-mono font-bold whitespace-nowrap">LSL 115.00</span>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed mb-4">
                          A slow-cooked meal made with organic mutton raised on pristine highland grasslands. It is simmered for up to 6 hours with local herbs like highland wild thyme.
                        </p>
                      </div>
                      <div className="text-[10px] text-amber-500 uppercase tracking-widest font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Slow-cooked (6 hours)
                      </div>
                    </div>

                    {/* Nyekoe Stew */}
                    <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-white/10 hover:border-purple-500/20 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-3">
                          <h4 className="font-bold text-white text-base">Nyekoe Stew</h4>
                          <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-mono font-bold whitespace-nowrap">LSL 45.00</span>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed mb-4">
                          A classic, comforting Basotho vegetarian dish. It combines dried sugar beans, yellow sorghum grains, and tender sweet pumpkin chunks slow-simmered together with fresh seasoning.
                        </p>
                      </div>
                      <div className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1">
                        ● 100% Vegetarian • Ancient Recipe
                      </div>
                    </div>
                  </div>

                  {/* Understanding the Full Meal breakdown */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b46cff]"></span>
                      Understanding the Full Meal: Papa, Moroho le Nama
                    </h4>
                    <p className="text-xs text-white/70 leading-relaxed">
                      In Basotho culture, stews are almost always served as part of a larger, nutritious plate that balances pure starch, leafy green minerals, and local meats:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                        <span className="text-amber-500 text-xs font-bold block mb-1">Papa (The Starch Base)</span>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                          A stiff, unseasoned white maize meal porridge. It is the core energy source for miners, horsemen, and shepherds.
                        </p>
                      </div>
                      <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                        <span className="text-[#b46cff] text-xs font-bold block mb-1">Moroho (The Greens)</span>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                          Sautéed dark green leafy vegetables (such as mustard greens, spinach, or wild mountain greens) seasoned with onions.
                        </p>
                      </div>
                      <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                        <span className="text-rose-400 text-xs font-bold block mb-1">Nama (The Meat)</span>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                          The premium protein element, consisting of aromatic slow-cooked mutton, beef brisket, or local village chicken.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Street Food Price Index & Interactive Creator */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-b from-[#111] to-[#090909] border border-white/10 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div>
                      <span className="text-[9px] font-mono text-[#b46cff] font-bold uppercase tracking-widest">Travel Economics</span>
                      <h3 className="text-lg font-serif mt-1">Lesotho Travel Budget Guide</h3>
                      <p className="text-xs text-white/55 mt-1 leading-relaxed">
                        Street side stalls and local village markets offer spectacular culinary value. See typical local street prices compared to highland lodges, and build your custom plate below!
                      </p>
                    </div>

                    {/* Price Index Table directly using user specs */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Common Local Prices (M / LSL)</h4>
                      <div className="space-y-2 text-xs divide-y divide-white/5">
                        <div className="flex justify-between py-1.5 pt-0">
                          <span className="text-white/70">Papa + Moroho (Basic Combo)</span>
                          <span className="font-mono text-amber-500 font-bold">M20.00 – M25.00</span>
                        </div>
                        <div className="flex justify-between py-1.5">
                          <span className="text-white/70">Papa + Moroho + Nama (Meat Plate)</span>
                          <span className="font-mono text-amber-500 font-bold">M35.00 – M50.00</span>
                        </div>
                        <div className="flex justify-between py-1.5">
                          <span className="text-white/70">Fermented Motoho Drink</span>
                          <span className="font-mono text-amber-500 font-bold">M10.00 – M15.00</span>
                        </div>
                        <div className="flex justify-between py-1.5">
                          <span className="text-white/70">Gemere Traditional Ginger Beer</span>
                          <span className="font-mono text-amber-500 font-bold">M8.00 – M12.00</span>
                        </div>
                      </div>
                      <span className="text-[9px] text-white/30 block mt-1 italic leading-tight">
                        * Note: Lesotho Loti (LSL) / Maloti (M) is pegged 1:1 with the South African Rand (ZAR) which is widely accepted.
                      </span>
                    </div>

                    {/* Dynamic interactive plate builder component */}
                    <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/10 space-y-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider">Interactive Plate Builder</span>
                        <span className="text-[9px] font-mono text-purple-400 bg-purple-400/10 px-1.5 py-0.5 rounded uppercase">Live pricing</span>
                      </div>
                      
                      {/* Interactive selectors */}
                      <div className="space-y-3">
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 text-xs text-white/80 cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              checked={plateIncludePapa} 
                              onChange={(e) => setPlateIncludePapa(e.target.checked)}
                              className="accent-[#b46cff] h-4 w-4 bg-black border-white/10" 
                            />
                            Add Papa (Starch)
                          </label>
                          <label className="flex items-center gap-2 text-xs text-white/80 cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              checked={plateIncludeMoroho} 
                              onChange={(e) => setPlateIncludeMoroho(e.target.checked)}
                              className="accent-[#b46cff] h-4 w-4 bg-black border-white/10" 
                            />
                            Add Moroho (Mustard Greens)
                          </label>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest block">Choose Nama (Protein component)</span>
                          <div className="grid grid-cols-3 gap-1.5 text-xs">
                            <button 
                              onClick={() => setPlateNama("mutton")}
                              className={`py-1.5 rounded transition-all text-center ${plateNama === "mutton" ? "bg-[#b46cff] text-black font-bold font-mono" : "bg-white/5 text-white/70 border border-white/5 hover:bg-white/10"}`}
                            >
                              Mutton Stew
                            </button>
                            <button 
                              onClick={() => setPlateNama("beef")}
                              className={`py-1.5 rounded transition-all text-center ${plateNama === "beef" ? "bg-[#b46cff] text-black font-bold font-mono" : "bg-white/5 text-white/70 border border-white/5 hover:bg-white/10"}`}
                            >
                              Beef Stew
                            </button>
                            <button 
                              onClick={() => setPlateNama("none")}
                              className={`py-1.5 rounded transition-all text-center ${plateNama === "none" ? "bg-[#b46cff] text-black font-bold font-mono" : "bg-white/5 text-white/70 border border-white/5 hover:bg-white/10"}`}
                            >
                              No Protein
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Calculations Display */}
                      <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-center">
                        <div className="p-2 bg-black/40 rounded border border-white/5">
                          <span className="text-[9px] uppercase tracking-wider text-gray-500 block">Est. Street Stall Cost</span>
                          <span className="text-sm font-bold font-mono text-amber-500">
                            M{(
                              (plateIncludePapa && plateIncludeMoroho && plateNama !== "none") ? 42.5
                              : (plateIncludePapa && plateIncludeMoroho) ? 22.5
                              : (plateIncludePapa && plateNama !== "none") ? 32.5
                              : (plateNama !== "none") ? 25
                              : (plateIncludeMoroho) ? 12
                              : 0
                            ).toFixed(2)}
                          </span>
                        </div>
                        <div className="p-2 bg-black/40 rounded border border-white/5">
                          <span className="text-[9px] uppercase tracking-wider text-gray-500 block">Lodge Restaurant Cost</span>
                          <span className="text-sm font-bold font-mono text-purple-400">
                            LSL{(
                              (plateIncludePapa ? 15 : 0) + 
                              (plateIncludeMoroho ? 12 : 0) + 
                              (plateNama === "mutton" ? 115 : plateNama === "beef" ? 95 : 0)
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 lg:mt-0 border-t border-white/5 flex items-center justify-between text-[11px] text-white/45">
                    <span>💡 Tap to try combinations</span>
                    <button 
                      onClick={() => {
                        // Quick order to marketplace item
                        setActiveTab("marketplace");
                        if (plateNama === "mutton") {
                          setFoodCategory("stews");
                        } else {
                          setFoodCategory("all");
                        }
                      }}
                      className="text-purple-400 hover:text-purple-300 transition-colors font-bold uppercase tracking-wider font-mono text-[10px]"
                    >
                      Browse full menu &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* LATEST MOUNTAIN TOURISM NEWS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
              <div className="lg:col-span-1 flex flex-col justify-center">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-purple-400">Highlands Dispatch</span>
                <h2 className="text-3xl font-serif italic mt-2 mb-4 leading-tight">Latest News &amp; Travel Advisories</h2>
                <p className="text-xs text-justify text-white/50 leading-relaxed mb-6">
                  Stay updated with dynamic events occurring in the Kingdom. From new diamond discoveries at Letseng to seasonal snow conditions across Sani Pass.
                </p>
                <button 
                  onClick={() => setActiveTab("about")}
                  className="px-5 py-3 rounded-full border border-white/20 text-[11.5px] font-bold uppercase tracking-wider text-white hover:bg-white/5 transition-all text-center"
                >
                  About Lesotho History
                </button>
              </div>

              <div className="lg:col-span-2 space-y-4">
                {newsStories.map(story => (
                  <div 
                    key={story.id} 
                    className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors flex items-start gap-4"
                  >
                    <div className="px-3 py-1 bg-purple-500/10 rounded-lg text-purple-400 text-[10px] font-mono whitespace-nowrap">
                      {story.date}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-snug mb-1">{story.title}</h4>
                      <p className="text-xs text-white/50 leading-relaxed mb-1">{story.summary}</p>
                      <span className="text-[9px] text-amber-500 uppercase font-mono tracking-wider font-semibold">Source: {story.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ABOUT LESOTHO & HISTORY */}
        {activeTab === "about" && (
          <div className="space-y-12">
            
            {/* HERITAGE GRID LANDING */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
              <div className="lg:col-span-7 flex flex-col justify-between py-2">
                <div>
                  <span className="text-xs text-amber-500 font-extrabold uppercase tracking-[0.3em]">The Cradle of Basotho</span>
                  <h2 className="text-4xl md:text-5xl font-serif mt-2 mb-6">Our Deep Heritage</h2>
                  <p className="text-sm text-white/70 leading-relaxed mb-4 text-justify">
                    In the early 19th century (circa 1824), amidst the devastating regional expansionist wars known as the <em>Lifaqane</em>, Chief Moshoeshoe rallied peaceful refugees, families, and shattered clans into a unified home. Through master defensive strategy, he created the **Basotho Nation**.
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed mb-6 text-justify">
                    King Moshoeshoe I was a revolutionary diplomat who utilized the sandstone flat-topped fortress of **Thaba Bosiu** as a military shield. Rather than fighting endlessly, he sent cattle to hostile invaders as diplomatic tribute and entered into treaties with French missionaries and British colonial forces, securing Basutoland border rights that eventually culminated in full independence on **October 4, 1966**.
                  </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                  <div>
                    <span className="text-[10px] uppercase text-white/40 tracking-widest block font-bold">Population</span>
                    <span className="text-lg font-serif italic text-amber-500 font-bold">2.3 Million</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-white/40 tracking-widest block font-bold">Languages</span>
                    <span className="text-lg font-serif italic text-purple-400 font-bold">Sesotho &amp; English</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-white/40 tracking-widest block font-bold">Gov Structure</span>
                    <span className="text-lg font-serif italic text-amber-500 font-bold">Constitutional Monarchy</span>
                  </div>
                </div>
              </div>

              {/* IMAGE COLUMN */}
              <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-white/10 h-[380px] lg:h-auto min-h-[300px]">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Thaba_Bosiu.jpg" 
                  alt="Thaba Bosiu Mount" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-6">
                  <span className="text-[10px] text-amber-400 uppercase font-mono tracking-widest block">Birthplace of the Nation</span>
                  <h4 className="text-lg font-bold font-serif text-white">Thaba Bosiu Flat-Topped Plateau</h4>
                </div>
              </div>
            </div>

            {/* THE TIMELINE OF EMPIRE FORMATION */}
            <div className="bg-[#0b0b0b] border border-white/10 rounded-3xl p-6 md:p-8">
              <div className="mb-8 text-center">
                <span className="text-xs text-purple-400 uppercase tracking-widest font-mono">Chronicles of the Kingdom</span>
                <h3 className="text-2xl font-serif italic mt-1 text-white">Historical Milestones</h3>
              </div>

              <div className="relative border-l-2 border-purple-500/20 ml-4 md:ml-24 space-y-12 py-4">
                {historyTimeline.map((item, index) => (
                  <div key={index} className="relative pl-6 md:pl-12 group">
                    {/* Ring indicator */}
                    <div className="absolute -left-2.5 top-0.5 w-4 h-4 rounded-full bg-black border-2 border-purple-500 group-hover:bg-purple-500 transition-colors z-10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    </div>
                    
                    {/* Year Label */}
                    <div className="absolute left-[-20px] md:left-[-110px] top-[-1px] text-[11px] font-mono font-extrabold text-amber-400 bg-[#121212] px-2 py-0.5 rounded border border-white/10">
                      {item.year}
                    </div>

                    <div className="max-w-2xl bg-[#0e0e0e] border border-white/5 p-5 rounded-2xl hover:border-white/15 transition-all">
                      <h4 className="text-md font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-xs text-white/50 leading-relaxed text-justify">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NATIONAL SYMBOLS & CULTURAL JEWELS */}
            <div>
              <div className="mb-8">
                <span className="text-xs text-amber-500 uppercase tracking-widest font-mono">Sacred Icons</span>
                <h3 className="text-2xl font-serif italic mt-1">National Symbols</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="text-amber-500 font-mono text-xs font-bold mb-2">01 / APPAREL</div>
                    <h4 className="text-lg font-bold font-serif mb-2">The Basotho Blanket</h4>
                    <p className="text-xs text-white/50 leading-relaxed text-justify">
                      The Seanamarena or Sefate blankets are iconic wool apparel worn as protective shields against freezing highland nights. Every unique design symbolises sovereignty, royal growth, and deep connection to the land.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                    Emblem of Identity
                  </div>
                </div>

                <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="text-[#b46cff] font-mono text-xs font-bold mb-2">02 / EMBLEM</div>
                    <h4 className="text-lg font-bold font-serif mb-2">The Mokorotlo Hat</h4>
                    <p className="text-xs text-white/50 leading-relaxed text-justify">
                      A beautifully conical straw woven hat inspired by the shape of the Qiloane mount hill next to Thaba Bosiu. It is the core national symbol of Lesotho, featured as a silhouette at the center of the official flag.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-amber-500 font-bold uppercase tracking-wider">
                    Sovereign Crown
                  </div>
                </div>

                <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="text-emerald-500 font-mono text-xs font-bold mb-2">03 / LIVE ASSET</div>
                    <h4 className="text-lg font-bold font-serif mb-2">The Basotho Pony</h4>
                    <p className="text-xs text-white/50 leading-relaxed text-justify">
                      Introduced in the 18th century, ponies adapted perfectly to become the supreme mountain transportation. Sure-footed and robust, they navigate vertical tracks easily.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    Highland Steed
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WATER RESOURCES PAGE */}
        {activeTab === "water" && (
          <div className="space-y-12">
            
            {/* HERO INTRODUCTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 items-center">
              <div>
                <span className="text-xs text-purple-400 font-extrabold uppercase tracking-[0.3em]">Southern Africa&apos;s Water Tower</span>
                <h2 className="text-4xl md:text-5xl font-serif mt-2 mb-6">The Legacy of Blue Gold</h2>
                <p className="text-sm text-white/70 leading-relaxed mb-4 text-justify">
                  Because of its massive elevation averages, clear mountain catchments, and frequent rainflows, Lesotho is called the supreme **Water Tower of Southern Africa**. 
                </p>
                <p className="text-sm text-white/70 leading-relaxed mb-6 text-justify">
                  Through the historic **Lesotho Highlands Water Project (LHWP)**, a grand treaty signed between Lesotho and South Africa, massive highland rivers are channeled through valleys to generate local hydroelectric power while exporting billions of gallons of crystal clean water to the Gauteng industrial region.
                </p>

                {/* Energy generation stats */}
                <div className="p-5 rounded-2xl bg-indigo-950/20 border border-purple-500/20">
                  <h4 className="text-xs font-extrabold uppercase text-amber-500 tracking-wider mb-2">Muela Hydroelectric Station</h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    By routing the force of falling water down immense tunnels, Lesotho generates nearly 100% of its local domestic electricity requirements, reducing dependency on external networks.
                  </p>
                </div>
              </div>

              {/* Dam photo centerpiece */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 h-[320px] lg:h-[420px]">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/4/47/Katse_Dam.jpg" 
                  alt="Katse Dam Spillway" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/75 rounded text-[10px] uppercase font-bold tracking-widest text-[#b46cff]">
                  Katse Arch Wall (185m High)
                </div>
              </div>
            </div>

            {/* INTERACTIVE RESERVOIR METRICS CHART */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#090909] border border-white/10">
              <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-amber-500">Resource Statistics</h4>
                  <h3 className="text-xl font-serif mt-0.5">Annual Water Reserves &amp; Export Volume</h3>
                </div>
                <div className="flex gap-4 text-xs font-mono text-white/60">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Exported to SA (Million m³)
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Hydro-Power (gWh)
                  </div>
                </div>
              </div>

              {/* Simulated Gorgeous SVG Graphic Bar Chart representing LHWP outputs */}
              <div className="space-y-6 pt-4">
                {[
                  { year: "2020", export: 780, hydro: 110 },
                  { year: "2022", export: 820, hydro: 115 },
                  { year: "2024", export: 910, hydro: 122 },
                  { year: "2026 (Est)", export: 980, hydro: 135 }
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-12 items-center gap-4">
                    <div className="col-span-2 text-xs font-mono font-bold text-gray-400">{row.year}</div>
                    <div className="col-span-12 md:col-span-10 flex flex-col gap-1.5">
                      {/* Export Bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3.5 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full" 
                            style={{ width: `${(row.export / 1000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-[11px] font-mono text-blue-400 w-16">{row.export}M m³</span>
                      </div>
                      {/* Hydro Bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 w-white/5 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-purple-600 to-indigo-400 h-full rounded-full animate-pulse" 
                            style={{ width: `${(row.hydro / 150) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-[11px] font-mono text-purple-400 w-16">{row.hydro} gWh</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-white/30 text-center mt-6">
                *Compiled indicators pointing to historic Water Resource generation protocols of Katse Reservoir and Mohale catchment basins.
              </p>
            </div>

            {/* DAMS PROFILE SHOWCASE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-[#0c0c0c] border border-white/5 rounded-2xl">
                <span className="text-[10px] uppercase tracking-widest text-[#b46cff] font-bold block mb-2">Dam Spotlight 01</span>
                <h4 className="text-xl font-serif mb-3">Mohale Dam Infrastructure</h4>
                <p className="text-xs text-justify text-white/55 leading-relaxed mb-4">
                  Constructed as Phase 1B of the Highlands pipeline, Mohale Dam is a massive rock-fill concrete face structure. Standing at 145m high, it connects to Katse Dam via a continuous 32-kilometer vacuum tunnel running beneath the mountains.
                </p>
                <div className="flex gap-4 text-[10px] font-mono font-bold text-amber-500 uppercase">
                  <span>Capacity: 958M m³</span>
                  <span>Completed: 2002</span>
                </div>
              </div>

              <div className="p-6 bg-[#0c0c0c] border border-white/5 rounded-2xl">
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block mb-2">Dam Spotlight 02</span>
                <h4 className="text-xl font-serif mb-3">Proposed Polihali Reservoir</h4>
                <p className="text-xs text-justify text-white/55 leading-relaxed mb-4">
                  Currently breaking ground as Phase II, the enormous Polihali concrete-faced rockfill layout in Mokhotlong will increase total water transfer capacity by several million cubic meters to South Africa while further expanding clean electricity.
                </p>
                <div className="flex gap-4 text-[10px] font-mono font-bold text-[#b46cff] uppercase">
                  <span>Excavation Active</span>
                  <span>Impact: High Economic</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DIAMONDS & MINING */}
        {activeTab === "diamonds" && (
          <div className="space-y-12">
            
            {/* HERO INTRODUCTION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs text-amber-500 font-extrabold uppercase tracking-[0.3em]">Extreme Geological Formations</span>
                <h2 className="text-4xl md:text-5xl font-serif">Deep Alpine Kimberlites</h2>
                <p className="text-sm text-white/70 leading-relaxed text-justify">
                  Deep within the high basalt layers of the Maloti range lie some of the world&apos;s preeminent vertical Kimberlite pipes. Lesotho is home to three major operations: **Letseng**, **Liqhobong**, and **Mothae**.
                </p>
                <p className="text-sm text-white/70 leading-relaxed text-justify">
                  The legendary **Letseng Mine** (owned by Gem Diamonds) is globally famous for producing the highest value dollar-per-carat diamonds in existence. It has yielded several exceptional crystals including the **910-carat Lesotho Legend** and the **603-carat Lesotho Promise**, setting global records for colorless premium purity.
                </p>
              </div>

              <div className="lg:col-span-5 h-[300px] rounded-3xl overflow-hidden border border-white/10 relative">
                <img 
                  src="https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&w=800&q=80" 
                  alt="Letseng Cut Diamond" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[9px] uppercase text-amber-500 tracking-wider">Type IIa Perfection</span>
                  <h4 className="text-md font-serif font-bold">Uncompromising Translucency</h4>
                </div>
              </div>
            </div>

            {/* TOP 10 FAMOUS DIAMONDS DISCOVERY BOARD */}
            <div>
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-purple-400 uppercase tracking-widest font-mono">Historic Finds</span>
                  <h3 className="text-2xl font-serif italic mt-0.5">Top 10 Famous Diamonds Found in Lesotho</h3>
                </div>
                <div className="text-xs font-mono text-white/40">
                  Total Carats Highlighted: 5,190ct
                </div>
              </div>

              {/* Grid representation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {famousDiamondsData.map((diamond) => (
                  <div 
                    key={diamond.id} 
                    className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors flex justify-between gap-4"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded text-[9px] font-bold">
                          RANK #{diamond.rank}
                        </span>
                        <h4 className="text-sm font-extrabold text-white">{diamond.name}</h4>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{diamond.notes}</p>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-gray-400">
                        <span>Mine: {diamond.mine}</span>
                        <span>Found: {diamond.foundYear}</span>
                      </div>
                    </div>

                    <div className="text-right flex flex-col justify-center shrink-0">
                      <div className="text-lg font-serif italic text-amber-400 font-bold">{diamond.carats} ct</div>
                      <div className="text-[10px] text-white/40">{diamond.value} Est.</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MINING IMPACT STATS & GEOLOGY */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#090909] border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">9% GDP Contribution</h4>
                  <p className="text-xs text-white/55 leading-relaxed text-justify">
                    Diamond mining represents a massive economic pillar of the Lesotho treasury. High-grade Kimberlitic ore excavations sustain thousands of local jobs in northern mountain districts.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Letseng Star Peak</h4>
                  <p className="text-xs text-white/55 leading-relaxed text-justify">
                    Letseng mine sits at an extreme elevation of 3,100m, making it one of the highest active diamond processing systems in the world, requiring robust winterization protocols.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Liqhobong operations</h4>
                  <p className="text-xs text-white/55 leading-relaxed text-justify">
                    Operated by Firestone Diamonds, the Liqhobong open-pit is highly prized for retrieving unusual fancy-yellow crystals and intense warm cognac diamond formations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TRADITIONAL FOOD MARKETPLACE */}
        {activeTab === "marketplace" && (
          <div className="space-y-12">
            
            {/* HERO MODULE */}
            <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs text-purple-400 font-extrabold uppercase tracking-[0.3em]">Gastronomic Heritage</span>
                <h2 className="text-4xl font-serif mt-1">Visit Lesotho Marketplace</h2>
                <p className="text-xs text-white/50 mt-1 max-w-md">
                  Order authentic Basotho delicacies directly to your table, or plan a private cultural chef session under high peak lodges.
                </p>
              </div>

              {/* Category selector capsules */}
              <div className="flex flex-wrap gap-2">
                {["all", "meals", "stews", "drinks", "snacks"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setFoodCategory(category)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                      foodCategory === category
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* INVENTORY / SHOPPING GRID CONTROLLERS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* FOOD CARDS DISPLAY (LEFT 2 COLS) */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {foodsData
                  .filter(food => foodCategory === "all" || food.category === foodCategory)
                  .map(food => (
                    <div 
                      key={food.id}
                      className="group rounded-3xl overflow-hidden border border-white/5 bg-[#0b0b0b] flex flex-col justify-between hover:border-purple-500/20 transition-all shadow-md relative"
                    >
                      {/* Favorite bookmark */}
                      <button
                        onClick={() => toggleFavorite(food.id)}
                        className="absolute top-4 right-4 z-10 p-2 bg-black/60 rounded-full border border-white/10 hover:bg-black text-rose-500 transition-colors"
                      >
                        <Heart className="w-4 h-4" fill={favorites.includes(food.id) ? "currentColor" : "none"} />
                      </button>

                      <div className="relative h-44 overflow-hidden">
                        <img 
                          src={food.image} 
                          alt={food.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/70 text-[9px] font-bold text-amber-400 tracking-wider">
                          LSL {food.price.toFixed(2)}
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h4 className="text-md font-bold text-white group-hover:text-purple-300 transition-colors">{food.name}</h4>
                          <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{food.description}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                          <button
                            onClick={() => setViewedFood(food)}
                            className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer text-center"
                          >
                            Details &amp; Ingredients
                          </button>
                          <button
                            onClick={() => addToCart(food)}
                            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* BASKET SIDE PANEL CONTAINER (RIGHT COLS) */}
              <div className="lg:col-span-1 bg-[#0b0b0b] border border-white/10 rounded-3xl p-6 space-y-6 sticky top-24">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-purple-400" /> Current Order
                  </h3>
                  <span className="text-xs text-white/40">{cart.length} unique items</span>
                </div>

                {cart.length === 0 ? (
                  <div className="py-12 text-center text-white/30 space-y-2">
                    <ShoppingBag className="w-10 h-10 mx-auto" strokeWidth={1} />
                    <p className="text-xs">Your basket is currently empty.</p>
                    <p className="text-[10px]">Select delicious traditional stews and drinks from the left catalog.</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-60 overflow-y-auto scrollbar-thin">
                      {cart.map(item => (
                        <div key={item.food.id} className="flex items-center justify-between gap-3 text-sm">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white truncate text-xs">{item.food.name}</h4>
                            <span className="text-[10px] text-amber-500 font-mono">LSL {item.food.price} each</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQuantity(item.food.id, -1)}
                              className="p-1 rounded bg-white/5 hover:bg-white/10"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.food.id, 1)}
                              className="p-1 rounded bg-white/5 hover:bg-white/10"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.food.id)}
                              className="p-1 text-red-400 hover:text-red-300 ml-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/5 pt-4 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-white/50">Subtotal:</span>
                        <span className="font-mono text-white">LSL {cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Highland Delivery (Coordinate tax):</span>
                        <span className="font-mono text-emerald-400">FREE Promo</span>
                      </div>
                      <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-bold">
                        <span>Grand Total:</span>
                        <span className="font-mono text-amber-500">LSL {cartTotal.toFixed(0)}.00</span>
                      </div>
                    </div>

                    {orderPlaced ? (
                      <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-2xl space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span className="text-[10px] uppercase tracking-widest text-[#b46cff] font-bold">Chef preparing Moroho</span>
                        </div>
                        <p className="text-[11px] text-white/70 italic leading-snug">
                          &quot;Lekhetho! Your high-grade stews and breads have been booked using {deliveryMethod === "pony" ? "Mountain Pony Courier" : "High-clearance 4x4 Truck"}. Delivering soon!&quot;
                        </p>
                        <button
                          onClick={() => setOrderPlaced(false)}
                          className="w-full py-1.5 rounded-lg border border-purple-500/20 hover:bg-white/5 text-[9px] font-bold uppercase transition-transform"
                        >
                          Modify order details
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase text-white/40 tracking-wider">Highland Transport Method:</label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setDeliveryMethod("4x4")}
                              className={`py-1.5 rounded border text-[10px] font-bold uppercase tracking-wider ${
                                deliveryMethod === "4x4" ? "bg-white/10 border-white/30 text-white" : "bg-transparent border-white/5 text-white/40"
                              }`}
                            >
                              🚙 Overland 4x4
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeliveryMethod("pony")}
                              className={`py-1.5 rounded border text-[10px] font-bold uppercase tracking-wider ${
                                deliveryMethod === "pony" ? "bg-white/10 border-white/30 text-white" : "bg-transparent border-white/5 text-white/40"
                              }`}
                            >
                              🐴 Basotho Pony
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setOrderPlaced(true);
                            // Clear cart shortly
                          }}
                          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-xs font-bold uppercase tracking-widest text-center shadow-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                        >
                          Simulate Secure Checkout
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: DESTINATIONS PAGE */}
        {activeTab === "destinations" && (
          <div className="space-y-12">
            
            {/* INTRO TITLE */}
            <div className="pt-4 border-b border-white/10 pb-6">
              <span className="text-xs text-amber-500 font-extrabold uppercase tracking-[0.3em]">Explore the Peaks</span>
              <h2 className="text-4xl font-serif mt-1">Sovereign Highland Wonders</h2>
              <p className="text-xs text-white/50 mt-1 max-w-lg">
                Lesotho is partitioned into magical mountain zones. Discover world-record abseiling, geological caves, and UNESCO heritage reserves.
              </p>
            </div>

            {/* FULL CARDS LIST GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinationsData.map((dest) => (
                <div 
                  key={dest.id}
                  className="rounded-3xl overflow-hidden border border-white/15 bg-[#0b0b0b] flex flex-col justify-between hover:border-purple-500/30 transition-all group"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-2 py-0.5 rounded bg-amber-500/10 text-[9px] font-bold text-amber-400 tracking-wider">
                      {dest.elevation}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold font-serif mb-1 group-hover:text-purple-300 transition-colors">{dest.name}</h4>
                      <p className="text-xs text-white/50 leading-relaxed line-clamp-3 text-justify mb-4">{dest.summary}</p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex gap-2">
                      <button
                        onClick={() => setSelectedDest(dest)}
                        className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold uppercase tracking-wider text-center transition-colors cursor-pointer"
                      >
                        Launch Travel Guide
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: CULTURE & MEDIA CENTER */}
        {activeTab === "culture" && (
          <div className="space-y-12">
            
            {/* HERO MODULE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 items-center">
              <div>
                <span className="text-xs text-purple-400 font-extrabold uppercase tracking-[0.3em]">Living Heritage</span>
                <h2 className="text-4xl font-serif mt-1">Dances, Music &amp; Textiles</h2>
                <p className="text-sm text-white/70 leading-relaxed text-justify mb-4">
                  The people of Lesotho—the Basotho—retain deep-rooted elements of cultural pride. From the elegant **Mokhibo dance** (a choreographed shoulder-rippling performance by Basotho women) to the athletic **Mohobelo song steps**, music is the spiritual pulse of the villages.
                </p>
                <p className="text-sm text-white/70 leading-relaxed text-justify">
                  Discover also the ancient **Pony trekking routes** where herdsmen lead travelers through remote high-altitude routes. In winter, communities gather around fireplaces in sandstone thatch-huts, drinking local fermented brews and passing on ancient folktales and Moshoeshoe chronicles.
                </p>
              </div>

              <div className="relative rounded-3xl overflow-hidden border border-white/10 h-[300px] lg:h-[350px]">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/35/Lesotho_-_Thatch_hut_village.jpg" 
                  alt="Thatch Hut village" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-6">
                  <span className="text-[10px] text-amber-400 uppercase tracking-widest block font-mono">Traditional Basotho Ronda</span>
                  <p className="text-xs text-white/80">Clay plastered round structures designed for extreme alpine wind deflection.</p>
                </div>
              </div>
            </div>

            {/* MEDIA CENTER: DYNAMIC LIGHTBOX GALLERY */}
            <div>
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="text-xs text-amber-500 uppercase tracking-widest font-mono">Visual Archive</span>
                  <h3 className="text-2xl font-serif italic mt-0.5">Media Center &amp; Lightbox</h3>
                </div>
                
                {/* Categorization triggers */}
                <div className="flex flex-wrap gap-1.5">
                  {["all", "mountains", "villages", "waterfalls", "culture", "food"].map((category) => (
                    <button
                      key={category}
                      onClick={() => setGalleryFilter(category)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                        galleryFilter === category
                          ? "bg-amber-500 border-amber-500 text-black"
                          : "bg-white/5 border-white/10 text-white/55 hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredMedia.map((media, index) => (
                  <div 
                    key={index} 
                    onClick={() => setActiveMediaUrl(media.url)}
                    className="group relative h-48 rounded-2xl overflow-hidden border border-white/5 bg-white/5 hover:border-white/20 transition-all cursor-pointer"
                  >
                    <img 
                      src={media.url} 
                      alt={media.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <span className="text-[9px] uppercase font-mono text-amber-400 font-bold">{media.category}</span>
                      <h4 className="text-xs font-bold text-white truncate">{media.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: TRAVEL PLANNER & INTERACTIVE MAP */}
        {activeTab === "planner" && (
          <div className="space-y-12">
            
            {/* HERITAGE GRID LANDING */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 items-start">
              
              {/* LEFT COLS: INTERACTIVE VECTOR HIGHLANDS MAP */}
              <div className="lg:col-span-7 bg-[#0b0b0b] border border-white/10 rounded-3xl p-6 space-y-4">
                <div>
                  <span className="text-xs text-[#b46cff] uppercase tracking-widest font-mono">Terratory coordinates</span>
                  <h3 className="text-2xl font-serif italic mt-0.5">Interactive Highlands Travel Map</h3>
                  <p className="text-xs text-white/50 leading-relaxed mt-1">
                    Click on the glowing nodes to look up geographical data and transport advisories.
                  </p>
                </div>

                {/* Graphic representing map outlines of Lesotho */}
                <div className="relative aspect-video max-w-full bg-black/60 border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center">
                  
                  {/* Styled Mountain Peaks Outline in Vector background */}
                  <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M 0,100 L 20,40 L 40,80 L 60,30 L 80,75 L 100,50 L 100,100 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </svg>

                  {/* Major contour map layout of Lesotho border */}
                  <div className="w-[85%] h-[85%] border border-[#b46cff]/15 rounded-full flex items-center justify-center relative bg-gradient-to-br from-purple-950/5 to-transparent">
                    <div className="absolute inset-10 border border-amber-500/10 rounded-full"></div>
                    
                    {/* Render hotspots */}
                    {mapHotspots.map((point, index) => (
                      <div
                        key={index}
                        style={{ left: point.x, top: point.y }}
                        onMouseEnter={() => setMapHoveredPoint(point.label)}
                        onMouseLeave={() => setMapHoveredPoint(null)}
                        onClick={() => {
                          const matched = destinationsData.find(d => d.id === point.destId);
                          if (matched) {
                            setSelectedDest(matched);
                            setActiveTab("destinations");
                          }
                        }}
                        className="absolute cursor-pointer flex flex-col items-center group -translate-x-1/2 -translate-y-1/2 z-20"
                      >
                        {/* Interactive pulsator */}
                        <span className="relative flex h-3.5 w-3.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-500 border border-white/20 group-hover:bg-amber-400"></span>
                        </span>

                        {/* Hover Popup */}
                        <div className="absolute bottom-6 scale-0 group-hover:scale-100 bg-black/95 border border-white/15 px-3 py-1.5 rounded-lg text-[10px] whitespace-nowrap text-white text-center font-mono shadow-md transition-all">
                          <span className="font-extrabold block text-amber-400">{point.label}</span>
                          <span className="text-[8px] text-gray-400">{point.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Status Indicator Bar overlay */}
                  <div className="absolute bottom-4 left-4 bg-black/80 border border-white/10 px-3 py-1.5 rounded-lg text-[9px] font-mono text-gray-400 flex items-center gap-1.5 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Interactive Highlands Pins: 7 Active
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-white/40 block">Maseru HQ</span>
                    <span className="text-xs font-bold font-mono">29.31° S, 27.48° E</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-white/40 block">Elevation average</span>
                    <span className="text-xs font-bold font-mono">1,400m - 3,482m</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLS: TRIP PLANNER BUDGET WORKSHEET */}
              <div className="lg:col-span-5 bg-[#0b0b0b] border border-white/10 rounded-3xl p-6 space-y-6">
                <div>
                  <span className="text-xs text-amber-500 uppercase tracking-widest font-mono">Calculator worksheet</span>
                  <h3 className="text-2xl font-serif italic mt-0.5">Trip Budget Planner</h3>
                  <p className="text-xs text-white/50 leading-relaxed mt-1">
                    Adjust estimates to approximate total mountain travel balances.
                  </p>
                </div>

                {/* Input Sliders */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">Transport (4x4 Fuel + Toll):</span>
                      <span className="font-mono text-white">${budgetTransport} USD</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="500" 
                      step="10" 
                      value={budgetTransport} 
                      onChange={(e) => setBudgetTransport(Number(e.target.value))}
                      className="w-full text-purple-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">Lodge &amp; Camping stays:</span>
                      <span className="font-mono text-white">${budgetLodge} USD</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="1000" 
                      step="20" 
                      value={budgetLodge} 
                      onChange={(e) => setBudgetLodge(Number(e.target.value))}
                      className="w-full text-purple-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">Traditional Food:</span>
                      <span className="font-mono text-white">${budgetFood} USD</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="400" 
                      step="10" 
                      value={budgetFood} 
                      onChange={(e) => setBudgetFood(Number(e.target.value))}
                      className="w-full text-purple-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">Activities (Abseil/Ski/Pony):</span>
                      <span className="font-mono text-white">${budgetActivities} USD</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="500" 
                      step="10" 
                      value={budgetActivities} 
                      onChange={(e) => setBudgetActivities(Number(e.target.value))}
                      className="w-full text-purple-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Totals container */}
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/55">Exchange conversion rate:</span>
                    <span className="font-mono text-gray-400">1 USD = {conversionRate} LSL/ZAR</span>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center">
                    <div>
                      <span className="text-[9px] uppercase text-white/40 block font-bold">Total Estimated Budget</span>
                      <span className="text-xl font-serif text-amber-500 font-bold">${totalUSD} USD</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase text-white/40 block font-bold">Local Currencies</span>
                      <span className="text-lg font-mono text-purple-400 font-bold">{totalLSL.toFixed(0)} LSL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECOND LAYER: PACKING CHECKLISTS & GUIDELINES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              
              {/* CHECKLISTS CARD */}
              <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-3xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h4 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Briefcase className="w-4.5 h-4.5 text-purple-400" /> Pre-Travel Checklist
                  </h4>
                  <span className="text-[10px] font-mono text-purple-400 font-bold">
                    {checklist.filter(c => c.completed).length} / {checklist.length} Completed
                  </span>
                </div>

                {/* Dynamic add-item checklist bar */}
                <div className="flex gap-2 text-xs">
                  <input
                    type="text"
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    placeholder="Add custom packing item..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-gray-500 focus:outline-none"
                  />
                  <select
                    value={checklistCategory}
                    onChange={(e: any) => setChecklistCategory(e.target.value)}
                    className="bg-white/5 border border-white/10 text-white text-[11px] rounded-xl px-2"
                  >
                    <option value="documents">Doc</option>
                    <option value="clothing">Cloth</option>
                    <option value="gear">Gear</option>
                    <option value="finances">Cash</option>
                    <option value="health">Med</option>
                  </select>
                  <button 
                    onClick={addChecklistItem}
                    className="px-4 py-2 bg-purple-650 hover:bg-purple-600 rounded-xl font-bold uppercase text-[10px]"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto scrollbar-thin">
                  {checklist.map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => toggleChecklist(item.id)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          item.completed ? "bg-purple-600 border-purple-500" : "border-white/20"
                        }`}>
                          {item.completed && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`text-xs ${item.completed ? "line-through text-white/30" : "text-white"}`}>
                          {item.task}
                        </span>
                      </div>
                      <span className="text-[8px] uppercase tracking-wider bg-white/10 px-1.5 py-0.5 rounded text-white/50">
                        {item.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* EMERGENCY CONTACTS & LODGING DIRECTORY */}
              <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-3xl space-y-6">
                <div>
                  <h4 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <ShieldAlert className="w-4.5 h-4.5 text-amber-500" /> Highland Access Guidelines
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed mt-1">
                    Keep emergency indices close when passing distant borders.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl">
                    <h5 className="font-bold text-red-400 mb-1 flex items-center gap-1">
                      <PhoneCall className="w-3.5 h-3.5" /> Extreme Climate / Mountain S.O.S
                    </h5>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      Call Maseru Central Police Dispatch on **(+266) 2231-7117** or contact the Sani Lodge Wilderness Rescue at **(+27) 33 702 1158** if snow barriers lock high-altitude access gates.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-white/5">
                      <span className="text-[9px] uppercase text-white/40 block">Border Status</span>
                      <span className="font-bold text-emerald-400 block mt-0.5">PEACEFUL OPEN</span>
                      <p className="text-[9px] text-white/50 leading-tight">Maseru bridge open 24 / 7.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5">
                      <span className="text-[9px] uppercase text-white/40 block">Visa Guidelines</span>
                      <span className="font-bold text-amber-400 block mt-0.5">COMMUNITY WAIVED</span>
                      <p className="text-[9px] text-white/50 leading-tight">Waived for Commonwealth.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER INFO BAR - GLASSMORPHISM */}
      <footer className="mt-12 border-t border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-white/60">
          <div>
            <div className="text-sm font-bold tracking-widest text-white mb-2">
              VISIT<span className="text-purple-500">LESOTHO</span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              Maseru Headquarters: Tourism House, Constitution Road. Supporting modern travelers in crossing into the roof of Africa.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Travel Links</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-white/50">
              <button onClick={() => setActiveTab("about")} className="text-left hover:text-white transition-colors">History Timeline</button>
              <button onClick={() => setActiveTab("water")} className="text-left hover:text-white transition-colors">Katse Hydro</button>
              <button onClick={() => setActiveTab("diamonds")} className="text-left hover:text-white transition-colors">Gem Mining</button>
              <button onClick={() => setActiveTab("marketplace")} className="text-left hover:text-white transition-colors">Market Orders</button>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Secure email link..."
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/30 flex-1"
              />
              <button 
                onClick={() => alert("Khotso! Thank you for subscribing to our highland newsletters.")}
                className="px-3 bg-purple-650 hover:bg-purple-600 rounded-lg font-bold text-[10px] uppercase"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-8 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 uppercase tracking-widest gap-2">
          <div>
            &copy; 2026 Lesotho Tourism Board | Mountain Passes Clear
          </div>
          <div className="flex gap-4">
            <span>WEATHER: <span className="font-bold text-white">14°C CLEAR &amp; PEAKS SILENT</span></span>
            <span>LSL/USD: <span className="font-bold text-white">18.42</span></span>
          </div>
        </div>
      </footer>

      {/* FLOAT AI FLOATING CHATBOT COMPONENT */}
      <AIChatbot />

      {/* MODAL OVERLAY 1: DESTINATION DETAILED TRAVEL GUIDE MODAL */}
      <AnimatePresence>
        {selectedDest && (
          <div className="fixed inset-0 z-55 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              className="bg-[#0b0b0b] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <button 
                onClick={() => {
                  setSelectedDest(null);
                  setBookedDest(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 rounded-2xl overflow-hidden border border-white/5">
                <img 
                  src={selectedDest.image} 
                  alt={selectedDest.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold block">{selectedDest.category}</span>
                  <h3 className="text-2xl md:text-3xl font-serif text-white">{selectedDest.name}</h3>
                </div>
              </div>

              <div className="space-y-4 text-xs md:text-sm">
                <div>
                  <h4 className="font-extrabold text-amber-500 uppercase tracking-widest text-[10px] mb-1">Canyon Narration</h4>
                  <p className="text-white/70 leading-relaxed text-justify">{selectedDest.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-white/5">
                    <span className="text-[10px] text-white/40 block font-bold uppercase">Heritage Background</span>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed text-justify">{selectedDest.history}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5">
                    <span className="text-[10px] text-white/40 block font-bold uppercase">Altitude Level</span>
                    <p className="text-xs text-white/70 mt-1 font-mono font-bold text-purple-400">{selectedDest.elevation}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-extrabold text-purple-400 uppercase tracking-widest text-[10px] mb-2">Highland Activities</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDest.activities.map((act, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs bg-[#101010] p-2 rounded-lg border border-white/5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-white/80">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-purple-950/20 border border-purple-500/20 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Book Peak Exploration Guide</h4>
                  {bookedDest === selectedDest.id ? (
                    <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 py-1">
                      <Check className="w-4 h-4 bg-emerald-500/10 p-0.5 rounded-full" /> Exploration Request registered! Check your email / Sky Concierge.
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={destBookingText}
                        onChange={(e) => setDestBookingText(e.target.value)}
                        placeholder="Enter your email or phone..." 
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none"
                      />
                      <button 
                        onClick={() => {
                          if (destBookingText.trim()) {
                            setBookedDest(selectedDest.id);
                            setDestBookingText("");
                          }
                        }}
                        className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-bold uppercase rounded-xl"
                      >
                        Request Booking
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL OVERLAY 2: TRADITIONAL FOOD ITEM DETAIL MODAL */}
      <AnimatePresence>
        {viewedFood && (
          <div className="fixed inset-0 z-55 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              className="bg-[#0b0b0b] border border-white/10 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <button 
                onClick={() => setViewedFood(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-56 rounded-2xl overflow-hidden">
                <img 
                  src={viewedFood.image} 
                  alt={viewedFood.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/80 rounded text-[10px] font-mono text-amber-400">
                  {viewedFood.calories} Calories
                </div>
              </div>

              <div className="space-y-4 text-xs md:text-sm">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-serif text-white">{viewedFood.name}</h3>
                    <span className="text-[10px] tracking-widest uppercase font-bold text-purple-400">{viewedFood.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-mono text-amber-500 font-bold">LSL {viewedFood.price.toFixed(2)}</div>
                    <div className="text-[10px] text-white/40">Rating: {viewedFood.rating} ⭐</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase font-bold text-white/50 mb-1">Description &amp; Recipe History</h4>
                  <p className="text-white/70 leading-relaxed text-justify">{viewedFood.description}</p>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase font-bold text-white/50 mb-1">Authentic Ingredients</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {viewedFood.ingredients.map((ing, idx) => (
                      <span key={idx} className="bg-white/5 border border-white/5 px-2.5 py-1 rounded text-xs text-white">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Guest Feedback Recitals</h4>
                  <div className="space-y-2">
                    {viewedFood.reviews.map((rev, idx) => (
                      <div key={idx} className="p-3 bg-[#111] rounded-xl border border-white/5">
                        <div className="flex justify-between items-center text-[10px] mb-1">
                          <span className="font-bold text-purple-400">{rev.user}</span>
                          <span className="text-amber-500 font-mono">{"⭐".repeat(rev.rating)}</span>
                        </div>
                        <p className="text-xs text-white/70 italic leading-snug">&quot;{rev.comment}&quot;</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      addToCart(viewedFood);
                      setViewedFood(null);
                    }}
                    className="flex-1 py-3 bg-purple-650 hover:bg-purple-600 rounded-xl text-xs font-bold uppercase tracking-widest text-white text-center"
                  >
                    Add to order basket
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL OVERLAY 3: SYSTEM SEARCH BOX OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-55 bg-black/95 backdrop-blur-md flex flex-col justify-start p-6 md:p-12 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full relative pt-12">
              <button 
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="absolute top-0 right-0 p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-3">
                <span className="text-xs text-purple-400 uppercase tracking-widest font-mono">Instant Search Directory</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Seach traditional stews, letseng diamonds, waterfalls..."
                  className="w-full bg-transparent border-b-2 border-white/15 focus:border-purple-500 py-3 text-2xl font-serif text-white placeholder-gray-600 focus:outline-none transition-colors"
                  autoFocus
                />
              </div>

              {/* SEARCH RESULTS OUTPUT */}
              {queryClean(searchQuery) && (
                <div className="mt-8 space-y-6">
                  {/* Destinations Results */}
                  {searchResults.dests.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs uppercase tracking-widest font-mono text-amber-500 font-bold border-b border-white/5 pb-1">Found High-Alpines ({searchResults.dests.length})</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {searchResults.dests.map(d => (
                          <div 
                            key={d.id} 
                            onClick={() => {
                              setSelectedDest(d);
                              setSearchOpen(false);
                              setActiveTab("destinations");
                            }}
                            className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                          >
                            <h5 className="font-bold text-sm text-white mb-1 group-hover:text-purple-300">{d.name}</h5>
                            <p className="text-xs text-white/55 line-clamp-1">{d.summary}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Foods Results */}
                  {searchResults.foods.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs uppercase tracking-widest font-mono text-purple-400 font-bold border-b border-white/5 pb-1">Found Delicacies ({searchResults.foods.length})</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {searchResults.foods.map(f => (
                          <div 
                            key={f.id} 
                            onClick={() => {
                              setViewedFood(f);
                              setSearchOpen(false);
                              setActiveTab("marketplace");
                            }}
                            className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                          >
                            <h5 className="font-bold text-sm text-white mb-1">{f.name}</h5>
                            <p className="text-xs text-white/55 line-clamp-1">{f.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Diamonds Results */}
                  {searchResults.diamonds.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs uppercase tracking-widest font-mono text-emerald-400 font-bold border-b border-white/5 pb-1">Found Treasures ({searchResults.diamonds.length})</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {searchResults.diamonds.map(d => (
                          <div 
                            key={d.id} 
                            onClick={() => {
                              setSearchOpen(false);
                              setActiveTab("diamonds");
                            }}
                            className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                          >
                            <h5 className="font-bold text-sm text-white mb-1">{d.name} ({d.carats}ct)</h5>
                            <p className="text-xs text-white/55 line-clamp-1">{d.notes}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* fallback empty search state */}
                  {searchResults.dests.length === 0 && searchResults.foods.length === 0 && searchResults.diamonds.length === 0 && (
                    <div className="py-12 text-center text-white/30 text-xs">
                      No matching records found. Try searching for &quot;Water&quot;, &quot;Letseng&quot;, or &quot;Moroho&quot;.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL OVERLAY 4: IMAGE LIGHTBOX VIEWER */}
      <AnimatePresence>
        {activeMediaUrl && (
          <div className="fixed inset-0 z-55 bg-black/95 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full relative">
              <button 
                onClick={() => setActiveMediaUrl(null)}
                className="absolute top-[-40px] right-0 p-2.5 bg-white/5 rounded-full text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <img 
                src={activeMediaUrl} 
                alt="Highland Snapshot" 
                className="w-full max-h-[85vh] object-contain rounded-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
