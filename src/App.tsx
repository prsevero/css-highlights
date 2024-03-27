import { useEffect, useState } from 'react'
import { getCountries } from '@/app/api'
import type { TypeOption } from '@/app/definitions'
import Autocomplete from '@/components/Autocomplete'

const App = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [options, setOptions] = useState<TypeOption[]>([])

  useEffect(() => {
    (async function () {
      try {
        const response = await getCountries()
        const data = await response.json()
        setOptions(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }())
  }, [])

  return (
    <>
      <Autocomplete loading={loading} options={options} />
    </>
  )
}

export default App
