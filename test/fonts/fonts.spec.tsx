import { ChakraProvider } from '@chakra-ui/react';
import {
  act,
  fireEvent,
  queryByPlaceholderText,
  queryByTestId,
  queryByText,
  render,
} from '@testing-library/react';

import { FontsSection } from '../../src/components/designer/FontsSection';

type MockFonts = () => {
  container: HTMLElement;
  headingInput: () => Element;
  paragraphInput: () => Element;
  submitFonts: () => Element;
  numberInput: () => Element;
  scaleInput: () => Element;
  table: () => Element;
};

const build: MockFonts = () => {
  const { container } = render(
    <ChakraProvider>
      <FontsSection />
    </ChakraProvider>
  );

  return {
    container,
    headingInput: () => queryByPlaceholderText(container, 'Lobster') || new Element(),
    paragraphInput: () => queryByPlaceholderText(container, 'Inter') || new Element(),
    submitFonts: () => queryByText(container, 'Submit Fonts') || new Element(),
    numberInput: () => queryByTestId(container, 'number') || new Element(),
    scaleInput: () => queryByTestId(container, 'scale') || new Element(),
    table: () => queryByTestId(container, 'table') || new Element(),
  };
};

describe('Fonts module', () => {
  it('renders view', () => {
    expect(build()).toBeDefined();
  });

  it('should create document link styles for fonts', async () => {
    const { headingInput, paragraphInput, submitFonts } = build();

    jest.spyOn(document, 'createElement');
    jest.spyOn(document.head, 'appendChild');
    fireEvent.change(headingInput(), { target: { value: 'Lobster' } });
    fireEvent.change(paragraphInput(), { target: { value: 'Inter' } });
    act(() => {
      fireEvent.click(submitFonts());
    });

    expect(document.createElement).toBeCalled();
    expect(document.head.appendChild).toBeCalled();
  });
  it('should update fonts table', async () => {
    const { numberInput, scaleInput, table } = build();

    const numRows1 = table().children.length;
    fireEvent.change(numberInput(), { target: { value: 10 } });
    fireEvent.change(scaleInput(), { target: { value: 'Golden Ratio' } });
    const numRows2 = table().children.length;

    expect(numRows1).toBe(4);
    expect(numRows2).toBe(5);
    expect(numRows2).not.toEqual(numRows1);
  });
});
