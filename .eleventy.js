module.exports = function(eleventyConfig) {  
// Copy `src/style.css` to `_site/style.css`  
    eleventyConfig.addPassthroughCopy("src/style.css");
    eleventyConfig.setTemplateFormats("html,liquid,njk");
    
    return {    
    // When a passthrough file is modified, rebuild the pages:
        passthroughFileCopy: true,
    // Templates
		templateFormats: ["html", "liquid", "njk"],
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
    // Set custom directories for input, output, includes, and data:
        dir: {      
            input: "src",      
            includes: "_includes",      
            data: "_data",      
            output: "site"    
        }  
    };
};

