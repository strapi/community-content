interface Article {
  node: {
    id: number
    strapiId: string
    image: {
      childImageSharp: {
        fixed: FixedObject
        fluid: FluidObject
      }
    }
    category: {
      name: string
    }
    title: string
    content: string
  }
}

interface CSSModule {
  [className: string]: string
}

// type shims for CSS modules

declare module '*.module.scss' {
  const cssModule: CSSModule
  export = cssModule
}

declare module '*.module.css' {
  const cssModule: CSSModule
  export = cssModule
}
