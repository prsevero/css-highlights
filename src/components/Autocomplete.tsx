import { useEffect, useRef, useState } from 'react'
import type { TypeOption } from '@/app/definitions'
import {
  createLowerCasedOptions,
  highlight,
  highlightPolyfill,
  highlightSupported
} from '@/app/utils'
import styles from './Autocomplete.module.css'

const Autocomplete = ({
  key = 'id',
  keyText = 'text',
  loading = false,
  options
}: {
  key?: string
  keyText?: string
  loading?: boolean
  options: TypeOption[]
}) => {
  const [value, setValue] = useState<string>('')
  const [optionSelected, setOptionSelected] = useState<TypeOption>()
  const [optionsFiltered, setOptionsFiltered] = useState<TypeOption[]>([])
  const resultsRef = useRef<HTMLUListElement>(null)
  const isHighlightSupported = useRef<boolean>(true)
  const [internalOptions, setInternalOptions] = useState<TypeOption[]>([])

  useEffect(() => {
    isHighlightSupported.current = highlightSupported()
  }, [])

  useEffect(() => {
    const opts: TypeOption[] = createLowerCasedOptions(options)
    setInternalOptions(opts)
  }, [options])

  useEffect(() => {
    if (!isHighlightSupported.current || !resultsRef.current) return
    highlight(resultsRef.current, value.toLowerCase(), 'results')
  }, [optionsFiltered])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue(value)

    if (value === '') {
      setOptionsFiltered([])
      return
    }

    const lowerCased = value.toLowerCase()
    let filtered: TypeOption[] = internalOptions.filter((option: TypeOption) =>
      typeof option['__text_lowered'] === 'string' &&
        option['__text_lowered'].includes(lowerCased)
    )

    if (!isHighlightSupported.current)
      filtered = highlightPolyfill(lowerCased, filtered)

    setOptionsFiltered(filtered)
  }

  const handleOptionClick = (option: TypeOption) => {
    const txt = option[keyText]
    setValue(typeof txt === 'string' ? txt : '')
    setOptionsFiltered([])

    if (optionSelected && optionSelected[key] === option[key]) return

    console.log('Prev: ', optionSelected)
    console.log('Next: ', option)
    setOptionSelected(option)
  }

  return (
    <div className={styles.wrapper}>
      <input
        className={`${styles.input} ${loading ? styles.loading : ''}`}
        disabled={loading}
        onChange={handleInputChange}
        placeholder="Type to autocomplete..."
        type="text"
        value={value}
      />

      {optionsFiltered.length > 0 && (
        <ul className={styles.results} ref={resultsRef}>
          {optionsFiltered.map((option: TypeOption) => (
            isHighlightSupported.current ? (
              <li key={option[key]} onClick={() => handleOptionClick(option)}>
                {option[keyText]}
              </li>
            ) : (
              <li
                key={option[key]}
                onClick={() => handleOptionClick(option)}
                dangerouslySetInnerHTML={{ __html: option[`_${keyText}`] }}
              >
              </li>
            )
          ))}
        </ul>
      )}
    </div>
  )
}

export default Autocomplete
