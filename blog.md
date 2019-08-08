---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: "Blog"
---
<h2 class="cover-heading">Recent Posts</h2>

<div class="row">
{% for post in site.posts %}
<div class="card card-small">
	<a href="{{ post.url }}">
		<img class="card-img-top" src="{{ './assets/images/' | append: post.lead_image | relative_url }}" alt="{{ post.title }}">
	</a>
		<div class="card-body">
			<h5>{{ post.title }}</h5>
			<p class="card-text">{{ post.abstract | truncatewords: 10 }}</p> <a href="{{ post.url }}">Read More</a>
		</div>
    <div class="card-footer">
        <small class="text-muted">{{ post.date | date: '%d %B %Y' }}</small> 
    </div>
</div>
{% endfor %}
</div>
