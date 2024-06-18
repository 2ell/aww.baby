// Plugins
      const lucideIcons = require("@grimlink/eleventy-plugin-lucide-icons");
      const embedSpotify = require("eleventy-plugin-embed-spotify");
      const { DateTime } = require("luxon");   // Import "DateTime" from Luxon
      

module.exports = function(eleventyConfig) {  
    
    // Copy `src/style.css` to `_site/style.css`  
    eleventyConfig.addPassthroughCopy("src/style.css");
    
    // Get current year
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // Excerpt filter | usage: <p>{{ post.templateContent | excerpt }}</p>
    eleventyConfig.addFilter("excerpt", (post) => {
        const content = post.replace(/(<([^>]+)>)/gi, "");
        return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
    });

    // Non-breaking space at end of string for titles (Usage: {{ title | addNbsp }})
    eleventyConfig.addFilter("addNbsp", (str) => {
        if (!str) {
          return;
        }
        let title = str.replace(/((.*)\s(.*))$/g, "$2&nbsp;$3");
        title = title.replace(/"(.*)"/g, '\\"$1\\"');
        return title;
      });

      eleventyConfig.addPlugin(lucideIcons, {
        "class": "custom-class",
        "width": 24,
        "height": 24,
        "stroke": "currentColor",
        "stroke-width": 2
    });

    eleventyConfig.addPlugin(embedSpotify, {
        allowAttrs: 'encrypted-media',
        // The Spotify player iframe is always wrapped in a div with this class.
        // Substitute your preferred string to rename the wrapper class
        embedClass: 'eleventy-plugin-embed-spotify',
        // Default iframe height, in pixels
        height: '380',
        // default iframe width, in pixels
        width: '100%'
      });

    return {    
    // When a passthrough file is modified, rebuild the pages:
        passthroughFileCopy: true,
    // Set custom directories for input, output, includes, and data:
        dir: {      
            input: "src",      
            includes: "_includes",      
            data: "_data",      
            output: "site"    
        }  
    };
};

