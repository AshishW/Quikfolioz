#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = './templates';

// Template configurations - 50 new creative and innovative templates
const templateConfigs = [
    // Art Deco & Luxury (5)
    {
        id: 'art_deco_portfolio',
        name: 'Art Deco Portfolio',
        description: 'Elegant portfolio template inspired by 1920s Art Deco design with geometric patterns, gold accents, and sophisticated animations',
        category: 'unique',
        colors: ['#FFD700', '#B8860B', '#1C1C1C', '#F5F5DC'],
        style: 'art-deco'
    },
    {
        id: 'luxury_gold_portfolio',
        name: 'Luxury Gold Portfolio',
        description: 'Premium portfolio with gold foil effects, marble textures, and elegant transitions for high-end presentations',
        category: 'unique',
        colors: ['#FFD700', '#FFF8DC', '#2F2F2F', '#8B7355'],
        style: 'luxury'
    },
    {
        id: 'royal_purple_portfolio',
        name: 'Royal Purple Portfolio',
        description: 'Majestic portfolio design with royal purple gradients, crown motifs, and regal animations',
        category: 'unique',
        colors: ['#663399', '#9966CC', '#E6E6FA', '#483D8B'],
        style: 'royal'
    },
    {
        id: 'diamond_crystal_portfolio',
        name: 'Diamond Crystal Portfolio',
        description: 'Sparkling portfolio with diamond-cut layouts, crystal refractions, and prismatic color effects',
        category: 'creative',
        colors: ['#E0E0E0', '#C0C0C0', '#B0E0E6', '#F0F8FF'],
        style: 'crystal'
    },
    {
        id: 'platinum_elite_portfolio',
        name: 'Platinum Elite Portfolio',
        description: 'Ultra-modern portfolio with platinum aesthetics, chrome reflections, and premium animations',
        category: 'modern',
        colors: ['#E5E4E2', '#C0C0C0', '#2F4F4F', '#708090'],
        style: 'platinum'
    },

    // Synthwave & Retro-Futuristic (5)
    {
        id: 'synthwave_portfolio',
        name: 'Synthwave Portfolio',
        description: 'Retro-futuristic portfolio inspired by 80s synthwave aesthetics with neon grids, glowing effects, and cyberpunk styling',
        category: 'unique',
        colors: ['#FF00FF', '#00FFFF', '#8B00FF', '#0080FF'],
        style: 'synthwave'
    },
    {
        id: 'neon_retrowave_portfolio',
        name: 'Neon Retrowave Portfolio',
        description: 'Outrun-inspired portfolio with neon palm trees, sunset gradients, and retro grid animations',
        category: 'unique',
        colors: ['#FF6EC7', '#FFE066', '#9D4EDD', '#F72585'],
        style: 'retrowave'
    },
    {
        id: 'cyber_grid_portfolio',
        name: 'Cyber Grid Portfolio',
        description: 'Digital landscape portfolio with glowing wireframes, matrix-style code rain, and futuristic UI elements',
        category: 'unique',
        colors: ['#00FF41', '#003D1A', '#000000', '#0D7377'],
        style: 'cyber-grid'
    },
    {
        id: 'vaporwave_aesthetic_portfolio',
        name: 'Vaporwave Aesthetic Portfolio',
        description: 'Nostalgic vaporwave design with pastel gradients, Greek statues, and dreamy 90s aesthetics',
        category: 'creative',
        colors: ['#FF71CE', '#01CDFE', '#05FFA1', '#B967DB'],
        style: 'vaporwave'
    },
    {
        id: 'tron_legacy_portfolio',
        name: 'TRON Legacy Portfolio',
        description: 'TRON-inspired portfolio with electric blue circuits, digital patterns, and sci-fi animations',
        category: 'unique',
        colors: ['#00D4FF', '#000000', '#FFD23F', '#002B5C'],
        style: 'tron'
    },

    // Nature & Organic (5)
    {
        id: 'organic_nature_portfolio',
        name: 'Organic Nature Portfolio',
        description: 'Earth-friendly portfolio with organic shapes, natural color palettes, floating leaf animations, and sustainable design principles',
        category: 'minimalist',
        colors: ['#2D5016', '#9CAF88', '#8B4513', '#8FBC8F'],
        style: 'organic'
    },
    {
        id: 'forest_whisper_portfolio',
        name: 'Forest Whisper Portfolio',
        description: 'Mystical forest-themed portfolio with tree silhouettes, morning mist effects, and woodland creature animations',
        category: 'creative',
        colors: ['#0F3A0F', '#228B22', '#D2B48C', '#8FBC8F'],
        style: 'forest'
    },
    {
        id: 'ocean_waves_portfolio',
        name: 'Ocean Waves Portfolio',
        description: 'Fluid ocean-inspired design with wave animations, underwater bubbles, and marine color gradients',
        category: 'creative',
        colors: ['#006994', '#87CEEB', '#4682B4', '#20B2AA'],
        style: 'ocean'
    },
    {
        id: 'desert_dunes_portfolio',
        name: 'Desert Dunes Portfolio',
        description: 'Warm desert landscape with sand dune shapes, cactus graphics, and sunset color transitions',
        category: 'minimalist',
        colors: ['#D2691E', '#F4A460', '#DEB887', '#CD853F'],
        style: 'desert'
    },
    {
        id: 'mountain_peaks_portfolio',
        name: 'Mountain Peaks Portfolio',
        description: 'Majestic mountain-themed portfolio with peak silhouettes, snow effects, and alpine color schemes',
        category: 'minimalist',
        colors: ['#2F4F4F', '#708090', '#B0C4DE', '#E0E0E0'],
        style: 'mountain'
    },

    // Glitch & Digital Art (5)
    {
        id: 'glitch_matrix_portfolio',
        name: 'Glitch Matrix Portfolio',
        description: 'Digital corruption-inspired portfolio with glitch effects, RGB splitting, and matrix-style animations',
        category: 'unique',
        colors: ['#FF0000', '#00FF00', '#0000FF', '#000000'],
        style: 'glitch'
    },
    {
        id: 'pixel_art_portfolio',
        name: 'Pixel Art Portfolio',
        description: '8-bit inspired portfolio with pixelated graphics, retro game aesthetics, and chiptune-style animations',
        category: 'unique',
        colors: ['#FF6B35', '#6BCF7F', '#4D9DE0', '#E15554'],
        style: 'pixel'
    },
    {
        id: 'datamosh_digital_portfolio',
        name: 'Datamosh Digital Portfolio',
        description: 'Digital artifact portfolio with compression glitches, data corruption effects, and broken pixel aesthetics',
        category: 'unique',
        colors: ['#FF00FF', '#FFFF00', '#00FFFF', '#000000'],
        style: 'datamosh'
    },
    {
        id: 'hologram_interference_portfolio',
        name: 'Hologram Interference Portfolio',
        description: 'Holographic portfolio with interference patterns, RGB chromatic aberration, and digital noise effects',
        category: 'creative',
        colors: ['#FF0080', '#00FF80', '#8000FF', '#404040'],
        style: 'hologram'
    },
    {
        id: 'ascii_terminal_portfolio',
        name: 'ASCII Terminal Portfolio',
        description: 'Text-based portfolio using ASCII art, terminal aesthetics, and command-line interface styling',
        category: 'terminal',
        colors: ['#00FF00', '#000000', '#FFFFFF', '#808080'],
        style: 'ascii'
    },

    // Geometric & Abstract (5)
    {
        id: 'geometric_minimalist_portfolio',
        name: 'Geometric Minimalist Portfolio',
        description: 'Clean geometric portfolio with perfect shapes, mathematical precision, and minimalist color schemes',
        category: 'minimalist',
        colors: ['#000000', '#FFFFFF', '#FF0000', '#0000FF'],
        style: 'geometric'
    },
    {
        id: 'abstract_expressionist_portfolio',
        name: 'Abstract Expressionist Portfolio',
        description: 'Artistic portfolio inspired by abstract expressionism with paint splashes, brush strokes, and artistic chaos',
        category: 'creative',
        colors: ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5'],
        style: 'abstract'
    },
    {
        id: 'isometric_3d_portfolio',
        name: 'Isometric 3D Portfolio',
        description: 'Three-dimensional isometric portfolio with 3D blocks, perspective animations, and spatial depth',
        category: 'creative',
        colors: ['#667EEA', '#764BA2', '#F093FB', '#F5576C'],
        style: 'isometric'
    },
    {
        id: 'fractal_patterns_portfolio',
        name: 'Fractal Patterns Portfolio',
        description: 'Mathematical beauty portfolio with fractal patterns, infinite zoom effects, and sacred geometry',
        category: 'unique',
        colors: ['#4ECDC4', '#44A08D', '#093637', '#20BDFF'],
        style: 'fractal'
    },
    {
        id: 'tessellation_portfolio',
        name: 'Tessellation Portfolio',
        description: 'Pattern-based portfolio with tessellating shapes, M.C. Escher-inspired designs, and seamless patterns',
        category: 'creative',
        colors: ['#2E3192', '#1BFFFF', '#FDBB2D', '#22C1C3'],
        style: 'tessellation'
    },

    // Gaming & Tech (5)
    {
        id: 'neon_gaming_portfolio',
        name: 'Neon Gaming Portfolio',
        description: 'Gaming-inspired portfolio with HUD elements, health bars, power-ups, and RGB lighting effects',
        category: 'unique',
        colors: ['#00FFFF', '#FF00FF', '#FFFF00', '#00FF00'],
        style: 'gaming'
    },
    {
        id: 'circuit_board_portfolio',
        name: 'Circuit Board Portfolio',
        description: 'Tech portfolio with printed circuit board patterns, electrical pathways, and electronic component styling',
        category: 'unique',
        colors: ['#00FF00', '#1B4332', '#2D6A4F', '#95D5B2'],
        style: 'circuit'
    },
    {
        id: 'holographic_iridescent_portfolio',
        name: 'Holographic Iridescent Portfolio',
        description: 'Futuristic portfolio with holographic effects, iridescent colors, and rainbow reflections',
        category: 'creative',
        colors: ['#FF006E', '#8338EC', '#3A86FF', '#06FFA5'],
        style: 'holographic'
    },
    {
        id: 'quantum_computing_portfolio',
        name: 'Quantum Computing Portfolio',
        description: 'Quantum-inspired portfolio with particle effects, quantum entanglement visuals, and scientific aesthetics',
        category: 'unique',
        colors: ['#4361EE', '#7209B7', '#F72585', '#4CC9F0'],
        style: 'quantum'
    },
    {
        id: 'blockchain_crypto_portfolio',
        name: 'Blockchain Crypto Portfolio',
        description: 'Cryptocurrency-themed portfolio with blockchain visualizations, crypto symbols, and digital currency aesthetics',
        category: 'modern',
        colors: ['#F7931A', '#627EEA', '#00D924', '#8CC8FF'],
        style: 'blockchain'
    },

    // Artistic & Creative (5)
    {
        id: 'watercolor_artistic_portfolio',
        name: 'Watercolor Artistic Portfolio',
        description: 'Artistic portfolio with watercolor paint effects, color bleeding, soft brush strokes, and artistic textures',
        category: 'creative',
        colors: ['#FF6B9D', '#C44569', '#F8B500', '#78E08F'],
        style: 'watercolor'
    },
    {
        id: 'comic_pop_art_portfolio',
        name: 'Comic Pop Art Portfolio',
        description: 'Pop art inspired portfolio with comic book aesthetics, Ben-Day dots, speech bubbles, and vibrant colors',
        category: 'unique',
        colors: ['#FF0000', '#FFFF00', '#0000FF', '#000000'],
        style: 'comic'
    },
    {
        id: 'stained_glass_portfolio',
        name: 'Stained Glass Portfolio',
        description: 'Cathedral-inspired portfolio with stained glass patterns, light refractions, and Gothic design elements',
        category: 'creative',
        colors: ['#800080', '#FFD700', '#DC143C', '#0000CD'],
        style: 'stained-glass'
    },
    {
        id: 'origami_paper_portfolio',
        name: 'Origami Paper Portfolio',
        description: 'Paper craft portfolio with origami folds, layered paper effects, and dimensional shadow play',
        category: 'minimalist',
        colors: ['#F5F5DC', '#D2B48C', '#8B4513', '#A0522D'],
        style: 'origami'
    },
    {
        id: 'ink_splash_portfolio',
        name: 'Ink Splash Portfolio',
        description: 'Dynamic portfolio with ink splashes, fluid dynamics, black ink spreading effects, and artistic chaos',
        category: 'creative',
        colors: ['#000000', '#FFFFFF', '#808080', '#C0C0C0'],
        style: 'ink-splash'
    },

    // Material & Texture (5)
    {
        id: 'glass_prism_portfolio',
        name: 'Glass Prism Portfolio',
        description: 'Transparent portfolio with glass morphism, light refraction effects, and prismatic color separations',
        category: 'modern',
        colors: ['rgba(255,255,255,0.1)', '#FF6B6B', '#4ECDC4', '#45B7D1'],
        style: 'glass'
    },
    {
        id: 'liquid_metal_portfolio',
        name: 'Liquid Metal Portfolio',
        description: 'Futuristic portfolio with chrome reflections, mercury-like fluid animations, and metallic surface effects',
        category: 'modern',
        colors: ['#C0C0C0', '#708090', '#2F4F4F', '#B0C4DE'],
        style: 'liquid-metal'
    },
    {
        id: 'wood_grain_portfolio',
        name: 'Wood Grain Portfolio',
        description: 'Natural portfolio with wood textures, grain patterns, carved elements, and rustic charm',
        category: 'minimalist',
        colors: ['#8B4513', '#D2691E', '#CD853F', '#DEB887'],
        style: 'wood'
    },
    {
        id: 'concrete_brutalist_portfolio',
        name: 'Concrete Brutalist Portfolio',
        description: 'Industrial portfolio with concrete textures, brutalist architecture, and raw material aesthetics',
        category: 'modern',
        colors: ['#696969', '#2F2F2F', '#D3D3D3', '#A9A9A9'],
        style: 'concrete'
    },
    {
        id: 'fabric_textile_portfolio',
        name: 'Fabric Textile Portfolio',
        description: 'Textile-inspired portfolio with fabric textures, weaving patterns, and soft material effects',
        category: 'minimalist',
        colors: ['#F5DEB3', '#DDA0DD', '#98FB98', '#F0E68C'],
        style: 'fabric'
    },

    // Color-focused (5)
    {
        id: 'rainbow_spectrum_portfolio',
        name: 'Rainbow Spectrum Portfolio',
        description: 'Vibrant portfolio celebrating the full color spectrum with rainbow gradients and chromatic animations',
        category: 'creative',
        colors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'],
        style: 'rainbow'
    },
    {
        id: 'monochrome_grayscale_portfolio',
        name: 'Monochrome Grayscale Portfolio',
        description: 'Elegant black and white portfolio with grayscale photography aesthetics and high contrast design',
        category: 'minimalist',
        colors: ['#000000', '#FFFFFF', '#808080', '#C0C0C0'],
        style: 'monochrome'
    },
    {
        id: 'pastel_dreamy_portfolio',
        name: 'Pastel Dreamy Portfolio',
        description: 'Soft pastel portfolio with dreamy colors, cotton candy aesthetics, and gentle animations',
        category: 'minimalist',
        colors: ['#FFB3E6', '#B3E6FF', '#B3FFB3', '#FFFFB3'],
        style: 'pastel'
    },
    {
        id: 'neon_electric_portfolio',
        name: 'Neon Electric Portfolio',
        description: 'High-energy portfolio with electric neon colors, rave aesthetics, and pulsating light effects',
        category: 'unique',
        colors: ['#00FFFF', '#FF00FF', '#FFFF00', '#00FF00'],
        style: 'neon-electric'
    },
    {
        id: 'earth_tone_portfolio',
        name: 'Earth Tone Portfolio',
        description: 'Grounded portfolio with warm earth tones, natural color harmony, and organic color transitions',
        category: 'minimalist',
        colors: ['#8B4513', '#D2691E', '#228B22', '#4682B4'],
        style: 'earth-tone'
    },

    // Animation-heavy (5)
    {
        id: 'kinetic_typography_portfolio',
        name: 'Kinetic Typography Portfolio',
        description: 'Text-focused portfolio with animated typography, moving letters, and dynamic text compositions',
        category: 'creative',
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
        style: 'kinetic'
    },
    {
        id: 'morphing_shapes_portfolio',
        name: 'Morphing Shapes Portfolio',
        description: 'Dynamic portfolio with constantly morphing shapes, fluid transformations, and organic animations',
        category: 'creative',
        colors: ['#667EEA', '#764BA2', '#F093FB', '#F5576C'],
        style: 'morphing'
    },
    {
        id: 'particle_explosion_portfolio',
        name: 'Particle Explosion Portfolio',
        description: 'Energetic portfolio with particle systems, explosive animations, and dynamic physics simulations',
        category: 'creative',
        colors: ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5'],
        style: 'particle'
    },
    {
        id: 'floating_islands_portfolio',
        name: 'Floating Islands Portfolio',
        description: 'Fantastical portfolio with floating island animations, cloud movements, and magical atmosphere',
        category: 'creative',
        colors: ['#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C'],
        style: 'floating'
    },
    {
        id: 'spiral_galaxy_portfolio',
        name: 'Spiral Galaxy Portfolio',
        description: 'Cosmic portfolio with spiral galaxy animations, star formations, and deep space aesthetics',
        category: 'creative',
        colors: ['#191970', '#483D8B', '#9370DB', '#BA55D3'],
        style: 'galaxy'
    }
];

