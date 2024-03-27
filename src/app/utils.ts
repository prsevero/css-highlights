import type { TypeOption } from '@/app/definitions'


export const createLowerCasedOptions = (
  options: TypeOption[],
  keyText: string = 'text'
): TypeOption[] => {
  return options.map((opt: TypeOption) => {
    const txt = opt[keyText]
    if (typeof txt === 'string') return {
      ...opt,
      __text_lowered: txt.toLowerCase(),
    }
    return opt
  })
}


/* Highlight related functions */
export const highlightSupported = (): boolean => {
  if (!CSS.highlights) {
    console.error('CSS Custom Highlight API not supported. Polyfill function will be used.')
    return false
  }
  return true
}

export const highlight = ($elem: HTMLElement, value: string, key: string) => {
  if (!highlightSupported()) return

  const treeWalker: TreeWalker = document.createTreeWalker($elem, NodeFilter.SHOW_TEXT)
  const allTextNodes: Node[] = []
  let currentNode: Node | null = treeWalker.nextNode()
  while (currentNode) {
    allTextNodes.push(currentNode)
    currentNode = treeWalker.nextNode()
  }

  CSS.highlights.clear();

  const ranges = allTextNodes
    .map((el: Node) => {
      return { el, text: el?.textContent?.toLowerCase() }
    })
    .map(({ text, el }) => {
      const indices = []
      let startPos = 0
      while (text && startPos < text.length) {
        const index = text.indexOf(value, startPos)
        if (index === -1) break
        indices.push(index)
        startPos = index + value.length
      }

      return indices.map((index) => {
        const range = new Range()
        range.setStart(el, index)
        range.setEnd(el, index + value.length)
        return range
      })
    })

  const resultsHighlight: Highlight = new Highlight(...ranges.flat())
  CSS.highlights.set(key, resultsHighlight)
}

export const highlightPolyfill = (
  value: string,
  options: TypeOption[],
  keyText: string = 'text'
): TypeOption[] => {
  return options.map(opt => {
    const txt = opt[keyText]
    if (typeof txt !== 'string') return opt

    const lowerCased = txt.toLowerCase()
    const index = lowerCased.indexOf(value)
    const endPos = index + value.length
    return {
      ...opt,
      _text: `${txt.substring(0, index)}<mark>${txt.substring(index, endPos)}</mark>${txt.substring(endPos)}`
    };
  })
}
