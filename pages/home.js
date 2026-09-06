export async function renderHome(container) {
    const lang = window.currentLanguage || 'en';
    
    const title = "Echoes of the Brahmaputra";
    const subtitle = `<span class="dropcap">L</span>oreBridge preserves and illuminates the timeless folktales, proverbs, and traditional wisdom of Assam. Step into a digital sanctuary where the mighty Brahmaputra whispers legends of spirits, kings, and ancient wisdom. <a href="#about" style="color: var(--primary); text-decoration: underline; font-weight: 500;">Read our story &rarr;</a>`;

    // Authentic Full-Width Assamese Geometric Section Divider Component
    function getAssameseDividerSVG() {
        return `
            <div class="assamese-section-divider" aria-hidden="true">
                <svg class="assamese-divider-svg" viewBox="0 0 1200 42" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="dividerFade" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#C8960C" stop-opacity="0"/>
                            <stop offset="15%" stop-color="#C8960C" stop-opacity="0.8"/>
                            <stop offset="50%" stop-color="#C8960C" stop-opacity="1"/>
                            <stop offset="85%" stop-color="#C8960C" stop-opacity="0.8"/>
                            <stop offset="100%" stop-color="#C8960C" stop-opacity="0"/>
                        </linearGradient>
                        <pattern id="assameseDividerPattern" width="40" height="42" patternUnits="userSpaceOnUse">
                            <!-- Stepped Diamonds & River Chevrons -->
                            <path d="M20 5 L33 18 L20 31 L7 18 Z" stroke="#C8960C" stroke-width="1.3" fill="rgba(200, 150, 12, 0.08)"/>
                            <circle cx="20" cy="18" r="2.2" fill="#C8960C"/>
                            <path d="M0 18 L7 18 M33 18 L40 18" stroke="#C8960C" stroke-width="1"/>
                            <!-- River Ripple Chevrons with subtle red woven accent -->
                            <path d="M0 5 L20 20 L40 5 M0 31 L20 16 L40 31" stroke="#b8251b" stroke-width="1" opacity="0.45"/>
                            <!-- Lotus Bud Repeats -->
                            <circle cx="20" cy="3" r="1.5" fill="#ffd866"/>
                            <circle cx="20" cy="33" r="1.5" fill="#ffd866"/>
                        </pattern>
                    </defs>
                    <!-- Horizontal Guide Lines -->
                    <line x1="30" y1="21" x2="1170" y2="21" stroke="url(#dividerFade)" stroke-width="1.2" opacity="0.5"/>
                    <line x1="80" y1="8" x2="1120" y2="8" stroke="url(#dividerFade)" stroke-width="1" stroke-dasharray="4 4" opacity="0.4"/>
                    <line x1="80" y1="34" x2="1120" y2="34" stroke="url(#dividerFade)" stroke-width="1" stroke-dasharray="4 4" opacity="0.4"/>
                    
                    <!-- Repeating Geometric Assamese Motif Band -->
                    <rect x="90" y="3" width="1020" height="36" fill="url(#assameseDividerPattern)" opacity="0.85"/>
                    
                    <!-- Center Ceremonial Kingkhap Medallion -->
                    <g transform="translate(600, 21)">
                        <rect x="-60" y="-18" width="120" height="36" fill="var(--bg-dark, #080d0a)" rx="4"/>
                        <!-- Outer Stepped Diamond -->
                        <path d="M0 -18 L25 0 L0 18 L-25 0 Z" fill="#C8960C" fill-opacity="0.2" stroke="#C8960C" stroke-width="1.8"/>
                        <!-- Inner Red Silk Diamond -->
                        <path d="M0 -11 L15 0 L0 11 L-15 0 Z" fill="#b8251b" fill-opacity="0.4" stroke="#b8251b" stroke-width="1.2"/>
                        <!-- Lotus Core -->
                        <circle cx="0" cy="0" r="4" fill="#C8960C"/>
                        <circle cx="0" cy="-5.5" r="1.3" fill="#ffd866"/>
                        <circle cx="0" cy="5.5" r="1.3" fill="#ffd866"/>
                        <circle cx="-5.5" cy="0" r="1.3" fill="#ffd866"/>
                        <circle cx="5.5" cy="0" r="1.3" fill="#ffd866"/>
                        <!-- Flanking Traditional Rosettes -->
                        <path d="M-36 0 L-46 -7 L-40 0 L-46 7 Z" fill="#C8960C"/>
                        <path d="M36 0 L46 -7 L40 0 L46 7 Z" fill="#C8960C"/>
                    </g>
                </svg>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="hero-section">
            <!-- Floating Decorative Assamese Elements (Opacity 0.15 Gold) -->
            <div class="hero-floating-elements" aria-hidden="true">
                <!-- One-Horned Rhino (Kaziranga Rhino Outline) -->
                <svg class="floating-elem floating-rhino" viewBox="0 0 160 100" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kaziranga One-Horned Rhino">
                    <path d="M14 62 C20 54 26 50 36 50 C40 45 46 42 54 42 C64 42 70 38 76 34 C82 30 92 28 104 28 C118 28 126 34 132 38 C138 34 144 32 150 36 C154 39 156 44 154 48 C158 46 160 48 158 52 C154 58 146 62 138 64 C132 70 128 78 128 88 L120 88 C120 80 122 74 118 70 C108 72 96 72 84 72 C80 78 78 84 78 88 L70 88 C70 80 72 74 68 70 C58 70 48 68 40 72 L38 88 L30 88 C30 78 32 72 26 68 C20 68 16 66 14 62 Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M148 34 C150 24 156 16 160 12 C157 20 155 28 153 36 Z" fill="currentColor" stroke-width="1.5"/>
                    <path d="M128 28 L130 20 L134 26" stroke-width="1.5"/>
                    <path d="M122 28 L124 22 L127 27" stroke-width="1.5"/>
                    <path d="M110 32 C106 42 106 56 112 66" stroke-width="1.8" stroke-dasharray="3 3"/>
                    <path d="M60 44 C56 52 56 60 62 68" stroke-width="1.8" stroke-dasharray="3 3"/>
                    <path d="M80 34 C86 44 86 58 82 70" stroke-width="1.5" opacity="0.6"/>
                    <circle cx="138" cy="42" r="1.5" fill="currentColor"/>
                </svg>

                <!-- Bihu Dhol (Traditional Drum Silhouette) -->
                <svg class="floating-elem floating-dhol" viewBox="0 0 120 90" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Assamese Bihu Dhol">
                    <ellipse cx="28" cy="45" rx="14" ry="26" stroke-width="2"/>
                    <ellipse cx="92" cy="45" rx="14" ry="26" stroke-width="2"/>
                    <path d="M28 19 C55 14 65 14 92 19 M28 71 C55 76 65 76 92 71" stroke-width="2"/>
                    <path d="M28 22 L50 74 L70 20 L92 70 M28 68 L50 16 L70 70 L92 20" stroke-width="1.4" opacity="0.75"/>
                    <ellipse cx="60" cy="45" rx="8" ry="28" stroke-width="1.2" stroke-dasharray="2 3"/>
                    <path d="M12 78 Q45 68 85 82" stroke-width="2.5" stroke-linecap="round"/>
                    <circle cx="28" cy="45" r="5" fill="currentColor" opacity="0.3"/>
                    <circle cx="92" cy="45" r="5" fill="currentColor" opacity="0.3"/>
                </svg>

                <!-- Floating Sacred Lotus (Padum Phool) -->
                <svg class="floating-elem floating-lotus lotus-left" viewBox="0 0 80 80" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Assamese Lotus Motif">
                    <path d="M40 14 C36 26 24 38 12 46 C26 48 36 44 40 54 C44 44 54 48 68 46 C56 38 44 26 40 14 Z" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"/>
                    <path d="M40 26 C38 34 32 42 22 48 C30 49 37 47 40 54 C43 47 50 49 58 48 C48 42 42 34 40 26 Z" stroke-width="1.2"/>
                    <path d="M40 54 L40 68" stroke-width="2" stroke-linecap="round"/>
                    <path d="M30 62 Q40 58 50 62" stroke-width="1.5"/>
                </svg>

                <svg class="floating-elem floating-lotus lotus-right" viewBox="0 0 80 80" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Assamese Lotus Motif">
                    <path d="M40 14 C36 26 24 38 12 46 C26 48 36 44 40 54 C44 44 54 48 68 46 C56 38 44 26 40 14 Z" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"/>
                    <path d="M40 26 C38 34 32 42 22 48 C30 49 37 47 40 54 C43 47 50 49 58 48 C48 42 42 34 40 26 Z" stroke-width="1.2"/>
                    <path d="M40 54 L40 68" stroke-width="2" stroke-linecap="round"/>
                    <path d="M30 62 Q40 58 50 62" stroke-width="1.5"/>
                </svg>
            </div>

            <!-- Large Illustrated Assamese Jappi Hat SVG (Gold with Dark Green Accents & Subtle Glow) -->
            <!-- Authentic Illustrated Assamese Jappi Hat SVG (Viewed from slight angle: wide brim, central cone, radiating spokes, red & green geometric patterns, gold border) -->
            <div class="hero-jappi-container">
                <svg class="hero-jappi-svg" viewBox="0 0 220 180" width="220" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Authentic Assamese Phulam Jappi Hat">
                    <defs>
                        <!-- Soft 3D Ground Shadow under Tilted Hat -->
                        <radialGradient id="jappiUnderShadow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#000000" stop-opacity="0.6"/>
                            <stop offset="65%" stop-color="#000000" stop-opacity="0.2"/>
                            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
                        </radialGradient>

                        <!-- Golden Ambient Aura Glow -->
                        <radialGradient id="jappiGoldAura" cx="50%" cy="45%" r="55%">
                            <stop offset="0%" stop-color="#ffd866" stop-opacity="0.35"/>
                            <stop offset="50%" stop-color="#C8960C" stop-opacity="0.12"/>
                            <stop offset="100%" stop-color="#C8960C" stop-opacity="0"/>
                        </radialGradient>

                        <!-- Tokou Palm Leaf Base Gradients -->
                        <linearGradient id="palmLeafBrim" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#f5e9c9"/>
                            <stop offset="40%" stop-color="#dfc582"/>
                            <stop offset="75%" stop-color="#bfa054"/>
                            <stop offset="100%" stop-color="#785f23"/>
                        </linearGradient>

                        <!-- 3D Conical Crown (Tupi) Gradient Shading -->
                        <linearGradient id="coneShade3D" x1="25%" y1="10%" x2="85%" y2="90%">
                            <stop offset="0%" stop-color="#fff2cc"/>
                            <stop offset="30%" stop-color="#e2c67c"/>
                            <stop offset="65%" stop-color="#a37e2c"/>
                            <stop offset="100%" stop-color="#4d380c"/>
                        </linearGradient>

                        <!-- Metallic Gold Brim Border -->
                        <linearGradient id="goldBrimTrim" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#ffd866"/>
                            <stop offset="30%" stop-color="#C8960C"/>
                            <stop offset="50%" stop-color="#fff0ad"/>
                            <stop offset="75%" stop-color="#C8960C"/>
                            <stop offset="100%" stop-color="#7a5704"/>
                        </linearGradient>

                        <!-- Finial Apex Gradient -->
                        <linearGradient id="finialGold" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#fff5cc"/>
                            <stop offset="45%" stop-color="#ffd866"/>
                            <stop offset="100%" stop-color="#8f6406"/>
                        </linearGradient>
                    </defs>

                    <!-- 1. Ambient Glow & 3D Ground Shadow under the Tilted Hat -->
                    <ellipse cx="110" cy="105" rx="102" ry="65" fill="url(#jappiGoldAura)"/>
                    <ellipse cx="110" cy="150" rx="88" ry="22" fill="url(#jappiUnderShadow)"/>

                    <!-- 2. Main Conical Hat Body (Sloping conical profile viewed from 35-degree perspective) -->
                    <path d="M 110 32 L 206 126 A 96 38 0 0 1 14 126 Z" fill="url(#palmLeafBrim)"/>

                    <!-- Rear Slope of Hat Brim (Back half of conical dish) -->
                    <path d="M 14 126 A 96 38 0 0 1 206 126 L 146 98 A 36 15 0 0 0 74 98 Z" fill="#b8974a" opacity="0.9"/>

                    <!-- Front Slope of Hat Brim (Extending forward towards viewer) -->
                    <path d="M 14 126 A 96 38 0 0 0 206 126 L 146 104 A 36 15 0 0 1 74 104 Z" fill="url(#palmLeafBrim)"/>

                    <!-- Concentric Bamboo Stitched Rings on Brim (Tokou leaf binding splints) -->
                    <ellipse cx="110" cy="122" rx="80" ry="31" fill="none" stroke="#a18035" stroke-width="1.5" stroke-dasharray="4 2.5" opacity="0.75"/>
                    <ellipse cx="110" cy="116" rx="60" ry="23" fill="none" stroke="#a18035" stroke-width="1.4" stroke-dasharray="3.5 2" opacity="0.7"/>

                    <!-- 3. Radiating Bamboo Spokes across the Brim (16 radial ribs from cone base to outer rim) -->
                    <g stroke="#7d5c18" stroke-width="1.2" opacity="0.85">
                        <!-- Left Spokes -->
                        <line x1="74" y1="100" x2="14" y2="126"/>
                        <line x1="78" y1="107" x2="23" y2="139"/>
                        <line x1="84" y1="112" x2="43" y2="151"/>
                        <line x1="94" y1="114" x2="74" y2="159"/>
                        <!-- Center Front Spoke -->
                        <line x1="110" y1="115" x2="110" y2="164" stroke-width="1.5" stroke="#63470f"/>
                        <!-- Right Spokes -->
                        <line x1="126" y1="114" x2="146" y2="159"/>
                        <line x1="136" y1="112" x2="177" y2="151"/>
                        <line x1="142" y1="107" x2="197" y2="139"/>
                        <line x1="146" y1="100" x2="206" y2="126"/>
                        <!-- Rear Spokes -->
                        <line x1="142" y1="93" x2="197" y2="113" opacity="0.6"/>
                        <line x1="136" y1="88" x2="177" y2="101" opacity="0.6"/>
                        <line x1="126" y1="86" x2="146" y2="93" opacity="0.6"/>
                        <line x1="110" y1="85" x2="110" y2="88" opacity="0.6"/>
                        <line x1="94" y1="86" x2="74" y2="93" opacity="0.6"/>
                        <line x1="84" y1="88" x2="43" y2="101" opacity="0.6"/>
                        <line x1="78" y1="93" x2="23" y2="113" opacity="0.6"/>
                    </g>

                    <!-- 4. Traditional Phulam Felt Petals & Diamond Ornaments (Alternating Crimson Red & Forest Green) -->
                    <g id="brim-phulam-decorations">
                        <!-- Outer Brim Triangular Petals (Kanthi) - Crimson Red & Forest Green -->
                        <!-- Front-Left Petals -->
                        <polygon points="20,132 30,138 24,142 16,136" fill="#12542a" stroke="#ffd866" stroke-width="0.8"/>
                        <polygon points="32,143 45,147 38,152 27,147" fill="#b8251b" stroke="#ffd866" stroke-width="0.8"/>
                        <polygon points="53,153 68,155 60,161 48,157" fill="#12542a" stroke="#ffd866" stroke-width="0.8"/>
                        <polygon points="80,160 97,161 90,166 76,163" fill="#b8251b" stroke="#ffd866" stroke-width="0.8"/>
                        
                        <!-- Center Front Diamonds -->
                        <polygon points="102,162 110,157 118,162 110,167" fill="#12542a" stroke="#ffd866" stroke-width="1"/>
                        <circle cx="110" cy="162" r="1.8" fill="#ffd866"/>

                        <!-- Front-Right Petals -->
                        <polygon points="123,161 140,160 144,163 130,166" fill="#b8251b" stroke="#ffd866" stroke-width="0.8"/>
                        <polygon points="152,155 167,153 172,157 160,161" fill="#12542a" stroke="#ffd866" stroke-width="0.8"/>
                        <polygon points="175,147 188,143 193,147 182,152" fill="#b8251b" stroke="#ffd866" stroke-width="0.8"/>
                        <polygon points="190,138 200,132 204,136 196,142" fill="#12542a" stroke="#ffd866" stroke-width="0.8"/>

                        <!-- Mid-Brim Stepped Diamond Motifs -->
                        <g stroke="#ffd866" stroke-width="0.9">
                            <polygon points="48,136 55,131 62,136 55,141" fill="#b8251b"/>
                            <polygon points="75,144 83,138 91,144 83,150" fill="#12542a"/>
                            <polygon points="102,147 110,140 118,147 110,154" fill="#b8251b"/>
                            <polygon points="129,144 137,138 145,144 137,150" fill="#12542a"/>
                            <polygon points="158,136 165,131 172,136 165,141" fill="#b8251b"/>
                            <!-- Rear row diamonds -->
                            <polygon points="60,112 66,108 72,112 66,116" fill="#12542a" opacity="0.75"/>
                            <polygon points="148,112 154,108 160,112 154,116" fill="#b8251b" opacity="0.75"/>
                        </g>
                    </g>

                    <!-- 5. Central Raised Conical Crown (Tupi) rising up in 3D -->
                    <!-- Cone base on brim ellipse -->
                    <ellipse cx="110" cy="102" rx="36" ry="14" fill="#61450e" opacity="0.7"/>

                    <!-- Conical Slope: from base ellipse up to apex (110, 32) -->
                    <path d="M 74 102 L 110 32 L 146 102 A 36 14 0 0 1 74 102 Z" fill="url(#coneShade3D)" stroke="#9e7b25" stroke-width="1.5"/>

                    <!-- Cone Facets & Bamboo Spokes running up to Apex -->
                    <g stroke="#694d13" stroke-width="1.2" opacity="0.8">
                        <line x1="110" y1="32" x2="74" y2="102"/>
                        <line x1="110" y1="32" x2="86" y2="108"/>
                        <line x1="110" y1="32" x2="98" y2="113"/>
                        <line x1="110" y1="32" x2="110" y2="115" stroke-width="1.5" stroke="#4a3307"/>
                        <line x1="110" y1="32" x2="122" y2="113"/>
                        <line x1="110" y1="32" x2="134" y2="108"/>
                        <line x1="110" y1="32" x2="146" y2="102"/>
                    </g>

                    <!-- 3D Shadow on Right Half of the Cone -->
                    <path d="M 110 32 L 146 102 A 36 14 0 0 1 110 115 Z" fill="#2e2005" opacity="0.28"/>

                    <!-- Highlight on Left Flank of Cone -->
                    <path d="M 110 32 L 92 110 A 36 14 0 0 1 80 105 Z" fill="#ffffff" opacity="0.2"/>

                    <!-- Traditional Phulam Felt Patterns on Cone Body (Red & Green Diamonds) -->
                    <g stroke="#ffd866" stroke-width="0.8">
                        <!-- Left Cone Felt Petals -->
                        <polygon points="92,80 97,72 102,80 97,88" fill="#b8251b"/>
                        <polygon points="84,92 88,86 93,92 89,97" fill="#12542a"/>
                        <!-- Center Cone Main Diamond -->
                        <polygon points="103,78 110,68 117,78 110,88" fill="#12542a" stroke-width="1.2"/>
                        <polygon points="106,78 110,72 114,78 110,84" fill="#b8251b"/>
                        <circle cx="110" cy="78" r="1.8" fill="#ffd866"/>
                        <!-- Right Cone Felt Petals -->
                        <polygon points="118,80 123,72 128,80 123,88" fill="#b8251b"/>
                        <polygon points="127,92 131,86 136,92 132,97" fill="#12542a"/>
                    </g>

                    <!-- Collar Band at Base of Cone (Interlocking Red & Green Ring) -->
                    <ellipse cx="110" cy="102" rx="35" ry="13" fill="none" stroke="#b8251b" stroke-width="2.5"/>
                    <ellipse cx="110" cy="102" rx="35" ry="13" fill="none" stroke="#ffd866" stroke-width="1" stroke-dasharray="4 3"/>

                    <!-- 6. Outer Double-Bound Woven Bamboo Brim with Golden Stitches -->
                    <!-- Front Brim Edge (3D Lip) -->
                    <path d="M 14 126 A 96 38 0 0 0 206 126" fill="none" stroke="url(#goldBrimTrim)" stroke-width="4.5" stroke-linecap="round"/>
                    <path d="M 14 128 A 96 38 0 0 0 206 128" fill="none" stroke="#523b08" stroke-width="1.8" stroke-linecap="round" opacity="0.8"/>
                    
                    <!-- Rear Brim Edge -->
                    <path d="M 14 126 A 96 38 0 0 1 206 126" fill="none" stroke="#a1791a" stroke-width="2.5" opacity="0.7"/>

                    <!-- Decorative Binding Marks along Rim (Assamese Cane Weave Stitches) -->
                    <g stroke="#ffe899" stroke-width="1.2" opacity="0.9">
                        <line x1="22" y1="136" x2="26" y2="140"/>
                        <line x1="38" y1="148" x2="42" y2="152"/>
                        <line x1="58" y1="157" x2="62" y2="160"/>
                        <line x1="82" y1="163" x2="85" y2="166"/>
                        <line x1="110" y1="164" x2="110" y2="168"/>
                        <line x1="138" y1="163" x2="135" y2="166"/>
                        <line x1="162" y1="157" x2="158" y2="160"/>
                        <line x1="182" y1="148" x2="178" y2="152"/>
                        <line x1="198" y1="136" x2="194" y2="140"/>
                    </g>

                    <!-- 7. Golden Apex Crown Finial (Chuda) at Pointed Top -->
                    <!-- Red & Green Collar under Finial -->
                    <ellipse cx="110" cy="33" rx="6" ry="2.5" fill="#12542a" stroke="#ffd866" stroke-width="0.8"/>
                    <ellipse cx="110" cy="31" rx="4.5" ry="2" fill="#b8251b"/>
                    
                    <!-- Brass/Gold Spire (Chuda) -->
                    <path d="M 106 31 L 110 18 L 114 31 Z" fill="url(#finialGold)" stroke="#ffd866" stroke-width="0.8"/>
                    <!-- Crown Knob Sphere -->
                    <circle cx="110" cy="18" r="3" fill="url(#finialGold)" stroke="#ffe699" stroke-width="0.8"/>
                    <circle cx="109" cy="16.8" r="1" fill="#ffffff" opacity="0.9"/>
                    <!-- Spire Tip -->
                    <line x1="110" y1="15" x2="110" y2="12" stroke="#ffd866" stroke-width="1.2" stroke-linecap="round"/>
                </svg>
            </div>

            <!-- Gamosa-Inspired Decorative Frame Wrapping Hero Text -->
            <div class="hero-gamosa-frame">
                <!-- Left Gamosa Vertical Woven Border -->
                <div class="gamosa-side-panel gamosa-panel-left" aria-hidden="true"></div>

                <!-- Hero Center Content -->
                <div class="hero-frame-content">
                    <div class="hero-kicker-badge">
                        <span class="motif-glyph">❖</span>
                        <span>অসমৰ লোককথা আৰু ঐতিহ্য &bull; DIGITAL SANCTUARY</span>
                        <span class="motif-glyph">❖</span>
                    </div>
                    <h1 class="page-title hero-title">${title}</h1>
                    <p class="page-subtitle hero-subtitle">${subtitle}</p>
                </div>

                <!-- Right Gamosa Vertical Woven Border -->
                <div class="gamosa-side-panel gamosa-panel-right" aria-hidden="true"></div>
            </div>

            <!-- Full-Width Assamese Geometric Section Divider -->
            ${getAssameseDividerSVG()}

            <!-- Interactive Widgets Grid -->
            <div id="home-widgets" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; max-width: 1040px; margin: 2rem auto; text-align: left;">
                <div class="card manuscript-card" style="flex: 1; min-width: 300px;">
                    <div class="loading-spinner" style="margin: 2rem auto;"></div>
                </div>
            </div>

            <!-- Full-Width Assamese Geometric Section Divider -->
            ${getAssameseDividerSVG()}

            <!-- Direct Entry Sanctuaries -->
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; max-width: 900px; margin: 2rem auto 3rem auto; text-align: left; padding: 0 1rem;">
                <div class="card wisdom-card" style="flex: 1; min-width: 280px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="font-size: 0.75rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--primary); font-weight: 600; margin-bottom: 0.8rem; border-bottom: 1px dashed rgba(200, 150, 12, 0.3); padding-bottom: 0.3rem;">
                            <span>🔮 AI CULTURAL CONSULTANT</span>
                        </div>
                        <h3 style="font-size: 1.45rem; margin-bottom: 1rem; font-family: 'Playfair Display', serif; color: var(--primary);">
                            The Oracle Awaits
                        </h3>
                        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.65;">
                            Consult our AI-powered Oracle to delve deep into ancient stories, analyze morals, or request bilingual explanations of Assamese folk traditions.
                        </p>
                    </div>
                    <button class="btn-primary" style="margin-top: 1.5rem; width: 100%;" onclick="window.location.hash='#chat'">
                        Enter Sanctuary &rarr;
                    </button>
                </div>
                
                <div class="card wisdom-card" style="flex: 1; min-width: 280px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="font-size: 0.75rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--primary); font-weight: 600; margin-bottom: 0.8rem; border-bottom: 1px dashed rgba(200, 150, 12, 0.3); padding-bottom: 0.3rem;">
                            <span>🕸️ LIVING FOLKLORE GRAPH</span>
                        </div>
                        <h3 style="font-size: 1.45rem; margin-bottom: 1rem; font-family: 'Playfair Display', serif; color: var(--primary);">
                            Lore Web
                        </h3>
                        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.65;">
                            Navigate the interconnected web of motifs, characters, and cultural archetypes across Assam's folklore collections.
                        </p>
                    </div>
                    <button class="btn-primary" style="margin-top: 1.5rem; width: 100%;" onclick="window.location.hash='#graph'">
                        Explore Web &rarr;
                    </button>
                </div>
            </div>
        </div>
    `;

    try {
        const [folktalesRes, proverbsRes] = await Promise.all([
            fetch('/folktales.json'),
            fetch('/proverbs.json')
        ]);
        
        const folktalesData = await folktalesRes.json();
        const proverbsData = await proverbsRes.json();
        
        const folktales = folktalesData.entries || [];
        const proverbs = proverbsData.entries || [];
        
        if (folktales.length === 0 || proverbs.length === 0) return;

        const randomFolktale = folktales[Math.floor(Math.random() * folktales.length)];
        const randomProverb = proverbs[Math.floor(Math.random() * proverbs.length)];
        
        const themeCounts = {};
        folktales.forEach(f => {
            const itemThemes = f.themes || [];
            itemThemes.forEach(t => {
                const key = t.toLowerCase().trim();
                themeCounts[key] = (themeCounts[key] || 0) + 1;
            });
        });
        
        const topThemes = Object.entries(themeCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(t => t[0]);

        const themeIcons = {
            'magic': '✨', 'animals': '🐅', 'stepmother': '👩‍👧', 'justice': '⚖️',
            'nature': '🌿', 'family': '👨‍👩‍👧', 'love': '❤️', 'humor': '😂', 'survival': '🔥',
            'greed': '💰', 'friendship': '🤝'
        };

        const taleTitle = lang === 'as' ? (randomFolktale.title_as || randomFolktale.title) : (randomFolktale.title_en || randomFolktale.title.replace(/\s*\(.*?\)/, ''));
        const taleSummary = lang === 'as' ? (randomFolktale.summary_as || randomFolktale.summary) : (randomFolktale.summary_en || randomFolktale.summary);
        
        const proverbPrimary = lang === 'as' ? randomProverb.proverb : randomProverb.translation;
        const proverbSecondary = lang === 'as' ? randomProverb.translation : randomProverb.proverb;

        const widgetsContainer = document.getElementById('home-widgets');
        if (widgetsContainer) {
            widgetsContainer.innerHTML = `
                <!-- Featured Story Card: Ancient Assamese Sanchi Paat Manuscript / Scroll -->
                <div class="card manuscript-card" style="flex: 1.1; min-width: 320px;">
                    <!-- Vermilion 3D Wax Seal with Royal Emblem Relief -->
                    <div class="wax-seal" title="Royal Assamese Sanchi Paat Wax Seal" aria-hidden="true">
                        <div class="wax-seal-inner">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffd866" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2 L14.5 7.5 L20.5 8.5 L16 12.8 L17.2 18.8 L12 15.8 L6.8 18.8 L8 12.8 L3.5 8.5 L9.5 7.5 Z" fill="#ffd866" stroke="#80130b" stroke-width="0.6"/>
                                <circle cx="12" cy="12" r="2.8" fill="#80130b"/>
                                <circle cx="12" cy="12" r="1.3" fill="#ffd866"/>
                            </svg>
                        </div>
                    </div>

                    <div>
                        <div class="manuscript-tag">
                            <span>📜 সাঁচিপাত &bull; FEATURED FOLKTALE</span>
                        </div>
                        <h4 class="manuscript-title">
                            ${taleTitle}
                        </h4>
                        <p class="manuscript-excerpt">
                            &ldquo;${taleSummary.substring(0, 160)}...&rdquo;
                        </p>
                    </div>
                    
                    <div style="margin-top: 1.2rem; display: flex; align-items: center; justify-content: space-between;">
                        <button class="manuscript-btn" onclick="window.location.hash='#folktales'">
                            Unroll Scroll &rarr;
                        </button>
                        <span style="font-size: 0.8rem; color: var(--primary); opacity: 0.8; font-style: italic;">
                            Assam Oral Archive
                        </span>
                    </div>
                </div>
                
                <!-- Daily Wisdom Card: Sattriya Vani Tablet -->
                <div class="card wisdom-card" style="flex: 0.9; min-width: 300px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="font-size: 0.75rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--primary); font-weight: 600; margin-bottom: 0.8rem; border-bottom: 1px dashed rgba(200, 150, 12, 0.3); padding-bottom: 0.3rem;">
                            <span>🎋 প্ৰবচন &bull; DAILY WISDOM</span>
                        </div>
                        <h4 style="font-size: 1.35rem; font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; color: var(--text); font-weight: 600; line-height: 1.35;">
                            ${proverbPrimary}
                        </h4>
                        <p style="color: var(--primary); font-weight: 500; font-size: 0.95rem; margin-bottom: 0.5rem; font-style: italic;">${proverbSecondary}</p>
                        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1rem;">${randomProverb.meaning}</p>
                    </div>
                    <button class="btn-primary" style="padding: 0.45rem 1.2rem; font-size: 0.9rem; align-self: flex-start;" onclick="window.location.hash='#proverbs'">
                        Discover Proverbs &rarr;
                    </button>
                </div>
            `;
            
            const themeHTML = `
                <div style="width: 100%; margin-top: 3rem; text-align: center;">
                    <div style="font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; color: var(--primary); font-weight: 600; margin-bottom: 0.4rem;">
                        <span>❖ সাংস্কৃতিক বৈশিষ্ট্যসমূহ ❖</span>
                    </div>
                    <h3 style="font-size: 2rem; margin-bottom: 0.5rem; font-family: 'Playfair Display', serif; color: var(--primary);">
                        Explore by Cultural Theme
                    </h3>
                    <p style="color: var(--text-muted); margin-bottom: 1.8rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                        Immerse yourself in the sacred motifs, forest spirits, and moral traditions that shape Assamese lore
                    </p>
                    <div class="theme-explorer-grid">
                        ${topThemes.map(t => `
                            <div class="theme-explore-card" onclick="window.location.hash='#folktales'; setTimeout(() => { const btn = Array.from(document.querySelectorAll('.filter-chip')).find(el => el.innerText.toLowerCase() === '${t}'); if(btn) btn.click(); }, 300);">
                                <span class="theme-explore-icon">${themeIcons[t] || '🔖'}</span>
                                <span class="theme-explore-label" style="text-transform: capitalize;">${t}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            widgetsContainer.insertAdjacentHTML('afterend', themeHTML);
        }
    } catch (e) {
        console.error("Failed to load widgets", e);
    }
}
