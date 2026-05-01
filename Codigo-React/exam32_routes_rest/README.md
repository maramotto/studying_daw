# Welcome to React Router!

A minimal template for experimenting with React Router v7.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/minimal)

> ![NOTE]
> This template should not be used for production apps and is intended more for experimentation and demo applications. Please see the [default](https://github.com/remix-run/react-router-templates/tree/main/default) template for a more full-featured template.

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

---

Built with ❤️ using React Router.

## Diagrama de elementos

```mermaid
flowchart LR
  H[Home]

  subgraph C[Components]
    direction TB
    L[BookList]
    D[BookDetail]    
  end

  S[BooksService]

  H --> C  
  C --> S
  L --> D
  D --> L

  classDef home fill:#b8e0d2,stroke:#2f7a63,stroke-width:1px,color:#111827,font-size:22px
  classDef view fill:#c7d0db,stroke:#4b5563,stroke-width:1px,color:#111827,font-size:22px
  classDef store fill:#ecd98b,stroke:#8b7a2f,stroke-width:1px,color:#111827,font-size:22px

  class H home
  class D,L view
  class S store

  style C fill:#f3f4f6,stroke:#d1d5db,color:#111827
  linkStyle default stroke:#111111,stroke-width:1.5px
```
