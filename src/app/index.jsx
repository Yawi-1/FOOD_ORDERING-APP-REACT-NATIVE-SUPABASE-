import { ActivityIndicator, Text, View } from 'react-native';
import React from 'react';
import Button from '@/components/Button';
import { Link, Redirect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={'blue'} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!session) return <Redirect href={'/sign-in'} />;

  if (session && isAdmin === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={'blue'} />
      </View>
    );
  }

  if (session && !isAdmin) return <Redirect href={'/(user)'} />;

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

export default Index;