# tybee-foundation

Asymptotically moving in the direction of "perfect 80/20" for a web backend.  In Typescript + Node.


# Why Reference this Repo as an example
It demonstrates all the things I care about

* For product-market-fit projects, just use Typescript and Node.
  * Same language for front-ends and backends
  * Javascript isn't going anywhere thanks to browsers
  * All the tooling around using Node is state-of-the-art, mature, stable
  * The asynchronous nature of Javascript generally prevents bad patterns that block threads
* Service-Oriented!   (Which does NOT mean microservices)
  * Services herein are stateless, singletons, and ONLY instantiated at Context Root
* Dependency Injection
* While you really don't need a dependency injection library, the patterns and principles promoted by Inversify are smart.    
* Uses ts-gist-pile which is the highest ROI library I have ever seen.   Disclaimer: I wrote it.
  * The simplicity of `d4l()` is elegant
* Logging as a first class citizen
* SOLID - All 5 of the letters herein!  Yes all 5.   All 5 are important.  Did I mention all 5?
* Find what varies and encapsulate it, favor composition over inheritance, program to an interface not an implementation
* Immutable things are generally good.   See the thinkings and reasonings promoted by immutables.js
* Monoliths are valuable.   This is the beginnings of a good monolith.
* Testable, maintainable, debuggable, story-telling, debt-free
* It uses Go only for Go-migrations.   This is the best way to do migrations I have seen
* The logs are the documentation
* When creating a project of some kind, don't store the generated project details in the root of the repository.   Instead create a folder and nest the generated stuff there.   That gives you flexibility for tooling and documentation and other stuff that doesn't necessarily fit perfectly into the project.   (In this example, migrations)
* Makefiles are your friend
* The project tree follows folders-by-feature instead of folders-by-type which is superior in all cases.   (This is also sometimes referred to as feature-folders vs tech-folders)
* Separation of concerns
* Use the right log level
* The first thing in any log line is the `"methodName(): "`
* Most software codebases seem to start off as science fair projects where stuff keeps getting bolted on.   And it works and the business is operating.   But everything depends on everything and it's super brittle and it's hard to test.   So nobody wants to change anything.   If you follow these guidelines and DON'T CHEAT, you will stay agile and light with your monolith for years to come
* If you look hard enough at ts-gist-pile, you can find that the beginnings of lightweight observability are baked in from day 1.    You should find ways to bake in observability from day 1
* This repo makes use of git-lfs as all repos should
* I like the `interface WhateverService` and `class WhateverServiceImpl implements WhateverService`.    But everyone must promise to keep services stateless and never use inheritance.

# What's Missing
* I need to bake tracing support into ts-gist-pile.  (But to do so I probably need to create ts-node-pile which includes ts-gist-pile but extends it with node-only features)

# See also
* https://softwareengineering.stackexchange.com/questions/310833/why-does-everyone-put-controllers-in-one-folder-and-views-in-another
* https://softwareengineering.stackexchange.com/questions/338597/folder-by-type-or-folder-by-feature

