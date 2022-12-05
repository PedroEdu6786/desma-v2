export const serverSidePropsProtected = async ({ req }: any): Promise<any> => {
  const user = req.session.user || {};
  const isEmpty = Object.keys(user).length === 0;
  if (isEmpty) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};
