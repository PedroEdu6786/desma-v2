import { ChakraProvider } from '@chakra-ui/react';
import {
  act,
  fireEvent,
  queryByPlaceholderText,
  queryByTestId,
  queryByText,
  render,
} from '@testing-library/react';

import { SpacingSection } from '../../src/components/designer/SpacingSection';

type MockFonts = () => {
  container: HTMLElement;
  numberInput: () => Element;
  scaleInput: () => Element;
  table: () => Element;
};

const build: MockFonts = () => {
  const { container } = render(
    <ChakraProvider>
      <SpacingSection />
    </ChakraProvider>
  );

  return {
    container,
    numberInput: () => queryByTestId(container, 'number') || new Element(),
    scaleInput: () => queryByTestId(container, 'scale') || new Element(),
    table: () => queryByTestId(container, 'table') || new Element(),
  };
};

describe('Fonts module', () => {
  it('renders view', () => {
    expect(build()).toBeDefined();
  });
  it('should update spacing ratio on input change', async () => {
    const { numberInput, scaleInput, table } = build();

    const numRows1 = table().children.length;
    fireEvent.change(numberInput(), { target: { value: 10 } });
    fireEvent.change(scaleInput(), { target: { value: 'Golden Ratio' } });
    const numRows2 = table().children.length;

    expect(numRows1).toBe(8);
    expect(numRows2).toBe(9);
    expect(numRows2).not.toEqual(numRows1);
  });
});
