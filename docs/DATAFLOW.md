# Routes Scratchpad

```mermaid
    graph TD

    input
    output
    
    subgraph jason
        inSEvent
        inSGenre
        inDDate
        appApp
        appOut
    end

    subgraph tanya
        toOpenAI
        fromOpenAI
    end
    
    openai

    subgraph gaj
        toSpotify
        fromSpotify
    end

    spotify

    input --> inSEvent & inSGenre & inDDate
    inSEvent & inSGenre --> toOpenAI
    toOpenAI --> openai
    openai --> fromOpenAI
    inDDate & fromOpenAI --> appApp
    appApp --> toSpotify
    toSpotify --> spotify
    spotify --> fromSpotify
    fromSpotify --> appOut
    appOut --> output
```
