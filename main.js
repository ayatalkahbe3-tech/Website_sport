// SportsPulse - Main JavaScript File
// Premium Sports Website Functionality

class SportsPulse {
    constructor() {
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupDarkMode();
        this.initializeLiveScores();
        this.setupMobileMenu();
        this.initializeScrollEffects();
    }

    setupEventListeners() {
        // Dark mode toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        }

        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const closeMobileMenu = document.getElementById('closeMobileMenu');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => this.openMobileMenu());
        }
        
        if (closeMobileMenu) {
            closeMobileMenu.addEventListener('click', () => this.closeMobileMenu());
        }

        // Newsletter form
        const newsletterForm = document.querySelector('form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Card hover effects
        document.querySelectorAll('.card-hover').forEach(card => {
            card.addEventListener('mouseenter', () => this.animateCardHover(card, true));
            card.addEventListener('mouseleave', () => this.animateCardHover(card, false));
        });
    }

    setupDarkMode() {
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
            this.updateDarkModeIcon();
        }
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', this.isDarkMode);
        this.updateDarkModeIcon();
        
        // Animate the transition
        anime({
            targets: 'body',
            duration: 300,
            easing: 'easeInOutQuad'
        });
    }

    updateDarkModeIcon() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            const icon = darkModeToggle.querySelector('span');
            icon.textContent = this.isDarkMode ? '☀️' : '🌙';
        }
    }

    setupMobileMenu() {
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    this.closeMobileMenu();
                }
            }
        });
    }

    openMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    initializeAnimations() {
        // Fade in animations for hero section
        anime.timeline({
            easing: 'easeOutExpo',
            duration: 1000
        })
        .add({
            targets: '.animate-fade-in',
            opacity: [0, 1],
            translateY: [50, 0],
            delay: 300
        })
        .add({
            targets: '.animate-fade-in-delay',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: 200
        }, '-=800')
        .add({
            targets: '.animate-fade-in-delay-2',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: 100
        }, '-=600');

        // Stagger animation for news cards
        anime({
            targets: '.card-hover',
            opacity: [0, 1],
            translateY: [50, 0],
            delay: anime.stagger(200, {start: 800}),
            duration: 800,
            easing: 'easeOutExpo'
        });
    }

    initializeLiveScores() {
        // Simulate live score updates
        setInterval(() => {
            this.updateLiveScores();
        }, 30000); // Update every 30 seconds

        // Initial update
        setTimeout(() => {
            this.updateLiveScores();
        }, 5000);
    }

    updateLiveScores() {
        // Simulate score changes (in a real app, this would fetch from API)
        const liveMatches = document.querySelectorAll('.match-live');
        
        liveMatches.forEach(match => {
            const scoreElement = match.querySelector('.text-4xl');
            if (scoreElement && Math.random() > 0.7) { // 30% chance of score update
                this.animateScoreChange(scoreElement);
            }
        });
    }

    animateScoreChange(element) {
        // Flash effect for score changes
        anime({
            targets: element,
            scale: [1, 1.2, 1],
            duration: 600,
            easing: 'easeInOutQuad'
        });

        // Add temporary glow effect
        element.style.textShadow = '0 0 20px var(--accent-orange)';
        setTimeout(() => {
            element.style.textShadow = '';
        }, 1000);
    }

    animateCardHover(card, isHover) {
        const image = card.querySelector('img');
        const title = card.querySelector('h3');
        
        if (isHover) {
            // Scale up image
            anime({
                targets: image,
                scale: 1.1,
                duration: 300,
                easing: 'easeOutQuad'
            });

            // Change title color
            if (title) {
                anime({
                    targets: title,
                    color: '#ff6b35',
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            }
        } else {
            // Reset image scale
            anime({
                targets: image,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });

            // Reset title color
            if (title) {
                anime({
                    targets: title,
                    color: '#ffffff',
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            }
        }
    }

    initializeScrollEffects() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateOnScroll(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    animateOnScroll(element) {
        const children = element.querySelectorAll('.card-hover, h2, h3, p');
        
        anime({
            targets: children,
            opacity: [0.7, 1],
            translateY: [20, 0],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutQuad'
        });
    }

    handleNewsletterSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;
        
        if (this.validateEmail(email)) {
            this.showNotification('تم الاشتراك بنجاح! شكراً لك.', 'success');
            form.reset();
        } else {
            this.showNotification('يرجى إدخال بريد إلكتروني صحيح.', 'error');
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-600' : 
            type === 'error' ? 'bg-red-600' : 'bg-blue-600'
        } text-white`;
        
        notification.innerHTML = `
            <div class="flex items-center">
                <span class="flex-1">${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Utility functions
    static formatTime(date) {
        return new Intl.DateTimeFormat('ar-SA', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }

    static formatDate(date) {
        return new Intl.DateTimeFormat('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }

    static showLoading(element) {
        element.innerHTML = '<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>';
    }

    static hideLoading(element, originalContent) {
        element.innerHTML = originalContent;
    }
}

// Match Data Manager (for live scores simulation)
class MatchDataManager {
    constructor() {
        this.matches = new Map();
        this.initializeMatches();
    }

    initializeMatches() {
        // Sample match data
        this.matches.set('liverpool-city', {
            home: 'ليفربول',
            away: 'مانشستر سيتي',
            homeScore: 1,
            awayScore: 1,
            status: 'live',
            minute: 67,
            competition: 'الدوري الإنجليزي'
        });

        this.matches.set('saudi-egypt', {
            home: 'المنتخب السعودي',
            away: 'المنتخب المصري',
            homeScore: 0,
            awayScore: 0,
            status: 'scheduled',
            minute: 0,
            competition: 'كأس العرب'
        });
    }

    updateMatch(matchId, updates) {
        if (this.matches.has(matchId)) {
            const match = this.matches.get(matchId);
            Object.assign(match, updates);
            this.matches.set(matchId, match);
            return match;
        }
        return null;
    }

    getMatch(matchId) {
        return this.matches.get(matchId);
    }

    getAllMatches() {
        return Array.from(this.matches.values());
    }

    simulateScoreUpdate(matchId) {
        const match = this.matches.get(matchId);
        if (match && match.status === 'live') {
            // Randomly update scores
            if (Math.random() > 0.5) {
                match.homeScore += 1;
            } else {
                match.awayScore += 1;
            }
            match.minute += Math.floor(Math.random() * 5) + 1;
            
            this.updateMatch(matchId, match);
            return match;
        }
        return null;
    }
}

// News Data Manager
class NewsDataManager {
    constructor() {
        this.news = [];
        this.initializeNews();
    }

    initializeNews() {
        this.news = [
            {
                id: 1,
                title: 'فوز تاريخي للمنتخب في مباراة الافتتاح',
                content: 'حقق المنتخب الوطني فوزاً تاريخياً في مباراة الافتتاح ضمن البطولة القارية...',
                image: 'https://kimi-web-img.moonshot.cn/img/media.istockphoto.com/37bfbfa9c19211d48231c99b5c7af7efaec2cf8d.jpg',
                category: 'كرة قدم',
                author: 'محمد أحمد',
                date: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
                views: 1250,
                featured: true
            },
            {
                id: 2,
                title: 'مفاجأة كبرى في دوري الأبطال',
                content: 'شهدت مباريات دوري الأبطال مفاجأة من العيار الثقيل...',
                image: 'https://kimi-web-img.moonshot.cn/img/media.istockphoto.com/89f28affcc7354293c7000712789d9b60bf67686.jpg',
                category: 'دوري أبطال أوروبا',
                author: 'سارة محمد',
                date: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
                views: 890,
                featured: false
            },
            {
                id: 3,
                title: 'نجم السلة الجديد يخطف الأضواء',
                content: 'اللاعب الشاب يوسف أحمد يخطف الأضواء في الدوري الأمريكي...',
                image: 'https://kimi-web-img.moonshot.cn/img/img.freepik.com/214bbcfbf546629e029efe87fcae1945fba45b96.jpg',
                category: 'كرة سلة',
                author: 'أحمد يوسف',
                date: new Date(Date.now() - 7 * 60 * 60 * 1000), // 7 hours ago
                views: 2100,
                featured: true
            }
        ];
    }

    getNews(id = null) {
        if (id) {
            return this.news.find(item => item.id === id);
        }
        return this.news;
    }

    getFeaturedNews() {
        return this.news.filter(item => item.featured);
    }

    getNewsByCategory(category) {
        return this.news.filter(item => item.category === category);
    }

    addNews(newsItem) {
        newsItem.id = this.news.length + 1;
        newsItem.date = new Date();
        newsItem.views = 0;
        this.news.unshift(newsItem);
        return newsItem;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main application
    window.sportsPulse = new SportsPulse();
    
    // Initialize data managers
    window.matchDataManager = new MatchDataManager();
    window.newsDataManager = new NewsDataManager();
    
    // Add some interactive features
    setupInteractiveFeatures();
    
    console.log('SportsPulse initialized successfully!');
});

function setupInteractiveFeatures() {
    // Add click handlers for match follow buttons
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('متابعة') || button.textContent.includes('تذكير')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Show notification
                const message = button.textContent.includes('متابعة') ? 
                    'سيتم إشعارك بأحدث المباراة!' : 
                    'سنرسل لك تذكيراً قبل المباراة!';
                
                SportsPulse.prototype.showNotification(message, 'success');
                
                // Animate button
                anime({
                    targets: button,
                    scale: [1, 0.95, 1],
                    duration: 200,
                    easing: 'easeInOutQuad'
                });
            });
        }
    });

    // Add click handlers for news cards
    document.querySelectorAll('.card-hover').forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent clicks on buttons inside cards
            if (e.target.tagName === 'BUTTON') return;
            
            // Get news title for notification
            const title = card.querySelector('h3')?.textContent || 'الخبر';
            
            // Show notification
            SportsPulse.prototype.showNotification(`جاري فتح ${title}...`, 'info');
            
            // In a real app, this would navigate to the news detail page
            // window.location.href = `news-detail.html?id=${newsId}`;
        });
    });

    // Add parallax effect to hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-bg::before');
        
        if (heroBackground) {
            const speed = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${speed}px)`;
        }
    });

    // Add loading animation for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            anime({
                targets: this,
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SportsPulse, MatchDataManager, NewsDataManager };
}