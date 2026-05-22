import { Destination, FoodItem, FamousDiamond, TimelineEvent } from "./types";

export const destinationsData: Destination[] = [
  {
    id: "maletsunyane",
    name: "Maletsunyane Falls",
    category: "natural",
    summary: "One of Africa's highest single-drop waterfalls, plunging 192 meters down a gorgeous canyon.",
    description: "Located near Semonkong (the 'Place of Smoke'), Maletsunyane Falls is a dramatic natural wonder that forms an immense, echoing thunder as the river dives over a vertical basalt cliff. It holds the Guinness World Record for the longest commercially operated single-drop abseil on Earth (204 meters). During winter, the canyon is often framed by ice and frosted spectacular cliffs, creating an otherworldly mountain scene.",
    history: "Semonkong was established in the late 19th century as a refuge for people during times of localized conflict. The local folklore tells that the deep echoing sound of the falling water comes from the spirits of those who have lost their way in the thick mountain mists.",
    activities: [
      "Epic 204m Abseiling (Guinness World Record)",
      "Scenic pony trekking along the Lesotho Highlands",
      "Stunning canyon photography and birdwatching",
      "Semonkong village cultural immersion and local storytelling"
    ],
    travelInfo: "Accessible via a paved road from Maseru to Semonkong (approx 120km, 2.5 hours). 4x4 recommended for traversing closer to the canyon viewpoint, though standard vehicles can reach Semonkong town easily.",
    weather: "Cool and crisp mountain air. Summertimes hover around 18-24°C. Winter ranges from -5°C to 10°C, frequently experiencing snowfall which freezes parts of the waterfall.",
    elevation: "2,200 meters above sea level",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Maletsunyanefalls.JPG",
    gallery: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549880181-56a44cf8a4a1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
    ],
    lat: -29.8681,
    lng: 28.0489,
    featured: true
  },
  {
    id: "katse-dam",
    name: "Katse Dam & Reservoir",
    category: "adventure",
    summary: "A colossal engineering masterpiece and the center of the Lesotho Highlands Water Project.",
    description: "Katse Dam is Africa's second largest double-curvature arch dam, rising an impressive 185 meters from the Malibamatso River bed. Surrounded by majestic peaks, this deep blue reservoir is the crown jewel of Lesotho's 'blue gold' water resources. Visitors can tour the interior of the concrete wall, take boat cruises on the scenic waters, and appreciate the panoramic alpine ridges stretching in all directions.",
    history: "Completed in 1996 as Phase 1A of the historic Lesotho Highlands Water Project (LHWP), a treaty signed between Lesotho and South Africa to supply clean water and generate local hydroelectric power. It is an enduring symbol of Basotho water riches.",
    activities: [
      "Technical guided tours inside the massive concrete dam wall",
      "High-altitude botanical gardens visit showcasing medicinal flora",
      "Boating, kayaking, and trout fishing on the reservoir",
      "Unmatched mountain panoramas from the Katse viewpoint"
    ],
    travelInfo: "Excellent tarred mountain road with steep gradients and sharp curves (the legendary 'Mafika Lisiu' crest). Approx 3-4 hours drive from Maseru or Hlotse.",
    weather: "Alpine conditions. Frequently windy. Cool summers (15-22°C) and freezing winter nights (-8°C to 5°C).",
    elevation: "2,050 meters above sea level",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Katse_Dam.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
    ],
    lat: -29.3361,
    lng: 28.4811,
    featured: true
  },
  {
    id: "thaba-bosiu",
    name: "Thaba Bosiu Mount Fortress",
    category: "historical",
    summary: "The sacred birthplace of the Basotho nation, defended by diplomacy and cliffs.",
    description: "Thaba Bosiu is a flat-topped mountain located 24km east of Maseru. It was selected by King Moshoeshoe I as his fortress refuge in 1824. The name translates to 'Mountain at Night' because of the local belief that the mountain magically grew larger and taller during the night to protect it from attackers. Today, it hosts the cultural village, traditional huts, and the royal cemetery of the Basotho Kings.",
    history: "Defended successfully against numerous Zulu, Ndebele, and Orange Free State forces, Thaba Bosiu was never captured. It is the spiritual hearth of Lesotho, where King Moshoeshoe I forged the Basotho identity from various fragmented clans fleeing wars.",
    activities: [
      "Guided historic hike to the plateau summits and royal tombs",
      "Interactive tour of the Thaba Bosiu Cultural Village",
      "Experiencing traditional clay huts and the Moshoeshoe shrine",
      "Traditional song performances and local history workshops"
    ],
    travelInfo: "Very close to Maseru. Completely paved and easy 30-minute drive. Excellent starting point for any tourist itinerary.",
    weather: "Mild summers with temperatures around 20-30°C. Cool winters with dry, clear sunny afternoons (12-18°C).",
    elevation: "1,804 meters above sea level",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Thaba_Bosiu.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1590483736148-3c1a58f96e90?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544084944-15269ec7b5a0?auto=format&fit=crop&w=800&q=80"
    ],
    lat: -29.3514,
    lng: 27.6711,
    featured: true
  },
  {
    id: "sehlabathebe",
    name: "Sehlabathebe National Park",
    category: "natural",
    summary: "Lesotho's serene UNESCO World Heritage site featuring dramatic rock arches and wetlands.",
    description: "Tucked away in the rugged Maloti-Drakensberg range, Sehlabathebe is Lesotho's oldest national park. It is a remote wilderness composed of rolling alpine grasslands, ancient rock formations carved by wind, and specialized high-altitude wetlands. Home to rare species like the bearded vulture and the critically endangered Maloti minnow, this park offers unparalleled silence, star-filled night skies, and absolute isolation.",
    history: "First proclaimed a national park in 1970. In 2013, it was inscribed into the UNESCO World Heritage list, joining South Africa's uKhahlamba-Drakensberg Park to form the Maloti-Drakensberg transfrontier heritage site.",
    activities: [
      "Hiking through mysterious natural sandstone arches",
      "Camping under clear, light-pollution-free starry night skies",
      "Horseback riding across wild borderless highlands",
      "Viewing prehistoric San rock paintings hidden in rock shelters"
    ],
    travelInfo: "Extremely remote. Located in the Qacha's Nek district. A reliable High-Clearance 4x4 vehicle is required. Paved roads exist to nearby towns, but park access trails are rugged dirt gravel.",
    weather: "Highly dynamic. Quick mountain storms gather. Cool summer rains. Intense snowfalls are common in winter.",
    elevation: "2,400 meters above sea level",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/26/Sehlabathebe_National_Park.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80"
    ],
    lat: -29.8732,
    lng: 29.1172,
    featured: false
  },
  {
    id: "sani-pass",
    name: "Sani Pass & The Highest Pub",
    category: "adventure",
    summary: "The breathtaking alpine gateway with sharp hairpin hairpins and legendary high altitude vistas.",
    description: "Sani Pass is an iconic, white-knuckle mountain road that climbs through the steep basalt walls of the Drakensberg escarpment, connecting KwaZulu-Natal in South Africa to the peak plateau of Lesotho. At the summit sits the 'Sani Mountain Lodge' which hosts the legendary 'Highest Pub in Africa' at 2,874m above sea level. It is a world-renowned destination for driving enthusiasts, mountain bikers, and hikers alike.",
    history: "Originally established as an ancient trade route in the early 20th century, used by Basotho traders who pony-trekked wool and mohair down to South Africa in exchange for blankets, maize meal, and essential household goods.",
    activities: [
      "Ascending the legendary 4x4 switchbacks with extreme panoramic drop-offs",
      "Enjoying a local Maluti beer at the Africa's Highest Pub",
      "Pony trekking around high altitude Basotho shepherd villages",
      "Watching the sunrise over the massive Drakensberg basalt cliffs"
    ],
    travelInfo: "Strictly 4x4 only on the South African side pass climb. Smooth tar roads take over once you enter the Lesotho border post at the summit.",
    weather: "Extremely volatile alpine climate. Can snow even during the height of summer. Winds can exceed 80km/h.",
    elevation: "2,874 meters above sea level",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Sani_Pass_top.JPG",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80"
    ],
    lat: -29.5847,
    lng: 29.2881,
    featured: true
  },
  {
    id: "afriski",
    name: "Afriski Mountain Resort",
    category: "adventure",
    summary: "One of only two ski resorts in Southern Africa, offering snow activities and summer mountain sport.",
    description: "Afriski is an altitude oasis in the northern Maloti Mountains, attracting wintersport lovers for skiing and snowboarding between June and August. In summer, the resort pivots to an outdoor adventure playground, hosting high-altitude mountain biking trails, trail running events, endemic wildlife watching, and rugged 4x4 offroad routes.",
    history: "Founded in 2002 to create a permanent alpine sports hub in the central highlands, using snowmaking machines to supplement natural snowfall and guarantee skiable slopes during Southern Africa's winter season.",
    activities: [
      "Skiing, snowboarding, and bum-boarding down the main slopes",
      "Extreme mountain biking (DH & XC) trails during summer",
      "Warm alpine food and music in the high altitude lodge",
      "4x4 offroad trails on the surrounding mountain peaks"
    ],
    travelInfo: "Perfectly tarred main northern highway (A1), though winter driving may require snow chains on tires. About 5 hours from Maseru or Johannesburg.",
    weather: "Very cold. Midwinter averages -10°C at night, rarely rising above 5°C in the day. Summer afternoon rains.",
    elevation: "3,222 meters above sea level",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=800&q=80"
    ],
    lat: -28.8222,
    lng: 28.7275,
    featured: false
  },
  {
    id: "liphofung",
    name: "Liphofung Caves & Cultural Site",
    category: "cultural",
    summary: "Historical rock shelter housing rich San paintings and King Moshoeshoe's rest chambers.",
    description: "Liphofung (meaning 'place of the eland') is a historical rock shelter located in a beautiful sandstone tributary canyon of the Hlotse River. The cave walls act as a canvas, rich with prehistoric hunter-gatherer San rock art depicting hunts, spirit dances, and native wildlife. The site also acts as an information hub of Basotho heritage, showing traditional tools, pottery, and blankets.",
    history: "Used for centuries by San people. In the early 19th century, King Moshoeshoe I used this cavernous rock shield as a tactical resting stop when traversing the northern areas of his kingdom or coordinating military patrols.",
    activities: [
      "Observing ancient San rock paintings with expert curatorial guides",
      "Exploring traditional Basotho archaeological remains and history displays",
      "Walking along the scenic sandstone gorge botanical trails",
      "Traditional Basotho beer brewing demonstration (upon scheduling)"
    ],
    travelInfo: "Easy access, situated just off the main tar road from Butha-Buthe to Mokhotlong. Excellent quick cultural cultural stopover.",
    weather: "Pleasant. Sunny mornings and cool afternoon breezes inside the sheltered sandstone cavern.",
    elevation: "1,980 meters above sea level",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/42/Old_Lesotho_clay_huts.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1590483736148-3c1a58f96e90?auto=format&fit=crop&w=800&q=80"
    ],
    lat: -28.7511,
    lng: 28.4903,
    featured: false
  }
];

