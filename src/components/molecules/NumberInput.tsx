import React from 'react';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react';

const NumberInput = (props: NumberInputProps) => {
  return (
    <ChakraNumberInput {...props}>
      <NumberInputField data-testid="number" />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </ChakraNumberInput>
  );
};

export default NumberInput;
