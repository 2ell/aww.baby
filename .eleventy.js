
// Plugins
      const lucideIcons = require("@grimlink/eleventy-plugin-lucide-icons");
      const embedSpotify = require("eleventy-plugin-embed-spotify");
      const { DateTime } = require("luxon");   // Import "DateTime" from Luxon
      

module.exports = function(eleventyConfig) {  

  eleventyConfig.setBrowserSyncConfig({
		files: './site/css/**/*.css'
	});
    
    // Copy `src/style.css` to `_site/style.css`  
    eleventyConfig.addPassthroughCopy("src/style.css");
    
      
    // To enable merging of tags 
    eleventyConfig.setDataDeepMerge(true)
    
    // Get current year
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    eleventyConfig.addFilter("readableTimestamp", function (dateVal, locale = "en-us") {
        var theDate = new Date(dateVal);
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit'
        };
        return theDate.toLocaleString(locale, options);
      });

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
      });

    // To create excerpts
    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_alias: 'post_excerpt',
        excerpt_separator: '<!-- excerpt -->'
  })


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

