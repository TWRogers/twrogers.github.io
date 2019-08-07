---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: "Blog"
---


{% for post in site.posts %}
<div class="card">
<div class="card-body">
<h5 class="card-title"><a href="{{ post.url }}">{{ post.title }}</a></h5>
</div>
</div>
{% endfor %}

