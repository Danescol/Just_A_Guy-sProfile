// LinkTree Interactive Features
class LinkTree {
    constructor() {
        this.links = {
            website: 'https://minecraft-tools-wiki.super.site/',
            modrinth: 'https://just-a-guy-yt.itch.io/',
            curseforge: 'https://www.curseforge.com/members/vanilama/projects',
            mcfiles: 'https://drive.google.com/drive/folders/1vBRGisZKlpO1clAqOW7-MXbw01vDIXXN?usp=sharing',
            discord: 'https://discord.gg/aVs8k9ZSMR',
            github: 'https://linktr.ee/vanilama',
            coffee: 'https://linktr.ee/vanilama'
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.animateOnLoad();
        this.setupIntersectionObserver();
    }

    setupEventListeners() {
        // Link card click handlers
        document.querySelectorAll('.link-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.handleLinkClick(e.currentTarget);
            });

            // Add hover sound effect (optional)
            card.addEventListener('mouseenter', () => {
                this.playHoverEffect();
            });
        });

        // Social link handlers
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSocialClick(link);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    }

    handleLinkClick(card) {
        const linkType = card.dataset.link;
        const url = this.links[linkType];
        
        if (url) {
            // Add click animation
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
                this.openLink(url);
            }, 150);
        }
    }

    handleSocialClick(link) {
        // Add ripple effect
        this.createRippleEffect(link);
        
        // Simulate social link opening
        setTimeout(() => {
            const platform = link.querySelector('i').classList[1].split('-')[1];
            const urls = {
                youtube: 'https://www.youtube.com/@JustAGuy-dec',
                discord: 'https://discord.gg/aVs8k9ZSMR',
                github: 'https://github.com/Danescol/'
            };
            
            if (urls[platform]) {
                this.openLink(urls[platform]);
            }
        }, 300);
    }

    openLink(url) {
        // Create a temporary anchor to handle the link
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }

    createRippleEffect(element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = rect.width / 2;
        const y = rect.height / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x - size/2}px;
            top: ${y - size/2}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    playHoverEffect() {
        // Optional: Add subtle audio feedback
        // const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
        // audio.volume = 0.1;
        // audio.play().catch(() => {});
    }

    animateOnLoad() {
        // Stagger animation for link cards
        const cards = document.querySelectorAll('.link-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('loading');
        });

        // Animate profile section
        const profileSection = document.querySelector('.profile-section');
        profileSection.style.animationDelay = '0.2s';
        profileSection.classList.add('loading');
    }

    setupIntersectionObserver() {
        // Add scroll-based animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.link-card').forEach(card => {
            observer.observe(card);
        });
    }

    handleTabNavigation(e) {
        const focusableElements = document.querySelectorAll('.link-card, .social-link');
        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
        
        if (e.shiftKey) {
            // Shift+Tab (backward)
            if (currentIndex > 0) {
                e.preventDefault();
                focusableElements[currentIndex - 1].focus();
            }
        } else {
            // Tab (forward)
            if (currentIndex < focusableElements.length - 1) {
                e.preventDefault();
                focusableElements[currentIndex + 1].focus();
            }
        }
    }

    // Utility method to update profile info dynamically
    updateProfileInfo(name, bio, avatar) {
        if (name) document.querySelector('.profile-name').textContent = name;
        if (bio) document.querySelector('.profile-bio').textContent = bio;
        if (avatar) document.querySelector('.avatar').src = avatar;
    }

    // Method to add new links dynamically
    addLink(type, title, description, icon, url) {
        this.links[type] = url;
        
        const linksSection = document.querySelector('.links-section');
        const newCard = document.createElement('div');
        newCard.className = 'link-card';
        newCard.dataset.link = type;
        
        newCard.innerHTML = `
            <div class="link-icon">
                <i class="${icon}"></i>
            </div>
            <div class="link-content">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
            <i class="fas fa-external-link-alt"></i>
        `;
        
        linksSection.appendChild(newCard);
        
        // Add event listener to new card
        newCard.addEventListener('click', () => {
            this.handleLinkClick(newCard);
        });
        
        // Animate new card
        setTimeout(() => {
            newCard.style.animationDelay = '0s';
            newCard.classList.add('loading');
        }, 100);
    }
}

// CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .link-card:focus,
    .social-link:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    .visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize the LinkTree when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const linkTree = new LinkTree();
    
    // Make it globally accessible for debugging
    window.linkTree = linkTree;
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`LinkTree loaded in ${loadTime}ms`);
        });
    }
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Add dark/light mode toggle functionality (bonus feature)
function addDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.className = 'theme-toggle';
    toggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--surface-color);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-primary);
    `;
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        toggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
    
    document.body.appendChild(toggle);
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Add the theme toggle
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addDarkModeToggle, 1000);
});
