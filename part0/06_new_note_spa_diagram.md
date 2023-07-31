# Exercise 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
    participant Browser
    participant Server
    Note right of Browser: User submits new note and the forms event handler is called
    Note right of Browser: Browser redraws list of notes with the new note added
    Browser->>+Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Server->>-Browser: JSON response: {message: "note created"}
```