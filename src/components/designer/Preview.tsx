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

const Preview = ({ colors, fonts }: any) => {
  const { heading, paragraphs } = fonts;
  console.log(colors);
  const [primaryColors, , textColors, bgColors, extraColors] = colors.colorGroups;
  console.log(bgColors);
  return (
    <Card bgColor={bgColors.colors[0]} h="70vh">
      <CardBody p="2rem" alignItems="center" display="flex" flexDirection="column">
        <HStack color="white" alignSelf="flex-start">
          <PreviewLogo />
          <Heading as="h3" size="md" fontFamily={paragraphs} color={textColors.colors[0]}>
            Design System
          </Heading>
        </HStack>
        <Heading
          color={textColors.colors[0]}
          size="lg"
          textAlign="center"
          pt="3rem"
          fontFamily={heading}
        >
          An Amazing Heading Title
        </Heading>
        <Text
          fontSize="md"
          textAlign="center"
          pt="1rem"
          fontFamily={paragraphs}
          color={textColors.colors[0]}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer varius bibendum
          auctor. Ut et bibendum arcu.
        </Text>
        <Box
          w="150px"
          h="50px"
          bgColor={extraColors.colors[0]}
          borderRadius="5px"
          mt="2rem"
        />
        <Wrap pt="2rem" maxW="80%" justify="center" spacing="1rem">
          <WrapItem>
            <Box
              w="200px"
              h="100px"
              bgColor={primaryColors.colors[0]}
              borderRadius="5px"
            />
          </WrapItem>
          <WrapItem>
            <Box
              w="200px"
              h="100px"
              bgColor={primaryColors.colors[0]}
              borderRadius="5px"
            />
          </WrapItem>
          <WrapItem>
            <Box
              w="200px"
              h="100px"
              bgColor={primaryColors.colors[0]}
              borderRadius="5px"
            />
          </WrapItem>
          <WrapItem>
            <Box
              w="200px"
              h="100px"
              bgColor={primaryColors.colors[0]}
              borderRadius="5px"
            />
          </WrapItem>
          <WrapItem>
            <Box
              w="200px"
              h="100px"
              bgColor={primaryColors.colors[0]}
              borderRadius="5px"
            />
          </WrapItem>
        </Wrap>
      </CardBody>
      <Divider />
    </Card>
  );
};

export { Preview };
