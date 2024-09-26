import React from 'react'
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {collection, addDoc} from "firebase/firestore";
import {db, storage} from "@/lib/firebase";

export async function uploadProductImage(file, productData) {
    const storageRef = ref(storage,`products/${file.name}`);
    await uploadBytes(storageRef,file);
    const imageUrl = await getDownloadURL(storageRef);
    
    
    await addDoc(collection(db,"products"),{
        ...productData,
        imageUrl
    });
}
