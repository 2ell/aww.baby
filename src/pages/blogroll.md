---
layout: base.njk
title: Blogroll
permalink: "/{{ title | slugify }}/"
---
## {{ title }}

 {% for item in blogroll %}
    {{ item.name }}
{% endfor %} 