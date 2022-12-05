import React from 'react';
import { SelectProps, Select as ChakraSelect, Box } from '@chakra-ui/react';

interface ISelect extends SelectProps {
  options: string[];
}

const Select = ({ options, ...rest }: ISelect) => {
  return (
    <ChakraSelect placeholder="Select option" {...rest}>
      {options.map((option, i) => (
        <Box as="option" key={i} value={option}>
          {option}
        </Box>
      ))}
    </ChakraSelect>
  );
};

export default Select;
