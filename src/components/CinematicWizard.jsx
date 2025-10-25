import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { gsap } from "gsap";
import Confetti from "react-confetti";
import { 
  Sparkles, 
  Zap, 
  Rocket, 
  Crown, 
  Star, 
  Heart,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Home,
  RefreshCw,
  Wand2,
  Globe,
  Smartphone,
  ShoppingCart,
  Cloud,
  Target,
  Code,
  Database,
  Shield,
  CreditCard,
  BarChart3,
  Plug,
  MessageCircle,
  Bot,
  Zap as Lightning,
  Monitor
} from "lucide-react";
import useQuotationAI from "../hooks/useQuotationAI";
import QuotationDisplay from "./QuotationDisplay";
import LoadingSpinner from "./LoadingSpinner";

function CinematicWizard() {
  const { loading, quote, error, generateQuote } = useQuotationAI();
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const cursorRef = useRef(null);
  const backgroundRef = useRef(null);
  const [formData, setFormData] = useState({
    appName: '',
    projectType: '',
    techStack: [],
    features: [],
    timeline: '',
    budget: ''
  });

  const totalSteps = 6;

  // Cursor follower
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  // Background ambient animation
  useEffect(() => {
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        backgroundPosition: "200% 200%",
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true
      });
    }
  }, []);

  // Step transition sound effect (visual feedback)
  useEffect(() => {
    if (currentStep > 1) {
      // Trigger a subtle visual "ping" effect
      const ping = document.createElement('div');
      ping.className = 'fixed top-4 right-4 w-4 h-4 bg-red-500 rounded-full animate-ping pointer-events-none z-50';
      document.body.appendChild(ping);
      setTimeout(() => document.body.removeChild(ping), 1000);
    }
  }, [currentStep]);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 100, scale: 0.95 },
    in: { opacity: 1, x: 0, scale: 1 },
    out: { opacity: 0, x: -100, scale: 1.05 }
  };

  const pageTransition = {
    type: "tween",
    ease: [0.25, 0.46, 0.45, 0.94],
    duration: 0.6
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(255, 71, 66, 0.25)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const projectTypes = [
    { 
      id: 'website', 
      name: 'Website', 
      icon: Globe, 
      desc: 'Static or dynamic websites', 
      gradient: 'from-blue-500 to-cyan-500',
      glow: 'shadow-blue-500/25'
    },
    { 
      id: 'webapp', 
      name: 'Web App', 
      icon: Monitor, 
      desc: 'Interactive applications', 
      gradient: 'from-purple-500 to-pink-500',
      glow: 'shadow-purple-500/25'
    },
    { 
      id: 'mobile', 
      name: 'Mobile App', 
      icon: Smartphone, 
      desc: 'iOS/Android apps', 
      gradient: 'from-green-500 to-emerald-500',
      glow: 'shadow-green-500/25'
    },
    { 
      id: 'ecommerce', 
      name: 'E-commerce', 
      icon: ShoppingCart, 
      desc: 'Online stores', 
      gradient: 'from-orange-500 to-red-500',
      glow: 'shadow-orange-500/25'
    },
    { 
      id: 'saas', 
      name: 'SaaS Platform', 
      icon: Cloud, 
      desc: 'Software as a Service', 
      gradient: 'from-indigo-500 to-purple-500',
      glow: 'shadow-indigo-500/25'
    },
    { 
      id: 'custom', 
      name: 'Custom', 
      icon: Target, 
      desc: 'Something unique', 
      gradient: 'from-pink-500 to-rose-500',
      glow: 'shadow-pink-500/25'
    }
  ];

  const techStacks = [
    { name: 'React', icon: Code, color: 'bg-blue-100 text-blue-700 border-blue-200', glow: 'hover:shadow-blue-500/20' },
    { name: 'Next.js', icon: Zap, color: 'bg-gray-100 text-gray-700 border-gray-200', glow: 'hover:shadow-gray-500/20' },
    { name: 'Vue.js', icon: Star, color: 'bg-green-100 text-green-700 border-green-200', glow: 'hover:shadow-green-500/20' },
    { name: 'Angular', icon: Crown, color: 'bg-red-100 text-red-700 border-red-200', glow: 'hover:shadow-red-500/20' },
    { name: 'Node.js', icon: Database, color: 'bg-green-100 text-green-700 border-green-200', glow: 'hover:shadow-green-500/20' },
    { name: 'Python', icon: Code, color: 'bg-yellow-100 text-yellow-700 border-yellow-200', glow: 'hover:shadow-yellow-500/20' },
    { name: 'Tailwind', icon: Sparkles, color: 'bg-cyan-100 text-cyan-700 border-cyan-200', glow: 'hover:shadow-cyan-500/20' },
    { name: 'Firebase', icon: Rocket, color: 'bg-orange-100 text-orange-700 border-orange-200', glow: 'hover:shadow-orange-500/20' }
  ];

  const commonFeatures = [
    { name: 'Login System', icon: Shield, desc: 'User authentication & management' },
    { name: 'Payment Gateway', icon: CreditCard, desc: 'Secure payment processing' },
    { name: 'Admin Dashboard', icon: BarChart3, desc: 'Management interface' },
    { name: 'API Integration', icon: Plug, desc: 'Third-party services' },
    { name: 'Chat Support', icon: MessageCircle, desc: 'Customer communication' },
    { name: 'AI Integration', icon: Bot, desc: 'Artificial intelligence features' },
    { name: 'Real-time Updates', icon: Lightning, desc: 'Live data synchronization' },
    { name: 'Mobile Responsive', icon: Smartphone, desc: 'Works on all devices' }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item) 
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    
    // Screen flash effect
    const flash = document.createElement('div');
    flash.className = 'fixed inset-0 bg-white pointer-events-none z-50';
    flash.style.opacity = '0';
    document.body.appendChild(flash);
    
    gsap.to(flash, {
      opacity: 0.8,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => document.body.removeChild(flash)
    });

    const requirement = `
App Name: ${formData.appName}
Project Type: ${formData.projectType}
Technology Stack: ${formData.techStack.join(', ')}
Key Features: ${formData.features.join(', ')}
Timeline: ${formData.timeline}
Budget Range: ${formData.budget}
    `.trim();

    await generateQuote(requirement);
    
    // Trigger confetti and move to results
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    setCurrentStep(totalSteps + 1);
    setIsGenerating(false);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.appName.length > 0;
      case 2: return formData.projectType.length > 0;
      case 3: return formData.techStack.length > 0;
      case 4: return formData.features.length > 0;
      case 5: return formData.timeline && formData.budget;
      case 6: return true;
      default: return false;
    }
  };

  // Results page
  if (currentStep === totalSteps + 1) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button 
              onClick={() => {setCurrentStep(1); setFormData({appName: '', projectType: '', techStack: [], features: [], timeline: '', budget: ''});}}
              className="inline-flex items-center px-6 py-3 text-red-600 hover:text-red-800 transition-colors font-medium hover-lift rounded-xl bg-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2 material-symbols-outlined">refresh</span>
              Create New Quote
            </motion.button>
            
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl overflow-hidden bg-gradient-primary p-1">
                <img src="/logo.png" alt="QuotationAI" className="w-full h-full object-contain filter brightness-0 invert" />
              </div>
              <span className="font-display font-bold text-gray-800 text-xl">QuotationAI</span>
            </div>
            
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium hover-lift rounded-xl bg-white shadow-lg"
            >
              <span className="mr-2 material-symbols-outlined">home</span>
              Back to Home
            </Link>
          </motion.div>

          {error && (
            <motion.div 
              className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="flex items-center">
                <span className="text-red-500 mr-3 text-2xl">⚠️</span>
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </motion.div>
          )}

          {loading && <LoadingSpinner />}
          {!loading && <QuotationDisplay quote={quote} />}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 font-body overflow-hidden relative">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={['#FF4742', '#FF6B68', '#E63946', '#7E57C2', '#42A5F5']}
        />
      )}

      {/* Cursor follower */}
      <motion.div
        ref={cursorRef}
        className="fixed w-8 h-8 bg-red-500/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      />

      {/* Ambient background */}
      <div 
        ref={backgroundRef}
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(255, 71, 66, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(126, 87, 194, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(66, 165, 245, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '100% 100%'
        }}
      />

      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              background: `linear-gradient(45deg, #FF4742, #7E57C2)`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * -200 - 100],
              scale: [1, Math.random() * 1.5 + 0.5, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 text-red-600 hover:text-red-800 transition-colors font-medium hover-lift rounded-xl bg-white/80 backdrop-blur-sm shadow-lg"
          >
            <span className="mr-2 material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
          
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-4 mb-3">
              <motion.div 
                className="size-12 rounded-xl overflow-hidden bg-gradient-primary p-1 shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <img src="/logo.png" alt="QuotationAI" className="w-full h-full object-contain filter brightness-0 invert" />
              </motion.div>
              <h1 className="text-4xl font-bold text-gray-800 font-display">QuotationAI</h1>
            </div>
            <p className="text-gray-600 font-body">Cinematic quotation experience</p>
          </div>
          
          <div className="w-32"></div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="max-w-2xl mx-auto mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600 font-body">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-gray-600 font-body">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
            <motion.div 
              className="bg-gradient-primary h-2 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={pageTransition}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20"
            >
              {/* Step 1: App Name */}
              {currentStep === 1 && (
                <motion.div 
                  className="p-12 text-center min-h-[500px] flex flex-col justify-center"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 font-display mb-4">
                      Welcome to QuotationAI ✨
                    </h2>
                    <p className="text-xl text-gray-600 font-body">
                      Let's create something amazing together
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="mb-8">
                    <TypeAnimation
                      sequence={[
                        'What kind of app or project is this quotation for?',
                        1000,
                      ]}
                      wrapper="h3"
                      speed={50}
                      className="text-2xl font-semibold text-gray-700 font-display"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="max-w-md mx-auto">
                    <div className="relative">
                      <motion.input
                        type="text"
                        placeholder="Enter your project name..."
                        value={formData.appName}
                        onChange={(e) => updateFormData('appName', e.target.value)}
                        className="w-full p-6 text-xl border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all font-body bg-white/50 backdrop-blur-sm"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-purple-500/20 -z-10"
                        animate={{
                          opacity: formData.appName ? 1 : 0,
                          scale: formData.appName ? 1 : 0.95
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: Project Type */}
              {currentStep === 2 && (
                <motion.div 
                  className="p-12 min-h-[500px]"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 font-display mb-4">
                      What type of project are you working on?
                    </h2>
                    <p className="text-lg text-gray-600 font-body">
                      Choose the category that best fits your vision
                    </p>
                  </motion.div>

                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                  >
                    {projectTypes.map((type, index) => {
                      const IconComponent = type.icon;
                      return (
                        <motion.button
                          key={type.id}
                          variants={cardVariants}
                          whileHover="hover"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateFormData('projectType', type.id)}
                          className={`p-8 rounded-2xl border-2 transition-all text-left relative overflow-hidden backdrop-blur-sm ${
                            formData.projectType === type.id
                              ? `border-red-500 bg-red-50/80 shadow-2xl ${type.glow}`
                              : 'border-gray-200/50 bg-white/60 hover:border-red-300 hover:bg-white/80'
                          }`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 transition-all duration-500 ${
                            formData.projectType === type.id ? 'opacity-20' : 'hover:opacity-5'
                          }`} />
                          
                          {/* Glow effect */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 blur-xl`}
                            animate={{
                              opacity: formData.projectType === type.id ? 0.3 : 0,
                            }}
                            transition={{ duration: 0.5 }}
                          />
                          
                          <div className="relative z-10">
                            <motion.div 
                              className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/50 backdrop-blur-sm"
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            >
                              <IconComponent 
                                size={32} 
                                className={`${formData.projectType === type.id ? 'text-red-600' : 'text-gray-600'} transition-colors`}
                              />
                            </motion.div>
                            <h3 className="font-bold text-gray-800 mb-3 font-display text-lg">{type.name}</h3>
                            <p className="text-sm text-gray-600 font-body leading-relaxed">{type.desc}</p>
                            
                            {/* Selection indicator */}
                            <motion.div
                              className="absolute top-4 right-4"
                              animate={{
                                scale: formData.projectType === type.id ? 1 : 0,
                                rotate: formData.projectType === type.id ? 0 : 180,
                              }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              <CheckCircle2 size={24} className="text-red-500" />
                            </motion.div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3: Tech Stack */}
              {currentStep === 3 && (
                <motion.div 
                  className="p-12 min-h-[500px]"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 font-display mb-4">
                      Choose your tech stack
                    </h2>
                    <p className="text-lg text-gray-600 font-body">
                      Select the technologies you'd like to use (multiple selection)
                    </p>
                  </motion.div>

                  <motion.div 
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    variants={containerVariants}
                  >
                    {techStacks.map((tech, index) => {
                      const IconComponent = tech.icon;
                      return (
                        <motion.button
                          key={tech.name}
                          variants={itemVariants}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleArrayItem('techStack', tech.name)}
                          className={`p-6 rounded-xl border-2 transition-all font-medium backdrop-blur-sm relative overflow-hidden ${
                            formData.techStack.includes(tech.name)
                              ? `border-red-500 bg-red-50/80 shadow-2xl ${tech.glow} scale-105`
                              : `border-gray-200/50 ${tech.color} hover:border-red-300 bg-white/60`
                          }`}
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          {/* Pulse effect for selected items */}
                          <motion.div
                            className="absolute inset-0 bg-red-500/10 rounded-xl"
                            animate={{
                              scale: formData.techStack.includes(tech.name) ? [1, 1.05, 1] : 1,
                              opacity: formData.techStack.includes(tech.name) ? [0.5, 0.8, 0.5] : 0,
                            }}
                            transition={{
                              duration: 2,
                              repeat: formData.techStack.includes(tech.name) ? Infinity : 0,
                              ease: "easeInOut"
                            }}
                          />
                          
                          <div className="relative z-10 flex flex-col items-center">
                            <motion.div
                              className="mb-3 p-2 rounded-lg bg-white/50"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <IconComponent 
                                size={24} 
                                className={`${formData.techStack.includes(tech.name) ? 'text-red-600' : 'text-gray-600'} transition-colors`}
                              />
                            </motion.div>
                            <div className="text-sm font-body font-semibold">{tech.name}</div>
                            
                            {/* Selection indicator */}
                            <motion.div
                              className="absolute -top-1 -right-1"
                              animate={{
                                scale: formData.techStack.includes(tech.name) ? 1 : 0,
                                rotate: formData.techStack.includes(tech.name) ? 0 : 180,
                              }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                <CheckCircle2 size={16} className="text-white" />
                              </div>
                            </motion.div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </motion.div>
              )}

              {/* Step 4: Features */}
              {currentStep === 4 && (
                <motion.div 
                  className="p-12 min-h-[500px]"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 font-display mb-4">
                      Select key features
                    </h2>
                    <p className="text-lg text-gray-600 font-body">
                      What functionality does your project need?
                    </p>
                  </motion.div>

                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    variants={containerVariants}
                  >
                    {commonFeatures.map((feature, index) => {
                      const IconComponent = feature.icon;
                      return (
                        <motion.button
                          key={feature.name}
                          variants={itemVariants}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleArrayItem('features', feature.name)}
                          className={`p-6 rounded-xl border-2 transition-all text-left backdrop-blur-sm relative overflow-hidden ${
                            formData.features.includes(feature.name)
                              ? 'border-red-500 bg-red-50/80 shadow-2xl'
                              : 'border-gray-200/50 bg-white/60 hover:border-red-300 hover:bg-white/80'
                          }`}
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          {/* Glow effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 opacity-0"
                            animate={{
                              opacity: formData.features.includes(feature.name) ? 1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          <div className="flex items-center relative z-10">
                            <motion.div
                              className="mr-4 p-3 rounded-xl bg-white/50 backdrop-blur-sm"
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            >
                              <IconComponent 
                                size={24} 
                                className={`${formData.features.includes(feature.name) ? 'text-red-600' : 'text-gray-600'} transition-colors`}
                              />
                            </motion.div>
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-800 font-display mb-1">{feature.name}</h3>
                              <p className="text-sm text-gray-600 font-body">{feature.desc}</p>
                            </div>
                            <motion.div
                              className="ml-4"
                              animate={{
                                scale: formData.features.includes(feature.name) ? [1, 1.2, 1] : 1,
                              }}
                              transition={{
                                duration: 0.5,
                                repeat: formData.features.includes(feature.name) ? Infinity : 0,
                                repeatDelay: 2,
                              }}
                            >
                              {formData.features.includes(feature.name) ? (
                                <CheckCircle2 size={24} className="text-red-500" />
                              ) : (
                                <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                              )}
                            </motion.div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </motion.div>
              )}

              {/* Step 5: Timeline & Budget */}
              {currentStep === 5 && (
                <motion.div 
                  className="p-12 min-h-[500px]"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 font-display mb-4">
                      Timeline & Budget
                    </h2>
                    <p className="text-lg text-gray-600 font-body">
                      Help us understand your project constraints
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    <motion.div variants={itemVariants}>
                      <label className="block text-lg font-semibold text-gray-700 mb-4 font-display">
                        Preferred Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => updateFormData('timeline', e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all font-body bg-white"
                      >
                        <option value="">Select timeline...</option>
                        <option value="1-2 weeks">1-2 weeks (Rush)</option>
                        <option value="3-4 weeks">3-4 weeks (Fast)</option>
                        <option value="1-2 months">1-2 months (Standard)</option>
                        <option value="2-3 months">2-3 months (Complex)</option>
                        <option value="3+ months">3+ months (Large scale)</option>
                      </select>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-lg font-semibold text-gray-700 mb-4 font-display">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => updateFormData('budget', e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all font-body bg-white"
                      >
                        <option value="">Select budget...</option>
                        <option value="Under ₹50,000">Under ₹50,000</option>
                        <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                        <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                        <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000</option>
                        <option value="Above ₹5,00,000">Above ₹5,00,000</option>
                      </select>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 6: Summary */}
              {currentStep === 6 && (
                <motion.div 
                  className="p-12 min-h-[500px] text-center"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 font-display mb-6">
                      Perfect! Let's generate your quotation ✨
                    </h2>
                  </motion.div>

                  <motion.div variants={itemVariants} className="bg-gray-50 rounded-2xl p-8 mb-8 text-left max-w-2xl mx-auto">
                    <TypeAnimation
                      sequence={[
                        `You're building a ${formData.projectType} called "${formData.appName}" using ${formData.techStack.slice(0, 3).join(', ')} with features like ${formData.features.slice(0, 3).join(', ')}. Timeline: ${formData.timeline}. Budget: ${formData.budget}. Let's create your professional quotation! 💼`,
                        1000,
                      ]}
                      wrapper="p"
                      speed={70}
                      className="text-lg text-gray-700 font-body leading-relaxed"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <motion.button
                      onClick={handleSubmit}
                      disabled={isGenerating}
                      className="px-12 py-6 bg-gradient-primary text-white rounded-2xl font-bold text-xl shadow-2xl relative overflow-hidden disabled:opacity-70"
                      whileHover={{ scale: isGenerating ? 1 : 1.05 }}
                      whileTap={{ scale: isGenerating ? 1 : 0.95 }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-500 blur-xl opacity-50"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      <span className="relative z-10 flex items-center">
                        <motion.div
                          animate={{ rotate: isGenerating ? 360 : 0 }}
                          transition={{ duration: 1, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
                        >
                          {isGenerating ? (
                            <RefreshCw size={24} className="mr-3" />
                          ) : (
                            <Wand2 size={24} className="mr-3" />
                          )}
                        </motion.div>
                        {isGenerating ? 'Generating Magic...' : 'Generate Quotation'}
                        <Sparkles size={20} className="ml-3" />
                      </span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="bg-gray-50/80 backdrop-blur-sm px-8 py-6 flex justify-between items-center border-t border-gray-200/50">
                <motion.button
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="inline-flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium rounded-xl hover:bg-white/50 backdrop-blur-sm"
                  whileHover={{ scale: currentStep === 1 ? 1 : 1.05, x: currentStep === 1 ? 0 : -2 }}
                  whileTap={{ scale: currentStep === 1 ? 1 : 0.95 }}
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Previous
                </motion.button>
                
                <div className="flex space-x-3">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <motion.div
                      key={i}
                      className={`relative rounded-full transition-all duration-500 ${
                        i + 1 <= currentStep ? 'bg-red-500' : 'bg-gray-300'
                      }`}
                      animate={{
                        width: i + 1 === currentStep ? 32 : 12,
                        height: 12,
                        opacity: i + 1 <= currentStep ? 1 : 0.5
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      {/* Pulse effect for current step */}
                      {i + 1 === currentStep && (
                        <motion.div
                          className="absolute inset-0 bg-red-500 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
                
                {currentStep < totalSteps ? (
                  <motion.button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="inline-flex items-center px-6 py-3 bg-gradient-primary text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg backdrop-blur-sm"
                    whileHover={{ 
                      scale: isStepValid() ? 1.05 : 1, 
                      x: isStepValid() ? 2 : 0,
                      boxShadow: isStepValid() ? "0 10px 25px rgba(255, 71, 66, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }}
                    whileTap={{ scale: isStepValid() ? 0.95 : 1 }}
                  >
                    Next
                    <ArrowRight size={20} className="ml-2" />
                  </motion.button>
                ) : (
                  <div className="w-24"></div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default CinematicWizard;