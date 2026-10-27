import React, { useState, useEffect } from 'react';
import { 
  Beer, 
  Cigarette, 
  Clock, 
  Pizza, 
  Footprints, 
  DollarSign, 
  Trophy, 
  User, 
  PlusCircle, 
  Home, 
  Flame, 
  Share2, 
  AlertTriangle, 
  Award, 
  TrendingDown, 
  Zap, 
  Coffee, 
  Trash2, 
  X,
  Compass,
  MapPin,
  Sparkles,
  ChevronRight,
  MessageCircle,
  ThumbsDown,
  Moon,
  Info,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

// --- INITIAL MOCK DATA ---
const INITIAL_POSTS = [
  {
    id: 1,
    user: "Marco_IlPoltrone",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    badge: "Vampiro delle 15:00 🦇",
    timeAgo: "2 ore fa",
    category: "Sveglia",
    title: "Sessione di Sonno Agonistico",
    stats: {
      distance: "4.2 metri",
      pace: "0.01 km/h",
      units: "14.5 ore di sonno",
      calories: "-1,200 kcal",
      cost: "€ 0.00"
    },
    routeType: "Letto ➔ Divano",
    mapSvgPath: "M 10 25 Q 30 10 50 35 T 90 20",
    caption: "Ho rimandato la sveglia delle 8:00 fino alle 15:15 a colpi di 'altri 5 minuti'. Quando sono uscito di casa la luce del sole mi ha bruciato la retina.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
    reactions: {
      faiSchifo: 142,
      ripFegato: 12,
      eroe: 88,
      orgoglioDivano: 210
    },
    userReaction: null,
    comments: [
      { id: 101, user: "Sonia_Lazy", text: "Maestoso. Io alle 14:00 ero ancora nel dormiveglia cosmico!" },
      { id: 102, user: "Dr_Degrado", text: "Hai saltato colazione, pranzo e la dignità in un colpo solo. Rispetto." }
    ]
  },
  {
    id: 2,
    user: "Giulia_SpritzLover",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    badge: "Spugna d'Oro 🍺",
    timeAgo: "5 ore fa",
    category: "Alcol",
    title: "Aperitivo Inox ➔ Chiusura Locale",
    stats: {
      distance: "18 metri",
      pace: "0.2 km/h",
      units: "9 Negroni & 4 Shot",
      calories: "+2,800 kcal",
      cost: "€ 68.00"
    },
    routeType: "Bancone ➔ Bagno del Bar",
    mapSvgPath: "M 10 40 Q 25 5 45 45 T 85 10 T 95 35",
    caption: "Doveva essere 'solo un bicchiere di vino per salutare'. Ho finito per spiegare la geopolitica al barista fino alle 4 di mattina.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
    reactions: {
      faiSchifo: 45,
      ripFegato: 320,
      eroe: 115,
      orgoglioDivano: 18
    },
    userReaction: 'ripFegato',
    comments: [
      { id: 103, user: "Matteo_KebabLord", text: "Spero che il kebabbaro ti abbia salvato la vita dopo." }
    ]
  },
  {
    id: 3,
    user: "Luca_Doomscroller",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    badge: "Re del Procrastino 👑",
    timeAgo: "8 ore fa",
    category: "Pigrizia",
    title: "Maratona TikTok & Reels",
    stats: {
      distance: "0.1 metri",
      pace: "0.0 km/h",
      units: "9h 40m Screen Time",
      calories: "+1,400 kcal",
      cost: "€ 0.00"
    },
    routeType: "Cuscino Destro ➔ Cuscino Sinistro",
    mapSvgPath: "M 20 25 L 80 25",
    caption: "Volevo solo guardare una ricetta rapida. Ho appena concluso un tutorial di 3 ore su come costruirsi un rifugio nucleare con le canne di bambù.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    reactions: {
      faiSchifo: 89,
      ripFegato: 4,
      eroe: 52,
      orgoglioDivano: 340
    },
    userReaction: 'orgoglioDivano',
    comments: [
      { id: 104, user: "Elena_Zzz", text: "Sto leggendo questo mentre dovrei sostenere un colloquio di lavoro." }
    ]
  }
];

