# Code Citations

## License: unknown
https://github.com/ianBayne81/Portfolio/blob/6aab913fdbca1fe379654eff173d6d0888b499a6/public/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollT
```


## License: unknown
https://github.com/ianBayne81/Portfolio/blob/6aab913fdbca1fe379654eff173d6d0888b499a6/public/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollT
```


## License: unknown
https://github.com/jkh2801/Front-Design/blob/28c6202ec7ea0a66127437497e747a9a8972b592/SliderEx15.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/josefzacek/newgrange/blob/89917f4333b87a8dc7f08c3e756bad0ddd4b4b3d/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/Plasnid/proj1_anim2500_scaffolding/blob/0269f03e5d867ac5a6cb8c92595b053606df6a1a/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/ianBayne81/Portfolio/blob/6aab913fdbca1fe379654eff173d6d0888b499a6/public/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollT
```


## License: unknown
https://github.com/jkh2801/Front-Design/blob/28c6202ec7ea0a66127437497e747a9a8972b592/SliderEx15.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/josefzacek/newgrange/blob/89917f4333b87a8dc7f08c3e756bad0ddd4b4b3d/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/Plasnid/proj1_anim2500_scaffolding/blob/0269f03e5d867ac5a6cb8c92595b053606df6a1a/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/ianBayne81/Portfolio/blob/6aab913fdbca1fe379654eff173d6d0888b499a6/public/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollT
```


## License: unknown
https://github.com/jkh2801/Front-Design/blob/28c6202ec7ea0a66127437497e747a9a8972b592/SliderEx15.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/josefzacek/newgrange/blob/89917f4333b87a8dc7f08c3e756bad0ddd4b4b3d/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/Plasnid/proj1_anim2500_scaffolding/blob/0269f03e5d867ac5a6cb8c92595b053606df6a1a/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/ianBayne81/Portfolio/blob/6aab913fdbca1fe379654eff173d6d0888b499a6/public/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollT
```


## License: unknown
https://github.com/jkh2801/Front-Design/blob/28c6202ec7ea0a66127437497e747a9a8972b592/SliderEx15.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/josefzacek/newgrange/blob/89917f4333b87a8dc7f08c3e756bad0ddd4b4b3d/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/Plasnid/proj1_anim2500_scaffolding/blob/0269f03e5d867ac5a6cb8c92595b053606df6a1a/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/Hazeltron/pe-projects/blob/bb6030d63e2e65cd8824e951666b70621addb40d/footer.php

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
```


## License: unknown
https://github.com/ianBayne81/Portfolio/blob/6aab913fdbca1fe379654eff173d6d0888b499a6/public/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/jkh2801/Front-Design/blob/28c6202ec7ea0a66127437497e747a9a8972b592/SliderEx15.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/josefzacek/newgrange/blob/89917f4333b87a8dc7f08c3e756bad0ddd4b4b3d/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/Plasnid/proj1_anim2500_scaffolding/blob/0269f03e5d867ac5a6cb8c92595b053606df6a1a/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/Hazeltron/pe-projects/blob/bb6030d63e2e65cd8824e951666b70621addb40d/footer.php

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
```


## License: unknown
https://github.com/ianBayne81/Portfolio/blob/6aab913fdbca1fe379654eff173d6d0888b499a6/public/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/jkh2801/Front-Design/blob/28c6202ec7ea0a66127437497e747a9a8972b592/SliderEx15.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/josefzacek/newgrange/blob/89917f4333b87a8dc7f08c3e756bad0ddd4b4b3d/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/Plasnid/proj1_anim2500_scaffolding/blob/0269f03e5d867ac5a6cb8c92595b053606df6a1a/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.
```


## License: unknown
https://github.com/Hazeltron/pe-projects/blob/bb6030d63e2e65cd8824e951666b70621addb40d/footer.php

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
```


## License: unknown
https://github.com/ianBayne81/Portfolio/blob/6aab913fdbca1fe379654eff173d6d0888b499a6/public/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Custom
```


## License: unknown
https://github.com/jkh2801/Front-Design/blob/28c6202ec7ea0a66127437497e747a9a8972b592/SliderEx15.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Custom
```


## License: unknown
https://github.com/josefzacek/newgrange/blob/89917f4333b87a8dc7f08c3e756bad0ddd4b4b3d/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Custom
```


## License: unknown
https://github.com/Plasnid/proj1_anim2500_scaffolding/blob/0269f03e5d867ac5a6cb8c92595b053606df6a1a/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Custom
```


## License: unknown
https://github.com/Hazeltron/pe-projects/blob/bb6030d63e2e65cd8824e951666b70621addb40d/footer.php

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
```


## License: unknown
https://github.com/ianBayne81/Portfolio/blob/6aab913fdbca1fe379654eff173d6d0888b499a6/public/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script
```


## License: unknown
https://github.com/jkh2801/Front-Design/blob/28c6202ec7ea0a66127437497e747a9a8972b592/SliderEx15.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script
```


## License: unknown
https://github.com/josefzacek/newgrange/blob/89917f4333b87a8dc7f08c3e756bad0ddd4b4b3d/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script
```


## License: unknown
https://github.com/Plasnid/proj1_anim2500_scaffolding/blob/0269f03e5d867ac5a6cb8c92595b053606df6a1a/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script
```


## License: unknown
https://github.com/Hazeltron/pe-projects/blob/bb6030d63e2e65cd8824e951666b70621addb40d/footer.php

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
```


## License: unknown
https://github.com/ianBayne81/Portfolio/blob/6aab913fdbca1fe379654eff173d6d0888b499a6/public/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script
```


