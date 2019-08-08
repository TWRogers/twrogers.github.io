---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: "Blog"
---
<h2 class="cover-heading">Recent Posts</h2>
<p>Here are my most recent blog posts.</p>
<div class="row">
{% for post in site.posts %}
<div class="card">
    <div class="card-horizontal">
        <div class="img-square-wrapper">
			<a href="{{ post.url }}">
            <img src="{{ './assets/images/' | append: post.lead_image | relative_url }}" alt="{{ post.title }}">
			</a>
        </div>
        <div class="card-body card-body-left">
            <h4>{{ post.title }}</h4>
            <p><b>Abstract: </b>{{ post.abstract }}</p>
			<a href="{{ post.url }}" class="btn btn-secondary">Read More</a>
        </div>
    </div>
    <div class="card-footer">
        <small class="text-muted">Published on {{ post.date | date: '%d %B %Y' }} by {{ post.author }}</small>
    </div>
</div>
{% endfor %}
</div>
