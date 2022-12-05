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

export interface IFontRow {
  scale: string;
  pixels: string;
  example: any;
}

interface ITable {
  headings: string[];
  rows: IFontRow[];
}

const Table = ({ headings, rows }: ITable) => {
  return (
    <TableContainer>
      <ChakraTable size="lg">
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