export const foodsData: FoodItem[] = [
  {
    id: "motoho",
    name: "Motoho Porridge",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1598958223659-1f4ec3da5393?auto=format&fit=crop&w=500&q=80",
    description: "Motoho is a beloved traditional fermented sour porridge made from ground sorghum. Bubbling with robust, tangy, and refreshing elements, it serves both as a staple breakfast starter and a restorative, cooling health drink appreciated across Basotho villages.",
    history: "Historically, Motoho has been prepared by Basotho women using stones to grind sorghum grain, then fermenting it naturally in warm clay pots for up to 48 hours to preserve the grain in high mountain temperatures.",
    ingredients: [
      "Local Red Sorghum meal",
      "Pure spring water",
      "Starter fermented culture",
      "Subtle brown sugar (optional)"
    ],
    price: 35.00,
    calories: 180,
    rating: 4.8,
    reviews: [
      { user: "Thabo M.", comment: "Authentic taste. Reminds me of my grandmother's home in Roma. Absolutely sour and perfect!", rating: 5 },
      { user: "Sarah L.", comment: "Very unique sour sorghum flavor, refreshing on a summer afternoon hiking trip.", rating: 4 }
    ]
  },
  {
    id: "papa-moroho",
    name: "Papa & Moroho",
    category: "meals",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=80",
    description: "The national dish of Lesotho. Papa is a stiff, thick porridge made from white maize meal, served here alongside Moroho—sauteed dark leafy wild mustard greens, spinach, and mountain herbs seasoned with onions and gentle spices. Hearty, wholesome, and essential.",
    history: "Maize replaced sorghum as the primary grain in the late 19th century in Southern Africa. Papa is eaten daily by almost all Basotho, forming the energy core of miners, farmers, and horsemen traversing the high ranges.",
    ingredients: [
      "White maize meal",
      "Fresh wild mustard leaves (Moroho)",
      "Braised white onions",
      "Cold-pressed sunflower oil",
      "Local sea salt"
    ],
    price: 30.00,
    calories: 320,
    rating: 4.9,
    reviews: [
      { user: "Mpho K.", comment: "You haven't visited Lesotho if you haven't eaten Papa and Moroho. Five stars for the authentic mountain spinach!", rating: 5 }
    ]
  },
  {
    id: "mutton-stew",
    name: "Highland Mutton Stew",
    category: "stews",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=80",
    description: "Slow-cooked, melt-in-the-mouth organic mutton raised on highland thyme and alpine grasslands. Simmered for 6 hours in robust cast-iron potjies with mountain root carrots, baby potatoes, and natural broths.",
    history: "Highland sheep farming has been a primary livelihood in Lesotho for centuries. Mutton is highly prized and reserved for family celebrations, winter feasts, and welcoming respected guests.",
    ingredients: [
      "Premium highland organic mutton bone-in cuts",
      "Highland wild rosemary and wild thyme",
      "Mountain baby potatoes",
      "Carrots and leeks",
      "Rich beef tallow and red cooking wine reduction"
    ],
    price: 115.00,
    calories: 550,
    rating: 5.0,
    reviews: [
      { user: "Richard G.", comment: "The lamb literally falls off the bone. Best stew I have had in my life. Absolutely stunning!", rating: 5 },
      { user: "Lineo T.", comment: "Warm and cozy potjie! Essential after a cold ski day at Afriski.", rating: 5 }
    ]
  },
  {
    id: "nyekoe",
    name: "Nyekoe Stew",
    category: "meals",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
    description: "A gorgeous, comforting traditional vegetarian mixture combining sugar beans, yellow sorghum grains, and tender sweet pumpkin chunks stewed together, seasoned with local herbs.",
    history: "This ancient Basotho recipe is known for its incredible nutritional density, designed historically to sustain long winter months or periods of low harvest. It represents true mountain kitchen resourcefulness.",
    ingredients: [
      "Dried sugar beans",
      "Yellow sorghum grains",
      "Diced sweet ironbark pumpkin",
      "Sautéed green onions",
      "Pinch of wild peppercorn"
    ],
    price: 45.00,
    calories: 240,
    rating: 4.7,
    reviews: [
      { user: "Julia S.", comment: "Delightful vegetarian stew! It has a wonderful chew from the sorghum grains.", rating: 5 }
    ]
  },
  {
    id: "lekhotloane",
    name: "Lekhotloane Beef",
    category: "stews",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80",
    description: "A rare royal Basotho delicacy. Lean mountain beef is boiled until extremely tender, then shredded and finely pounded using a traditional heavy wooden pestle to create a delicious, moist pulled-beef texture, cooked in deep marrow fat.",
    history: "Lekhotloane was traditionally served to King Moshoeshoe I and respected village elders because it required long, laborious hands-on preparation to create the ultra-fine meat structures.",
    ingredients: [
      "Select lean beef brisket",
      "Slow rendered bone-marrow fat",
      "Bay leaves",
      "Fine rock salt and crashed black peppercorn"
    ],
    price: 95.00,
    calories: 410,
    rating: 4.9,
    reviews: [
      { user: "Lerato M.", comment: "Incredibly flavorful. The fine pounded texture absorbs all the rich bone marrow fat.", rating: 5 }
    ]
  },
  {
    id: "roasted-maize",
    name: "Roasted Mountain Maize",
    category: "snacks",
    image: "https://images.unsplash.com/photo-1551754625-70c90487aa85?auto=format&fit=crop&w=500&q=80",
    description: "Freshly harvested field corn roasted directly over charcoal embers, giving it a smoky, rich, and intensely nutty flavor profile with a crispy bite.",
    history: "Basotho herdsmen commonly roast field maize while tending to mountain pony herds as it represents an easy, highly filling snack that can be cooked over a simple outdoor fire campfire.",
    ingredients: [
      "Organic yellow sweet corn cob",
      "Salted mountain butter brush",
      "Course salt granules"
    ],
    price: 15.00,
    calories: 150,
    rating: 4.6,
    reviews: [
      { user: "John D.", comment: "Salty, buttery, and smoky. Exactly the local comfort street food I love!", rating: 4.5 }
    ]
  },
  {
    id: "gemere",
    name: "Gemere Traditional Ginger Beer",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80",
    description: "A sparkling, non-alcoholic, naturally fermented ginger brew infused with fresh lemon wedges, raisins, and a powerful, refreshing ginger kick.",
    history: "No Basotho wedding, graduation, or family gathering is complete without massive buckets of fermenting Gemere placed in the shade under the thatch roof houses.",
    ingredients: [
      "Grinded strong ginger root",
      "Fresh lemon juice & zest",
      "Wild raisins (to guide fermentation)",
      "Unrefined cane molasses",
      "Yeast culture"
    ],
    price: 25.00,
    calories: 120,
    rating: 4.9,
    reviews: [
      { user: "Naledi P.", comment: "Perfect carbonation! Sharp ginger burn at the back of the throat, exactly how it's supposed to be.", rating: 5 }
    ]
  }
];