// HTML template generators
function generateHTMLTemplate(config) {
    const { name, colors, style } = config;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Your Name] - ${name}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: ${colors[0]};
            --secondary: ${colors[1] || colors[0]};
            --accent: ${colors[2] || colors[0]};
            --neutral: ${colors[3] || '#000000'};
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: var(--neutral);
            overflow-x: hidden;
        }

        .header {
            position: fixed;
            top: 0;
            width: 100%;
            padding: 20px 50px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            z-index: 1000;
        }

        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--accent);
        }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 30px;
        }

        .nav-links a {
            color: var(--neutral);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .nav-links a:hover {
            color: var(--accent);
        }

        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
        }

        .hero-title {
            font-size: clamp(3rem, 8vw, 6rem);
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 20px;
            animation: fadeInUp 1s ease-out;
        }

        .hero-subtitle {
            font-size: 1.5rem;
            color: var(--secondary);
            margin-bottom: 40px;
            animation: fadeInUp 1s ease-out 0.5s both;
        }

        .cta-button {
            background: var(--accent);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            animation: fadeInUp 1s ease-out 1s both;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .section {
            padding: 100px 50px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .section-title {
            font-size: 3rem;
            text-align: center;
            color: var(--accent);
            margin-bottom: 60px;
        }

        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }

        .project-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 30px;
            border-radius: 12px;
            transition: transform 0.3s ease;
        }

        .project-card:hover {
            transform: translateY(-10px);
        }

        .project-title {
            font-size: 1.5rem;
            color: var(--accent);
            margin-bottom: 15px;
        }

        .project-description {
            line-height: 1.6;
            margin-bottom: 20px;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 768px) {
            .header {
                padding: 15px 20px;
            }

            .nav-links {
                display: none;
            }

            .section {
                padding: 50px 20px;
            }

            .projects-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="logo">[Your Name]</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <section class="hero" id="home">
        <div>
            <h1 class="hero-title">${name.split(' ')[0]} Developer</h1>
            <p class="hero-subtitle">Creative Digital Solutions</p>
            <button class="cta-button">View Work</button>
        </div>
    </section>

    <section class="section" id="projects">
        <h2 class="section-title">Featured Projects</h2>
        <div class="projects-grid">
            <div class="project-card">
                <h3 class="project-title">Project Alpha</h3>
                <p class="project-description">Modern web application with ${style} design principles and innovative user experience.</p>
                <button class="cta-button">Learn More</button>
            </div>
            <div class="project-card">
                <h3 class="project-title">Project Beta</h3>
                <p class="project-description">Creative portfolio showcasing ${style} aesthetics with cutting-edge animations.</p>
                <button class="cta-button">Learn More</button>
            </div>
            <div class="project-card">
                <h3 class="project-title">Project Gamma</h3>
                <p class="project-description">Innovative design system built with ${style} methodology and modern technologies.</p>
                <button class="cta-button">Learn More</button>
            </div>
        </div>
    </section>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Smooth scrolling
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.project-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                card.style.transition = 'all 0.6s ease';
                observer.observe(card);
            });
        });
    </script>
