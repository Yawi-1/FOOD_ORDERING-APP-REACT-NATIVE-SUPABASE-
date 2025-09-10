import { View } from 'react-native';
import React from 'react';
import Button from '@/components/Button';
import { Link } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

const index = () => {
  const { session, isAdmin } = useAuth()
  if (!session) return <Redirect href={'/sign-in'} />
  if (session && !isAdmin) return <Redirect href={'/(user)'} />

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href="/(user)" asChild>
        <Button title="User" />
      </Link>
      <Link href="/(admin)" asChild>
        <Button title="Admin" />
      </Link>
      <Button title={'Sign Out'} onPress={() => supabase.auth.signOut()} />
    </View>

  );
};

export default index;