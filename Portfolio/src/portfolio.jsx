import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ChevronRight, Calendar, MapPin, Smartphone, Palette, Settings, Database, Rocket, Code2, FileText, Lightbulb, Target, Zap, Download, X } from 'lucide-react';
import * as THREE from 'three';

import dockerLogo from "./assets/logos/docker.png";
import vscodeLogo from "./assets/logos/vscode.png";
import figmaLogo from "./assets/logos/figma.png";
import githubLogo from "./assets/logos/github.png";
import androidLogo from "./assets/logos/android.png";
import dbeaverLogo from "./assets/logos/dbeaver.png";
import trelloLogo from "./assets/logos/trello.png";
import godotLogo from "./assets/logos/godot.png";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const canvasRef = useRef(null);
  const logoCanvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0.2, y: 0 });
  const [previousMouse, setPreviousMouse] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Gestion du scroll pour la barre de progression
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);

      // Détection de la section active
      const sections = ['projets', 'competences', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three.js - Logo icosaèdre animé
  useEffect(() => {
    if (!logoCanvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: logoCanvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(80, 80);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 2;

    const icoGeometry = new THREE.IcosahedronGeometry(0.6, 1);
    const icoEdges = new THREE.EdgesGeometry(icoGeometry);
    const icoLine = new THREE.LineSegments(
      icoEdges,
      new THREE.LineBasicMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0.9
      })
    );
    scene.add(icoLine);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(90);
    for (let i = 0; i < 90; i++) {
      particlePositions[i] = (Math.random() - 0.5) * 2;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.03,
      transparent: true,
      opacity: 0.7
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const animate = () => {
      requestAnimationFrame(animate);
      icoLine.rotation.x += 0.008;
      icoLine.rotation.y += 0.012;
      particles.rotation.y += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  // Three.js - Background canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Particules de fond
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Géométrie principale
    const geometry = new THREE.TorusGeometry(2, 0.6, 16, 100);
    const material = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    const animate = () => {
      requestAnimationFrame(animate);

      torus.rotation.x = rotation.x;
      torus.rotation.y = rotation.y;
      torus.rotation.z += 0.002;

      particles.rotation.x -= 0.0005;
      particles.rotation.y -= 0.0003;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [rotation]);

  const projets = [
    {
      id: 1,
      titre: "Application Mobile Siraj",
      type: "Développement Mobile",
      annee: "2024",
      tech: ["Android Studio", "Java", "Gradle", "JSON", "XML"],
      description: "Application Android native dédiée à la lecture, la méditation et l'apprentissage avec une IA intégrée.",
      contexte: "Projet personnel - Développement mobile natif",
      details: "Développement complet d'une application mobile native Android avec Android Studio. Architecture MVVM, gestion du cycle de vie Android, stockage local avec fichiers JSON et interface Material Design.",
      competences: ["Architecture Android", "Java", "JSON", "Material Design", "Optimisation performance"],
      impact: "Application native performante avec mode offline complet",
      github: "https://github.com/Camss213/SirajApp"
    },
    {
      id: 2,
      titre: "Plateforme de Facturation - Garage Automobile",
      type: "Développement Web",
      annee: "2024",
      tech: ["HTML5", "CSS3", "JavaScript"],
      description: "Site web de génération automatique de factures pour un garage automobile avec interface responsive.",
      contexte: "Projet client professionnel",
      details: "Développement web front-end en JavaScript. Système de calcul dynamique des factures, validation des formulaires côté client, génération de PDF pour impression.",
      competences: ["JavaScript", "Responsive Design", "UX/UI"],
      impact: "Automatisation complète du processus de génération de facture, gain de temps de 90%",
      github: "https://github.com/Camss213/Routedupneu",
      site: "https://routedupneu.netlify.app/"
    },
    {
      id: 3,
      titre: "CTVR - Gestion Transport Urbain",
      type: "Application Full-Stack",
      annee: "2024",
      tech: ["Angular", "Spring Boot", "PostgreSQL", "JWT", "TypeScript"],
      description: "Système de gestion des accidents et incidents pour la Compagnie de Transport de la Vallée du Rhône.",
      contexte: "Projet tutoré académique",
      details: "Application enterprise avec architecture moderne : frontend Angular avec TypeScript et RxJS, backend Spring Boot avec API RESTful, base de données PostgreSQL. Authentification JWT, gestion des rôles.",
      competences: ["Architecture MVC", "API REST", "Sécurité JWT", "Base de données relationnelle", "Tests"],
      impact: "Traçabilité complète des incidents, reporting automatisé et analyse statistique",
      github: "https://github.com/Camss213/CTVR.git"
    },
    {
      id: 4,
      titre: "TurismoOne - Location de Véhicules",
      type: "E-Commerce",
      annee: "2023-2024",
      tech: ["Symfony", "PHP", "Doctrine ORM", "RailwayDB", "Twig"],
      description: "Plateforme de réservation en ligne pour location de voitures entre particuliers.",
      contexte: "Projet personnel - Framework PHP",
      details: "Développement avec le framework Symfony suivant l'architecture MVC. Utilisation de Doctrine ORM pour la gestion de la base de données RailwayDB, templates Twig pour le rendu.",
      competences: ["Framework Symfony", "ORM Doctrine", "MVC Pattern", "Gestion de projet"],
      impact: "Plateforme complète avec réservations en ligne et gestion automatisée",
      github: "https://github.com/Camss213/turismoone"
    },
    {
      id: 5,
      titre: "E-Commerce Les Inspirations d'Oumy",
      type: "Développement Web",
      annee: "2024",
      tech: ["PHP", "Docker", "PostgreSQL", "Nginx", "Docker Compose"],
      description: "Boutique en ligne pour une commerçante spécialisée dans les produits faits main.",
      contexte: "Projet client professionnel",
      details: "Site e-commerce développé en PHP avec architecture containerisée. Configuration Docker multi-conteneurs : Nginx comme reverse proxy, PHP-FPM pour l'exécution et PostgreSQL pour la base de données.",
      competences: ["Architecture Docker", "DevOps", "Multi-conteneurs", "Configuration serveur"],
      impact: "Architecture moderne et scalable, déploiement simplifié",
      github: "https://github.com/Camss213/LesInspirationd-Oumy"
    },
    {
      id: 6,
      titre: "Architecture Client-Serveur avec VM",
      type: "Systèmes Distribués",
      annee: "2023",
      tech: ["Oracle Virtual Box", "Bash", "Sockets TCP/IP"],
      description: "Implémentation d'une architecture client-serveur avec gestion de machines virtuelles.",
      contexte: "Projet académique - Programmation système",
      details: "Application développée avec Visual Studio et le framework .NET. Interface graphique WPF, implémentation de protocoles réseau avec sockets TCP/IP, gestion du multi-threading.",
      competences: ["Framework .NET", "Programmation réseau", "Multi-threading", "Interface WPF"],
      impact: "Communication client-serveur stable avec gestion multi-clients"
    },
    {
      id: 7,
      titre: "Intermarché - Gestion Logistique",
      type: "Application Professionnelle",
      annee: "En cours",
      tech: ["Vue.js", "Node.js + Express", "Three.js", "PostgreSQL", "Docker"],
      description: "Application web pour la gestion et optimisation des préparations de commandes en base logistique.",
      contexte: "Projet académique professionnel - Système logistique",
      details: "Application web temps réel avec stack moderne. Frontend Vue.js avec Composition API, backend Node.js avec Express, WebSockets pour les mises à jour en temps réel.",
      competences: ["Vue.js Composition API", "API REST", "WebSocket", "Architecture temps réel", "Optimisation"],
      impact: "Optimisation de 48% du processus de préparation, réduction des erreurs",
      github: "#"
    }
  ];

  const logiciels = [
    { name: "Android Studio", logo: androidLogo },
    { name: "VS Code", logo: vscodeLogo },
    { name: "Godot", logo: godotLogo },
    { name: "Docker", logo: dockerLogo },
    { name: "GitHub", logo: githubLogo },
    { name: "Figma", logo: figmaLogo },
    { name: "DBeaver", logo: dbeaverLogo },
    { name: "Trello", logo: trelloLogo }
  ];

  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-700 ease-in-out">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * { 
          font-family: 'Inter', sans-serif; 
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        canvas { 
          filter: blur(0px); 
          opacity: 0.8; 
        }
        
        @keyframes slideUp { 
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          } 
          to { 
            opacity: 1; 
            transform: translateY(0); 
          } 
        }
        
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        
        @keyframes slideInLeft { 
          from { 
            opacity: 0; 
            transform: translateX(-30px); 
          } 
          to { 
            opacity: 1; 
            transform: translateX(0); 
          } 
        }
        
        @keyframes scaleIn { 
          from { 
            opacity: 0; 
            transform: scale(0.95); 
          } 
          to { 
            opacity: 1; 
            transform: scale(1); 
          } 
        }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .glassmorphism { 
          background: rgba(255, 255, 255, 0.75); 
          backdrop-filter: blur(12px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.4); 
        }
        
        .gradient-text { 
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); 
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
        }
        
        .card-hover { 
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
        }
        
        .card-hover:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.15);
        }
        
        .glow-effect { 
          box-shadow: 0 0 30px rgba(37, 99, 235, 0.2); 
        }
        
        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #2563eb, #7c3aed);
          transition: width 0.1s ease-out;
          z-index: 9999;
        }
        
        .section-indicator {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 40;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .section-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.2);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .section-dot.active {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          transform: scale(1.3);
        }
        
        .section-dot:hover {
          background: rgba(37, 99, 235, 0.5);
          transform: scale(1.2);
        }
        
        @media (max-width: 768px) {
          .section-indicator {
            display: none;
          }
        }
        
        .modal-overlay {
          backdrop-filter: blur(8px);
        }
        
        .scroll-reveal {
          opacity: 0;
          animation: fadeUp 0.6s ease-out forwards;
        }
        
        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
          z-index: 60;
        }
        
        .hamburger span {
          width: 24px;
          height: 2px;
          background: #2563eb;
          transition: all 0.3s ease;
          border-radius: 2px;
        }
        
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 100%;
          max-width: 300px;
          height: 100vh;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          transition: right 0.3s ease;
          z-index: 55;
          padding: 6rem 2rem 2rem;
          box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
        }
        
        .mobile-menu.open {
          right: 0;
        }
        
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(2px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 54;
        }
        
        .mobile-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }
        
        @media (max-width: 768px) {
          h2 {
            font-size: 2.5rem !important;
          }
          
          .hero-title {
            font-size: 3rem !important;
          }
        }
      `}</style>

      {/* Barre de progression */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Indicateurs de section */}
      <div className="section-indicator">
        <div
          className={`section-dot ${activeSection === '' ? 'active' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Accueil"
        />
        <div
          className={`section-dot ${activeSection === 'projets' ? 'active' : ''}`}
          onClick={() => scrollToSection('projets')}
          title="Projets"
        />
        <div
          className={`section-dot ${activeSection === 'competences' ? 'active' : ''}`}
          onClick={() => scrollToSection('competences')}
          title="Compétences"
        />
        <div
          className={`section-dot ${activeSection === 'contact' ? 'active' : ''}`}
          onClick={() => scrollToSection('contact')}
          title="Contact"
        />
      </div>

      {/* Canvas de fond */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-auto z-0 cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => {
          setIsDragging(true);
          setPreviousMouse({ x: e.clientX, y: e.clientY });
        }}
        onMouseMove={(e) => {
          if (!isDragging) return;
          const deltaX = e.clientX - previousMouse.x;
          const deltaY = e.clientY - previousMouse.y;
          setRotation(prev => ({
            x: prev.x - deltaY * 0.005,
            y: prev.y + deltaX * 0.005
          }));
          setPreviousMouse({ x: e.clientX, y: e.clientY });
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      />

      <div className="relative z-10">
        {/* Header */}
        <header
          className="fixed top-0 w-full glassmorphism z-50 shadow-sm"
          style={{ animation: 'fadeIn 0.6s ease-out' }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <canvas ref={logoCanvasRef} className="w-16 h-16 md:w-20 md:h-20" />
              <div>
                <h1 className="text-lg md:text-xl font-bold gradient-text">Camelia Difi</h1>
                <p className="text-xs text-gray-500">Développeuse Full-Stack</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8 text-sm font-medium">
              <a
                href="#projets"
                className={`hover:text-blue-600 transition-colors relative ${activeSection === 'projets' ? 'text-blue-600' : ''}`}
              >
                Projets
                {activeSection === 'projets' && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600" />
                )}
              </a>
              <a
                href="#competences"
                className={`hover:text-blue-600 transition-colors relative ${activeSection === 'competences' ? 'text-blue-600' : ''}`}
              >
                Compétences
                {activeSection === 'competences' && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600" />
                )}
              </a>
              <a
                href="#contact"
                className={`hover:text-blue-600 transition-colors relative ${activeSection === 'contact' ? 'text-blue-600' : ''}`}
              >
                Contact
                {activeSection === 'contact' && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600" />
                )}
              </a>
            </nav>

            {/* Mobile Hamburger */}
            <div
              className={`hamburger md:hidden ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <div
          className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <nav className="flex flex-col gap-6">
            <a
              href="#projets"
              className={`text-lg font-medium hover:text-blue-600 transition-colors pb-3 border-b border-gray-200 ${activeSection === 'projets' ? 'text-blue-600' : 'text-gray-900'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Projets
            </a>
            <a
              href="#competences"
              className={`text-lg font-medium hover:text-blue-600 transition-colors pb-3 border-b border-gray-200 ${activeSection === 'competences' ? 'text-blue-600' : 'text-gray-900'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Compétences
            </a>
            <a
              href="#contact"
              className={`text-lg font-medium hover:text-blue-600 transition-colors pb-3 border-b border-gray-200 ${activeSection === 'contact' ? 'text-blue-600' : 'text-gray-900'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <a
                href="/CV_Camelia_Difi.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Download size={18} />
                Télécharger CV
              </a>
            </div>
          </nav>
        </div>

        {/* Section Hero */}
        <section className="pt-32 pb-20 px-6 min-h-screen flex items-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-purple-200/20 to-blue-200/20 rounded-full blur-3xl" />

          <div className="max-w-6xl mx-auto w-full relative z-10">
            <div className="max-w-4xl" style={{ animation: 'slideInLeft 0.8s ease-out' }}>
              {/* Badge disponibilité */}
              <div className="inline-flex items-center gap-2 mb-8 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-full text-blue-600 font-medium text-xs md:text-sm border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <Rocket size={16} className="animate-pulse" />
                <span>Disponible pour nouvelles opportunités</span>
              </div>

              {/* Titre principal */}
              <h2 className="hero-title text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Développeuse <span className="gradient-text">Full-Stack</span>
                <br />& Mobile
              </h2>

              {/* Description */}
              <p className="text-base md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
                Spécialisée en développement web et mobile avec une expertise en architecture full-stack,
                du développement Android natif aux applications web modernes.
              </p>

              {/* Badges info */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10">
                <div className="group flex items-center gap-3 text-gray-700 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <span className="font-medium">Valence, France</span>
                </div>

                <div className="group flex items-center gap-3 text-gray-700 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar size={18} className="text-white" />
                  </div>
                  <span className="font-medium text-xs sm:text-sm lg:text-base">Disponible pour Master / École d'Ingénieur</span>
                </div>
              </div>

              {/* Boutons CTA */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <a
                  href="#contact"
                  className="group px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold glow-effect flex items-center justify-center gap-3 text-sm md:text-base relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Mail size={20} className="relative z-10 group-hover:rotate-12 transition-transform" />
                  <span className="relative z-10">Me contacter</span>
                </a>

                <a
                  href="/CV_Camelia_Difi.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="group px-8 md:px-10 py-4 md:py-5 bg-white/90 backdrop-blur-sm text-gray-800 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-gray-300 text-sm md:text-base"
                >
                  <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                  <span>Télécharger CV</span>
                </a>
              </div>

              {/* Stats ou highlights */}
              <div className="mt-16 pt-8 border-t border-gray-200/50">
                <div className="grid grid-cols-3 gap-6 max-w-2xl">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">7+</div>
                    <div className="text-xs md:text-sm text-gray-600">Projets réalisés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">10+</div>
                    <div className="text-xs md:text-sm text-gray-600">Technologies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">2024</div>
                    <div className="text-xs md:text-sm text-gray-600">En formation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Projets */}
        <section id="projets" className="scroll-mt-32 py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Projets <span className="gradient-text">Réalisés</span>
              </h3>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                Une sélection de mes réalisations en développement web et mobile
              </p>
            </div>

            <div className="space-y-6">
              {projets.map((projet, index) => (
                <div
                  key={projet.id}
                  onClick={() => setSelectedProject(projet)}
                  className="glassmorphism rounded-2xl p-6 md:p-8 card-hover cursor-pointer group relative overflow-hidden border border-gray-200"
                  style={{
                    animation: `slideUp 0.5s ease-out ${index * 0.1}s forwards`,
                    opacity: 0,
                    animationFillMode: 'forwards'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex flex-col gap-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3 flex-wrap">
                        <h4 className="text-xl md:text-2xl font-semibold text-gray-900 group-hover:gradient-text transition-all duration-300 flex-1">
                          {projet.titre}
                        </h4>
                        <span className="px-3 md:px-4 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-xs font-semibold shadow-sm border border-blue-100">
                          {projet.type}
                        </span>
                      </div>

                      <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
                        {projet.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {projet.tech.map(tech => (
                          <span
                            key={tech}
                            className="px-2 md:px-3 py-1 md:py-1.5 bg-white/80 text-gray-700 rounded-lg text-xs md:text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 shadow-sm border border-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-200">
                      <div className="text-left">
                        <p className="text-xs md:text-sm text-gray-500 mb-1">{projet.contexte}</p>
                        <p className="text-xs md:text-sm font-semibold text-gray-900">{projet.annee}</p>
                      </div>
                      <ChevronRight
                        className="text-blue-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300 flex-shrink-0"
                        size={24}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Compétences */}
        <section id="competences" className="scroll-mt-32 py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50" />

          <div className="max-w-6xl mx-auto relative">
            <div className="mb-16 text-center">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Compétences <span className="gradient-text">Techniques</span>
              </h3>
              <p className="text-base md:text-lg text-gray-600 px-4">Technologies et outils maîtrisés</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-20">
              {[
                {
                  titre: "Développement Mobile",
                  items: ["Android Studio", "Java", "Gradle", "Firebase", "SQLite", "Material Design"],
                  Icon: Smartphone
                },
                {
                  titre: "Développement Frontend",
                  items: ["Angular", "React", "TypeScript", "JavaScript ES6+", "HTML5/CSS3", "Bootstrap"],
                  Icon: Palette
                },
                {
                  titre: "Développement Backend",
                  items: ["Spring Boot", "Node.js/Express", "Symfony", "PHP", "API REST", "WebSocket"],
                  Icon: Settings
                },
                {
                  titre: "Bases de Données",
                  items: ["PostgreSQL", "MySQL", "MongoDB", "Doctrine ORM", "RailwayDB"],
                  Icon: Database
                },
                {
                  titre: "DevOps & Outils",
                  items: ["Docker", "Docker Compose", "Git/GitHub", "CI/CD", "Linux/Nginx"],
                  Icon: Rocket
                },
                {
                  titre: "Langages & Frameworks",
                  items: ["Java", "C#/.NET", "PHP", "JavaScript/TypeScript", "Rust", "Twig"],
                  Icon: Code2
                }
              ].map((categorie, i) => (
                <div
                  key={i}
                  className="glassmorphism rounded-2xl p-5 md:p-6 card-hover group border border-gray-200"
                  style={{
                    animation: `scaleIn 0.5s ease-out ${i * 0.1}s forwards`,
                    opacity: 0,
                    animationFillMode: 'forwards'
                  }}
                >
                  <div className="mb-4 text-blue-600 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300">
                    <categorie.Icon size={32} strokeWidth={1.5} className="md:w-10 md:h-10" />
                  </div>

                  <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4 group-hover:gradient-text transition-all duration-300">
                    {categorie.titre}
                  </h4>

                  <div className="space-y-2">
                    {categorie.items.map(item => (
                      <div
                        key={item}
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:scale-125 transition-transform duration-300 flex-shrink-0" />
                        <span className="text-xs md:text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Logiciels & Outils */}
            <div>
              <h4 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
                Logiciels & <span className="gradient-text">Outils</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
                {logiciels.map((tool, i) => (
                  <div
                    key={tool.name}
                    className="flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl glassmorphism border border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
                    style={{
                      animation: `fadeUp 0.6s ease-out forwards`,
                      animationDelay: `${i * 100}ms`,
                      opacity: 0
                    }}
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl p-2 md:p-3 mb-3 md:mb-4 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      <img
                        src={tool.logo}
                        alt={tool.name}
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                    </div>

                    <span className="text-xs md:text-sm font-semibold text-gray-700 text-center">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section Contact */}
        <section id="contact" className="scroll-mt-32 py-20 px-6 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8 px-4">
              Restons en <span className="gradient-text">Contact</span>
            </h3>
            <p className="text-base md:text-lg text-gray-600 mb-12 px-4">
              Intéressé par mon profil ? N'hésitez pas à me contacter pour discuter d'opportunités.
            </p>

            <div className="glassmorphism rounded-3xl p-6 md:p-10 card-hover glow-effect border border-gray-200">
              <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-8">
                <div className="text-left p-5 md:p-6 bg-white/50 rounded-2xl hover:bg-white/80 transition-all duration-300 border border-gray-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail size={18} className="text-blue-600 flex-shrink-0" />
                    <p className="text-xs md:text-sm text-gray-500 font-semibold">Email</p>
                  </div>
                  <a
                    href="mailto:cameliadifi0707@gmail.com"
                    className="text-sm md:text-lg text-blue-600 hover:text-purple-600 transition-colors duration-300 font-medium break-all"
                  >
                    cameliadifi0707@gmail.com
                  </a>
                </div>

                <div className="text-left p-5 md:p-6 bg-white/50 rounded-2xl hover:bg-white/80 transition-all duration-300 border border-gray-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <Smartphone size={18} className="text-blue-600 flex-shrink-0" />
                    <p className="text-xs md:text-sm text-gray-500 font-semibold">Téléphone</p>
                  </div>
                  <p className="text-sm md:text-lg text-gray-900 font-medium">+33 7 69 30 26 39</p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <p className="text-xs md:text-sm text-gray-500 mb-6 font-semibold">Réseaux professionnels</p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://github.com/Camss213?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center hover:from-blue-600 hover:to-purple-600 hover:text-white hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg"
                  >
                    <Github size={20} className="md:w-[22px] md:h-[22px]" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/camelia-difi213/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center hover:from-blue-600 hover:to-purple-600 hover:text-white hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg"
                  >
                    <Linkedin size={20} className="md:w-[22px] md:h-[22px]" />
                  </a>
                  <a
                    href="mailto:cameliadifi0707@gmail.com"
                    className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center hover:from-blue-600 hover:to-purple-600 hover:text-white hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg"
                  >
                    <Mail size={20} className="md:w-[22px] md:h-[22px]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 md:py-8 px-6 border-t border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 text-xs md:text-sm text-center md:text-left">
                © {currentYear} Camelia Difi - Portfolio Professionnel
              </p>
              <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-gray-500">
                <a href="#projets" className="hover:text-blue-600 transition-colors">Projets</a>
                <a href="#competences" className="hover:text-blue-600 transition-colors">Compétences</a>
                <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Modal détaillée */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 modal-overlay overflow-y-auto"
          onClick={() => setSelectedProject(null)}
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ animation: 'scaleIn 0.4s ease-out' }}
            className="rounded-2xl md:rounded-3xl max-w-4xl w-full my-8 md:my-0 max-h-[85vh] md:max-h-[90vh] overflow-y-auto p-6 md:p-10 shadow-2xl bg-white"
          >
            {/* Header */}
            <div className="mb-8 md:mb-10">
              <div className="flex items-start justify-between mb-4 md:mb-6">
                <div className="flex-1 pr-4">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {selectedProject.titre}
                  </h3>
                  <p className="text-blue-600 font-semibold text-sm md:text-base lg:text-lg">
                    {selectedProject.type} • {selectedProject.annee}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-gray-900 transition-all duration-200 flex-shrink-0"
                >
                  <X size={18} className="md:w-5 md:h-5" />
                </button>
              </div>

              <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-4 md:space-y-6">
              {/* Contexte */}
              <div className="p-4 md:p-6 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-base md:text-lg flex items-center gap-2">
                  <FileText size={18} className="text-blue-600 flex-shrink-0 md:w-5 md:h-5" />
                  Contexte du projet
                </h4>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {selectedProject.contexte}
                </p>
              </div>

              {/* Description */}
              <div className="p-4 md:p-6 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-base md:text-lg flex items-center gap-2">
                  <Lightbulb size={18} className="text-blue-600 flex-shrink-0 md:w-5 md:h-5" />
                  Description détaillée
                </h4>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {selectedProject.details}
                </p>
              </div>

              {/* Impact */}
              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-base md:text-lg flex items-center gap-2">
                  <Target size={18} className="text-blue-600 flex-shrink-0 md:w-5 md:h-5" />
                  Impact & Résultats
                </h4>
                <p className="text-sm md:text-base text-gray-800 font-medium leading-relaxed">
                  {selectedProject.impact}
                </p>
              </div>

              {/* Compétences */}
              <div className="p-4 md:p-6 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-base md:text-lg flex items-center gap-2">
                  <Zap size={18} className="text-blue-600 flex-shrink-0 md:w-5 md:h-5" />
                  Compétences développées
                </h4>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {selectedProject.competences.map(comp => (
                    <span
                      key={comp}
                      className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="p-4 md:p-6 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-base md:text-lg flex items-center gap-2">
                  <Settings size={18} className="text-blue-600 flex-shrink-0 md:w-5 md:h-5" />
                  Technologies utilisées
                </h4>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {selectedProject.tech.map(tech => (
                    <span
                      key={tech}
                      className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-gray-200">
              <div className={`grid gap-3 md:gap-4 ${selectedProject.site ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl md:rounded-2xl font-semibold text-base md:text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Github size={20} className="md:w-6 md:h-6" />
                  Code source
                </a>

                {selectedProject.site && (
                  <a
                    href={selectedProject.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl md:rounded-2xl font-semibold text-base md:text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <ExternalLink size={20} className="md:w-6 md:h-6" />
                    Voir le site
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}