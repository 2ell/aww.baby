import {getAllPosts, showInSitemap, tagList} from './src/_config/collections.js';
import filters from './src/_config/filters.js';
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
	eleventyConfig.addPassthroughCopy("src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/**/*.svg");

  eleventyConfig.addPassthroughCopy({ "assets/favicon": "/" });

  eleventyConfig.addPassthroughCopy("assets");

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

  }
