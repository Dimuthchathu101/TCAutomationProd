// Articles page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeArticles();
    initializeSearch();
    initializeFilters();
    initializePagination();
});

// Sample articles data (in a real app, this would come from an API)
const articlesData = [
    {
        id: 1,
        title: 'CX-Oriented QA Framework for B2B/B2C Applications: Integrating Metrics with Test Coverage',
        excerpt: 'A comprehensive approach to quality assurance that bridges the gap between technical software quality and customer experience through integrated metrics and feedback loops.',
        category: 'testing',
        tags: ['Customer Experience', 'Quality Assurance', 'B2B/B2C', 'Test Coverage', 'Metrics'],
        date: '2025-06-08',
        readTime: 18,
        image: 'images/cx-qa-framework.svg',
        url: 'posts/cx-oriented-qa-framework.html',
        featured: true
    },
    {
        id: 2,
        title: 'ERP TestMaster: Building a Comprehensive Test Automation Framework',
        excerpt: 'Learn how to build a robust test automation framework for Enterprise Resource Planning systems using Playwright, GitHub Actions, and Allure Reporting.',
        category: 'testing',
        tags: ['Test Automation', 'ERP', 'Playwright', 'CI/CD', 'Quality Assurance'],
        date: '2024-12-15',
        readTime: 12,
        image: 'images/erp-testmaster.svg',
        url: 'posts/erp-testmaster-automation-framework.html',
        featured: false
    },
    {
        id: 3,
        title: 'Advanced React Design Patterns for Scalable Applications',
        excerpt: 'Explore advanced React patterns including compound components, render props, and custom hooks for building maintainable and scalable applications.',
        category: 'frontend',
        tags: ['React', 'JavaScript', 'Design Patterns'],
        date: '2024-12-14',
        readTime: 8,
        image: 'images/react-patterns.svg',
        url: 'posts/react-design-patterns.html',
        featured: false
    },
    {
        id: 4,
        title: 'Mastering TypeScript Advanced Features',
        excerpt: 'Deep dive into TypeScript\'s advanced type system, conditional types, and utility types for better type safety.',
        category: 'frontend',
        tags: ['TypeScript', 'JavaScript', 'Type Safety'],
        date: '2024-12-12',
        readTime: 12,
        image: 'images/typescript-advanced.svg',
        url: 'posts/typescript-advanced-features.html'
    },
    {
        id: 5,
        title: 'Node.js Performance Optimization Techniques',
        excerpt: 'Learn advanced techniques for optimizing Node.js applications including memory management, clustering, and profiling.',
        category: 'backend',
        tags: ['Node.js', 'Performance', 'Backend'],
        date: '2024-12-10',
        readTime: 15,
        image: 'images/node-performance.svg',
        url: 'posts/nodejs-performance-optimization.html'
    },
    {
        id: 6,
        title: 'Modern CSS Grid Layout Techniques',
        excerpt: 'Master CSS Grid layout with advanced techniques for responsive design and complex layouts.',
        category: 'frontend',
        tags: ['CSS', 'Grid', 'Layout'],
        date: '2024-12-08',
        readTime: 10,
        image: 'images/css-grid.svg',
        url: 'posts/modern-css-grid-layout.html'
    },
    {
        id: 7,
        title: 'Docker Containerization Best Practices',
        excerpt: 'Learn best practices for containerizing applications with Docker, including multi-stage builds and security considerations.',
        category: 'devops',
        tags: ['Docker', 'DevOps', 'Containers'],
        date: '2024-12-05',
        readTime: 14,
        image: 'images/docker-best-practices.svg',
        url: 'posts/docker-containerization-best-practices.html'
    },
    {
        id: 8,
        title: 'Algorithm Complexity Analysis',
        excerpt: 'Understanding time and space complexity analysis for algorithms and data structures.',
        category: 'algorithms',
        tags: ['Algorithms', 'Complexity', 'Data Structures'],
        date: '2024-12-03',
        readTime: 18,
        image: 'images/algorithm-complexity.svg',
        url: 'posts/algorithm-complexity-analysis.html'
    },
    {
        id: 9,
        title: 'Vue.js 3 Composition API Deep Dive',
        excerpt: 'Explore Vue.js 3 Composition API with practical examples and advanced patterns.',
        category: 'frontend',
        tags: ['Vue.js', 'JavaScript', 'Composition API'],
        date: '2024-11-30',
        readTime: 11,
        image: 'images/vue-composition-api.svg',
        url: 'posts/vue-js-3-composition-api.html'
    },
    {
        id: 10,
        title: 'Python Async Programming Patterns',
        excerpt: 'Master asynchronous programming in Python with asyncio, aiohttp, and advanced patterns.',
        category: 'backend',
        tags: ['Python', 'Async', 'Backend'],
        date: '2024-11-28',
        readTime: 16,
        image: 'images/python-async.jpg',
        url: 'posts/python-async-programming-patterns.html'
    },
    {
        id: 11,
        title: 'Kubernetes Deployment Strategies',
        excerpt: 'Learn different deployment strategies in Kubernetes for zero-downtime deployments.',
        category: 'devops',
        tags: ['Kubernetes', 'DevOps', 'Deployment'],
        date: '2024-11-25',
        readTime: 13,
        image: 'images/kubernetes-deployment.jpg',
        url: 'posts/kubernetes-deployment-strategies.html'
    },
    {
        id: 12,
        title: 'Dynamic Programming Problem Solving',
        excerpt: 'Master dynamic programming techniques for solving complex algorithmic problems.',
        category: 'algorithms',
        tags: ['Algorithms', 'Dynamic Programming', 'Problem Solving'],
        date: '2024-11-22',
        readTime: 20,
        image: 'images/dynamic-programming.jpg',
        url: 'posts/dynamic-programming-problem-solving.html'
    }
];

