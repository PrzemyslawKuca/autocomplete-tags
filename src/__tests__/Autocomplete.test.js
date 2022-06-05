import React from 'react';
import {fireEvent, render} from '@testing-library/react'
import Autocomplete from "../components/Autocomplete/Autocomplete";
import names from "../assets/names.json";
import App from "../App";

let getByTestId;
let getByText;

beforeEach(() => {
  const component = render(<App/>)
  getByTestId = component.getByTestId
  getByText = component.getByText
})

test("render component", async () => {
  let tagsList = []
  const suggestionsList = names;
  const handleChange = (tags) => {
    tagsList = tags
  }

  const component = render(<Autocomplete suggestionsList={suggestionsList} tags={tagsList} setTags={handleChange}/>)
  expect(component).toBeTruthy()
})

test("add a tag with the input value", async () => {
  const input = getByTestId('input');
  const inputTag = 'Przemysław'

  expect(input.value).toBe('')

  fireEvent.change(input, {
    target: {
      value: inputTag
    }
  });

  expect(input.value).toBe(inputTag)
  fireEvent.keyDown(input, {key: 'Enter', code: 'Enter', charCode: 13})
  expect(input.value).toBe('')
  expect(getByText(inputTag).textContent).toBe(inputTag);
})

test("add a tag from the suggestions", async () => {
  const input = getByTestId('input');
  const suggestionsList = names;

  fireEvent.keyDown(input, {key: 'ArrowDown', which: 40, keyCode: 40})
  fireEvent.keyDown(input, {key: 'ArrowDown', which: 40, keyCode: 40})
  fireEvent.keyDown(input, {key: 'ArrowUp', which: 38, keyCode: 38})
  fireEvent.keyDown(input, {key: 'Enter', code: 'Enter', charCode: 13})

  expect(getByText(suggestionsList[1]).textContent).toBe(suggestionsList[1]);
})

test("add a tag from the suggestion with part of the text", async () => {
  const input = getByTestId('input');
  const fullName = 'Olivier'

  fireEvent.change(input, {
    target: {
      value: fullName.slice(0, fullName.length - 2)
    }
  });

  fireEvent.keyDown(input, {key: 'Enter', code: 'Enter', charCode: 13})

  expect(getByText(fullName).textContent).toBe(fullName);
})
