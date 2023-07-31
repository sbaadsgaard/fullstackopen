# Exercise 0.4: New note diagram

```mermaid 
sequenceDiagram
    participant Browser
    participant Server

    Note right of Browser: User submits new note
    Browser->>+Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Server -->>-Browser: Redirect address (/notes)
    
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    Server-->>-Browser: HTML document
    
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>-Browser: the CSS file

    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Server-->>-Browser: the Javascript file
    Note right of Browser: Browser executes the javascript code that fetches JSON data from the server

    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>-Browser: list of notes in JSON format
    Note right of Browser: Browser executes event handler that renders the list of notes

```