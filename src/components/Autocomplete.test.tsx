import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Autocomplete from './Autocomplete'

const options = [
  {id: 1, text: 'Canada'},
  {id: 2, text: 'Brazil'},
  {id: 3, text: 'Colombia'},
]

describe('Autocomplete', () => {

  it('renders input', () => {
    render(<Autocomplete options={options} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('renders input disabled when loading', () => {
    render(<Autocomplete options={options} loading={true} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('renders input and change value', () => {
    render(<Autocomplete options={options} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: 'Text'}})
    expect(input.value).toBe('Text')
  })

  it('renders options', () => {
    render(<Autocomplete options={options} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: 'a'}})
    const results = screen.getByRole('list')
    expect(results).toBeInTheDocument()
  })

  it('renders all matched options', () => {
    render(<Autocomplete options={options} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: 'a'}})
    const results = screen.getByRole('list')
    expect(results.children.length).toBe(options.length)
  })

  it('renders partial matched options', () => {
    render(<Autocomplete options={options} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: 'c'}})
    const results = screen.getByRole('list')
    expect(results.children.length).toBe(2)
  })

  it('renders full matched options', () => {
    render(<Autocomplete options={options} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: 'canada'}})
    const results = screen.getByRole('list')
    expect(results.children.length).toBe(1)
  })

  it('renders options and select 1st', () => {
    render(<Autocomplete options={options} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: 'a'}})
    const results = screen.getByRole('list')
    fireEvent.click(results.children[0])
    expect(input.value).toBe(options[0].text)
  })

  it('renders options and select 2nd', () => {
    render(<Autocomplete options={options} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: 'a'}})
    const results = screen.getByRole('list')
    fireEvent.click(results.children[1])
    expect(input.value).toBe(options[1].text)
  })

  it('renders options and select 3rd', () => {
    render(<Autocomplete options={options} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: 'a'}})
    const results = screen.getByRole('list')
    fireEvent.click(results.children[2])
    expect(input.value).toBe(options[2].text)
  })

  it('renders options and highlight correctly', () => {
    render(<Autocomplete options={options} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: 'a'}})
    const results = screen.getByRole('list')
    expect(results.children[0].innerHTML).toBe(`C<mark>a</mark>nada`)
    expect(results.children[1].innerHTML).toBe(`Br<mark>a</mark>zil`)
    expect(results.children[2].innerHTML).toBe(`Colombi<mark>a</mark>`)
  })

})
