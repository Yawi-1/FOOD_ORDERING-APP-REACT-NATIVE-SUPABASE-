import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchInitialAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        await fetchProfile(session.user.id);
      }
      setLoading(false);
    };

    fetchInitialAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (session) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("group")
      .eq("id", userId)
      .single();

    if (!error && data) {
      setProfile(data.group);
    }
  };

  const isAdmin = profile === "ADMIN";

  return (
    <AuthContext.Provider value={{
      session,
      loading: loading || (session && !profile),
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider

export const useAuth = () => useContext(AuthContext);