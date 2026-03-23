import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Mic, 
  Timer, 
  CheckCircle, 
  ChevronRight, 
  List, 
  MessageSquare, 
  Info,
  Play,
  Square,
  RefreshCw,
  Award,
  Volume2,
  History,
  Trash2,
  Download,
  Moon,
  Sun,
  Layers,
  Sparkles,
  RotateCcw,
  Search,
  TrendingUp,
  Zap,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { TOPICS, CONNECTORS } from './constants';
import { getFeedback, getModelAnswer, analyzeAudio, getInterviewQuestion, getB2Synonyms } from './services/geminiService';
import Markdown from 'react-markdown';
import { 
  Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';

// --- Components ---

const Navbar = ({ darkMode, toggleDarkMode, xp }: { darkMode: boolean, toggleDarkMode: () => void, xp: number }) => {
  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl title-font text-emerald-600 hover:scale-105 transition-transform">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Award className="w-6 h-6" />
          </div>
          <span>B2 Mintzamena</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Maila {level}</span>
              <div className="w-24 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mt-1 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-emerald-500"
                />
              </div>
            </div>
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-600">
              <Zap className="w-4 h-4 fill-current" />
            </div>
          </div>
          <Link to="/topics" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-all flex items-center gap-1 font-semibold group">
            <div className="p-2 rounded-lg group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors">
              <List className="w-5 h-5" />
            </div>
            <span className="hidden sm:inline">Gaiak</span>
          </Link>
          <Link to="/flashcards" className="text-zinc-600 dark:text-zinc-400 hover:text-amber-600 transition-all flex items-center gap-1 font-semibold group">
            <div className="p-2 rounded-lg group-hover:bg-amber-50 dark:group-hover:bg-amber-900/30 transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <span className="hidden sm:inline">Flashcard-ak</span>
          </Link>
          <Link to="/resources" className="text-zinc-600 dark:text-zinc-400 hover:text-violet-600 transition-all flex items-center gap-1 font-semibold group">
            <div className="p-2 rounded-lg group-hover:bg-violet-50 dark:group-hover:bg-violet-900/30 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="hidden sm:inline">Baliabideak</span>
          </Link>
          <button 
            onClick={toggleDarkMode}
            className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-zinc-100 py-12 mt-auto">
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 font-bold text-xl title-font text-emerald-600">
          <Award className="w-6 h-6" />
          <span>B2 Mintzamena</span>
        </div>
        <div className="text-zinc-400 text-sm font-medium">
          <p>© 2026 Euskara B2 Mintzamena Prestatzailea</p>
          <p className="mt-1 italic">Hizkuntza ikasteko laguntzailea</p>
        </div>
        <div className="flex gap-4">
          {['bg-emerald-400', 'bg-violet-400', 'bg-amber-400', 'bg-rose-400'].map((c, i) => (
            <div key={i} className={`w-3 h-3 ${c} rounded-full`} />
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = () => (
  <div className="relative overflow-hidden">
    {/* Decorative background elements */}
    <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
          x: [0, -40, 0],
          y: [0, 60, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -right-20 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 left-1/3 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl"
      />
    </div>

    <div className="max-w-4xl mx-auto py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-block mb-6 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold uppercase tracking-widest"
        >
          Euskara B2 Prestatzailea
        </motion.div>
        <h1 className="text-6xl md:text-7xl font-black text-zinc-900 mb-8 tracking-tight title-font leading-tight">
          Prestatu zure <br />
          <span className="text-transparent bg-clip-text vibrant-gradient">B2 ahozkoa</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-600 max-w-2xl mx-auto leading-relaxed font-medium">
          HABE, IVAP edo Hizkuntza Eskola Ofizialeko azterketak gainditzeko tresna osoa. 
          Gaiak, simulagailua eta AI bidezko feedback pertsonalizatua.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <Link 
            to="/topics" 
            className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center gap-3 text-lg hover:scale-105 active:scale-95"
          >
            Hasi Praktikatzen
            <ChevronRight className="w-6 h-6" />
          </Link>
          <Link 
            to="/resources" 
            className="px-10 py-5 bg-white text-violet-700 border-2 border-violet-600 rounded-2xl font-bold hover:bg-violet-50 transition-all shadow-xl shadow-violet-100 flex items-center gap-3 text-lg hover:scale-105 active:scale-95"
          >
            Baliabideak Ikusi
          </Link>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: List, title: "Gai Eguneratuak", desc: "Azterketetan ohikoenak diren gaien zerrenda zabala.", color: "bg-emerald-500", light: "bg-emerald-50" },
          { icon: Timer, title: "Simulagailua", desc: "Denbora kontrolatua eta prestaketa fasea simulatzeko.", color: "bg-violet-500", light: "bg-violet-50" },
          { icon: MessageSquare, title: "AI Feedbacka", desc: "Zure gidoiak aztertu eta hobetzeko aholkuak jaso.", color: "bg-amber-500", light: "bg-amber-50" }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (i + 1) }}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-zinc-200/50 relative group overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${feature.light} rounded-bl-[4rem] -z-10 transition-all group-hover:scale-150`} />
            <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-current/20`}>
              <feature.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-3 title-font">{feature.title}</h3>
            <p className="text-zinc-600 leading-relaxed font-medium">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const TopicsPage = () => {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('completed_topics');
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  const categories = Array.from(new Set(TOPICS.map(t => t.category)));

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
      >
        <div>
          <h2 className="text-5xl font-black text-zinc-900 dark:text-white title-font tracking-tight">Azterketako Gaiak</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-xl font-medium">Aukeratu gai bat simulazioa hasteko. Osatu kategoria guztiak domina lortzeko.</p>
        </div>
        <div className="flex items-center gap-4 bg-emerald-50 dark:bg-emerald-900/20 px-6 py-3 rounded-[2rem] border-2 border-emerald-100 dark:border-emerald-800 shadow-lg">
          <History className="w-6 h-6 text-emerald-600" />
          <span className="text-emerald-700 dark:text-emerald-400 font-black text-lg">{completed.length} / {TOPICS.length} Eginda</span>
        </div>
      </motion.div>

      <div className="space-y-16">
        {categories.map((category, catIdx) => {
          const categoryTopics = TOPICS.filter(t => t.category === category);
          const completedInCategory = categoryTopics.filter(t => completed.includes(t.id));
          const isCategoryComplete = completedInCategory.length === categoryTopics.length;

          return (
            <section key={category} className="relative">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-3xl font-black text-zinc-800 dark:text-zinc-200 title-font">{category}</h3>
                <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold ${
                  isCategoryComplete 
                    ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                    : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                }`}>
                  {isCategoryComplete ? <Trophy className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  {completedInCategory.length} / {categoryTopics.length}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryTopics.map((topic, i) => {
                  const isDone = completed.includes(topic.id);
                  return (
                    <motion.div 
                      key={topic.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (catIdx * 0.1) + (i * 0.05) }}
                      whileHover={{ y: -5 }}
                      className={`group relative bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border-2 transition-all shadow-xl hover:shadow-2xl ${
                        isDone 
                          ? 'border-emerald-500/50 shadow-emerald-100 dark:shadow-none' 
                          : 'border-zinc-100 dark:border-zinc-800 hover:border-emerald-200'
                      }`}
                    >
                      {isDone && (
                        <div className="absolute top-6 right-6 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                          <CheckCircle className="w-6 h-6" />
                        </div>
                      )}
                      <div className="mb-6">
                        <span className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full text-xs font-black uppercase tracking-widest">
                          {topic.level}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 title-font leading-tight">{topic.title}</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-8 line-clamp-2 font-medium leading-relaxed">{topic.description}</p>
                      <Link 
                        to={`/simulator/${topic.id}`}
                        className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 ${
                          isDone 
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400' 
                            : 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 shadow-xl shadow-zinc-200 dark:shadow-none'
                        }`}
                      >
                        {isDone ? 'Berregin' : 'Hasi'}
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
const SimulatorPage = ({ onXpGain }: { onXpGain: (amount: number) => void }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const topic = TOPICS.find(t => t.id === id);
  
  const [phase, setPhase] = useState<'prep' | 'speak' | 'interview' | 'feedback'>('prep');
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins prep
  const [outline, setOutline] = useState('');
  const [feedback, setFeedback] = useState('');
  const [audioAnalysis, setAudioAnalysis] = useState('');
  const [modelAnswer, setModelAnswer] = useState('');
  const [interviewQuestion, setInterviewQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  // Audio recording states
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [mainAudioBlob, setMainAudioBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if ((phase === 'prep' || phase === 'speak' || phase === 'interview') && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [phase, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const localChunks: Blob[] = [];
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) localChunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(localChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setMainAudioBlob(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Ezin izan da mikrofonoa atzitu. Mesedez, eman baimena.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleFinishPrep = () => {
    setPhase('speak');
    setTimeLeft(5 * 60); // 5 mins speaking
    startRecording();
  };

  const handleFinishSpeaking = async () => {
    stopRecording();
    setLoading(true);
    
    // Get a question for the interview phase
    const question = await getInterviewQuestion(topic?.title || '', outline);
    setInterviewQuestion(question || '');
    
    setPhase('interview');
    setTimeLeft(2 * 60); // 2 mins for interview response
    setLoading(false);
  };

  const handleStartInterviewRecording = () => {
    startRecording();
  };

  const handleGetFinalFeedback = async () => {
    stopRecording();
    setLoading(true);
    
    let audioAnalysisRes = "Ezin izan da audioa aztertu.";
    let parsedChartData = null;

    if (mainAudioBlob) {
      try {
        const base64 = await blobToBase64(mainAudioBlob);
        const rawRes = await analyzeAudio(topic?.title || '', base64, 'audio/webm');
        
        // Extract JSON from the response
        const jsonMatch = rawRes.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            const scores = JSON.parse(jsonMatch[0]);
            parsedChartData = [
              { subject: 'Fluidentasuna', A: scores.fluency, fullMark: 100 },
              { subject: 'Hiztegia', A: scores.vocabulary, fullMark: 100 },
              { subject: 'Gramatika', A: scores.grammar, fullMark: 100 },
              { subject: 'Ahoskera', A: scores.pronunciation, fullMark: 100 },
            ];
            audioAnalysisRes = rawRes.replace(jsonMatch[0], '');
          } catch (e) {
            audioAnalysisRes = rawRes;
          }
        } else {
          audioAnalysisRes = rawRes;
        }
      } catch (e) {
        console.error("Analysis error", e);
      }
    }

    const [feedbackRes, modelAnswerRes] = await Promise.all([
      getFeedback(topic?.title || '', outline),
      getModelAnswer(topic?.title || '')
    ]);

    setFeedback(feedbackRes || '');
    setAudioAnalysis(audioAnalysisRes || '');
    setModelAnswer(modelAnswerRes || '');
    setChartData(parsedChartData || []);
    setPhase('feedback');
    setLoading(false);

    // Gain XP
    onXpGain(50);

    // Save progress
    if (topic) {
      const saved = localStorage.getItem('completed_topics');
      const completed = saved ? JSON.parse(saved) : [];
      if (!completed.includes(topic.id)) {
        completed.push(topic.id);
        localStorage.setItem('completed_topics', JSON.stringify(completed));

        // Check if category is completed
        const categoryTopics = TOPICS.filter(t => t.category === topic.category);
        const completedInCategory = categoryTopics.filter(t => completed.includes(t.id));
        if (completedInCategory.length === categoryTopics.length) {
          onXpGain(200); // Bonus for category completion
          alert(`ZORIONAK! "${topic.category}" kategoria osatu duzu! +200 XP jaso dituzu.`);
        }
      }
    }
  };

  if (!topic) return <div>Gaia ez da aurkitu.</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] border-2 border-zinc-50 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-zinc-900 p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <span className="px-4 py-1.5 bg-emerald-500 text-white rounded-full text-xs font-black uppercase tracking-widest">
                Simulagailua
              </span>
              <motion.div 
                animate={timeLeft < 60 ? { scale: [1, 1.1, 1], color: ['#fff', '#ef4444', '#fff'] } : {}}
                transition={{ duration: 0.5, repeat: timeLeft < 60 ? Infinity : 0 }}
                className="flex items-center gap-3 font-mono text-3xl font-bold bg-white/10 px-6 py-2 rounded-2xl backdrop-blur-md"
              >
                <Timer className="w-7 h-7" />
                {formatTime(timeLeft)}
              </motion.div>
            </div>
            <h2 className="text-4xl font-black title-font">{topic.title}</h2>
            <p className="mt-3 text-zinc-400 text-lg font-medium max-w-2xl">{topic.description}</p>
          </div>
        </div>

        <div className="p-10">
          <AnimatePresence mode="wait">
            {phase === 'prep' && (
              <motion.div 
                key="prep"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-emerald-50 p-8 rounded-[2rem] border-2 border-emerald-100/50">
                    <h4 className="font-bold text-emerald-900 mb-6 flex items-center gap-3 text-xl title-font">
                      <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                        <Info className="w-6 h-6" />
                      </div>
                      Gogoan hartu:
                    </h4>
                    <ul className="space-y-4">
                      {topic.points.map((p, i) => (
                        <motion.li 
                          key={i} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 text-emerald-800 font-medium"
                        >
                          <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                          {p}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-violet-50 p-8 rounded-[2rem] border-2 border-violet-100/50">
                    <h4 className="font-bold text-violet-900 mb-6 flex items-center gap-3 text-xl title-font">
                      <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center text-white">
                        <Volume2 className="w-6 h-6" />
                      </div>
                      Hiztegi erabilgarria:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {topic.vocabulary.map((word, i) => (
                        <span key={i} className="px-3 py-1 bg-white text-violet-700 rounded-full text-sm font-bold border border-violet-200 shadow-sm">
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Useful Phrases */}
                <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-[2rem] border-2 border-amber-100/50">
                  <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-6 flex items-center gap-3 text-xl title-font">
                    <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    Esamolde Erabilgarriak:
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {topic.usefulPhrases.map((phrase, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-800 rounded-xl border border-amber-100 dark:border-amber-900 font-bold text-amber-800 dark:text-amber-200 shadow-sm">
                        <div className="w-2 h-2 bg-amber-500 rounded-full shrink-0" />
                        {phrase}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-lg font-bold text-zinc-800 title-font">
                    Zure gidoia edo oharrak (15 minutu dituzu):
                  </label>
                  <textarea 
                    value={outline}
                    onChange={(e) => setOutline(e.target.value)}
                    placeholder="Idatzi hemen zure ideiak, eskema bat edo hitz gakoak..."
                    className="w-full h-80 p-8 rounded-[2rem] border-2 border-zinc-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all resize-none font-medium text-lg leading-relaxed shadow-inner bg-zinc-50/50"
                  />
                </div>

                <button 
                  onClick={handleFinishPrep}
                  className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-200 hover:scale-[1.02] active:scale-95"
                >
                  Prestaketa Amaitu eta Grabatu
                  <ChevronRight className="w-6 h-6" />
                </button>
              </motion.div>
            )}

            {phase === 'speak' && (
              <motion.div 
                key="speak"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center space-y-10 py-16"
              >
                <div className="relative inline-block">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-emerald-400 rounded-full"
                  />
                  <div className="relative w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-200">
                    <Mic className="w-16 h-16 text-emerald-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-4xl font-black text-zinc-900 title-font">Grabatzen ari da...</h3>
                  <p className="text-zinc-500 mt-4 text-xl font-medium max-w-lg mx-auto">
                    Azaldu gaia ozenki. Zure ahotsa grabatzen ari gara gero entzun dezazun.
                  </p>
                </div>
                
                <div className="bg-zinc-900 p-10 rounded-[3rem] text-left max-w-2xl mx-auto border-4 border-zinc-800 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                  <h4 className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em] mb-6">Zure oharrak</h4>
                  <p className="text-zinc-300 text-xl leading-relaxed whitespace-pre-wrap font-medium italic">
                    {outline || "Ez duzu oharrik idatzi."}
                  </p>
                </div>

                <button 
                  onClick={handleFinishSpeaking}
                  disabled={loading}
                  className="px-16 py-6 bg-rose-600 text-white rounded-full font-black text-xl hover:bg-rose-700 transition-all disabled:opacity-50 flex items-center gap-3 mx-auto shadow-2xl shadow-rose-200 hover:scale-105 active:scale-95"
                >
                  {loading ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Square className="w-6 h-6 fill-current" />}
                  Grabazioa Amaitu eta Galdera
                </button>
              </motion.div>
            )}

            {phase === 'interview' && (
              <motion.div 
                key="interview"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="text-center space-y-10 py-16"
              >
                <div className="bg-amber-50 dark:bg-amber-900/20 p-10 rounded-[3rem] border-4 border-amber-200 dark:border-amber-800 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-16 -mt-16" />
                  <h4 className="text-sm font-black text-amber-600 uppercase tracking-[0.2em] mb-6">Aztertzailearen galdera</h4>
                  <p className="text-zinc-900 dark:text-zinc-100 text-3xl font-bold leading-tight title-font">
                    {interviewQuestion || "Kargatzen..."}
                  </p>
                </div>

                {!isRecording ? (
                  <button 
                    onClick={handleStartInterviewRecording}
                    className="px-16 py-6 bg-emerald-600 text-white rounded-full font-black text-xl hover:bg-emerald-700 transition-all flex items-center gap-3 mx-auto shadow-2xl shadow-emerald-200 hover:scale-105 active:scale-95"
                  >
                    <Mic className="w-6 h-6" />
                    Erantzuna Grabatu
                  </button>
                ) : (
                  <div className="space-y-6">
                    <div className="relative inline-block">
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-rose-400 rounded-full"
                      />
                      <div className="relative w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                        <Mic className="w-12 h-12 text-rose-600" />
                      </div>
                    </div>
                    <button 
                      onClick={handleGetFinalFeedback}
                      disabled={loading}
                      className="px-16 py-6 bg-rose-600 text-white rounded-full font-black text-xl hover:bg-rose-700 transition-all disabled:opacity-50 flex items-center gap-3 mx-auto shadow-2xl shadow-rose-200 hover:scale-105 active:scale-95"
                    >
                      {loading ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Square className="w-6 h-6 fill-current" />}
                      Amaitu eta Feedbacka Ikusi
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {phase === 'feedback' && (
              <motion.div 
                key="feedback"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                {/* Audio Analysis Section */}
                {audioAnalysis && (
                  <div className="bg-cyan-50 dark:bg-cyan-900/20 p-10 rounded-[3rem] border-2 border-cyan-100 dark:border-cyan-800 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-200/30 rounded-full blur-3xl -mr-32 -mt-32" />
                    
                    <div className="flex flex-col lg:flex-row gap-8 items-center relative z-10">
                      <div className="flex-1">
                        <h3 className="text-3xl font-black text-cyan-900 dark:text-cyan-100 mb-8 flex items-center gap-4 title-font">
                          <div className="w-14 h-14 bg-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-cyan-200">
                            <Volume2 className="w-8 h-8" />
                          </div>
                          Ahotsaren Azterketa (AI)
                        </h3>
                        <div className="prose prose-cyan dark:prose-invert prose-xl max-w-none text-zinc-800 dark:text-zinc-200 leading-relaxed">
                          <Markdown>{audioAnalysis}</Markdown>
                        </div>
                      </div>

                      {chartData.length > 0 && (
                        <div className="w-full lg:w-80 h-80 bg-white dark:bg-zinc-800 rounded-[2rem] p-4 shadow-xl border border-cyan-100 dark:border-cyan-900">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                              <PolarGrid stroke="#e2e8f0" />
                              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700 }} />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                              <Radar
                                name="Puntuazioa"
                                dataKey="A"
                                stroke="#0891b2"
                                fill="#0891b2"
                                fillOpacity={0.6}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* Audio Player */}
                {audioURL && (
                  <div className="bg-amber-50 p-8 rounded-[2.5rem] border-2 border-amber-100 shadow-lg">
                    <h4 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2 title-font">
                      <Volume2 className="w-6 h-6" />
                      Zure grabazioa:
                    </h4>
                    <div className="flex items-center gap-4">
                      <audio src={audioURL} controls className="flex-grow h-12" />
                      <a 
                        href={audioURL} 
                        download={`B2_Mintzamena_${topic.title}.webm`}
                        className="p-3 bg-white text-amber-600 rounded-xl border border-amber-200 hover:bg-amber-100 transition-colors shadow-sm"
                        title="Deskargatu grabazioa"
                      >
                        <Download className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                )}

                <div className="bg-violet-50 dark:bg-violet-900/20 p-10 rounded-[3rem] border-2 border-violet-100 dark:border-violet-800 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-violet-200/30 rounded-full blur-3xl -mr-32 -mt-32" />
                  
                  <h3 className="text-3xl font-black text-violet-900 dark:text-violet-100 mb-8 flex items-center gap-4 title-font relative z-10">
                    <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-violet-200">
                      <Award className="w-8 h-8" />
                    </div>
                    AI Feedback Pertsonalizatua
                  </h3>
                  <div className="prose prose-violet dark:prose-invert prose-xl max-w-none text-zinc-800 dark:text-zinc-200 leading-relaxed relative z-10">
                    <Markdown>{feedback}</Markdown>
                  </div>
                </div>

                {/* Model Answer Section */}
                {modelAnswer && (
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-10 rounded-[3rem] border-2 border-emerald-100 dark:border-emerald-800 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl -mr-32 -mt-32" />
                    
                    <h3 className="text-3xl font-black text-emerald-900 dark:text-emerald-100 mb-8 flex items-center gap-4 title-font relative z-10">
                      <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                        <Sparkles className="w-8 h-8" />
                      </div>
                      Ereduzko Erantzuna
                    </h3>
                    <div className="prose prose-emerald dark:prose-invert prose-xl max-w-none text-zinc-800 dark:text-zinc-200 leading-relaxed relative z-10">
                      <Markdown>{modelAnswer}</Markdown>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-6">
                  <button 
                    onClick={() => navigate('/topics')}
                    className="flex-1 py-6 bg-zinc-900 text-white rounded-[2rem] font-black text-xl hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 hover:scale-[1.02] active:scale-95"
                  >
                    Beste Gai Bat Aukeratu
                  </button>
                  <button 
                    onClick={() => {
                      setPhase('prep');
                      setTimeLeft(15 * 60);
                      setFeedback('');
                      setAudioURL(null);
                    }}
                    className="flex-1 py-6 border-4 border-zinc-100 text-zinc-600 rounded-[2rem] font-black text-xl hover:bg-zinc-50 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Berriro Saiatu
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

const FlashcardsPage = () => {
  const allWords = TOPICS.flatMap(t => t.vocabulary);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % allWords.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + allWords.length) % allWords.length);
    }, 150);
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-4 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-5xl font-black text-zinc-900 dark:text-white title-font">Hiztegi Flashcard-ak</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-4 text-xl font-medium">Ikasi eta gogoratu B2 mailako hitz gakoak.</p>
      </motion.div>

      <div className="relative h-96 w-full max-w-md mx-auto perspective-1000 group">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          className="w-full h-full relative preserve-3d cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white dark:bg-zinc-800 rounded-[3rem] shadow-2xl border-2 border-zinc-100 dark:border-zinc-700 flex flex-col items-center justify-center p-10">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-black text-zinc-900 dark:text-white title-font">
              {allWords[currentIndex]}
            </h3>
            <p className="mt-6 text-zinc-400 font-bold uppercase tracking-widest text-sm">Egin klik itzultzeko</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-amber-600 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-10 text-white">
            <h3 className="text-3xl font-bold mb-4">Gogoratzen duzu?</h3>
            <p className="text-xl leading-relaxed text-amber-50 font-medium">
              Erabili hitz hau zure hurrengo mintzamenean!
            </p>
            <div className="mt-8 p-4 bg-white/20 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-black">{allWords[currentIndex]}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-12 flex justify-center gap-6">
        <button 
          onClick={prevCard}
          className="p-5 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-2xl border-2 border-zinc-100 dark:border-zinc-700 hover:bg-zinc-50 transition-all shadow-lg"
        >
          <ChevronRight className="w-8 h-8 rotate-180" />
        </button>
        <button 
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-10 py-5 bg-amber-600 text-white rounded-2xl font-black text-xl hover:bg-amber-700 transition-all shadow-xl shadow-amber-200 flex items-center gap-3"
        >
          <RotateCcw className="w-6 h-6" />
          Itzuli
        </button>
        <button 
          onClick={nextCard}
          className="p-5 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-2xl border-2 border-zinc-100 dark:border-zinc-700 hover:bg-zinc-50 transition-all shadow-lg"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      <p className="mt-8 text-zinc-400 font-bold">
        {currentIndex + 1} / {allWords.length}
      </p>
    </div>
  );
};

const ResourcesPage = () => {
  const [activeConnector, setActiveConnector] = useState<string | null>(null);
  const [searchWord, setSearchWord] = useState('');
  const [synonyms, setSynonyms] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchWord.trim()) return;
    setSearching(true);
    const res = await getB2Synonyms(searchWord);
    setSynonyms(res || '');
    setSearching(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h2 className="text-5xl font-black text-zinc-900 dark:text-white tracking-tight title-font">Baliabideak</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-4 text-xl font-medium">B2 mailan arrakasta izateko lokailuak eta aholkuak.</p>
      </motion.div>

      <div className="space-y-20">
        {/* Synonym Finder Tool */}
        <section className="bg-emerald-50 dark:bg-emerald-900/20 p-10 rounded-[4rem] border-2 border-emerald-100 dark:border-emerald-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="relative z-10 max-w-3xl">
            <h3 className="text-3xl font-black text-emerald-900 dark:text-emerald-100 mb-6 flex items-center gap-4 title-font">
              <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                <Search className="w-8 h-8" />
              </div>
              Hiztegi Aberatsa (B2)
            </h3>
            <p className="text-emerald-800 dark:text-emerald-200 text-lg font-medium mb-8">
              Sartu hitz arrunt bat (adibidez: "gauza", "egin", "ondo") eta jaso B2 mailako alternatiba aberatsagoak.
            </p>
            <form onSubmit={handleSearch} className="flex gap-4">
              <input 
                type="text" 
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                placeholder="Idatzi hitz bat..."
                className="flex-1 px-8 py-5 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-emerald-100 dark:border-emerald-900 focus:border-emerald-500 outline-none font-bold text-lg shadow-inner"
              />
              <button 
                type="submit"
                disabled={searching}
                className="px-8 py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center gap-2"
              >
                {searching ? <RefreshCw className="w-6 h-6 animate-spin" /> : <TrendingUp className="w-6 h-6" />}
                Bilatu
              </button>
            </form>

            <AnimatePresence>
              {synonyms && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 p-8 bg-white dark:bg-zinc-800 rounded-[2.5rem] border-2 border-emerald-100 dark:border-emerald-900 shadow-2xl prose prose-emerald dark:prose-invert max-w-none"
                >
                  <Markdown>{synonyms}</Markdown>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center text-violet-600 shadow-lg shadow-violet-100">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-white title-font">
              Lokailu Erabilgarriak
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {CONNECTORS.map((group, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-zinc-800 p-8 rounded-[2.5rem] border-2 border-zinc-50 dark:border-zinc-700 shadow-xl shadow-zinc-100/50"
              >
                <h4 className="text-xl font-bold text-violet-700 dark:text-violet-400 mb-6 pb-4 border-b-2 border-violet-50 dark:border-violet-900/50 flex items-center gap-2">
                  <span className="w-2 h-8 bg-violet-500 rounded-full" />
                  {group.category}
                </h4>
                <ul className="space-y-4">
                  {group.phrases.map((phrase, j) => (
                    <li 
                      key={j} 
                      className={`text-zinc-700 dark:text-zinc-300 flex items-center gap-3 font-medium cursor-pointer p-2 rounded-xl transition-colors ${activeConnector === phrase ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300' : 'hover:bg-zinc-50 dark:hover:bg-zinc-700'}`}
                      onClick={() => setActiveConnector(activeConnector === phrase ? null : phrase)}
                    >
                      <div className="w-2 h-2 bg-violet-400 rounded-full shadow-lg shadow-violet-200" />
                      {phrase}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <AnimatePresence>
            {activeConnector && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 p-8 bg-violet-600 text-white rounded-[2.5rem] shadow-2xl"
              >
                <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Adibidea:
                </h4>
                <p className="text-xl italic leading-relaxed">
                  "{activeConnector}, garrantzitsua da gure ohiturak aldatzea ingurumena zaintzeko."
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      <section className="relative overflow-hidden bg-zinc-900 text-white p-12 md:p-16 rounded-[4rem] shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px] -ml-48 -mb-48" />
        
        <div className="relative z-10">
          <h3 className="text-4xl font-black mb-12 title-font">Azterketarako 5 Aholku Urrezkoak</h3>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { t: "Egitura argia", d: "Sarrera, garapena (2-3 puntu) eta ondorioa. Ez ahaztu agurtzea!", color: "bg-emerald-500" },
              { t: "Lokailuak erabili", d: "B2 mailan ezinbestekoa da ideiak ondo lotzea lokailu egokiekin.", color: "bg-violet-500" },
              { t: "Hiztegi aberatsa", d: "Saiatu hitz errazak (gauza, ondo, egin) sinonimo zehatzagoekin ordezkatzen.", color: "bg-amber-500" },
              { t: "Naturaltasuna", d: "Ez ikasi testuak buruz. Hobeto da ideiak argi izatea eta modu naturalean azaltzea.", color: "bg-rose-500" },
              { t: "Akatsak zuzendu", d: "Akats bat egiten baduzu, ez kezkatu. Zuzendu zeure burua lasaitasunez eta jarraitu.", color: "bg-cyan-500" }
            ].map((tip, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 10 }}
                className="flex gap-6 items-start"
              >
                <div className={`w-12 h-12 ${tip.color} rounded-2xl flex items-center justify-center shrink-0 font-black text-xl shadow-lg shadow-current/20`}>
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-bold text-2xl mb-2 title-font">{tip.t}</h4>
                  <p className="text-zinc-400 text-lg leading-relaxed">{tip.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </div>
);
};

// --- Main App ---

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('user_xp');
    return saved ? JSON.parse(saved) : 0;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('user_xp', JSON.stringify(xp));
  }, [xp]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleXpGain = (amount: number) => setXp(prev => prev + amount);

  return (
    <Router>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} xp={xp} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/simulator/:id" element={<SimulatorPage onXpGain={handleXpGain} />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
