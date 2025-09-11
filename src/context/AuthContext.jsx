import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const fetchSessionAndProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);

    if (session) {
      const { data, error } = await supabase
        .from("profiles")
        .select("group")
        .eq("id", session.user.id)
        .single();

      if (!error && data) {
        setProfile(data.group);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSessionAndProfile();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session) {
          const { data, error } = await supabase
            .from("profiles")
            .select("group")
            .eq("id", session.user.id)
            .single();

          if (!error && data) {
            setProfile(data.group);
          }
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const isAdmin = profile === "ADMIN";

  return (
    <AuthContext.Provider value={{ session, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
