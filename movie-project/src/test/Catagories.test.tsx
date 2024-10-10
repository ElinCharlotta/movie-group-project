import { render, screen } from '@testing-library/react'
import Categories from '../Pages/Categories.tsx'
import {  it, expect } from 'vitest'
import { userEvent } from '@testing-library/user-event'

it('renders correctly',  () => {
    const  comp = render(<Categories />);
    expect(comp).toMatchSnapshot();  
  })

  it("Test for a word that does exist", async () => {
    render(<Categories />);
    const el = await screen.findByText("Movie Categories");
    expect(el).toBeInTheDocument();
  });

  it("Test for a button  that display result", async () => {
    render(<Categories />);
    const el = await screen.findByText("Drama");
    await userEvent.click(el)
    const elp = await screen.findByText("One Flew Over the Cuckoo's Nest");
    expect(elp).toBeInTheDocument(); 
  });