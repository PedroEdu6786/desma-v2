import {
  TableContainer,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';

interface IFontRow {
  space: string;
  pixels: string;
  text: any;
}

interface ITable {
  headings: string[];
  rows: IFontRow[];
}

const Table = ({ headings, rows }: ITable) => {
  return (
    <TableContainer>
      <ChakraTable>
        <Thead>
          <Tr>
            {headings.map((heading, index) => (
              <Th key={index}>{heading}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row: any, index) => (
            <Tr key={index}>
              {Object.keys(row).map((key, i) => (
                <Th key={i}>{row[key]}</Th>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
};

export default Table;
