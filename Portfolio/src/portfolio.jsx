import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ChevronRight, Calendar, MapPin } from 'lucide-react';
import * as THREE from 'three';

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    const geometry = new THREE.IcosahedronGeometry(1.5, 1);
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.1 }));
    scene.add(line);

    const animate = () => {
      requestAnimationFrame(animate);
      line.rotation.x += 0.001;
      line.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projets = [
    {
      id: 1,
      titre: "Application Mobile Spirituelle",
      type: "Développement Mobile",
      annee: "2024",
      tech: ["Android Studio", "Java", "Gradle", "Firebase", "SQLite"],
      description: "Application Android native dédiée au bien-être spirituel avec fonctionnalités de méditation et suivi personnel.",
      contexte: "Projet personnel - Développement mobile natif",
      details: "Développement complet d'une application mobile native Android avec Android Studio. Architecture MVVM, gestion du cycle de vie Android, notifications push via Firebase Cloud Messaging, stockage local avec SQLite et interface Material Design. Optimisation des performances et gestion du mode hors ligne.",
      competences: ["Architecture Android", "Java", "Firebase", "Material Design", "Optimisation performance"],
      impact: "Application native performante avec mode offline complet",
      github: "#"
    },
    {
      id: 2,
      titre: "Plateforme de Devis - Garage Automobile",
      type: "Développement Web",
      annee: "2024",
      tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "DOM API"],
      description: "Site web de génération automatique de devis pour un garage automobile avec interface responsive.",
      contexte: "Projet client professionnel",
      details: "Développement web front-end en JavaScript vanilla avec manipulation avancée du DOM. Système de calcul dynamique des devis, validation des formulaires côté client, génération de PDF pour impression et design responsive avec Bootstrap. Architecture modulaire et code maintenable.",
      competences: ["JavaScript ES6+", "DOM Manipulation", "Responsive Design", "UX/UI"],
      impact: "Automatisation complète du processus de devis, gain de temps de 70%",
      github: "#"
    },
    {
      id: 3,
      titre: "CTVR - Gestion Transport Urbain",
      type: "Application Full-Stack",
      annee: "2024",
      tech: ["Angular", "Spring Boot", "PostgreSQL", "JWT", "TypeScript"],
      description: "Système de gestion des accidents et incidents pour la Compagnie de Transport de la Vallée du Rhône.",
      contexte: "Projet tutoré académique",
      details: "Application enterprise avec architecture moderne : frontend Angular avec TypeScript et RxJS, backend Spring Boot avec API RESTful, base de données PostgreSQL. Authentification JWT, gestion des rôles utilisateurs, tableaux de bord statistiques et système de reporting automatisé. Tests unitaires et d'intégration.",
      competences: ["Architecture MVC", "API REST", "Sécurité JWT", "Base de données relationnelle", "Tests"],
      impact: "Traçabilité complète des incidents, reporting automatisé et analyse statistique",
      github: "#"
    },
    {
      id: 4,
      titre: "TurismoOne - Location de Véhicules",
      type: "E-Commerce",
      annee: "2023-2024",
      tech: ["Symfony", "PHP", "Doctrine ORM", "RailwayDB", "Twig"],
      description: "Plateforme de réservation en ligne pour location de voitures particulières et de luxe.",
      contexte: "Projet académique - Framework PHP",
      details: "Développement avec le framework Symfony suivant l'architecture MVC. Utilisation de Doctrine ORM pour la gestion de la base de données RailwayDB, templates Twig pour le rendu, système de routing avancé. Fonctionnalités : gestion du catalogue, système de réservation avec calendrier, paiement sécurisé et interface administrateur complète.",
      competences: ["Framework Symfony", "ORM Doctrine", "MVC Pattern", "Gestion de projet"],
      impact: "Plateforme complète avec réservations en ligne et gestion automatisée",
      github: "#"
    },
    {
      id: 5,
      titre: "E-Commerce Produits Artisanaux",
      type: "Développement Web",
      annee: "2023",
      tech: ["PHP", "Docker", "PostgreSQL", "Nginx", "Docker Compose"],
      description: "Boutique en ligne pour commerçante spécialisée dans les produits fait main.",
      contexte: "Projet client professionnel",
      details: "Site e-commerce développé en PHP avec architecture containerisée. Configuration Docker multi-conteneurs : Nginx comme reverse proxy, PHP-FPM pour l'exécution et PostgreSQL pour la base de données. Orchestration avec Docker Compose, gestion des sessions, système de panier persistant et paiement sécurisé. Déploiement automatisé.",
      competences: ["Architecture Docker", "DevOps", "Multi-conteneurs", "Configuration serveur"],
      impact: "Architecture moderne et scalable, déploiement simplifié",
      github: "#"
    },
    {
      id: 6,
      titre: "Architecture Client-Serveur avec VM",
      type: "Systèmes Distribués",
      annee: "2023",
      tech: ["Visual Studio", "C#", ".NET Framework", "WPF", "Sockets TCP/IP"],
      description: "Implémentation d'une architecture client-serveur avec gestion de machines virtuelles.",
      contexte: "Projet académique - Programmation système",
      details: "Application développée avec Visual Studio et le framework .NET. Interface graphique WPF, implémentation de protocoles réseau avec sockets TCP/IP, gestion du multi-threading pour les connexions simultanées, sérialisation des données et gestion des erreurs réseau. Architecture robuste et évolutive.",
      competences: ["Framework .NET", "Programmation réseau", "Multi-threading", "Interface WPF"],
      impact: "Communication client-serveur stable avec gestion multi-clients",
      github: "#"
    },
    {
      id: 7,
      titre: "Intermarché - Gestion Logistique",
      type: "Application Professionnelle",
      annee: "2024",
      tech: ["React", "Node.js", "PostgreSQL", "WebSocket", "Docker"],
      description: "Application web pour la gestion et optimisation des préparations de commandes en base logistique.",
      contexte: "Projet professionnel - Système logistique",
      details: "Application web temps réel avec stack MERN moderne. Frontend React avec Hooks et Context API, backend Node.js avec Express, WebSockets pour les mises à jour en temps réel. Base PostgreSQL pour la persistance des données. Architecture dockerisée avec CI/CD pour le déploiement. Interface opérationnelle optimisée pour les préparateurs.",
      competences: ["React Hooks", "API REST", "WebSocket", "Architecture temps réel", "Optimisation"],
      impact: "Optimisation de 40% du processus de préparation, réduction des erreurs",
      github: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * { font-family: 'Inter', sans-serif; }
        
        canvas {
          filter: blur(0.5px);
          opacity: 0.4;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      <div className="relative z-10">
        {/* Header professionnel */}
        <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
          <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Camelia Difi</h1>
            <nav className="flex gap-8 text-sm font-medium">
              <a href="#projets" className="text-gray-600 hover:text-blue-600 transition">Projets</a>
              <a href="#competences" className="text-gray-600 hover:text-blue-600 transition">Compétences</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition">Contact</a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Développeuse Full-Stack & Mobile
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Spécialisée en développement web et mobile avec une expertise en architecture full-stack,
                du développement Android natif aux applications web modernes.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-12">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  <span>Loriol-sur-Drôme, France</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />
                  <span>Disponible pour Master / École d'Ingénieur</span>
                </div>
              </div>

              <div className="flex gap-4">
                <a href="#contact" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                  Me contacter
                </a>
                <a href="#" className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition font-medium flex items-center gap-2">
                  Télécharger CV
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section Projets */}
        <section id="projets" className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">Projets Réalisés</h3>
              <p className="text-lg text-gray-600">Une sélection de mes réalisations en développement web et mobile</p>
            </div>

            <div className="space-y-6">
              {projets.map((projet, index) => (
                <div
                  key={projet.id}
                  onClick={() => setSelectedProject(projet)}
                  className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer group"
                  style={{
                    animation: `slideUp 0.5s ease-out ${index * 0.1}s forwards`,
                    opacity: 0,
                    animationFillMode: 'forwards'
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h4 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition">
                          {projet.titre}
                        </h4>
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                          {projet.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{projet.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {projet.tech.map(tech => (
                          <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">{projet.contexte}</p>
                        <p className="text-sm font-medium text-gray-900">{projet.annee}</p>
                      </div>
                      <ChevronRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Compétences */}
        <section id="competences" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">Compétences Techniques</h3>
              <p className="text-lg text-gray-600">Technologies et outils maîtrisés</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  titre: "Développement Mobile",
                  items: ["Android Studio", "Java", "Gradle", "Firebase", "SQLite", "Material Design"]
                },
                {
                  titre: "Développement Frontend",
                  items: ["Angular", "React", "TypeScript", "JavaScript ES6+", "HTML5/CSS3", "Bootstrap"]
                },
                {
                  titre: "Développement Backend",
                  items: ["Spring Boot", "Node.js/Express", "Symfony", "PHP", "API REST", "WebSocket"]
                },
                {
                  titre: "Bases de Données",
                  items: ["PostgreSQL", "MySQL", "SQLite", "Doctrine ORM", "RailwayDB"]
                },
                {
                  titre: "DevOps & Outils",
                  items: ["Docker", "Docker Compose", "Git/GitHub", "CI/CD", "Linux/Nginx"]
                },
                {
                  titre: "Langages & Frameworks",
                  items: ["Java", "C#/.NET", "PHP", "JavaScript/TypeScript", "WPF", "Twig"]
                }
              ].map((categorie, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">{categorie.titre}</h4>
                  <div className="space-y-2">
                    {categorie.items.map(item => (
                      <div key={item} className="flex items-center gap-2 text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Contact */}
        <section id="contact" className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-gray-900 mb-8">Contact</h3>
            <p className="text-lg text-gray-600 mb-12">
              Intéressé par mon profil ? N'hésitez pas à me contacter pour discuter d'opportunités.
            </p>
            
            <div className="bg-white rounded-xl border border-gray-200 p-10">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="text-left">
                  <p className="text-sm text-gray-500 mb-2 font-medium">Email</p>
                  <a href="mailto:camelia.difi@exemple.com" className="text-lg text-blue-600 hover:text-blue-700">
                    camelia.difi@exemple.com
                  </a>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 mb-2 font-medium">Téléphone</p>
                  <p className="text-lg text-gray-900">+33 X XX XX XX XX</p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-4 font-medium">Réseaux professionnels</p>
                <div className="flex justify-center gap-4">
                  <a href="#" className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                    <Github size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                    <Linkedin size={20} />
                  </a>
                  <a href="mailto:camelia.difi@exemple.com" className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                    <Mail size={20} />
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedProject(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-10" onClick={e => e.stopPropagation()}>
            <div className="mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedProject.titre}</h3>
                  <p className="text-blue-600 font-medium">{selectedProject.type} • {selectedProject.annee}</p>
                </div>
                <button onClick={() => setSelectedProject(null)} className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">
                  Fermer
                </button>
              </div>
              <p className="text-lg text-gray-700 mb-4">{selectedProject.description}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Contexte du projet</h4>
                <p className="text-gray-700">{selectedProject.contexte}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Description détaillée</h4>
                <p className="text-gray-700 leading-relaxed">{selectedProject.details}</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Impact & Résultats</h4>
                <p className="text-gray-700">{selectedProject.impact}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Compétences développées</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.competences.map(comp => (
                    <span key={comp} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Technologies utilisées</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map(tech => (
                    <span key={tech} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <a href={selectedProject.github} className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2">
                <Github size={20} />
                Voir le code source
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}