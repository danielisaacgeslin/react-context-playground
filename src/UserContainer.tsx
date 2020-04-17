import React, {
  createContext,
  PropsWithChildren,
  memo,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";

export interface IUser {
  id?: string;
  name: string;
  email: string;
}

export interface IUserContext {
  userMap: Record<string, IUser>;
  setUserMap: (fn: (userMap: Record<string, IUser>) => void) => void;
}

export const UserContext = createContext<IUserContext>({
  userMap: {},
  setUserMap: () => null,
});

export const UserProvider = memo(({ children }: PropsWithChildren<{}>) => {
  const [userMap, setUserMap] = useState({});
  return (
    <UserContext.Provider value={{ userMap, setUserMap }}>
      {children}
    </UserContext.Provider>
  );
});

export const useUserAction = () => {
  const { setUserMap } = useContext(UserContext);
  const isMounted = useRef(true);
  const safeSetUserMap = useCallback(
    (fn: (userMap: Record<string, IUser>) => void) => {
      if (isMounted.current) setUserMap(fn);
    },
    [setUserMap]
  );
  const asyncAddUser = useCallback(
    async (user: Pick<IUser, "email" | "name">, catchError?: boolean) => {
      try {
        const newUser = await mockCreateUser(user);
        safeSetUserMap((userMap) => ({
          ...userMap,
          [newUser.id as string]: newUser,
        }));
      } catch (error) {
        if (!catchError) throw error;
      }
    },
    [safeSetUserMap]
  );

  return { asyncAddUser };
};

function mockCreateUser(user: IUser) {
  const promise = new Promise<IUser>((resolve, reject) => {
    const delay = Math.random() * 1000;
    const shouldPass = Math.random() > 0.3; // 70% success rate
    setTimeout(() => {
      if (shouldPass) resolve({ ...user, id: Math.random().toString() });
      else reject(new Error("random fail"));
    }, delay);
  });
  return promise;
}
