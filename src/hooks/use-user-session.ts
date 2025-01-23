import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export function useUserSession(initSession: string | null) {
  const { data: session, status } = useSession();
  const [userUid, setUserUid] = useState<string | null>(initSession);

  useEffect(() => {
    if (session?.user?.id) {
      setUserUid(session.user.id); 
    } else {
      setUserUid(null);
    }
  }, [session]);

  return userUid;
}
