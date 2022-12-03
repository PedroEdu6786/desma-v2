import { Card, CardBody, Image, Link, Text } from '@chakra-ui/react';

type DesignSystemOverviewProps = {
  name: string;
  _id: string;
};

const DesignSystemOverview: React.FC<DesignSystemOverviewProps> = ({ name, _id }) => {
  return (
    <Card width="full" bg="rgb(22, 19, 22)" borderRadius={7}>
      <Link href={`designer/${_id}`}>
        <Image
          p={4}
          src={`https://avatars.dicebear.com/api/jdenticon/${_id}.svg`}
          alt="Project image"
          style={{ objectFit: 'cover' }}
        />
        <CardBody bg="white">
          <Text>{name}</Text>
        </CardBody>
      </Link>
    </Card>
  );
};

export { DesignSystemOverview };
