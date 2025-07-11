import {getAllPosts, showInSitemap, tagList} from './src/_config/collections.js';
import filters from './src/_config/filters.js';
import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import timeToRead from "eleventy-plugin-time-to-read"
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import pluginIcons from 'eleventy-plugin-icons';


function blogDate(input) {
  return `${new Date(input).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;
}

export default function(eleventyConfig) {
	// Order matters, put this at the top of your configuration file.
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setLayoutsDirectory("_layouts");
  eleventyConfig.setDataDirectory("_data");
  eleventyConfig.setOutputDirectory("dist");

  // Emulate passthrough copy during `--serve`
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  
	// Copy `img/` to `dist/img`
	eleventyConfig.addPassthroughCopy("img");

	// Copy any .jpg file to `_dist`, via Glob pattern
	// Keeps the same directory structure.
	eleventyConfig.addPassthroughCopy("**/*.jpg");
  eleventyConfig.addPassthroughCopy("**/*.svg");

  eleventyConfig.addPassthroughCopy({ "assets/favicon/": "/" });

  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.setFrontMatterParsingOptions({ excerpt: true,   excerpt_separator: '<!-- ex -->' });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(timeToRead, {
    speed: '1000 characters per minute',
    language: 'en',
    style: 'short',
    type: 'unit',
    hours: 'auto',
    minutes: true,
    seconds: false,
    digits: 1,
    output: function(data) {
      return data.timing;
    }
  });
  eleventyConfig.addPlugin(pluginIcons, {
     sources: [
      { name: 'lucide', path: 'node_modules/lucide-static/icons' },
      { name: 'simp', path: 'node_modules/simple-icons/icons' },
      { name: 'tabler-f', path: 'node_modules/@tabler/icons/icons/filled' },
      { name: 'tabler-o', path: 'node_modules/@tabler/icons/icons/outline' }
    ],

  });

  eleventyConfig.addFilter('toIsoString', filters.toISOString);
  eleventyConfig.addFilter('formatDate', filters.formatDate);
  eleventyConfig.addFilter('blogDate', blogDate);
  eleventyConfig.addFilter("md", function (content = "") {
  return markdownIt({ html: true }).render(content);
});

  eleventyConfig.addCollection('tagList', function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function (item) {
      if ('tags' in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function (item) {
          switch (item) {
            case 'all':
            case 'nav':
            case 'post':
            case 'posts':
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    return [...tagSet];
  });


  eleventyConfig.addFilter('pageTags', (tags) => {
    const generalTags = ['all', 'nav', 'post', 'posts'];

    return tags
      .toString()
      .split(',')
      .filter((tag) => {
        return !generalTags.includes(tag);
      });
  });


  }