let currentArticles = [...articlesData];
let currentPage = 1;
const articlesPerPage = 6;

function initializeArticles() {
    renderArticles();
}

function renderArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const pageArticles = currentArticles.slice(startIndex, endIndex);
    
    articlesGrid.innerHTML = pageArticles.map(article => createArticleCard(article)).join('');
    
    updatePagination();
}

function createArticleCard(article) {
    const date = new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    return `
        <article class="article-card ${article.featured ? 'featured' : ''}">
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <div class="article-category">${getCategoryDisplayName(article.category)}</div>
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span class="article-date">${date}</span>
                    <span class="article-read-time">${article.readTime} min read</span>
                </div>
                <h3 class="article-title">
                    <a href="${article.url}">${article.title}</a>
                </h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-tags">
                    ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </article>
    `;
}

function getCategoryDisplayName(category) {
    const categoryMap = {
        'frontend': 'Frontend',
        'backend': 'Backend',
        'devops': 'DevOps',
        'algorithms': 'Algorithms',
        'testing': 'Testing'
    };
    return categoryMap[category] || category;
}

function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(e.target.value);
            }, 300);
        });
        
        if (searchButton) {
            searchButton.addEventListener('click', () => {
                performSearch(searchInput.value);
            });
        }
    }
}

function performSearch(query) {
    if (!query.trim()) {
        currentArticles = [...articlesData];
    } else {
        const searchTerm = query.toLowerCase();
        currentArticles = articlesData.filter(article => 
            article.title.toLowerCase().includes(searchTerm) ||
            article.excerpt.toLowerCase().includes(searchTerm) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    currentPage = 1;
    renderArticles();
    updateSearchResults(query);
}

function updateSearchResults(query) {
    const searchResults = document.getElementById('search-results');
    
    if (!query.trim()) {
        searchResults.style.display = 'none';
        return;
    }
    
    const results = currentArticles.slice(0, 5);
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">No articles found</div>';
    } else {
        searchResults.innerHTML = results.map(article => `
            <a href="${article.url}" class="search-result-item">
                <h4>${article.title}</h4>
                <p>${article.excerpt.substring(0, 100)}...</p>
            </a>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

function initializeFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    let filteredArticles = [...articlesData];
    
    // Apply category filter
    if (categoryFilter && categoryFilter.value) {
        filteredArticles = filteredArticles.filter(article => 
            article.category === categoryFilter.value
        );
    }
    
    // Apply sorting
    if (sortFilter && sortFilter.value) {
        switch (sortFilter.value) {
            case 'newest':
                filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'oldest':
                filteredArticles.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'popular':
                // In a real app, this would use view count or likes
                filteredArticles.sort((a, b) => b.readTime - a.readTime);
                break;
            case 'title':
                filteredArticles.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }
    }
    
    currentArticles = filteredArticles;
    currentPage = 1;
    renderArticles();
}

function initializePagination() {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const paginationNumbers = document.getElementById('pagination-numbers');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderArticles();
            }
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const maxPages = Math.ceil(currentArticles.length / articlesPerPage);
            if (currentPage < maxPages) {
                currentPage++;
                renderArticles();
            }
        });
    }
    
    if (paginationNumbers) {
        paginationNumbers.addEventListener('click', (e) => {
            if (e.target.classList.contains('pagination-btn') && !e.target.classList.contains('prev') && !e.target.classList.contains('next')) {
                currentPage = parseInt(e.target.textContent);
                renderArticles();
            }
        });
    }
}

function updatePagination() {
    const totalPages = Math.ceil(currentArticles.length / articlesPerPage);
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const paginationNumbers = document.getElementById('pagination-numbers');
    
    // Update prev/next buttons
    if (prevButton) {
        prevButton.disabled = currentPage === 1;
    }
    
    if (nextButton) {
        nextButton.disabled = currentPage === totalPages;
    }
    
    // Update pagination numbers
    if (paginationNumbers) {
        let paginationHTML = '';
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}">${i}</button>`;
        }
        
        paginationNumbers.innerHTML = paginationHTML;
    }
    
    // Show/hide pagination based on results
    const pagination = document.getElementById('pagination');
    if (pagination) {
        pagination.style.display = totalPages > 1 ? 'flex' : 'none';
    }
}

// Add CSS for new components
const additionalStyles = `
    .page-header {
        padding: var(--spacing-3xl) 0 var(--spacing-2xl);
        background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        border-bottom: 1px solid var(--border-color);
    }
    
    .page-title {
        font-size: var(--font-size-4xl);
        font-weight: 700;
        margin-bottom: var(--spacing-sm);
        text-align: center;
    }
    
    .page-subtitle {
        font-size: var(--font-size-lg);
        color: var(--text-secondary);
        text-align: center;
        margin-bottom: var(--spacing-2xl);
    }
    
    .search-filters {
        display: flex;
        gap: var(--spacing-lg);
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .search-box {
        position: relative;
        min-width: 300px;
    }
    
    .search-input {
        width: 100%;
        padding: var(--spacing-md) var(--spacing-lg);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        font-size: var(--font-size-base);
        background-color: var(--bg-card);
        color: var(--text-primary);
        transition: all var(--transition-fast);
    }
    
    .search-input:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .search-button {
        position: absolute;
        right: var(--spacing-sm);
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        padding: var(--spacing-sm);
        border-radius: var(--radius-md);
        transition: background-color var(--transition-fast);
    }
    
    .search-button:hover {
        background-color: var(--bg-secondary);
    }
    
    .search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        max-height: 400px;
        overflow-y: auto;
        display: none;
    }
    
    .search-result-item {
        display: block;
        padding: var(--spacing-md);
        border-bottom: 1px solid var(--border-color);
        text-decoration: none;
        color: var(--text-primary);
        transition: background-color var(--transition-fast);
    }
    
    .search-result-item:hover {
        background-color: var(--bg-secondary);
    }
    
    .search-result-item:last-child {
        border-bottom: none;
    }
    
    .search-result-item h4 {
        margin-bottom: var(--spacing-xs);
        font-size: var(--font-size-base);
    }
    
    .search-result-item p {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        margin: 0;
    }
    
    .search-no-results {
        padding: var(--spacing-lg);
        text-align: center;
        color: var(--text-secondary);
    }
    
    .filters {
        display: flex;
        gap: var(--spacing-md);
    }
    
    .filter-select {
        padding: var(--spacing-md) var(--spacing-lg);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        background-color: var(--bg-card);
        color: var(--text-primary);
        font-size: var(--font-size-base);
        cursor: pointer;
        transition: all var(--transition-fast);
    }
    
    .filter-select:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .articles-section {
        padding: var(--spacing-3xl) 0;
    }
    
    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-3xl);
    }
    
    .pagination-numbers {
        display: flex;
        gap: var(--spacing-xs);
    }
    
    .pagination-btn {
        padding: var(--spacing-sm) var(--spacing-md);
        border: 1px solid var(--border-color);
        background-color: var(--bg-card);
        color: var(--text-primary);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all var(--transition-fast);
        min-width: 40px;
        text-align: center;
    }
    
    .pagination-btn:hover:not(:disabled) {
        background-color: var(--primary-color);
        color: var(--text-inverse);
        border-color: var(--primary-color);
    }
    
    .pagination-btn.active {
        background-color: var(--primary-color);
        color: var(--text-inverse);
        border-color: var(--primary-color);
    }
    
    .pagination-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    @media (max-width: 768px) {
        .search-filters {
            flex-direction: column;
            align-items: stretch;
        }
        
        .search-box {
            min-width: auto;
        }
        
        .filters {
            flex-direction: column;
        }
        
        .pagination {
            flex-wrap: wrap;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 