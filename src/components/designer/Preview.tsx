import {
  Box,
  Card,
  CardBody,
  Center,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import PreviewLogo from '../atoms/PreviewLogo';

export type PreviewProps = {};

const Preview: React.FC<PreviewProps> = () => {
  return (
    <Card bgColor="blue.700" h="70vh">
      <CardBody p="2rem" alignItems="center" display="flex" flexDirection="column">
        <HStack color="white" alignSelf="flex-start">
          <PreviewLogo />
          <Heading as="h3" size="md">
            Design System
          </Heading>
        </HStack>
        <Heading color="white" size="lg" textAlign="center" pt="3rem">
          An Amazing Heading Title
        </Heading>
        <Text color="white" fontSize="md" textAlign="center" pt="1rem">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer varius bibendum
          auctor. Ut et bibendum arcu.
        </Text>
        <Box w="150px" h="50px" bgColor="blue.300" borderRadius="5px" mt="2rem" />
        <Wrap pt="2rem" maxW="80%" justify="center" spacing="1rem">
          <WrapItem>
            <Box w="200px" h="100px" bgColor="white" borderRadius="5px" />
          </WrapItem>
          <WrapItem>
            <Box w="200px" h="100px" bgColor="white" borderRadius="5px" />
          </WrapItem>
          <WrapItem>
            <Box w="200px" h="100px" bgColor="white" borderRadius="5px" />
          </WrapItem>
          <WrapItem>
            <Box w="200px" h="100px" bgColor="white" borderRadius="5px" />
          </WrapItem>
          <WrapItem>
            <Box w="200px" h="100px" bgColor="white" borderRadius="5px" />
          </WrapItem>
        </Wrap>
      </CardBody>
      <Divider />
    </Card>
  );
};

export { Preview };
