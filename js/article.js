// Article page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeTableOfContents();
    initializeReadingProgress();
    initializeArticleActions();
    initializeCodeBlocks();
    initializeSmoothScrolling();
});

function initializeTableOfContents() {
    const tocSidebar = document.getElementById('toc-sidebar');
    const tocToggle = document.getElementById('toc-toggle');
    const tocNav = document.getElementById('toc-nav');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    if (tocToggle && tocSidebar) {
        tocToggle.addEventListener('click', () => {
            tocSidebar.classList.toggle('collapsed');
        });
    }
    
    // Highlight current section in TOC
    const observerOptions = {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const tocLink = document.querySelector(`.toc-link[href="#${id}"]`);
            
            if (entry.isIntersecting) {
                // Remove active class from all links
                tocLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current link
                if (tocLink) {
                    tocLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));
    
    // Smooth scroll for TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const progressBarElement = progressBar.querySelector('.reading-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBarElement.style.width = scrollPercent + '%';
    });
}

function initializeArticleActions() {
    const likeButton = document.getElementById('like-button');
    const shareButton = document.getElementById('share-button');
    
    if (likeButton) {
        likeButton.addEventListener('click', () => {
            const likeCount = likeButton.querySelector('.like-count');
            const currentLikes = parseInt(likeCount.textContent);
            const newLikes = currentLikes + 1;
            
            likeCount.textContent = newLikes;
            likeButton.classList.add('liked');
            
            // Save to localStorage
            localStorage.setItem('article-likes', newLikes.toString());
            
            showNotification('Thanks for liking this article!', 'success');
        });
    }
    
    if (shareButton) {
        shareButton.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    text: document.querySelector('.article-subtitle').textContent,
                    url: window.location.href
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    showNotification('Link copied to clipboard!', 'success');
                });
            }
        });
    }
}

function initializeCodeBlocks() {
    // Add line numbers to code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(codeBlock => {
        const pre = codeBlock.parentElement;
        const lines = codeBlock.textContent.split('\n');
        
        if (lines.length > 1) {
            pre.classList.add('line-numbers');
            
            // Add line numbers
            const lineNumbers = document.createElement('div');
            lineNumbers.className = 'line-numbers-rows';
            
            for (let i = 1; i <= lines.length; i++) {
                const lineNumber = document.createElement('span');
                lineNumber.textContent = i;
                lineNumbers.appendChild(lineNumber);
            }
            
            pre.appendChild(lineNumbers);
        }
    });
}

function initializeSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add CSS for article-specific components
const articleStyles = `
    .article-main {
        padding: var(--spacing-3xl) 0;
    }
    
    .article-layout {
        display: grid;
        grid-template-columns: 250px 1fr;
        gap: var(--spacing-2xl);
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .toc-sidebar {
        position: sticky;
        top: 100px;
        height: fit-content;
        background-color: var(--bg-card);
        border-radius: var(--radius-xl);
        padding: var(--spacing-lg);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-md);
        transition: all var(--transition-normal);
    }
    
    .toc-sidebar.collapsed {
        transform: translateX(-100%);
        opacity: 0;
    }
    
    .toc-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--spacing-md);
        padding-bottom: var(--spacing-md);
        border-bottom: 1px solid var(--border-color);
    }
    
    .toc-header h3 {
        margin: 0;
        font-size: var(--font-size-lg);
        color: var(--text-primary);
    }
    
    .toc-toggle {
        background: none;
        border: none;
        cursor: pointer;
        padding: var(--spacing-sm);
        border-radius: var(--radius-md);
        transition: background-color var(--transition-fast);
    }
    
    .toc-toggle:hover {
        background-color: var(--bg-secondary);
    }
    
    .toc-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    
    .toc-list li {
        margin-bottom: var(--spacing-sm);
    }
    
    .toc-link {
        display: block;
        padding: var(--spacing-sm) var(--spacing-md);
        color: var(--text-secondary);
        text-decoration: none;
        border-radius: var(--radius-md);
        transition: all var(--transition-fast);
        font-size: var(--font-size-sm);
    }
    
    .toc-link:hover {
        background-color: var(--bg-secondary);
        color: var(--text-primary);
    }
    
    .toc-link.active {
        background-color: var(--primary-color);
        color: var(--text-inverse);
    }
    
    .article-content {
        max-width: 800px;
    }
    
    .article-header {
        margin-bottom: var(--spacing-3xl);
        text-align: center;
    }
    
    .article-title {
        font-size: var(--font-size-4xl);
        font-weight: 700;
        margin-bottom: var(--spacing-lg);
        line-height: 1.2;
    }
    
    .article-subtitle {
        font-size: var(--font-size-lg);
        color: var(--text-secondary);
        margin-bottom: var(--spacing-xl);
        line-height: var(--line-height-relaxed);
    }
    
    .article-body {
        font-size: var(--font-size-base);
        line-height: var(--line-height-relaxed);
    }
    
    .article-body h2 {
        font-size: var(--font-size-2xl);
        margin-top: var(--spacing-3xl);
        margin-bottom: var(--spacing-lg);
        padding-bottom: var(--spacing-sm);
        border-bottom: 2px solid var(--border-color);
    }
    
    .article-body h3 {
        font-size: var(--font-size-xl);
        margin-top: var(--spacing-2xl);
        margin-bottom: var(--spacing-md);
    }
    
    .article-body p {
        margin-bottom: var(--spacing-lg);
        color: var(--text-secondary);
    }
    
    .article-body ul, .article-body ol {
        margin-bottom: var(--spacing-lg);
        padding-left: var(--spacing-xl);
    }
    
    .article-body li {
        margin-bottom: var(--spacing-sm);
        color: var(--text-secondary);
    }
    
    .article-body strong {
        color: var(--text-primary);
        font-weight: 600;
    }
    
    .article-body pre {
        margin: var(--spacing-xl) 0;
        border-radius: var(--radius-lg);
        overflow: hidden;
    }
    
    .article-body code {
        font-family: var(--font-mono);
        background-color: var(--bg-secondary);
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-sm);
        font-size: 0.9em;
    }
    
    .article-footer {
        margin-top: var(--spacing-3xl);
        padding-top: var(--spacing-2xl);
        border-top: 1px solid var(--border-color);
    }
    
    .article-actions {
        display: flex;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-2xl);
        justify-content: center;
    }
    
    .like-button.liked {
        background-color: var(--accent-color);
        color: var(--text-inverse);
    }
    
    .article-author {
        background-color: var(--bg-secondary);
        padding: var(--spacing-xl);
        border-radius: var(--radius-xl);
        border: 1px solid var(--border-color);
    }
    
    .author-info {
        display: flex;
        align-items: center;
        gap: var(--spacing-lg);
    }
    
    .author-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .author-details h4 {
        margin-bottom: var(--spacing-sm);
        color: var(--text-primary);
    }
    
    .author-details p {
        margin: 0;
        color: var(--text-secondary);
        font-size: var(--font-size-sm);
    }
    
    .reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background-color: var(--bg-secondary);
        z-index: 1000;
    }
    
    .reading-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        width: 0%;
        transition: width 0.1s ease;
    }
    
    .line-numbers {
        position: relative;
        padding-left: 3.8em;
        counter-reset: line;
    }
    
    .line-numbers-rows {
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        width: 3em;
        letter-spacing: -1px;
        border-right: 1px solid var(--border-color);
        font-size: 100%;
        font-family: var(--font-mono);
        font-size: 0.875rem;
        line-height: 1.6;
        padding: 1.5rem 0.5rem;
        color: var(--text-muted);
        background-color: var(--bg-secondary);
    }
    
    .line-numbers-rows > span:before {
        content: counter(line);
        counter-increment: line;
    }
    
    @media (max-width: 1024px) {
        .article-layout {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
        }
        
        .toc-sidebar {
            position: static;
            order: -1;
        }
        
        .toc-sidebar.collapsed {
            transform: none;
            opacity: 1;
        }
        
        .toc-nav {
            display: none;
        }
        
        .toc-sidebar:not(.collapsed) .toc-nav {
            display: block;
        }
    }
    
    @media (max-width: 768px) {
        .article-title {
            font-size: var(--font-size-3xl);
        }
        
        .article-actions {
            flex-direction: column;
            align-items: center;
        }
        
        .author-info {
            flex-direction: column;
            text-align: center;
        }
        
        .article-body h2 {
            font-size: var(--font-size-xl);
        }
        
        .article-body h3 {
            font-size: var(--font-size-lg);
        }
    }
`;

// Inject article styles
const articleStyleSheet = document.createElement('style');
articleStyleSheet.textContent = articleStyles;
document.head.appendChild(articleStyleSheet); 