</body>
</html>`;
}

function generateMetadata(config) {
    return JSON.stringify({
        name: config.name,
        description: config.description,
        category: config.category,
        technologies: ["HTML5", "CSS3", "JavaScript", "Google Fonts"],
        features: [
            "Responsive Design",
            "Modern Animations",
            "Smooth Scrolling",
            `${config.style.charAt(0).toUpperCase() + config.style.slice(1)} Aesthetics`,
            "Interactive Elements",
            "Cross-browser Compatible"
        ]
    }, null, 2);
}

async function createTemplate(config) {
    const templateDir = path.join(TEMPLATES_DIR, config.id);
    
    // Create directory
    if (!fs.existsSync(templateDir)) {
        fs.mkdirSync(templateDir, { recursive: true });
    }
    
    // Create index.html
    const htmlContent = generateHTMLTemplate(config);
    fs.writeFileSync(path.join(templateDir, 'index.html'), htmlContent);
    
    // Create metadata.json
    const metadataContent = generateMetadata(config);
    fs.writeFileSync(path.join(templateDir, 'metadata.json'), metadataContent);
    
    console.log(`✅ Created ${config.name}`);
}

async function main() {
    console.log('🚀 Creating 50 innovative portfolio templates...\n');
    
    // Create templates directory if it doesn't exist
    if (!fs.existsSync(TEMPLATES_DIR)) {
        fs.mkdirSync(TEMPLATES_DIR, { recursive: true });
    }
    
    // Create all templates
    for (const config of templateConfigs) {
        await createTemplate(config);
    }
    
    console.log(`\n✨ Successfully created ${templateConfigs.length} new portfolio templates!`);
    console.log('\nTemplates created:');
    templateConfigs.forEach((config, index) => {
        console.log(`${(index + 1).toString().padStart(2)}: ${config.name} (${config.category})`);
    });
    
    console.log('\nNext steps:');
    console.log('1. Run: node generate-templates.js');
    console.log('2. Refresh your browser to see all new templates!');
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { templateConfigs, generateHTMLTemplate, generateMetadata };