## License: unknown
https://github.com/jkh2801/Front-Design/blob/28c6202ec7ea0a66127437497e747a9a8972b592/SliderEx15.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script
```


## License: unknown
https://github.com/josefzacek/newgrange/blob/89917f4333b87a8dc7f08c3e756bad0ddd4b4b3d/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script
```


## License: unknown
https://github.com/Plasnid/proj1_anim2500_scaffolding/blob/0269f03e5d867ac5a6cb8c92595b053606df6a1a/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script
```


## License: unknown
https://github.com/Hazeltron/pe-projects/blob/bb6030d63e2e65cd8824e951666b70621addb40d/footer.php

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
```


## License: unknown
https://github.com/ianBayne81/Portfolio/blob/6aab913fdbca1fe379654eff173d6d0888b499a6/public/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
```


## License: unknown
https://github.com/jkh2801/Front-Design/blob/28c6202ec7ea0a66127437497e747a9a8972b592/SliderEx15.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
```


## License: unknown
https://github.com/josefzacek/newgrange/blob/89917f4333b87a8dc7f08c3e756bad0ddd4b4b3d/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
```


## License: unknown
https://github.com/Plasnid/proj1_anim2500_scaffolding/blob/0269f03e5d867ac5a6cb8c92595b053606df6a1a/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
```


## License: unknown
https://github.com/Hazeltron/pe-projects/blob/bb6030d63e2e65cd8824e951666b70621addb40d/footer.php

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
```


## License: unknown
https://github.com/ianBayne81/Portfolio/blob/6aab913fdbca1fe379654eff173d6d0888b499a6/public/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
These block
```


## License: unknown
https://github.com/jkh2801/Front-Design/blob/28c6202ec7ea0a66127437497e747a9a8972b592/SliderEx15.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
These block
```


## License: unknown
https://github.com/josefzacek/newgrange/blob/89917f4333b87a8dc7f08c3e756bad0ddd4b4b3d/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
These block
```


## License: unknown
https://github.com/Plasnid/proj1_anim2500_scaffolding/blob/0269f03e5d867ac5a6cb8c92595b053606df6a1a/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
These block
```


## License: unknown
https://github.com/Hazeltron/pe-projects/blob/bb6030d63e2e65cd8824e951666b70621addb40d/footer.php

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
These block
```


## License: unknown
https://github.com/ianBayne81/Portfolio/blob/6aab913fdbca1fe379654eff173d6d0888b499a6/public/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
These block
```


## License: unknown
https://github.com/jkh2801/Front-Design/blob/28c6202ec7ea0a66127437497e747a9a8972b592/SliderEx15.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
These block
```


## License: unknown
https://github.com/josefzacek/newgrange/blob/89917f4333b87a8dc7f08c3e756bad0ddd4b4b3d/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
These block
```


## License: unknown
https://github.com/Plasnid/proj1_anim2500_scaffolding/blob/0269f03e5d867ac5a6cb8c92595b053606df6a1a/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
These block
```


## License: unknown
https://github.com/Hazeltron/pe-projects/blob/bb6030d63e2e65cd8824e951666b70621addb40d/footer.php

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
These block
```


## License: unknown
https://github.com/ianBayne81/Portfolio/blob/6aab913fdbca1fe379654eff173d6d0888b499a6/public/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
These block
```


## License: unknown
https://github.com/jkh2801/Front-Design/blob/28c6202ec7ea0a66127437497e747a9a8972b592/SliderEx15.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
These block
```


## License: unknown
https://github.com/josefzacek/newgrange/blob/89917f4333b87a8dc7f08c3e756bad0ddd4b4b3d/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
These block
```


## License: unknown
https://github.com/Plasnid/proj1_anim2500_scaffolding/blob/0269f03e5d867ac5a6cb8c92595b053606df6a1a/index.html

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
These block
```


## License: unknown
https://github.com/Hazeltron/pe-projects/blob/bb6030d63e2e65cd8824e951666b70621addb40d/footer.php

```
Now I have the full picture. Here is the audit.

---

# Engineering Audit — Portfolio Project

## 1. Architecture

### Monolith anti-pattern
The entire project lives in three flat files: 1,065 lines of HTML, 3,468 lines of CSS, 1,100 lines of JavaScript. There is zero modularity. Every section, animation system, and concern is concatenated top-to-bottom. This is the #1 thing a senior interviewer will flag.

### Tight DOM-JS coupling
JavaScript queries DOM elements by hard-coded IDs and class names in over 40 `document.querySelector`/`getElementById` calls at the top level — most at parse time, outside any `DOMContentLoaded` guard. If any element is renamed or removed, the entire script silently breaks. The `contactForm.addEventListener` on [main.js line ~780](assets/js/main.js#L780) will throw if the form doesn't exist.

### Dead/orphan assets
[assets/scroll/](assets/scroll) contains two `Firefly` PNGs that are never referenced anywhere in the codebase. Dead weight in the repo.

### Naming inconsistency
- CSS uses `kebab-case` for everything, but JS mixes `camelCase` variable names with string-literal class names like `'slideshow-glitching'` and `'flash'`. 
- Image files use mixed casing: `Breached.png`, `DP.png`, `Sandeep.jpeg`, `Sandeep.jpg`, `Sandeep.png`. This will break on case-sensitive servers (Linux hosting, Docker).

### No separation of animation concerns
GSAP timelines, cursor physics, particle systems, slideshow logic, scroll handlers, and form handling are all in one file. Any edit risks regressions across unrelated features.

---

## 2. Performance

### Render-blocking GSAP in `<head>`
Four GSAP scripts are loaded synchronously in the `<head>` ([index.html lines 117-120](index.html#L117-L120)):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```
These block
```

