## mySōl


mySōl is a DIY IOT solar panel and energy storage unit controllable via a RESTful hypermedia API.

The mySōl's API is implemented with a Node/Express server running on a Raspberry PI 3. All device functions are controlled via endpoints exposed on the API.

The companion web app used the API to provide an easy and intuitive interface for uses to control their device and learn more about their energy consumption pattenr and estimated carbon footprint.

#### What is Hypermedia? 

At its root hypermedia APIs expose a few top level resources at API endpoints as an entrypoint to an API, much like a website's homepage. API exploration is facilitated by embedding links to different resources and services within API response payloads. For a more thorough introduction to hypermedia see a summary [here](https://stateless.co/hal_specification.html) and the draft specification [here](https://tools.ietf.org/html/draft-kelly-json-hal-08). 

##### But *why* though?

* Human and machine readable API response payloads --- because API responses are structured according to established semantics, consuming code can make assumptions about how an API works without having to learn how an API is implemented (usually through written docs.) This also enables a number of automation uses cases.
* Reduced need for API versioning --- including a `v1` or `vX` in an API endpoint is a means of avoiding breaking clients when new features are added or breaking changes are instituted. Requiring clients to know which version they are using (or are supposed to use) means they are too tightly coupled to API endpoint defintions. A hypermedia response *tells* clients where and how to access a service via links.
* Preloading data --- For web browser clients the link to the next or previous record in a hypermedia collection can be exposed and prefetched or preloaded using a `<link>` tag with the `rel='preload'|'prefetch'` attribute. This allows browsers to identify resources a user might be interested in loading in the near future when the HTML is parsed (prefetch) **or** use browser idle time to load resources (preload.) In either case we can allow browser clients to optimize user experience by providing API responses in a structured, consistent and meaningful way.   