const LEADERBOARD_DATA = {
  alcol: [
    { rank: 1, name: "Giacomo_Cisterna", value: "52 Pinte/sett", points: 9850, badge: "Spugna d'Oro 🥇", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
    { rank: 2, name: "Giulia_SpritzLover", value: "41 Pinte/sett", points: 8920, badge: "Fegato D'Acciaio 🥈", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" },
    { rank: 3, name: "Riccardo_Shot", value: "35 Pinte/sett", points: 7640, badge: "Chiusura Bar 🥉", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" }
  ],
  divano: [
    { rank: 1, name: "Luca_Doomscroller", value: "112 Ore Divano", points: 10400, badge: "Mummia Divano 🥇", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80" },
    { rank: 2, name: "Marco_IlPoltrone", value: "98 Ore Divano", points: 9100, badge: "Cuscino Vivente 🥈", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" },
    { rank: 3, name: "Sonia_Lazy", value: "85 Ore Divano", points: 8200, badge: "Bradipo Pro 🥉", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" }
  ],
  sveglia: [
    { rank: 1, name: "Sonia_Lazy", value: "Sveglia Media 16:15", points: 9900, badge: "Vampiro Supremo 🥇", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" },
    { rank: 2, name: "Marco_IlPoltrone", value: "Sveglia Media 15:30", points: 8850, badge: "Nottambulo 🥈", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" },
    { rank: 3, name: "Andrea_NightShift", value: "Sveglia Media 14:45", points: 7900, badge: "Dormiglione 🥉", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80" }
  ],
  denaro: [
    { rank: 1, name: "Filippo_Deliveroo", value: "€ 640 Sprecati", points: 11200, badge: "Bancarotta King 🥇", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80" },
    { rank: 2, name: "Giulia_SpritzLover", value: "€ 490 Sprecati", points: 9300, badge: "Mano Bucata 🥈", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" },
    { rank: 3, name: "Giacomo_Cisterna", value: "€ 410 Sprecati", points: 8100, badge: "Sponsor Bar 🥉", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" }
  ]
};

const BADGES = [
  { id: 1, name: "Spugna d'Oro", desc: "Supera i 20 drink in una singola settimana", icon: "🍺", unlocked: true, date: "Sbloccato 2 gg fa" },
  { id: 2, name: "Vampiro delle 15:00", desc: "Svegliati dopo le 15:00 per 3 volte consecutive", icon: "🦇", unlocked: true, date: "Sbloccato ieri" },
  { id: 3, name: "Mummia da Divano", desc: "Fai meno di 500 passi in 24 ore", icon: "🛋️", unlocked: true, date: "Sbloccato 5 gg fa" },
  { id: 4, name: "Sponsor Deliveroo", desc: "Spendi oltre 150€ in junk food in 7 giorni", icon: "🍕", unlocked: true, date: "Sbloccato la settimana scorsa" },
  { id: 5, name: "Polmone di Ghisa", desc: "Fuma 2 pacchetti guardando una serie tv completa", icon: "🚬", unlocked: false, date: "Bloccato" },
  { id: 6, name: "Mano Bucata Express", desc: "Compra cazzate su Amazon dopo le 3 del mattino", icon: "💸", unlocked: false, date: "Bloccato" }
];

const SOS_ADVICES = [
  "Hai davvero intenzione di uscire a correre? Ricorda che fuori piove (o potrebbe piovere) e il divano ha ormai la forma perfetta del tuo corpo.",
  "Bevi un bicchiere d'acqua se proprio devi... ma finisci prima la birra aperta che sennò sgasifica!",
  "La palestra può attendere. Del resto il muscolo più importante è il cuore, e riposare fa bene al cuore.",
  "La regola dei 5 secondi vale anche se la fetta di pizza è caduta sul tappeto del soggiorno tre ore fa.",
  "Se dormi adesso per altre 12 ore, risparmi direttamente sui costi di pranzo e cena. Efficienza economica!"
];

export default function App() {
  const [activeTab, setActiveTab] = useState('feed'); // feed, log, leaderboard, profile, sos
  const [posts, setPosts] = useState(INITIAL_POSTS);
  
  // SOS Modal state
  const [showSosModal, setShowSosModal] = useState(false);
  const [sosAdvice, setSosAdvice] = useState('');

  // Leaderboard Category State
  const [leaderboardCategory, setLeaderboardCategory] = useState('alcol');

  // New Post Form State
  const [newCategory, setNewCategory] = useState('Alcol');
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [statQty, setStatQty] = useState(6);
  const [costSpent, setCostSpent] = useState(25);
  const [selectedRoute, setSelectedRoute] = useState('Letto ➔ Frigo');
  const [selectedPhoto, setSelectedPhoto] = useState('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80');

  // Trigger Anti-Motivation SOS
  const handleTriggerSOS = () => {
    const random = SOS_ADVICES[Math.floor(Math.random() * SOS_ADVICES.length)];
    setSosAdvice(random);
    setShowSosModal(true);
  };

  // Reactions Handler with live counters
  const handleReaction = (postId, rxType) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const currentRx = post.userReaction;
        const updatedReactions = { ...post.reactions };
        
        if (currentRx) {
          updatedReactions[currentRx] = Math.max(0, updatedReactions[currentRx] - 1);
        }
        
        if (currentRx === rxType) {
          return { ...post, reactions: updatedReactions, userReaction: null };
        } else {
          updatedReactions[rxType] = (updatedReactions[rxType] || 0) + 1;
          return { ...post, reactions: updatedReactions, userReaction: rxType };
        }
      }
      return post;
    }));
  };

  // Add Comment Handler
  const handleAddComment = (postId, text) => {
    if (!text.trim()) return;
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            { id: Date.now(), user: "Tu_IlGrandePigro", text: text.trim() }
          ]
        };
      }
      return post;
    }));
  };

  // Create Post Handler
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle) return;

    let unitsText = "";
    let calText = "+1,200 kcal";

    switch(newCategory) {
      case 'Alcol':
        unitsText = `${statQty} Pinte / Bicchieri`;
        calText = `+${statQty * 250} kcal`;
        break;
      case 'Fumo':
        unitsText = `${statQty} Sigarette consumate`;
        calText = `0 kcal`;
        break;
      case 'Sveglia':
        unitsText = `Sveglia h ${12 + Math.floor(statQty/2)}:${(statQty%2)*30 || '00'}`;
        calText = `-800 kcal`;
        break;
      case 'Junk Food':
        unitsText = `${statQty} Porzioni Fast Food`;
        calText = `+${statQty * 850} kcal`;
        break;
      case 'Pigrizia':
        unitsText = `${statQty} Ore sul Divano`;
        calText = `-200 kcal`;
        break;
      case 'Soldi Buttati':
        unitsText = `€${costSpent}.00 Spesi a caso`;
        calText = `0 kcal`;
        break;
      default:
        unitsText = `${statQty} Unità di Degrado`;
    }

    const newPostObj = {
      id: Date.now(),
      user: "Tu_IlGrandePigro",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      badge: "Degradato Novizio 🔰",
      timeAgo: "Proprio ora",
      category: newCategory,
      title: newTitle,
      stats: {
        distance: `${(Math.random() * 8 + 0.5).toFixed(1)} metri`,
        pace: "0.05 km/h",
        units: unitsText,
        calories: calText,
        cost: `€ ${costSpent}.00`
      },
      routeType: selectedRoute,
      mapSvgPath: "M 15 35 C 30 10, 60 40, 85 15",
      caption: newCaption || "Nessun rimpianto, soltanto la solita immensa pigrizia.",
      image: selectedPhoto,
      reactions: { faiSchifo: 3, ripFegato: 1, eroe: 5, orgoglioDivano: 8 },
      userReaction: null,
      comments: []
    };

    setPosts([newPostObj, ...posts]);
    setActiveTab('feed');
    // Reset inputs
    setNewTitle('');
    setNewCaption('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row max-w-7xl mx-auto border-x border-slate-800 shadow-2xl">

      {/* --- SIDEBAR / DESKTOP NAVIGATION --- */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-900 border-r border-slate-800 p-5 sticky top-0 h-screen justify-between z-30">
        <div>
          {/* LOGO & BRANDING */}
          <div className="flex items-center gap-3 px-2 py-3 mb-8">
            <div className="bg-gradient-to-tr from-emerald-400 via-lime-400 to-amber-400 p-3 rounded-2xl shadow-lg shadow-lime-500/20 text-slate-950">
              <TrendingDown className="w-7 h-7 stroke-[3]" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-lime-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent italic">
                SCHIFAVA
              </h1>
              <p className="text-[10px] tracking-wider text-slate-400 font-bold uppercase">Smetti di performare.</p>
            </div>
          </div>

          {/* MENU ITEMS */}
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('feed')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'feed' ? 'bg-lime-400/10 text-lime-400 border border-lime-400/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <Home className="w-5 h-5" />
              Feed Degrado
            </button>

            <button 
              onClick={() => setActiveTab('log')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'log' ? 'bg-lime-400/10 text-lime-400 border border-lime-400/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <PlusCircle className="w-5 h-5" />
              Registra Schifezza
            </button>

            <button 
              onClick={() => setActiveTab('leaderboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'leaderboard' ? 'bg-lime-400/10 text-lime-400 border border-lime-400/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <Trophy className="w-5 h-5" />
              Classifica (Hall of Shame)
            </button>

            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'profile' ? 'bg-lime-400/10 text-lime-400 border border-lime-400/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <User className="w-5 h-5" />
              Il Tuo Profilo
            </button>

            <button 
              onClick={() => setActiveTab('sos')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'sos' ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <ShieldAlert className="w-5 h-5" />
              SOS Degrado
            </button>
          </nav>
        </div>

        {/* FINANCIAL WASTAGE COUNTER & SOS BUTTON */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] uppercase font-extrabold text-slate-500 block mb-1">Bilancio Degrado Mese</span>
            <div className="flex justify-between items-baseline">
              <span className="text-lg font-black text-rose-500 font-mono">€ 420.50</span>
              <span className="text-[10px] text-lime-400 font-bold bg-lime-400/10 px-2 py-0.5 rounded">+18% vs Gen</span>
            </div>
          </div>

          <button 
            onClick={handleTriggerSOS}
            className="w-full bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black py-3 px-4 rounded-xl shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 border border-red-500/30 transition-all active:scale-95 text-xs uppercase tracking-wider"
          >
            <AlertTriangle className="w-4 h-4 animate-bounce" />
            SOS Anti-Corsa
          </button>
        </div>
      </aside>

      {/* --- MOBILE TOP HEADER --- */}
      <header className="md:hidden bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-40 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-lime-400 p-1.5 rounded-xl text-slate-950">
            <TrendingDown className="w-5 h-5 stroke-[3]" />
          </div>
          <span className="text-xl font-black bg-gradient-to-r from-lime-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent italic">
            SCHIFAVA
          </span>
        </div>

        <button 
          onClick={handleTriggerSOS}
          className="bg-red-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-900/40"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          SOS
        </button>
      </header>

      {/* --- MAIN DISPLAY CONTENT --- */}
      <main className="flex-1 min-w-0 pb-20 md:pb-8 p-3 md:p-6 overflow-y-auto">

        {/* ==================== 1. FEED TAB ==================== */}
        {activeTab === 'feed' && (
          <div className="max-w-xl mx-auto space-y-6">
            
            {/* TOP LAZINESS MOTIVATION BANNER */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-4 rounded-2xl border border-slate-800 flex items-center justify-between shadow-lg">
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-lime-400" />
                  Streak di Pigrizia: 6 Giorni!
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Nessun allenamento o insalata registrati questa settimana.</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-lime-400 bg-lime-400/10 px-3 py-1 rounded-xl border border-lime-400/20 block font-mono">
                  89%
                </span>
                <span className="text-[9px] text-slate-500 uppercase font-bold">Livello Marcio</span>
              </div>
            </div>

            {/* QUICK LOG CREATION BAR */}
            <div 
              onClick={() => setActiveTab('log')}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-3.5 rounded-2xl flex items-center gap-3 cursor-pointer transition-all shadow-md group"
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                alt="Avatar" 
                className="w-10 h-10 rounded-full border border-slate-700" 
              />
              <input 
                type="text" 
                placeholder="Quale anti-performance hai compiuto oggi? Registrala..." 
                className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs md:text-sm w-full text-slate-300 pointer-events-none group-hover:border-slate-700" 
                readOnly 
              />
              <PlusCircle className="w-6 h-6 text-lime-400 shrink-0" />
            </div>

            {/* POST CARDS FEED */}
            {posts.map(post => (
              <article key={post.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl transition-all hover:border-slate-700">
                
                {/* POST HEADER */}
                <div className="p-4 flex items-center justify-between border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <img src={post.avatar} alt={post.user} className="w-11 h-11 rounded-full object-cover border-2 border-lime-400/40" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100 text-sm">{post.user}</span>
                        <span className="text-[10px] bg-slate-800 text-lime-300 font-semibold px-2 py-0.5 rounded-full border border-lime-400/20">
                          {post.badge}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">{post.timeAgo} • {post.category}</span>
                    </div>
                  </div>
                  <button className="text-slate-500 hover:text-slate-300 p-1">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* POST BODY & STRAVA-STYLE STAT GRID */}
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-black text-slate-100 tracking-tight">{post.title}</h3>
                  
                  {/* STRAVA-LIKE STAT GRID */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block">Distanza</span>
                      <p className="text-sm font-black text-lime-400 font-mono">{post.stats.distance}</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block">Risultato</span>
                      <p className="text-sm font-black text-amber-400 truncate font-mono">{post.stats.units}</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block">Calorie</span>
                      <p className="text-sm font-black text-emerald-400 font-mono">{post.stats.calories}</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block">Costo</span>
                      <p className="text-sm font-black text-rose-400 font-mono">{post.stats.cost}</p>
                    </div>
                  </div>

                  {/* MINI MAP SNIPPET */}
                  {post.routeType && (
                    <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden relative">
                          <svg className="w-full h-full stroke-lime-400 fill-none stroke-2" viewBox="0 0 100 50">
                            <path d={post.mapSvgPath || "M 10 25 L 90 25"} />
                          </svg>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase font-bold block">Percorso Registrato</span>
                          <span className="text-xs font-bold text-slate-200">{post.routeType}</span>
                        </div>
                      </div>
                      <Footprints className="w-4 h-4 text-lime-400" />
                    </div>
                  )}

                  <p className="text-slate-300 text-sm leading-relaxed">{post.caption}</p>
                </div>

                {/* POST PROOF IMAGE */}
                {post.image && (
                  <div className="relative max-h-96 overflow-hidden bg-slate-950">
                    <img src={post.image} alt="Prova degrado" className="w-full object-cover" />
                    <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-[11px] font-mono text-lime-400 flex items-center gap-1.5 shadow-md">
                      <Zap className="w-3.5 h-3.5 fill-lime-400 text-lime-400" /> ANTI-PERFORMANCE CERTIFICATA
                    </div>
                  </div>
                )}

                {/* ANTI-KUDOS REACTION BAR */}
                <div className="p-3 border-t border-slate-800 bg-slate-900/60">
                  <div className="flex items-center justify-between text-xs mb-2.5 text-slate-400 px-1">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Reazioni di Sostegno</span>
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {Object.values(post.reactions).reduce((a,b)=>a+b, 0)} Totali
                    </span>
                  </div>

                  {/* REACTION BUTTONS */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    <button 
                      onClick={() => handleReaction(post.id, 'faiSchifo')}
                      className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${post.userReaction === 'faiSchifo' ? 'bg-lime-400 text-slate-950 scale-105 shadow-md shadow-lime-400/20' : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'}`}
                    >
                      <span>🤢</span> Fai Schifo ({post.reactions.faiSchifo})
                    </button>

                    <button 
                      onClick={() => handleReaction(post.id, 'ripFegato')}
                      className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${post.userReaction === 'ripFegato' ? 'bg-amber-500 text-slate-950 scale-105 shadow-md shadow-amber-500/20' : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'}`}
                    >
                      <span>🍺</span> RIP Fegato ({post.reactions.ripFegato})
                    </button>

                    <button 
                      onClick={() => handleReaction(post.id, 'eroe')}
                      className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${post.userReaction === 'eroe' ? 'bg-fuchsia-500 text-white scale-105 shadow-md shadow-fuchsia-500/20' : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'}`}
                    >
                      <span>👑</span> Eroe ({post.reactions.eroe})
                    </button>

                    <button 
                      onClick={() => handleReaction(post.id, 'orgoglioDivano')}
                      className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${post.userReaction === 'orgoglioDivano' ? 'bg-emerald-500 text-slate-950 scale-105 shadow-md shadow-emerald-500/20' : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'}`}
                    >
                      <span>🛋️</span> Divano ({post.reactions.orgoglioDivano})
                    </button>
                  </div>
                </div>

                {/* COMMENTS SECTION */}
                <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-2.5">
                  {post.comments.map(c => (
                    <div key={c.id} className="text-xs text-slate-300 bg-slate-900/80 p-2 rounded-lg border border-slate-800/50">
                      <strong className="text-lime-400 mr-2">@{c.user}:</strong>
                      <span>{c.text}</span>
                    </div>
                  ))}
                  
                  {/* COMMENT INPUT */}
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.target.elements.commentInput;
                    handleAddComment(post.id, input.value);
                    input.value = '';
                  }} className="flex gap-2 pt-1">
                    <input 
                      name="commentInput"
                      type="text" 
                      placeholder="Aggiungi un commento di degrado..." 
                      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs flex-1 text-slate-200 focus:outline-none focus:border-lime-400" 
                    />
                    <button type="submit" className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-xl font-bold border border-slate-700">
                      Invia
                    </button>
                  </form>
                </div>

              </article>
            ))}

          </div>
        )}

        {/* ==================== 2. LOG ANTI-PERFORMANCE TAB ==================== */}
        {activeTab === 'log' && (
          <div className="max-w-xl mx-auto space-y-6">
            
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-black text-slate-100 flex items-center gap-2">
                <PlusCircle className="w-6 h-6 text-lime-400" />
                Registra Schifezza
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Aggiungi la tua ultima impresa di ozio, spreco di denaro o alcol al feed principale.
              </p>
            </div>

            <form onSubmit={handleCreatePost} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-5 shadow-xl">
              
              {/* CATEGORY SELECTOR */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Categoria Anti-Performance
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: 'Alcol', icon: Beer },
                    { name: 'Fumo', icon: Cigarette },
                    { name: 'Sveglia', icon: Clock },
                    { name: 'Junk Food', icon: Pizza },
                    { name: 'Pigrizia', icon: Footprints },
                    { name: 'Soldi Buttati', icon: DollarSign }
                  ].map(cat => {
                    const IconComp = cat.icon;
                    return (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() => setNewCategory(cat.name)}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${newCategory === cat.name ? 'bg-lime-400/20 border-lime-400 text-lime-400 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                      >
                        <IconComp className="w-5 h-5" />
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TITLE */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Titolo dell'Attività
                </label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Es. Ordine Deliveroo di mezzanotte da 45€"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-lime-400"
                  required
                />
              </div>

              {/* ROUTE TYPE SELECTOR */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Seleziona Percorso Registrato
                </label>
                <select 
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-lime-400"
                >
                  <option value="Letto ➔ Frigo">Letto ➔ Frigo (3.5 metri)</option>
                  <option value="Divano ➔ Bagno">Divano ➔ Bagno (2.1 metri)</option>
                  <option value="Bar Sotto Casa ➔ Letto in Taxi">Bar Sotto Casa ➔ Letto in Taxi (800 metri)</option>
                  <option value="Letto ➔ Divano">Letto ➔ Divano (4.0 metri)</option>
                  <option value="Cuscino Destro ➔ Cuscino Sinistro">Cuscino Destro ➔ Cuscino Sinistro (0.1 metri)</option>
                </select>
              </div>

              {/* SLIDERS FOR QUANTITY & COST */}
              <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="uppercase text-slate-400">Intensità / Quantità</span>
                    <span className="text-lime-400 font-mono">{statQty} Unità</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="20" 
                    value={statQty}
                    onChange={(e) => setStatQty(Number(e.target.value))}
                    className="w-full accent-lime-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="uppercase text-slate-400">Spreco Economico (€)</span>
                    <span className="text-rose-400 font-mono">€ {costSpent}.00</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="250" 
                    step="5"
                    value={costSpent}
                    onChange={(e) => setCostSpent(Number(e.target.value))}
                    className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* DESCRIPTION CAPTION */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Didascalia del Pentimento
                </label>
                <textarea 
                  rows="3"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Descrivi come sei riuscito a toccare questo nuovo fondo..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs md:text-sm text-slate-100 focus:outline-none focus:border-lime-400"
                ></textarea>
              </div>

              {/* PRESET PHOTO SELECTION */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Foto Prova del Delitto
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80",
                    "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=300&q=80",
                    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=300&q=80"
                  ].map((url, idx) => (
                    <img 
                      key={idx}
                      src={url} 
                      alt="Preset"
                      onClick={() => setSelectedPhoto(url)}
                      className={`h-20 w-full object-cover rounded-xl cursor-pointer border-2 transition-all ${selectedPhoto === url ? 'border-lime-400 scale-95 shadow-md shadow-lime-400/20' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    />
                  ))}
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-lime-400 via-emerald-400 to-amber-400 hover:from-lime-300 hover:to-amber-300 text-slate-950 font-black py-3.5 rounded-xl shadow-lg shadow-lime-400/20 text-xs md:text-sm tracking-wider uppercase transition-all"
              >
                PUBBLICA NEL DEGRADO
              </button>

            </form>

          </div>
        )}

        {/* ==================== 3. HALL OF SHAME (CLASSIFICA) ==================== */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-2xl mx-auto space-y-6">
            
            <div className="text-center space-y-2 py-2">
              <h2 className="text-3xl font-black tracking-tight text-transparent bg-gradient-to-r from-lime-400 via-amber-400 to-rose-500 bg-clip-text">
                HALL OF SHAME
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                I veri campioni dell'anti-prestazione. Seleziona una categoria per scoprire chi sta peggio.
              </p>
            </div>

            {/* CATEGORY TOGGLE METRICS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'alcol', label: 'Più Alcol', icon: '🍺' },
                { id: 'divano', label: 'Ore Divano', icon: '🛋️' },
                { id: 'sveglia', label: 'Sveglia Tarda', icon: '🦇' },
                { id: 'denaro', label: 'Euro Sprecati', icon: '💸' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setLeaderboardCategory(cat.id)}
                  className={`p-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${leaderboardCategory === cat.id ? 'bg-lime-400 text-slate-950 border-lime-400 shadow-md font-extrabold' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850'}`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* PODIUM DISPLAY (TOP 3) */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 items-end pt-8 pb-4">
              
              {/* 2ND PLACE */}
              <div className="bg-slate-900 border border-slate-800 p-3 md:p-4 rounded-2xl flex flex-col items-center text-center relative shadow-lg">
                <div className="absolute -top-4 bg-slate-700 text-white font-black w-7 h-7 rounded-full flex items-center justify-center text-xs border border-slate-600">
                  2
                </div>
                <img src={LEADERBOARD_DATA[leaderboardCategory][1].avatar} alt="" className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-slate-400 mb-2 mt-2 object-cover" />
                <span className="font-bold text-xs text-slate-200 truncate w-full">{LEADERBOARD_DATA[leaderboardCategory][1].name}</span>
                <span className="text-[10px] text-lime-400 font-mono font-black mt-0.5">{LEADERBOARD_DATA[leaderboardCategory][1].value}</span>
                <span className="text-[9px] text-slate-400 mt-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{LEADERBOARD_DATA[leaderboardCategory][1].badge}</span>
              </div>

              {/* 1ST PLACE (GOLD) */}
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-lime-400/80 p-4 md:p-5 rounded-2xl flex flex-col items-center text-center relative shadow-2xl shadow-lime-400/10 transform -translate-y-3">
                <div className="absolute -top-5 bg-lime-400 text-slate-950 font-black w-9 h-9 rounded-full flex items-center justify-center text-sm border-2 border-slate-950 shadow-md">
                  👑 1
                </div>
                <img src={LEADERBOARD_DATA[leaderboardCategory][0].avatar} alt="" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-lime-400 mb-2 mt-2 object-cover shadow-lg" />
                <span className="font-black text-sm text-slate-100 truncate w-full">{LEADERBOARD_DATA[leaderboardCategory][0].name}</span>
                <span className="text-xs text-lime-400 font-mono font-black mt-0.5">{LEADERBOARD_DATA[leaderboardCategory][0].value}</span>
                <span className="text-[10px] text-amber-400 font-bold mt-1 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">{LEADERBOARD_DATA[leaderboardCategory][0].badge}</span>
              </div>

              {/* 3RD PLACE */}
              <div className="bg-slate-900 border border-slate-800 p-3 md:p-4 rounded-2xl flex flex-col items-center text-center relative shadow-lg">
                <div className="absolute -top-4 bg-amber-800 text-white font-black w-7 h-7 rounded-full flex items-center justify-center text-xs border border-amber-700">
                  3
                </div>
                <img src={LEADERBOARD_DATA[leaderboardCategory][2].avatar} alt="" className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-amber-700 mb-2 mt-2 object-cover" />
                <span className="font-bold text-xs text-slate-200 truncate w-full">{LEADERBOARD_DATA[leaderboardCategory][2].name}</span>
                <span className="text-[10px] text-lime-400 font-mono font-black mt-0.5">{LEADERBOARD_DATA[leaderboardCategory][2].value}</span>
                <span className="text-[9px] text-slate-400 mt-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{LEADERBOARD_DATA[leaderboardCategory][2].badge}</span>
              </div>

            </div>

            {/* RANKING LIST TABLE */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800/80">
              {LEADERBOARD_DATA[leaderboardCategory].map(item => (
                <div key={item.rank} className="p-3.5 flex items-center justify-between hover:bg-slate-850 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black text-slate-500 w-5 text-center">#{item.rank}</span>
                    <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                    <div>
                      <h4 className="font-bold text-xs md:text-sm text-slate-200">{item.name}</h4>
                      <p className="text-[10px] text-slate-400">{item.badge}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-black text-lime-400 font-mono">{item.value}</div>
                    <div className="text-[10px] text-slate-500">{item.points} Pts Degrado</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ==================== 4. USER PROFILE TAB ==================== */}
        {activeTab === 'profile' && (
          <div className="max-w-xl mx-auto space-y-6">
            
            {/* PROFILE CARD */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-center relative overflow-hidden shadow-xl">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-lime-500/20 via-emerald-500/20 to-amber-500/20"></div>
              
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                alt="Profilo Utente" 
                className="w-24 h-24 rounded-full border-4 border-slate-900 object-cover mx-auto relative z-10 shadow-xl mt-2" 
              />
              
              <h2 className="text-2xl font-black text-slate-100 mt-2">Tu_IlGrandePigro</h2>
              <p className="text-xs text-lime-400 font-bold mb-2">Livello 14: Maestro del Divano</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto italic">
                "Svegliarsi prima delle 12:00 è una palese mancanza di rispetto nei confronti del riposo."
              </p>

              {/* STATS OVERVIEW GRID */}
              <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-slate-800 text-center">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="block text-[9px] text-slate-500 uppercase font-extrabold">Pinte Totali</span>
                  <span className="text-base font-black text-amber-400 font-mono">148</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="block text-[9px] text-slate-500 uppercase font-extrabold">Ora Sveglia Media</span>
                  <span className="text-base font-black text-lime-400 font-mono">14:15</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="block text-[9px] text-slate-500 uppercase font-extrabold">Euro Buttati</span>
                  <span className="text-base font-black text-rose-400 font-mono">€ 840</span>
                </div>
              </div>
            </div>

            {/* BADGES & TROPHIES WALL */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Award className="w-4 h-4 text-lime-400" />
                  Bacheca dei Trofei del Degrado
                </h3>
                <span className="text-xs font-bold text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded border border-lime-400/20">
                  4 / 6 Sbloccati
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BADGES.map(badge => (
                  <div 
                    key={badge.id} 
                    className={`p-3 rounded-xl border flex items-start gap-3 transition-all ${badge.unlocked ? 'bg-slate-950 border-slate-800' : 'bg-slate-950/40 border-slate-800/40 opacity-40'}`}
                  >
                    <span className="text-2xl p-2 bg-slate-900 rounded-xl border border-slate-800 shrink-0">{badge.icon}</span>
                    <div>
                      <h4 className="font-bold text-xs text-slate-200">{badge.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{badge.desc}</p>
                      <span className="text-[9px] font-mono text-lime-400 mt-1 block font-bold">{badge.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ==================== 5. SOS DEGRADO TAB ==================== */}
        {activeTab === 'sos' && (
          <div className="max-w-xl mx-auto space-y-6">
            
            <div className="bg-slate-900 border-2 border-red-500/80 p-6 rounded-2xl space-y-4 text-center shadow-2xl shadow-red-950/50">
              <div className="inline-flex p-3 bg-red-500/10 rounded-full border border-red-500/30 text-red-500 mb-1">
                <ShieldAlert className="w-10 h-10 animate-pulse" />
              </div>

              <h2 className="text-2xl font-black text-slate-100">SOS DEGRADO & ANTI-MOTIVAZIONE</h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Hai un improvviso e pericoloso attacco di produttività o voglia di andare a correre? Clicca il pulsante qui sotto prima che sia troppo tardi.
              </p>

              <button 
                onClick={handleTriggerSOS}
                className="w-full bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black py-4 px-6 rounded-xl shadow-lg shadow-red-900/40 text-sm tracking-wider uppercase transition-all"
              >
                GENERATORE DI SCUSE PER NON FARE NIENTE
              </button>
            </div>

            {/* EMERGENCY TIPS DISPLAY */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400" />
                Linee Guida per una Vita senza Sforzo
              </h3>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
                  <span className="text-lime-400 font-bold">1.</span>
                  <span>Non fare oggi quello che puoi tranquillamente rimandare al mese prossimo.</span>
                </li>
                <li className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
                  <span className="text-lime-400 font-bold">2.</span>
                  <span>Camminare fino al frigorifero conta formalmente come attività cardio a bassa intensità.</span>
                </li>
                <li className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
                  <span className="text-lime-400 font-bold">3.</span>
                  <span>Se la tua maratona preferita è su Netflix, stai comunque facendo una maratona.</span>
                </li>
              </ul>
            </div>

          </div>
        )}

      </main>

      {/* --- MOBILE BOTTOM NAVIGATION TABS --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex justify-around p-2.5 z-40">
        <button 
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'feed' ? 'text-lime-400 font-bold' : 'text-slate-400'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[9px]">Feed</span>
        </button>

        <button 
          onClick={() => setActiveTab('log')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'log' ? 'text-lime-400 font-bold' : 'text-slate-400'}`}
        >
          <PlusCircle className="w-5 h-5" />
          <span className="text-[9px]">Traccia</span>
        </button>

        <button 
          onClick={() => setActiveTab('leaderboard')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'leaderboard' ? 'text-lime-400 font-bold' : 'text-slate-400'}`}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[9px]">Classifica</span>
        </button>

        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-lime-400 font-bold' : 'text-slate-400'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[9px]">Profilo</span>
        </button>
      </nav>

      {/* --- SOS ANTI-MOTIVATION POPUP MODAL --- */}
      {showSosModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border-2 border-red-500 max-w-sm w-full p-6 rounded-2xl space-y-4 relative shadow-2xl shadow-red-950/80">
            <button 
              onClick={() => setShowSosModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 text-red-500">
              <AlertTriangle className="w-7 h-7 animate-bounce shrink-0" />
              <div>
                <h3 className="font-black text-base text-slate-100">SOS ANTI-MOTIVAZIONE</h3>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Consiglio Salva-Divano</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800 italic leading-relaxed">
              "{sosAdvice}"
            </p>

            <button 
              onClick={() => setShowSosModal(false)}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-md"
            >
              Rimanere a riposo sul divano
            </button>
          </div>
        </div>
      )}

    </div>
  );
}