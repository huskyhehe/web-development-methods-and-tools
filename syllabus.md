# Course Syllabus: INFO 6250 - Seattle
# Spring Semester 2022 - Mondays
Instructor: Brett Ritter `<b.ritter@neu.edu>`

This course covers Web Development, focusing on both the fundamentals and from them modern development practices for the web.  The class will use Javascript on both the front- and back-ends of web application development, but the lessons learned will be applicable to many languages.  
 - Basic git use as a version control system for shared applications and development
 - How information flows in a web application between various machines
 - Modern JS development for the frontend (both "vanilla" JS and React-based)
 - NodeJS development of a backend end, both server generated content using the express framework (minimal) and service development.
 - Web security fundamental practices, both front- and back-end.
 - The basics of how many development teams breakdown application needs and complete work

### What is NOT covered
 - How to program in general
 - HTML and CSS details (My INFO6150 course is a great source of info here)
 - Languages other than Javascript (focus is on concepts)
 - Mobile specific development
 - Accessibility (a11y), Internationalization (i18n), or Localization (l10n)
 - SQL/NoSQL usage or database architectures/maintenance
 
## Grading: I reserve the right to adjust based on your final demonstration of applied knowledge.  
```
15% Assignments (lowest score ignored)
10% Quizzes (lowest score ignored)
25% Server-side Project
25% Vanilla JS Project 
25% Final Project
```

## Basic Requirements and Expectations:
- Basic familiarity with CSS and HTML is assumed ( see https://developer.mozilla.org/en-US/docs/Learn )  
- Basic exposure to programming concepts (variables, functions, looping) is assumed
- You will have to use git and github.com following the instructions given
- There is no textbook for the class, but a number of online articles will be shared.
- See also the `/readings/` directory in the class repo
- Many topics will be introduced in class but require you to perform additional research/experimentation
- Additional software (without cost) is required.  Installation and configuration is your responsibility (Mac, Windows, or \*nix)
- Students should ask questions where anything is unclear
- A great deal of work will be done online, in and out of class

## Expected Class Schedule (subject to change):

### Section 1: Web Fundamentals
Mon Sep 12,
Mon Sep 19,
Mon Sep 26,
Mon Oct 3, 
NOT Mon Oct 10 (holiday),
Mon Oct 17,
Mon Oct 24,

- HTTP, servers/webservers, browsers, clients, URL/URI, HTTP as stateless, request/response, headers/body
- The role of HTML, CSS, and JS
- Semantic HTML, MDN, The Browser Wars, evergreen browsers, the unreliability of not-that-old information
- HTML best practices, CSS best practices, JS best practices
- Absolute vs relative paths/URLs
- Multiple-page web applications
- Static vs dynamic assets, client-side/server-side
- programming languages as communication, idioms, static/dynamic languages, weak/strong typing
- Javascript syntax, NodeJS, npm/yarn, package.json, global vs local installs, JSON
- debugging JS, unit tests, testing pyramid, TDD
- functions as objects, prototypes, 'this'(context), callbacks, threads, try/catch, closures, scopes
- templates, Model-View-Controller(MVC)
- HTTPS/SSL, public-key encryption, certificates, Authentication, Authorization
- Password hashing/salting, JWT, SQL Injection
- cookies, localStorage, indexedDB
- application state, state in model vs state in DOM

At the end of Section 1 you should be able to write a simple multiple page web application using NodeJS that serves semantic HTML and styles with CSS.  You will receive from github repository updates and submit your work via Pull Requests (PRs) in the same fashion that many employers conduct their work.

#### Server Side Project Due

Sun Oct 30, 11:59pm PT

### Section 2: Modern Web

Mon Oct 31,
Mon Nov 7,
Mon Nov 14,

- The DOM 
- JS-based Validation
- SPA and client rendering
- REST and JS-based service calls
- asynchronous events (async), Promises, XHR/fetch/AJAX, HTTP verbs (methods), REST, services/endpoints
- Application state management, CRUD
- Same Origin Policy(SOP), CORS,
- polyfills, minifiers, linters, bundlers, transpilers, CSS preprocessors, builds

#### Vanilla JS Project Due

Wed Nov 20, 11:59pm PT

### Section 3: The Recent Web

Mon Nov 21,
Mon Nov 28,
Mon Dec 5


- Progressive Enhancement
- Frontend frameworks/libraries, React, virtual DOM, JSX, Single Page Applications (SPA)
- props vs state, Pure components vs stateful components
- Agile, change management, Software Patterns
- Mockups, wireframes, prototypes
- Obfuscation, copyrights, and module licensing

At the end of Section 2 you should be able to write a simple single page web application (SPA) using vanilla JS OR React JS.  Your SPA can call RESTful external services, and you can use NodeJS to provide those service endpoints.

### Final Projects Due 
Sun Dec 11 (11:59pm PT)

No class Mon Dec 12 (just Project due on Dec 11)

