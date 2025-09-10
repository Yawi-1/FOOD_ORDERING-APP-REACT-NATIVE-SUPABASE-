import { View, Text } from 'react-native';
import React from 'react';
import Button from '@/components/Button';
import { Link } from 'expo-router';

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href="/(user)" asChild>
        <Button title="User" />
      </Link>
      <Link href="/(admin)" asChild>
        <Button title="Admin" />
      </Link>
      <Link href="/(auth)/sign-in" asChild>
        <Button title="Sign" />
      </Link>
    </View>

  );
};

export default index;