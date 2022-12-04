interface IUserLogin {
  _id: string;
  email: string;
}
interface IUseUserAuth {
  token: string | undefined;
  userData: IUserLogin;
}

function useUserAuth(): [IUseUserAuth, (data: IUseUserAuth) => void, () => void] {
  let token;
  let userData = {} as IUserLogin;
  const setUserToken = ({ token, userData }: IUseUserAuth) => {
    const payload = {}
  };

  const logout = () => {};

  return [{ token, userData }, setUserToken, logout];
}

export default useUserAuth;
