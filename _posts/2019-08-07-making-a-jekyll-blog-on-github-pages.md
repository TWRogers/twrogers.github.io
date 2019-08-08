---
layout: post
title:  "Making a Jekyll Blog on GitHub Pages"
abstract: "Creating a statically served blog from scratch on GitHub Pages can be tricky for a beginner in HTML/CSS. Here's my experience on how I dealt with it."
date:   2019-08-07
categories: [HTML, Jekyll, Frontend]
author: Thomas W. Rogers
lead_image: github_jekyll.png
further_reading: [["Blog Repo", "https://github.com/TWRogers/twrogers.github.io"], ["Jekyll", "https://jekyllrb.com/"], ["Rouge", "http://rouge.jneen.net/"], ["Syntax Highlighting", "https://mycyberuniverse.com/en-gb/syntax-highlighting-jekyll.html"], ["TOC", "https://github.com/allejo/jekyll-toc"], ["Cover Template", "https://getbootstrap.com/docs/4.0/examples/cover/#"]]
---
## Glorious GitHub Pages
[GitHub Pages](https://pages.github.com/) offers a great, free, way of hosting your personal website or blog. Most other free services I've encountered have **slow response times**, 
force you to display **horrendous advertising**, or do not allow you to use your own domain name. 

It is surprising, therefore, that GitHub Pages does not even feature in most 
[free webhost reviews](https://www.ukwebhostreview.com/free-web-hosting/). This is likely due to GitHub Pages being slightly more challenging to host more complex sites such as blogs. 

Serving a blog using GitHub Pages can be difficult. Blogs often require some **basic database system** for storing data on the blog post, including information such as:

* Title
* Images
* Text
* Date
* Name (of the poor unfortunate soul who **selflessly** dedicated hours of their life to writing the post).

Unfortunately, deploying standard database technologies such as MySQL or MongoDB is not possible on GitHub Pages. Websites on GitHub Pages must be **statically generated**.

## Statically Generated Websites are not so Static
You may have wondered why one would want to be **static** rather than _dynamic_. What a queer specimen one must be?

Well, it turns out, rather ironically, that **static** websites are often faster than _dynamic_ ones. This is because all the server has to think about is returning files.

It does not have to create anything on the fly, everything already exists when you, yes you intrepid blog reader, **make a request** to receive _this_ post to read.

Static site generators such as [Jekyll](https://jekyllrb.com/) are used to generate a whole website, ready for serving.

## Building a Vanilla Static Website
There is **no point re-inventing the bootstrap** when it comes to website development. Fine-tuning minute details such as responsiveness, shadows and paddings is all fine if you have the time. 

Otherwise it is just duplicating the efforts of experienced open-source developers who have spent **many hours in a rabid and coffee-fueled state of existence**, simply to perfect styles and layouts for the community.

I decided to base my blog on [Bootstrap](https://getbootstrap.com/). 

### Bootstrap
Bootstrap is an **open-source CSS framework**, originally developed by Twitter. It is excellent for creating *responsive* websites that look and feel great across a range of devices. These folks know what they are doing.

I chose the [Cover template](https://getbootstrap.com/docs/4.0/examples/cover/#) as my starting point for this blog. I like that it is **clean and simple**. 

#### Making it Less Bleak
Although the template is nice and simple, it is also _bloody bleak_. I decided to fling some of these colours in:

<ul>
	<li style="padding-bottom: 5px;"><span style="background-color: rgba(109, 158, 235, .75); border-radius: 5px; padding: 4px;"><b>rgba(109, 158, 235, .75)</b></span> for <a href="#" class="a	ctive">hyperlinkage</a>.</li>
	<li style="padding-bottom: 5px;"><span style="background-color: rgb(235, 238, 242); border-radius: 5px; padding: 4px;"><b>rgb(235, 238, 242)</b></span> for general backgroundage.</li>	
	<li style="padding-bottom: 5px;"><span style="background-color: rgb(248, 248, 248); border-radius: 5px; padding: 4px;"><b>rgb(248, 248, 248)</b></span> for <i>post</i> backgroundage.</li>	
</ul>

I also _pumped_ up the <a href="#' | relative_url }}" class="btn btn-lg btn-secondary">button</a>s, as follows:

```css
.btn,
.btn-secondary,
.btn-secondary:active:focus:visited {
  color: #6d9eeb !important;
  text-shadow: none !important; /* Prevent inheritance from `body` */
  box-shadow: none !important;
  background-color: rgb(240, 242, 245) !important;
  border: .2rem solid rgba(109, 158, 235, 0.25) !important;
}

.btn-secondary:hover {
  color: #6d9eeb !important;
  text-shadow: none !important; /* Prevent inheritance from `body` */
  box-shadow: none !important;
  background-color: rgb(240, 242, 245) !important;
  border: .2rem solid rgba(109, 158, 235, 0.5) !important;
}
```
The `!important` bits really are important, and don't work without it for some reason. There was a pesky issue where the colour of the button kept changing during a click. Probably something to do with the original template and **my noobishness**.

#### Mixing up the Fontage
I wasn't happy with the default font used by the Cover template, it seems too "blocky" to me. So I headed over to [Google Fonts](https://fonts.google.com/) to find a new one.

I have a particular affinity to the [Lato](https://fonts.google.com/?query=lato), as it was selected by my friend [@WebmaestroFR](https://twitter.com/webmaestrofr?lang=en) as the font face for [Visulytix's](http://visulytix.com) visual identity. 

The Google Fonts API, makes it incredibly simple to use their fonts on your website. You simply have to `link` to it in your HTML as follows.

```html
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lato" />
```

And then update the `font-family` in the `<body>` like so:

```css
body {
  ...
  font-family: Lato;
  ...
}
```

Instantly, all of the fonts in the Cover Template are replaced with beautiful **Lato**.

Finally, the shadows didn't work with the lighter background, so I commented that line out.

```css
body {
  ...
    /* text-shadow: 0 .025rem .05rem rgba(0, 0, 0, .5);
  box-shadow: inset 0 0 2rem rgba(0, 0, 0, .5); no one will read this */
  ...
}

```

#### Adding Social Media Icons
Adding social media icons was simple as. You just have to whack this in the footer:

```html
<footer class="mastfoot mt-auto">
<div class="inner">
  <p class="lead" style="font-size: 24px;">
  <a href="https://github.com/TWRogers"><i class="fa fa-github" aria-hidden="true"></i></a> &nbsp;&nbsp;
  <a href="https://twitter.com/TWRogersIII"><i class="fa fa-twitter" aria-hidden="true"></i></a> &nbsp;&nbsp;
  <a href="https://www.linkedin.com/in/thomaswrogers/"><i class="fa fa-linkedin" aria-hidden="true"></i></a> &nbsp;&nbsp;
  <a href="https://scholar.google.co.uk/citations?user=X0xrjrsAAAAJ&hl=en&authuser=1"><i class="fa fa-graduation-cap" aria-hidden="true"></i></a></p>
</div>
</footer>
```
This in the CSS:
```css
.mastfoot {
  color: rgba(67, 67, 67, 0.5);
}
```

And this in the `<head>`:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
```

After all that _whackage_, we are good to sit and wait for your mum to follow you.

#### Spying on your Guests with Google Analytics
If you're nosey like me, then you might consider setting up [Google Analytics](https://analytics.google.com) on your blog. This will allow you to see your website footfall, which blog articles are most popular, and **how often your mum checks up on you**.

So go ahead and create an account, it is very simple. You will be given a code snippet such as this:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-xxxxxxxx-n"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-xxxxxxxx-n');
</script>
```
Which you paste somewhere within the `<head>` of your HTML files.

This would be **pretty burdensome** to copy into every single HTML page, and Jekyll's layouts will later become your best friend.

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
#### SASS and SCSS

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
