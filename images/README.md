# Images Directory

This directory contains all image assets for the BitAndBuild technical blog.

## Required Images

### Article Images
- `react-patterns.jpg` - React Design Patterns article
- `typescript-advanced.jpg` - TypeScript Advanced Features article
- `node-performance.jpg` - Node.js Performance Optimization article
- `css-grid.jpg` - Modern CSS Grid Layout article
- `docker-best-practices.jpg` - Docker Containerization article
- `algorithm-complexity.jpg` - Algorithm Complexity Analysis article
- `vue-composition-api.jpg` - Vue.js 3 Composition API article
- `python-async.jpg` - Python Async Programming article
- `kubernetes-deployment.jpg` - Kubernetes Deployment Strategies article
- `dynamic-programming.jpg` - Dynamic Programming Problem Solving article

### Brand Images
- `favicon.ico` - Website favicon
- `og-image.jpg` - Default Open Graph image
- `author-avatar.jpg` - Author profile picture

## Image Specifications

### Article Images
- **Dimensions**: 800x400px (2:1 aspect ratio)
- **Format**: JPG or WebP
- **File Size**: < 200KB each
- **Quality**: High quality, relevant to article content

### Brand Images
- **Favicon**: 32x32px, ICO format
- **OG Image**: 1200x630px, JPG format
- **Author Avatar**: 120x120px, JPG format

## Placeholder Images

For development, you can use placeholder services:
- `https://via.placeholder.com/800x400/3b82f6/ffffff?text=Article+Image`
- `https://via.placeholder.com/1200x630/3b82f6/ffffff?text=BitAndBuild`

## Optimization

Before adding images to production:
1. Compress images using tools like TinyPNG or ImageOptim
2. Convert to WebP format for better performance
3. Provide fallback JPG versions for older browsers
4. Use descriptive filenames for better SEO

## Usage

Images are referenced in the HTML files using relative paths:
```html
<img src="images/article-image.jpg" alt="Article Title">
```

For responsive images, consider using the `srcset` attribute:
```html
<img src="images/article-image.jpg" 
     srcset="images/article-image-small.jpg 400w,
             images/article-image.jpg 800w"
     sizes="(max-width: 768px) 100vw, 800px"
     alt="Article Title">
``` 