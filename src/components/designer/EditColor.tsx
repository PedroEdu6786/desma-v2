import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

type EditColorProps = {
  children: React.ReactNode;
  initialColor?: string;
  setColor: (color: string) => void;
  removeColor?: () => void;
};

const EditColor: React.FC<EditColorProps> = ({
  children,
  initialColor = '#000000',
  setColor,
  removeColor,
}) => {
  const [temporalColor, setTemporalColor] = useState(initialColor);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Popover placement="right" {...{ isOpen, onClose, onOpen }}>
      <PopoverTrigger>
        <Button
          width="200px"
          height="170px"
          variant="outline"
          borderWidth={2}
          padding={0}
          margin={0}
          overflow="hidden"
        >
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverBody paddingY={8}>
          <VStack align="center" spacing="8">
            <HexColorPicker color={temporalColor} onChange={setTemporalColor} />
            <VStack spacing={1} width="70%" align="start">
              <Text>HEX</Text>
              <InputGroup>
                <InputLeftElement>#</InputLeftElement>
                <Input
                  value={temporalColor.replace(/[^0-9,a-f,A-F]/g, '')}
                  onChange={(event) => setTemporalColor(`#${event.target.value}`)}
                />
              </InputGroup>
            </VStack>
            <VStack spacing={4} width="70%" align="stretch">
              <Button
                colorScheme="blue"
                onClick={() => {
                  setColor(temporalColor);
                  onClose();
                }}
              >
                Save Color
              </Button>
              {removeColor && (
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={() => {
                    removeColor();
                    onClose();
                  }}
                >
                  Delete Color
                </Button>
              )}
            </VStack>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export { EditColor };
