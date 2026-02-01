import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ChevronRight, Calendar, MapPin, Smartphone, Palette, Settings, Database, Rocket, Code2, FileText, Lightbulb, Target, Zap } from 'lucide-react';
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

  const [isDark, setIsDark] = useState(false);

  const canvasRef = useRef(null);
  const logoCanvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0.2, y: 0 });
  const [previousMouse, setPreviousMouse] = useState({ x: 0, y: 0 });

  // ======================
  // LOGO ICOSAÈDRE (THREE.JS)
  // ======================
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

    const particles = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
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
      description: "Boutique en ligne pour une commerçante spécialisée dans les produits fait main.",
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
      impact: "Communication client-serveur stable avec gestion multi-clients",
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


  return (
    <div
  className="
    min-h-screen
    bg-white dark:bg-[#0B0F19]
    text-gray-900 dark:text-gray-100
    transition-colors duration-700 ease-in-out
  "
>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        canvas { filter: blur(0px); opacity: 0.8; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .glassmorphism { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3); }
        .gradient-text { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .card-hover { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-hover:hover { transform: translateY(-8px); }
        .glow-effect { box-shadow: 0 0 30px rgba(37, 99, 235, 0.15); }
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
      
      @keyframes logoEnter {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes logoFloat {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
}
`}</style>

      

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
          setRotation(prev => ({ x: prev.x - deltaY * 0.005, y: prev.y + deltaX * 0.005 }));
          setPreviousMouse({ x: e.clientX, y: e.clientY });
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      />

      <div className="relative z-10">
        <header className="fixed top-0 w-full glassmorphism z-50" style={{ animation: 'fadeIn 0.6s ease-out' }}>
          <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <canvas ref={logoCanvasRef} className="w-20 h-20" />
              <h1 className="text-xl font-semibold gradient-text">Camelia Difi</h1>
            </div>

  
            <nav className="flex gap-8 text-sm font-medium">
              <a href="#projets" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">Projets</a>
              <a href="#competences" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">Compétences</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">Contact</a>
            </nav>
          </div>
        
        </header>

        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl" style={{ animation: 'slideInLeft 0.8s ease-out' }}>
              <div className="inline-block mb-6 px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-medium text-sm">
                <span className="flex items-center gap-2">
                  <Rocket size={16} />
                  Disponible pour nouvelles opportunités
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Développeuse <span className="gradient-text">Full-Stack</span><br />& Mobile
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Spécialisée en développement web et mobile avec une expertise en architecture full-stack,
                du développement Android natif aux applications web modernes.
              </p>

              <div className="flex flex-wrap gap-6 mb-12">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  <span>Valence, France</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />
                  <span>Disponible pour Master / École d'Ingénieur</span>
                </div>
              </div>

              <div className="flex gap-4">
                <a href="#contact" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-medium glow-effect">
                  Me contacter
                </a>
                      <a
        href="/CV_Camelia_Difi.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download
        className="px-8 py-4 glassmorphism text-gray-700 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium flex items-center gap-2"
      >
        Télécharger CV
        <ExternalLink size={16} />
      </a>

              </div>
            </div>
          </div>
        </section>

        <section id="projets" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h3 className="text-5xl font-bold text-gray-900 mb-4">
                Projets <span className="gradient-text">Réalisés</span>
              </h3>
              <p className="text-lg text-gray-600">Une sélection de mes réalisations en développement web et mobile</p>
            </div>

            <div className="space-y-6">
              {projets.map((projet, index) => (
                <div
                  key={projet.id}
                  onClick={() => setSelectedProject(projet)}
                  className="glassmorphism rounded-2xl p-8 card-hover cursor-pointer group relative overflow-hidden"
                  style={{ animation: `slideUp 0.5s ease-out ${index * 0.1}s forwards`, opacity: 0, animationFillMode: 'forwards' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h4 className="text-2xl font-semibold text-gray-900 group-hover:gradient-text transition-all duration-300">
                          {projet.titre}
                        </h4>
                        <span className="px-4 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-xs font-semibold shadow-sm">
                          {projet.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">{projet.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {projet.tech.map(tech => (
                          <span key={tech} className="px-3 py-1.5 bg-white/80 text-gray-700 rounded-lg text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 shadow-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">{projet.contexte}</p>
                        <p className="text-sm font-semibold text-gray-900">{projet.annee}</p>
                      </div>
                      <ChevronRight className="text-blue-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300" size={28} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="competences" className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50" />
          <div className="max-w-6xl mx-auto relative">
            <div className="mb-16 text-center">
              <h3 className="text-5xl font-bold text-gray-900 mb-4">
                Compétences <span className="gradient-text">Techniques</span>
              </h3>
              <p className="text-lg text-gray-600">Technologies et outils maîtrisés</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
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
                  className="glassmorphism rounded-2xl p-6 card-hover group"
                  style={{
                    animation: `scaleIn 0.5s ease-out ${i * 0.1}s forwards`,
                    opacity: 0,
                    animationFillMode: 'forwards'
                  }}
                >
                  <div className="mb-4 text-blue-600 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <categorie.Icon size={40} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 group-hover:gradient-text transition-all duration-300">{categorie.titre}</h4>
                  <div className="space-y-2">
                    {categorie.items.map(item => (
                      <div key={item} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:scale-125 transition-transform duration-300" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Logiciels & Outils */}


      {/* Logiciels & Outils */}
<div className="mt-20">
  <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
    Logiciels & <span className="gradient-text">Outils</span>
  </h4>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
    {logiciels.map((tool, i) => (
      <div
        key={tool.name}
        className="
          flex flex-col items-center justify-center
          p-6 rounded-2xl
          bg-white/70 dark:bg-white/5
          backdrop-blur-lg
          border border-white/40
          shadow-md
          transition-all duration-300
          hover:-translate-y-2
          hover:shadow-xl
        "
        style={{
          animation: `fadeUp 0.6s ease-out forwards`,
          animationDelay: `${i * 100}ms`,
          opacity: 0
        }}
      >
        {/* Logo */}
        <img
          src={tool.logo}
          alt={tool.name}
          className="w-14 h-14 object-contain mb-4"
          draggable={false}
        />

        {/* Nom */}
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
          {tool.name}
        </span>
      </div>
    ))}
  </div>
</div>


        </section>

        {/* Section Contact */}
        <section id="contact" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-5xl font-bold text-gray-900 mb-8">
              Restons en <span className="gradient-text">Contact</span>
            </h3>
            <p className="text-lg text-gray-600 mb-12">
              Intéressé par mon profil ? N'hésitez pas à me contacter pour discuter d'opportunités.
            </p>

            <div className="glassmorphism rounded-3xl p-10 card-hover glow-effect">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="text-left p-6 bg-white/50 rounded-2xl hover:bg-white/80 transition-all duration-300">
                  <p className="text-sm text-gray-500 mb-2 font-semibold">Email</p>
                  <a href="mailto:cameliadifi0707@gmail.com" className="text-lg text-blue-600 hover:text-purple-600 transition-colors duration-300 font-medium">
                    cameliadifi0707@gmail.com
                  </a>
                </div>
                <div className="text-left p-6 bg-white/50 rounded-2xl hover:bg-white/80 transition-all duration-300">
                  <p className="text-sm text-gray-500 mb-2 font-semibold">Téléphone</p>
                  <p className="text-lg text-gray-900 font-medium">+33 7 69 30 26 39</p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-6 font-semibold">Réseaux professionnels</p>
                <div className="flex justify-center gap-4">
                  <a href="https://github.com/Camss213?tab=repositories" className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center hover:from-blue-600 hover:to-purple-600 hover:text-white hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Github size={22} />
                  </a>
                  <a href="https://www.linkedin.com/in/camelia-difi213/" className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center hover:from-blue-600 hover:to-purple-600 hover:text-white hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Linkedin size={22} />
                  </a>
                  <a href="mailto:cameliadifi0707@gmail.com" className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center hover:from-blue-600 hover:to-purple-600 hover:text-white hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Mail size={22} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-gray-200">
          <div className="max-w-6xl mx-auto text-center text-gray-600 text-sm">
            <p>© 2024 Camelia Difi - Portfolio Professionnel</p>
          </div>
        </footer>
      </div>
{/* Modal détaillée */}
{selectedProject && (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-6"
    onClick={() => setSelectedProject(null)}
    style={{ animation: 'fadeIn 0.3s ease-out' }}
  >
    <div
      onClick={e => e.stopPropagation()}
      style={{ animation: 'scaleIn 0.4s ease-out' }}
      className="
        rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-10 shadow-2xl
        bg-[#F8FAFC] border border-gray-200
      "
    >
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-4xl font-bold text-[#0F172A] mb-2">
              {selectedProject.titre}
            </h3>
            <p className="text-blue-600 font-semibold text-lg">
              {selectedProject.type} • {selectedProject.annee}
            </p>
          </div>

          <button
            onClick={() => setSelectedProject(null)}
            className="
              w-10 h-10 flex items-center justify-center
              bg-white border border-gray-300 rounded-full
              text-gray-500 hover:text-gray-900
              hover:bg-gray-100 transition-all duration-200
            "
          >
            ✕
          </button>
        </div>

        <p className="text-lg text-[#475569] leading-relaxed">
          {selectedProject.description}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {/* Contexte */}
        <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-semibold text-[#0F172A] mb-3 text-lg flex items-center gap-2">
            <FileText size={20} className="text-blue-600" />
            Contexte du projet
          </h4>
          <p className="text-[#475569] leading-relaxed">
            {selectedProject.contexte}
          </p>
        </div>

        {/* Description */}
        <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-semibold text-[#0F172A] mb-3 text-lg flex items-center gap-2">
            <Lightbulb size={20} className="text-blue-600" />
            Description détaillée
          </h4>
          <p className="text-[#475569] leading-relaxed">
            {selectedProject.details}
          </p>
        </div>

        {/* Impact */}
        <div
          className="
            p-6 rounded-2xl border border-blue-200 shadow-sm
            bg-gradient-to-br from-blue-100 via-white to-purple-100
          "
        >
          <h4 className="font-semibold text-[#0F172A] mb-3 text-lg flex items-center gap-2">
            <Target size={20} className="text-blue-600" />
            Impact & Résultats
          </h4>
          <p className="text-[#334155] font-medium leading-relaxed">
            {selectedProject.impact}
          </p>
        </div>

        {/* Compétences */}
        <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-semibold text-[#0F172A] mb-4 text-lg flex items-center gap-2">
            <Zap size={20} className="text-blue-600" />
            Compétences développées
          </h4>
          <div className="flex flex-wrap gap-3">
            {selectedProject.competences.map(comp => (
              <span
                key={comp}
                className="
                  px-4 py-2 rounded-xl font-semibold text-sm
                  bg-gradient-to-r from-blue-100 to-purple-100
                  text-[#1E293B]
                "
              >
                {comp}
              </span>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-semibold text-[#0F172A] mb-4 text-lg flex items-center gap-2">
            <Settings size={20} className="text-blue-600" />
            Technologies utilisées
          </h4>
          <div className="flex flex-wrap gap-3">
            {selectedProject.tech.map(tech => (
              <span
                key={tech}
                className="
                  px-4 py-2 bg-gray-100 text-blue-700
                  rounded-xl font-semibold text-sm
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <div className={`grid gap-4 ${selectedProject.site ? "grid-cols-2" : "grid-cols-1"}`}>
          <a
            href={selectedProject.github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              py-4 bg-gradient-to-r from-blue-600 to-purple-600
              text-white rounded-2xl font-semibold text-lg
              flex items-center justify-center gap-3
              hover:shadow-xl hover:scale-105 transition-all duration-300
            "
          >
            <Github size={24} />
            Code source
          </a>

          {selectedProject.site && (
            <a
              href={selectedProject.site}
              target="_blank"
              rel="noopener noreferrer"
              className="
                py-4 bg-gradient-to-r from-purple-600 to-pink-600
                text-white rounded-2xl font-semibold text-lg
                flex items-center justify-center gap-3
                hover:shadow-xl hover:scale-105 transition-all duration-300
              "
            >
              <ExternalLink size={24} />
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