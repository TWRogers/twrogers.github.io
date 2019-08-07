---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: "Blog"
---
<div class="row">
{% for post in site.posts %}
<div class="card">
	<a href="{{ post.url }}">
		<img class="card-img-top" src="{{ './assets/images/' | append: post.lead_image | relative_url }}" alt="{{ post.title }}">
		<div class="card-body">
			<h5 class="card-title">{{ post.title }}</h5>
		</div>
	</a>
</div>
{% endfor %}
</div>
