---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: "Blog"
abstract: "Selection of Thomas Rogers' latest blog posts."
---
<br>
<h2 class="cover-heading">Recent Posts</h2>
<p>Here are my most recent blog posts. For my <a href="{{ site.posts[-1].url }}">my first post</a>, I was lacking inspiration and so chose to write about how I made <b>this blog</b>.

This lead me down a tumultuous rabbit hole, and who knows how far it could go? It is currently at <a href="{{ site.posts[0].url }}">{{ site.posts[0].title }}</a>.
</p>
<div class="row">
{% for post in site.posts %}
<div class="card">
    <div class="card-horizontal">
        <div class="img-square-wrapper">
			<a href="{{ post.url }}">
            <img src="{{ './assets/images/' | append: post.lead_image | relative_url }}" alt="{{ post.title }}">
            </a>
            {% if post.part %}<div class="middle-bottom">Part {{post.part}}</div>{% endif %}
        </div>
        <div class="card-body card-body-left">
            <h4>{{ post.title }} {% if post.part %}<small>(Part {{post.part}})</small>{% endif %}</h4>
            <p><b>Abstract: </b>{{ post.abstract }}</p>
			<a href="{{ post.url }}" class="btn btn-secondary">Read More</a>
        </div>
    </div>
    <div class="card-footer">
        <small class="text-muted">Published on <b>{{ post.date | date: '%d %B %Y' }}</b> by <b>{{ post.author }}</b>
            {% if post.categories %}
            &nbsp;&nbsp;|&nbsp;&nbsp; Categories:&nbsp;&nbsp; 
                {% for category in post.categories %}
                    <b>{{ category}}</b>&nbsp;&nbsp;
                {% endfor %}
            {% endif %}
        </small>
    </div>
</div>
<br>
{% endfor %}
</div>
