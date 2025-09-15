import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useInsertProduct, useProduct, useUpdateProduct } from "@/api/products";

const CreateProductScreen = () => {
  const { id } = useLocalSearchParams();
   const isUpdating = !!id;
  const { mutate: insertProduct, isLoading: insertLoading } = useInsertProduct()
  const { data: updatedProduct } = useProduct(id)
  const { mutate: updateproduct, isLoading: updateLoading } = useUpdateProduct()
  const [name, setName] = useState("");
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState('')
  const router = useRouter()

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const validateInputs = () => {
    setErrors('')
    if (!name) {
      setErrors('Product name is required.')
      return false
    }
    if (!price) {
      setErrors('Price is required.')
      return false
    }
    // if (!image) {
    //   setErrors('Image is required.')
    //   return false
    // }
    if (isNaN(parseInt(price))) {
      setErrors('Price must be number.')
      return false
    }
    return true
  }
  const handleCreate = () => {
    insertProduct(
      { name, price },
      {
        onSuccess: () => {
          Alert.alert("Success", "Product Created Successfully ✅");
          setName("");
          setPrice("");
          setImage(null);
          router.back();
        },
      }
    );
  };
  const handleUpdate = () => {
    updateproduct(updatedProduct, {
      onSuccess() {
        Alert.alert("Success", "Product updated Successfully ✅");
        router.back()
      }
    })
  }
  const onSubmit = () => {
    if (!validateInputs()) return;
    if (isUpdating) {
      handleUpdate()
    } else {
      handleCreate()
    }
  }
  const handleDelete = () => {
    alert('Product Delelted Successfully.')
  }
  const confirmDelete = () => {
    Alert.alert("Confirm", 'Are you sure want to delete this product ?', [
      {
        text: 'Cancel'
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: handleDelete
      }
    ])
  }
  useEffect(() => {
    console.log('hello')
    if (isUpdating && updatedProduct) {
      setName(updatedProduct.name)
      setPrice(updatedProduct.price.toString())
      // setImage(updatedProduct.image)
    }
  }, [updatedProduct])
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Stack.Screen
        options={{ title: isUpdating ? 'Update Product' : 'Create Product' }}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Image Section */}
        <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
          {!image && (
            <Ionicons name="images" size={80} color="#888" />
          )}
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </TouchableOpacity>
        <Text onPress={pickImage} style={styles.imageText}>
          {image ? <Ionicons name="sync" size={32} /> : "Select an Image"}
        </Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Enter product name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price (₹)</Text>
          <TextInput
            placeholder="Enter price"
            value={price}
            onChangeText={setPrice}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        {errors && <Text style={{ color: 'red', textAlign: 'center' }}>{errors}</Text>}


        {insertLoading || updateLoading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title={isUpdating ? "Update Product" : "Create Product"}
            onPress={onSubmit}
          />
        )}
        {isUpdating && <Text onPress={confirmDelete} style={{ textAlign: 'center', color: "#007AFF", fontWeight: '600' }}>Delete</Text>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  imageWrapper: {
    alignSelf: "center",
    backgroundColor: "#eee",
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageText: {
    marginTop: 10,
    color: "#007AFF",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  inputContainer: {
    marginVertical: 12,
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    elevation: 1,
  },
});
