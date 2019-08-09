---
layout: post
title:  "Making a Jekyll Blog on GitHub Pages"
abstract: "Creating a statically served blog from scratch on GitHub Pages can be tricky for a beginner in HTML/CSS.  In this part, I guide you through how I converted my static Bootstrap website to Jekyll-generated blog."
date:   2019-08-08
categories: [HTML, Jekyll, Frontend]
author: Thomas W. Rogers
lead_image: github_jekyll.png
further_reading: [["Blog Repo", "https://github.com/TWRogers/twrogers.github.io"], ["Jekyll", "https://jekyllrb.com/"], ["Rouge", "http://rouge.jneen.net/"], ["Syntax Highlighting", "https://mycyberuniverse.com/en-gb/syntax-highlighting-jekyll.html"], ["TOC", "https://github.com/allejo/jekyll-toc"]]
part: 2
---
## Jekyll
In the [previous]({{page.previous.url}}#layouts) post we talked about how glorious [GitHub Pages](https://pages.github.com/) was, but that it was limited to only **static** websites.
Luckily for us, GitHub supports [Jekyll](https://jekyllrb.com/), which means that we can write all the source to generate a static site using Jekyll. 

When we push this to GitHub, **GitHub magically knows how to build the site and deploy it** for you.

This makes using Jekyll with GitHub Pages very _elegant_.

However, to know how the website looks when deployed, we need to **setup Jekyll locally** so that we can see what is happening when we fudge things around in dev.

### Getting Started
To install [Jekyll](https://jekyllrb.com/) and its dependencies, run the following commands in the terminal:
```bash
sudo apt-get install ruby ruby-dev make gcc nodejs
sudo gem install jekyll --no-rdoc --no-ri
```

After that a new Jekyll site can be created by running:
```
jekyll new username.github.io
```
This creates an initial directory structure and uses the default Jekyll options.

To serve this new Jekyll site locally, just run: 

```bash
bundle exec jekyll serve -P 4001
```
I specify the port `4001`, because the default port `4000` is in use by something else on my machine.

I recommend adding the following to your `.gitignore`, as we don't want this being pushed to your beautiful, clean, repo.
```
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata
```

That's it, we now have a Jekyll site being served locally at [http://127.0.0.1:4001/](http://127.0.0.1:4001/).

### Layouts
Layouts are essentially templates for your website, that support **inheritance**. They are the _holy grail_ of code recycling. **No more disgusting intrasite [copypasta](https://knowyourmeme.com/memes/copypasta)**.

Layouts are written as standard HTML files, and look something like the following ...

```html
<!doctype html>
<html lang="en">
  <head>
    ...
    <title>{% raw %}{{ page.title }}{% endraw %}</title>
    ...
  </head>
  <body class="text-center">
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header class="masthead mb-auto">
        ...
      </header>

      <main role="main" class="inner cover">
        {% raw %}{{ content }}{% endraw %}
      </main>

      <footer class="mastfoot mt-auto">
        ...
      </footer>
  </div>

  </body>
</html>
```
The snippets `{% raw %}{{ page.title }}{% endraw %}` and `{% raw %}{{ content }}{% endraw %}` are [Liquid](https://shopify.github.io/liquid/) commands, which tell Jekyll to dump the page title and content at those positions in the HTML.
These are are defined in markdown files for each [page](#pages-and-front-matter) or [post](#posts).

Layouts should be placed in the `_layouts` directory at the root of the project. At the time of writing, I have two layouts:

1. [default.html](https://github.com/TWRogers/twrogers.github.io/blob/master/_layouts/default.html) -- this is the default layout that is used across the site, unless specified otherwise.
2. [post.html](https://github.com/TWRogers/twrogers.github.io/blob/master/_layouts/post.html) -- this is the layout used for blog posts that **inherits** from [default.html](https://github.com/TWRogers/twrogers.github.io/blob/master/_layouts/default.html).

The inheritance of [post.html](https://github.com/TWRogers/twrogers.github.io/blob/master/_layouts/post.html) is achieved by defining it in the [Front Matter](#page-and-front-matter).

#### SASSy and SeCSSy
Spicing it up.

### Pages and Front Matter
Pages and Front do matter, the latter really does.

Firstly, the **Front Matter** can be used to define inheritance by including this at the top of a layout (e.g. [post.html](https://github.com/TWRogers/twrogers.github.io/blob/master/_layouts/post.html)):

```html
---
layout: default
---
<!doctype html>
<html lang="en">
...
</html>
```
This specifies that the `{% raw %}{{ content }}{% endraw %}` produced by applying [post.html](https://github.com/TWRogers/twrogers.github.io/blob/master/_layouts/post.html) should be injected into [default.html](https://github.com/TWRogers/twrogers.github.io/blob/master/_layouts/default.html).

Every page should have a Front Matter, and it is completely arbitrary what you put into it. For this blog post, the front matter is:
```
---
layout: post
title:  "Making a Jekyll Blog on GitHub Pages"
abstract: "Creating a statically served blog from scratch on GitHub Pages can be tricky for a beginner in HTML/CSS.  In this part, I guide you through how I converted my static Bootstrap website to Jekyll-generated blog."
date:   2019-08-08
categories: [HTML, Jekyll, Frontend]
author: Thomas W. Rogers
lead_image: github_jekyll.png
further_reading: [["Blog Repo", "https://github.com/TWRogers/twrogers.github.io"], ["Jekyll", "https://jekyllrb.com/"], ["Rouge", "http://rouge.jneen.net/"], ["Syntax Highlighting", "https://mycyberuniverse.com/en-gb/syntax-highlighting-jekyll.html"], ["TOC", "https://github.com/allejo/jekyll-toc"]]
part: 2
---
```

Of the above, the following fields are custom ones:

* **part**: defines which part in a series the post belongs to -- this post is Part 2.
* **further_reading**: is a list of links and labels that the user might want to use for [further reading](for-the-nerds-further-reading-section).
* **lead_img**: this defines the path to the lead image for each post, such as the one displayed at the [top](#) of this post.

### Posts

#### Contents Section
It turns out that writing code to automatically generate a contents page is bit tricksy. Luckily, I stumbled across [this genius](https://github.com/allejo) who 
has figured out how to do it purely in [Liquid](https://shopify.github.io/liquid/).

They've made it so simple. All you do is clone [this repo](https://github.com/allejo/jekyll-toc), whack the `_includes` folder at your site root, and smash this
```html
<div class="page">
<br>
<h2>Contents</h2>
{% raw %}{% include toc.html html=content %}{% endraw %}
</div>
```
In your `post.html` layout.

#### For the Nerds: Further Reading Section
For those not satiated by my posts, I wanted to add some links to extra resources. This was simple to do with the `further_reading` field I defined in the [Front Matter](#pages-and-front-matter) of each post.

```html
<div class="page">
  <br>
  <h2>Futher Reading & Resources</h2>
  <ol>
    {% raw %}{% for reading in page.further_reading %}{% endraw %}
    {% raw %}<li><b>{{ reading[0] }}: </b><br><a href="{{ reading[1] }}">{{ reading[1] }}</a></li>{% endraw %}
    {% raw %}{% endfor %}{% endraw %}
  </ol>
</div>
```

### Relative Linkage
Even after reading the [Jekyll docs](https://jekyllrb.com/docs/), linking to other pages within your Jekyll site can be frustrating.

Lukily, the devs at Jekyll recently introduced a `relative_url` filter, which makes it much easier:
```html
<!doctype html>
<!-- saved from url=(0050)https://getbootstrap.com/docs/4.3/examples/cover/# -->
<html lang="en">
  <head>
    ...
    <link rel="apple-touch-icon" sizes="57x57" 
    {% raw %}      href="{{ './assets/icons/apple-icon-57x57.png' | relative_url }}">{% endraw %}
    ...
  </head> 
</html>
```
I use this to link to all static resources such as icons.

They have also made it exceedingly simple to navigate to the next or previous post using `page.previous` and `page.next`. 
I use them as follows to generate navigation links to the next and previous article.

```html
<div class="PageNavigation">
  {% raw %}{% if page.previous.url %}{% endraw %}
    {% raw %}<a class="prev" href="{{page.previous.url}}">&laquo; {{page.previous.title}}{% if page.previous.part %} (Part {{ page.previous.part }}){% endif %}</a>{% endraw %}
  {% raw %}{% endif %}{% endraw %}
  {% raw %}{% if page.next.url %}{% endraw %}
    {% raw %}<a class="next" href="{{page.next.url}}">{{page.next.title}}{% if page.next.part %} (Part {{ page.next.part }}){% endif %} &raquo;</a>{% endraw %}
  {% raw %}{% endif %}{% endraw %}
</div>
```
This creates something that looks like this:
<div class="PageNavigation">
  {% if page.previous.url %}
    <a class="prev" href="{{page.previous.url}}">&laquo; {{page.previous.title}}{% if page.previous.part %} (Part {{ page.previous.part }}){% endif %}</a>
  {% endif %}
  {% if page.next.url %}
    <a class="next" href="{{page.next.url}}">{{page.next.title}}{% if page.next.part %} (Part {{ page.next.part }}){% endif %} &raquo;</a>
  {% endif %}
</div>

Please don't get tempted to leave this post to look at <b>{{page.next.title}}</b> just yet, as we need to talk about **syntax highlighting**.

### Syntax Highlighting
The default syntax highlighting that comes with Jekyll is pretty poor -- it only alters the font face of the code snippet, and does not highlight individual keywords or handle multiple languages.

Luckily, GitHub Pages supports [Rouge](http://rouge.jneen.net/) which is a syntax highlighter built purely in Ruby and works directly with Jekyll. It is super easy to setup.

Just add the following line to `_config.yml` located at the root directory of your site:

```yaml
highlighter: rouge
```

Rouge can be installed locally for development and testing using `gem`:

```bash
gem install rouge
```

Next, we need to add some CSS to spruce it up a bit. The devs at Rouge were helpful in making it compatible with the Python-based syntax highlighter [Pygments](http://pygments.org/).
There is a [whole repo](https://github.com/richleland/pygments-css) full of styles for Pygments that we can just plug and play with Rouge, yay!

I chose the [pastle](https://github.com/richleland/pygments-css/blob/master/pastie.css) style with only a little modification to make it look a bit nicer. 

The default them uses a horrible, white, rectangular code box with like _zero_ padding. I made this look a bit better by modifying the second line in the CSS file to this:

```css
.highlight  { 
    background: rgb(235, 238, 242); 
    border-radius: 5px; 
    margin: 5px; 
    padding: 2px; 
}
```

Then I just imported this in my `cover.css` file by adding the following line:
```css
@import url(pastle.css);
```

Note that I saved `pastle.css` in the same directory i.e. `./assets/css/pastle.css`.

Now when I serve this website, I am able to write code snippets in markdown, such as

````markdown
```python
s = "Python syntax highlighting"
print s
```
````

which is rendered, beautifully, as:

```python
s = "Python syntax highlighting"
print s 
```

## The End Result

After all these steps, it was possible to write my this blog post with the following markdown.

(If you are susceptible to getting RSI from scrolling, please [skip to the summary](#summary).)

````markdown
---
layout: post
title:  "Making a Jekyll Blog on GitHub Pages"
abstract: "Creating a statically served blog from scratch on GitHub Pages can be tricky for a beginner in HTML/CSS.  In this part, I guide you through how I converted my static Bootstrap website to Jekyll-generated blog."
date:   2019-08-08
categories: [HTML, Jekyll, Frontend]
author: Thomas W. Rogers
lead_image: github_jekyll.png
further_reading: [["Blog Repo", "https://github.com/TWRogers/twrogers.github.io"], ["Jekyll", "https://jekyllrb.com/"], ["Rouge", "http://rouge.jneen.net/"], ["Syntax Highlighting", "https://mycyberuniverse.com/en-gb/syntax-highlighting-jekyll.html"], ["TOC", "https://github.com/allejo/jekyll-toc"]]
part: 2
---
## Jekyll
In the [previous]({{page.previous.url}}#layouts) post we talked about how glorious [GitHub Pages](https://pages.github.com/) was, but that it was limited to only **static** websites.
Luckily for us, GitHub supports [Jekyll](https://jekyllrb.com/), which means that we can write all the source to generate a static site using Jekyll. 

When we push this to GitHub, **GitHub magically knows how to build the site and deploy it** for you.

This makes using Jekyll with GitHub Pages very _elegant_.

However, to know how the website looks when deployed, we need to **setup Jekyll locally** so that we can see what is happening when we fudge things around in dev.

### Getting Started
To install [Jekyll](https://jekyllrb.com/) and its dependencies, run the following commands in the terminal:
```bash
sudo apt-get install ruby ruby-dev make gcc nodejs
sudo gem install jekyll --no-rdoc --no-ri
```

After that a new Jekyll site can be created by running:
```
jekyll new username.github.io
```
This creates an initial directory structure and uses the default Jekyll options.

To serve this new Jekyll site locally, just run: 

```bash
bundle exec jekyll serve -P 4001
```
I specify the port `4001`, because the default port `4000` is in use by something else on my machine.

I recommend adding the following to your `.gitignore`, as we don't want this being pushed to your beautiful, clean, repo.
```
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata
```

That's it, we now have a Jekyll site being served locally at [http://127.0.0.1:4001/](http://127.0.0.1:4001/).

### Layouts
Layouts are essentially templates for your website, that support **inheritance**. They are the _holy grail_ of code recycling. **No more disgusting intrasite [copypasta](https://knowyourmeme.com/memes/copypasta)**.

Layouts are written as standard HTML files, and look something like the following ...

```html
<!doctype html>
<html lang="en">
  <head>
    ...
    <title>{% raw %}{{ page.title }}{% endraw %}</title>
    ...
  </head>
  <body class="text-center">
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header class="masthead mb-auto">
        ...
      </header>

      <main role="main" class="inner cover">
        {% raw %}{{ content }}{% endraw %}
      </main>

      <footer class="mastfoot mt-auto">
        ...
      </footer>
  </div>

  </body>
</html>
```
The snippets `{% raw %}{{ page.title }}{% endraw %}` and `{% raw %}{{ content }}{% endraw %}` are [Liquid](https://shopify.github.io/liquid/) commands, which tell Jekyll to dump the page title and content at those positions in the HTML.
These are are defined in markdown files for each [page](#pages-and-front-matter) or [post](#posts).

Layouts should be placed in the `_layouts` directory at the root of the project. At the time of writing, I have two layouts:

1. [default.html](https://github.com/TWRogers/twrogers.github.io/blob/master/_layouts/default.html) -- this is the default layout that is used across the site, unless specified otherwise.
2. [post.html](https://github.com/TWRogers/twrogers.github.io/blob/master/_layouts/post.html) -- this is the layout used for blog posts that **inherits** from [default.html](https://github.com/TWRogers/twrogers.github.io/blob/master/_layouts/default.html).

The inheritance of [post.html](https://github.com/TWRogers/twrogers.github.io/blob/master/_layouts/post.html) is achieved by defining it in the [Front Matter](#page-and-front-matter).

#### SASSy and SeCSSy
Spicing it up.

### Pages and Front Matter
Pages and Front do matter, the latter really does.

Firstly, the **Front Matter** can be used to define inheritance by including this at the top of a layout (e.g. [post.html](https://github.com/TWRogers/twrogers.github.io/blob/master/_layouts/post.html)):

```html
---
layout: default
---
<!doctype html>
<html lang="en">
...
</html>
```
This specifies that the `{% raw %}{{ content }}{% endraw %}` produced by applying [post.html](https://github.com/TWRogers/twrogers.github.io/blob/master/_layouts/post.html) should be injected into [default.html](https://github.com/TWRogers/twrogers.github.io/blob/master/_layouts/default.html).

Every page should have a Front Matter, and it is completely arbitrary what you put into it. For this blog post, the front matter is:
```
---
layout: post
title:  "Making a Jekyll Blog on GitHub Pages"
abstract: "Creating a statically served blog from scratch on GitHub Pages can be tricky for a beginner in HTML/CSS.  In this part, I guide you through how I converted my static Bootstrap website to Jekyll-generated blog."
date:   2019-08-08
categories: [HTML, Jekyll, Frontend]
author: Thomas W. Rogers
lead_image: github_jekyll.png
further_reading: [["Blog Repo", "https://github.com/TWRogers/twrogers.github.io"], ["Jekyll", "https://jekyllrb.com/"], ["Rouge", "http://rouge.jneen.net/"], ["Syntax Highlighting", "https://mycyberuniverse.com/en-gb/syntax-highlighting-jekyll.html"], ["TOC", "https://github.com/allejo/jekyll-toc"]]
part: 2
---
```

Of the above, the following fields are custom ones:

* **part**: defines which part in a series the post belongs to -- this post is Part 2.
* **further_reading**: is a list of links and labels that the user might want to use for [further reading](for-the-nerds-further-reading-section).
* **lead_img**: this defines the path to the lead image for each post, such as the one displayed at the [top](#) of this post.

### Posts

#### Contents Section
It turns out that writing code to automatically generate a contents page is bit tricksy. Luckily, I stumbled across [this genius](https://github.com/allejo) who 
has figured out how to do it purely in [Liquid](https://shopify.github.io/liquid/).

They've made it so simple. All you do is clone [this repo](https://github.com/allejo/jekyll-toc), whack the `_includes` folder at your site root, and smash this
```html
<div class="page">
<br>
<h2>Contents</h2>
{% raw %}{% include toc.html html=content %}{% endraw %}
</div>
```
In your `post.html` layout.

#### For the Nerds: Further Reading Section
For those not satiated by my posts, I wanted to add some links to extra resources. This was simple to do with the `further_reading` field I defined in the [Front Matter](#pages-and-front-matter) of each post.

```html
<div class="page">
  <br>
  <h2>Futher Reading & Resources</h2>
  <ol>
    {% raw %}{% for reading in page.further_reading %}{% endraw %}
    {% raw %}<li><b>{{ reading[0] }}: </b><br><a href="{{ reading[1] }}">{{ reading[1] }}</a></li>{% endraw %}
    {% raw %}{% endfor %}{% endraw %}
  </ol>
</div>
```

### Relative Linkage
Even after reading the [Jekyll docs](https://jekyllrb.com/docs/), linking to other pages within your Jekyll site can be frustrating.

Lukily, the devs at Jekyll recently introduced a `relative_url` filter, which makes it much easier:
```html
<!doctype html>
<!-- saved from url=(0050)https://getbootstrap.com/docs/4.3/examples/cover/# -->
<html lang="en">
  <head>
    ...
    <link rel="apple-touch-icon" sizes="57x57" 
    {% raw %}      href="{{ './assets/icons/apple-icon-57x57.png' | relative_url }}">{% endraw %}
    ...
  </head> 
</html>
```
I use this to link to all static resources such as icons.

They have also made it exceedingly simple to navigate to the next or previous post using `page.previous` and `page.next`. 
I use them as follows to generate navigation links to the next and previous article.

```html
<div class="PageNavigation">
  {% raw %}{% if page.previous.url %}{% endraw %}
    {% raw %}<a class="prev" href="{{page.previous.url}}">&laquo; {{page.previous.title}}{% if page.previous.part %} (Part {{ page.previous.part }}){% endif %}</a>{% endraw %}
  {% raw %}{% endif %}{% endraw %}
  {% raw %}{% if page.next.url %}{% endraw %}
    {% raw %}<a class="next" href="{{page.next.url}}">{{page.next.title}}{% if page.next.part %} (Part {{ page.next.part }}){% endif %} &raquo;</a>{% endraw %}
  {% raw %}{% endif %}{% endraw %}
</div>
```
This creates something that looks like this:
<div class="PageNavigation">
  {% if page.previous.url %}
    <a class="prev" href="{{page.previous.url}}">&laquo; {{page.previous.title}}{% if page.previous.part %} (Part {{ page.previous.part }}){% endif %}</a>
  {% endif %}
  {% if page.next.url %}
    <a class="next" href="{{page.next.url}}">{{page.next.title}}{% if page.next.part %} (Part {{ page.next.part }}){% endif %} &raquo;</a>
  {% endif %}
</div>

Please don't get tempted to leave this post to look at <b>{{page.next.title}}</b> just yet, as we need to talk about **syntax highlighting**.

### Syntax Highlighting
The default syntax highlighting that comes with Jekyll is pretty poor -- it only alters the font face of the code snippet, and does not highlight individual keywords or handle multiple languages.

Luckily, GitHub Pages supports [Rouge](http://rouge.jneen.net/) which is a syntax highlighter built purely in Ruby and works directly with Jekyll. It is super easy to setup.

Just add the following line to `_config.yml` located at the root directory of your site:

```yaml
highlighter: rouge
```

Rouge can be installed locally for development and testing using `gem`:

```bash
gem install rouge
```

Next, we need to add some CSS to spruce it up a bit. The devs at Rouge were helpful in making it compatible with the Python-based syntax highlighter [Pygments](http://pygments.org/).
There is a [whole repo](https://github.com/richleland/pygments-css) full of styles for Pygments that we can just plug and play with Rouge, yay!

I chose the [pastle](https://github.com/richleland/pygments-css/blob/master/pastie.css) style with only a little modification to make it look a bit nicer. 

The default them uses a horrible, white, rectangular code box with like _zero_ padding. I made this look a bit better by modifying the second line in the CSS file to this:

```css
.highlight  { 
    background: rgb(235, 238, 242); 
    border-radius: 5px; 
    margin: 5px; 
    padding: 2px; 
}
```

Then I just imported this in my `cover.css` file by adding the following line:
```css
@import url(pastle.css);
```

Note that I saved `pastle.css` in the same directory i.e. `./assets/css/pastle.css`.

Now when I serve this website, I am able to write code snippets in markdown, such as

```markdown
```python
s = "Python syntax highlighting"
print s
```
```

which is rendered, beautifully, as:

```python
s = "Python syntax highlighting"
print s 
```

## The End Result

After all these steps, it was possible to write my this blog post with the following markdown.

(If you are susceptible to getting RSI from scrolling, please [skip to the summary](#summary).)```markdown

<img src="https://twrogers.github.io/assets/images/incpetion.jpeg">

```
## Summary
Hopefully, after reading the above, you are satisfied? I am not, pasting the above snippet just made me enter an **infinite thought-loop** about [fine quines]({{page.next.url}}).
````
## Summary
Hopefully, after reading the above, you are satisfied? I am not, pasting the above snippet just made me enter an **infinite thought-loop** about [fine quines]({{page.next.url}}).