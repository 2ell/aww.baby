import { library, icon, toHtml } from '@fortawesome/fontawesome-svg-core';

/**
 *
 * This function takes an iconset object and returns a shortcode function.
 *
 * @param {object} iconSet
 * @param {string} iconSetPrefix - the key that fortawesome uses internally
 * @return {function} A good string
 *
 */
function makeFortawesomeShortcode(iconSet, iconSetPrefix) {
    if (!iconSet || !iconSetPrefix) {
        throw new Error('Invalid arguments passed');
    }
    if (!iconSet[iconSetPrefix]) {
        throw new Error('Invalid arguments passed');
    }
    // loop over every icon in collection and add each the the library
    for (const key in iconSet[iconSetPrefix]) {
        library.add(iconSet[iconSetPrefix][key]);
    }

    /**
     *
     * Eleventy shortcode function that returns inline svg
     *
     * @param {string} iconName - The id of the icon
     * @param {string} [additionalClasses] - css class names to add to the svg element, separate multiple class names with a comma
     * @return {string} String representation inline SVG
     *
     */
    function fortawesomeShortcode(iconName, additionalClassesString = '') {
        const additionalClasses = additionalClassesString.split(',');

        const options = additionalClasses ? { classes: additionalClasses } : {};

        const iconResult = icon(
            {
                prefix: iconSetPrefix,
                iconName,
            },
            options,
        );

        if (!iconResult) {
            return '';
        }

        const svgOutput = iconResult.abstract.map((abstract) => {
            return toHtml(abstract);
        });

        return svgOutput.join('');
    }
    return fortawesomeShortcode;
}

export { makeFortawesomeShortcode };
