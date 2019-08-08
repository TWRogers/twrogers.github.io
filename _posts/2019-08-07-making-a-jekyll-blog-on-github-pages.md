---
layout: post
title:  "Making a Jekyll Blog on GitHub Pages"
abstract: "Creating a statically served blog from scratch on GitHub Pages can be tricky for a beginner in HTML/CSS. Here's my experience on how I dealt with it."
date:   2019-08-07
categories: [HTML, Jekyll, Frontend]
author: Thomas W. Rogers
lead_image: github_jekyll.png
further_reading: [["Rouge", "http://rouge.jneen.net/"], ["Syntax Highlighting", "https://mycyberuniverse.com/en-gb/syntax-highlighting-jekyll.html"], ["TOC", "https://github.com/allejo/jekyll-toc"]]
---
## GitHub Pages
[GitHub Pages](https://pages.github.com/) offers a great, free, way of hosting your personal website or blog. Most other free services I've encountered have slow page loading times, 
force you to display heavy advertising, or give you a really horrible url. GitHub Pages also has the advantage of showing potential employers and recruiters 
that you developed the website yourself, and didn't just throw your content into a website generator.

However, serving a blog using GitHub Pages can be difficult. Blogs often require some basic database system for storing data on the blog post, including information such as:

* Author
* Title
* Images
* Text
* Date

Unfortunately, deploying standard database technologies such as MySQL or MongoDB is not possible on GitHub Pages.

## Statically Generated Websites

## Building a Basic Website

### Bootstrap

## Jekyll
### Getting Started
To install Jekyll and its dependencies, run the following commands in the terminal:
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

That's it, we now have a Jekyll site being served locally at [http://127.0.0.1:4001/](http://127.0.0.1:4001/).

### Layouts
### Pages and Front Matter


### Posts
#### Contents Section
#### Further Reading Section
### Navigation

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
