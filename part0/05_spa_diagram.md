# Exercise 0.5: Single page app diagram 
```mermaid
sequenceDiagram
    participant Browser
    participant Server
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    Server-->>-Browser: HTML document
    
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>-Browser: the CSS file

    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    Server-->>-Browser: the Javascript file
    Note right of Browser: Browser executes the javascript code that fetches JSON data from the server

    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>-Browser: list of notes in JSON format
    Note right of Browser: Browser executes event handler that renders the list of notes

```