export const famousDiamondsData: FamousDiamond[] = [
  {
    id: "lesotho-legend",
    name: "The Lesotho Legend",
    carats: 910,
    foundYear: "2018",
    value: "$40,000,000",
    mine: "Letseng Diamond Mine",
    notes: "The fifth-largest gem-quality diamond ever found in human history. Exceptional D-color Type IIa rating, signifying absolute chemical purity.",
    image: "https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&w=400&q=80",
    rank: 1
  },
  {
    id: "lesotho-promise",
    name: "The Lesotho Promise",
    carats: 603,
    foundYear: "2006",
    value: "$12,400,000",
    mine: "Letseng Diamond Mine",
    notes: "A breathtaking D-color rough diamond cut into 26 exquisite pear-shape, heart-shape, and emerald-cut stones, formed into a single $20 million necklace.",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=400&q=80",
    rank: 2
  },
  {
    id: "lesotho-brown",
    name: "The Lesotho Brown",
    carats: 601,
    foundYear: "1967",
    value: "$12,000,000",
    mine: "Letseng Diamond Mine",
    notes: "Found by a Basotho woman, Ernestine Ramaboa. It was cut into several gems, including the famous Lesotho III ring once gifted by Aristotle Onassis to Jacqueline Kennedy.",
    image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=400&q=80",
    rank: 3
  },
  {
    id: "letseng-star",
    name: "The Letseng Star",
    carats: 550,
    foundYear: "2011",
    value: "$16,500,000",
    mine: "Letseng Diamond Mine",
    notes: "Named to represent the rising star of Lesotho's mining industry, it yielded beautiful, flawless internally perfect white diamonds upon master polishing.",
    rank: 4
  },
  {
    id: "letseng-legacy",
    name: "The Letseng Legacy",
    carats: 493,
    foundYear: "2007",
    value: "$10,400,000",
    mine: "Letseng Diamond Mine",
    notes: "Highlighting the long mining contribution of Northern Lesotho, sold to diamond conglomerates for top-tier clarity processing.",
    rank: 5
  },
  {
    id: "light-of-letseng",
    name: "The Light of Letseng",
    carats: 478,
    foundYear: "2008",
    value: "$18,400,000",
    mine: "Letseng Diamond Mine",
    notes: "An extraordinary rough white diamond with a phenomenal crystal lattice structure, producing some of the highest value-per-carat rates on the market.",
    rank: 6
  },
  {
    id: "letseng-princess",
    name: "The Letseng Princess",
    carats: 439,
    foundYear: "2021",
    value: "$13,500,000",
    mine: "Letseng Diamond Mine",
    notes: "Unearthed amidst challenging planetary conditions, pointing to the resilient mining depth of the alpine Kimberlite pipes.",
    rank: 7
  },
  {
    id: "lesotho-icon",
    name: "The Lesotho Icon",
    carats: 357,
    foundYear: "2018",
    value: "$8,200,000",
    mine: "Letseng Diamond Mine",
    notes: "Showcasing immaculate, colorless translucency that mirrors the clear winter sky of the Lesotho highland mountain crests.",
    rank: 8
  },
  {
    id: "desert-gold",
    name: "The Desert Gold",
    carats: 120,
    foundYear: "2010",
    value: "$5,000,000",
    mine: "Liqhobong Mine",
    notes: "Highly unique warm golden-yellow diamond reflecting the sunlight over the central basalt cliffs of Liqhobong's deep canyons.",
    rank: 9
  },
  {
    id: "semonkong-sunset",
    name: "Semonkong Sunset",
    carats: 115,
    foundYear: "2014",
    value: "$3,500,000",
    mine: "Mothae Mine",
    notes: "A rare intense cognac-amber gem found near the Mothae kimberlite pipe system in Eastern Mokhotlong, honoring the deep red tones of mountain sunsets.",
    rank: 10
  }
];

export const historyTimeline: TimelineEvent[] = [
  {
    year: "Early 1800s",
    title: "Rise of King Moshoeshoe I",
    description: "Amidst the local regional wars (Lifaqane), the tactical diplomat Chief Moshoeshoe gathers peaceful refugees, establishing himself as a protector of clans and creating the Basotho identity."
  },
  {
    year: "1824",
    title: "Thaba Bosiu Mountain Fortress",
    description: "King Moshoeshoe I establishes his headquarters at Thaba Bosiu. The mountain becomes an unassailable stronghold, successfully repelling colonial and Zulu forces through intelligent terrain defense and treaties."
  },
  {
    year: "1868",
    title: "The British Protectorate (Basutoland)",
    description: "Facing severe land pressures from Boers, King Moshoeshoe I turns to British diplomacy. Lesotho becomes a protectorate, ensuring the integrity of the Basotho borders and preventing integration into South Africa."
  },
  {
    year: "1966",
    title: "Independence of Lesotho",
    description: "Lesotho officially gains full independence on October 4, 1966, establishing its identity as a sovereign sovereign Kingdom with a modern constitutional monarchy."
  }
];
