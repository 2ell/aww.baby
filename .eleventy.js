import filters from './src/_config/filters.js';
import pluginIcons from 'eleventy-plugin-icons';
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import eleventyPluginExcerpt from 'eleventy-plugin-excerpt';

export default function(eleventyConfig) {
	// Order matters, put this at the top of your configuration file.
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setLayoutsDirectory("_layouts");
  eleventyConfig.setDataDirectory("lore");
  eleventyConfig.setOutputDirectory("dist");

  eleventyConfig.addGlobalData("myName", "Laurel");

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: "<!-- excerpt -->",
  });

  // Emulate passthrough copy during `--serve`
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  
	// Copy `img/` to `_site/img`
	eleventyConfig.addPassthroughCopy("img");

	// Copy any .jpg file to `_site`, via Glob pattern
	// Keeps the same directory structure.
	eleventyConfig.addPassthroughCopy("**/*.jpg");
  eleventyConfig.addPassthroughCopy("**/*.svg");

  // Layout aliasing
  eleventyConfig.addLayoutAlias("post", "post.njk");
  eleventyConfig.addLayoutAlias("page", "page.njk");
  // Custom date parsing
  // --------------------- Filters
  eleventyConfig.addFilter('toIsoString', filters.toISOString);
  eleventyConfig.addFilter('formatDate', filters.formatDate);
  eleventyConfig.addFilter('markdownFormat', filters.markdownFormat);

  eleventyConfig.addCollection("postsByYear", (collection) => {
    const posts = collection.getFilteredByTag('post').reverse();
    const years = posts.map(post => post.date.getFullYear());
    const uniqueYears = [...new Set(years)];
  
    const postsByYear = uniqueYears.reduce((prev, year) => {
      const filteredPosts = posts.filter(post => post.date.getFullYear() === year);
  
      return [
        ...prev,
        [year, filteredPosts]
      ]
    }, []);
  
    return postsByYear;
  });
  

  //---------------------- Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventyPluginExcerpt);
  eleventyConfig.addPlugin(pluginIcons, {
    sources: [
      { name: 'lucide', path: 'node_modules/lucide-static/icons' },
      { name: 'feather', path: 'node_modules/feather-icons/dist/icons' },
      ],
    icon: {
      shortcode: 'icon',
      delimiter: ':',
      transform: async (content) => content,
      class: (name, source) => `icon icon-${name}`,
      id: (name, source) => `icon-${name}`,
      attributes: {},
      attributesBySource: {},
      overwriteExistingAttributes: true,
      errorNotFound: true,
    },
  });
};

