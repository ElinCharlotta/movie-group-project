import { render, screen } from '@testing-library/react'
import Categories from '../Pages/Categories.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { describe, beforeEach } from 'vitest'
import {  it, expect } from 'vitest'
import { userEvent } from '@testing-library/user-event'
import '../test/setup.ts'

describe('Component Categories -  View', () => {
  beforeEach(() => {
    render(
      <Router>
        <Categories />
      </Router>
    )
  })
it('renders correctly',  () => {
    const comp = render(<Router>
      <Categories />
    </Router>);
    expect(comp).toMatchSnapshot();  
  })

  it("Test for a word that does exist", async () => {
    const el = await screen.findByText("Movie Categories");
    expect(el).toBeInTheDocument();
  });

  it("Test for a button  that display result", async () => {
    const el = await screen.findByText("Drama");
    await userEvent.click(el)
    const elp = await screen.findByText("One Flew Over the Cuckoo's Nest");
    expect(elp).toBeInTheDocument(); 
  });
})