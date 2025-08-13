// Minimal Prism.js for syntax highlighting
var Prism = (function() {
    'use strict';
    
    var Prism = {
        languages: {},
        highlight: function(text, grammar, language) {
            return text; // Basic implementation
        },
        highlightAll: function() {
            var elements = document.querySelectorAll('pre code');
            elements.forEach(function(element) {
                var language = element.className.match(/language-(\w+)/);
                if (language) {
                    element.innerHTML = Prism.highlight(element.textContent, {}, language[1]);
                }
            });
        }
    };
    
    // Basic language definitions
    Prism.languages.javascript = {
        'comment': /\/\*[\s\S]*?\*\/|\/\/.*$/gm,
        'string': /(["'`])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/g,
        'keyword': /\b(?:break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/g,
        'boolean': /\b(?:false|true)\b/g,
        'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/gi
    };
    
    Prism.languages.js = Prism.languages.javascript;
    
    Prism.languages.css = {
        'comment': /\/\*[\s\S]*?\*\//g,
        'property': /[a-z-]+(?=\s*:)/gi,
        'string': /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/g,
        'number': /\b\d+(?:\.\d+)?(?:%|em|ex|px|rem|vh|vw|vmin|vmax)?\b/g
    };
    
    Prism.languages.html = {
        'comment': /<!--[\s\S]*?-->/g,
        'tag': /<\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|[^\s>]+))?)*\s*\/?>/gi,
        'string': /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/g
    };
    
    Prism.languages.python = {
        'comment': /#.*$/gm,
        'string': /("""|'''|"|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/g,
        'keyword': /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g,
        'boolean': /\b(?:True|False|None)\b/g,
        'number': /\b\d+(?:\.\d+)?\b/g
    };
    
    // Auto-highlight on load
    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', Prism.highlightAll);
        } else {
            Prism.highlightAll();
        }
    }
    
    return Prism;
})(); 