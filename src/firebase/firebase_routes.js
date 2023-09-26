import { db } from "./firebase_config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  increment,
  query,
  arrayUnion,
  where,
  orderBy,
  writeBatch,
} from "firebase/firestore";

const usrCollectionRef = collection(db, "users");
const blogsCollectionRef = collection(db, "blogs");
const commentsCollectionRef = collection(db, "comments");
const newslettersCollectionRef = collection(db, "newsletters");
const notificationssCollectionRef = collection(db, "notifications");

export const getPosts = async () => {
  const data = await getDocs(blogsCollectionRef);
  const arr = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return arr;
};

export const addPost = async (data) => {
  await addDoc(blogsCollectionRef, data);
};

export const updatePost = async (id, data) => {
  console.log(id, data);
  const userDoc = doc(db, "blogs", id);
  // const newFields = {
  //   age: Number(age) + 1,
  // };

  await updateDoc(userDoc, data);
};

export const deletePost = async (id) => {
  const userDoc = doc(db, "blogs", id);
  await deleteDoc(userDoc);
};

export const updatePostViews = async (postId) => {
  const postDocRef = doc(db, "blogs", postId);
  try {
    await updateDoc(postDocRef, {
      views: increment(1), // Increment the views count by 1
    });
  } catch (error) {}
};

export const addComment = async (commentData) => {
  try {
    const { postId, commentText, parentCommentId, name, email } = commentData;

    // Create a new comment object
    const newComment = {
      commentText,
      name,
      email,
      createdAt: new Date(),
      replies: [], // Initialize replies array for nested comments
    };

    if (parentCommentId) {
      // If it's a reply, add to the parent comment's replies array
      await updateDoc(doc(db, "comments", parentCommentId), {
        replies: arrayUnion(newComment),
      });
    } else {
      // If it's a top-level comment, add to the comments collection
      await addDoc(commentsCollectionRef, {
        postId,
        commentText,
        name,
        email,
        createdAt: new Date(),
        replies: [], // Initialize replies array for top-level comments
      });
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const getComments = async (postId, order = "desc") => {
  try {
    const q = query(
      commentsCollectionRef,
      where("postId", "==", postId),
      orderBy("createdAt", order)
    ); // Use orderBy to specify the order
    const querySnapshot = await getDocs(commentsCollectionRef);
    const comments = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        replies: data.replies || [],
      };
    });
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const getAllComments = async () => {
  const data = await getDocs(commentsCollectionRef);
  const arr = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return arr;
};

export const getNewsletters = async () => {
  const data = await getDocs(newslettersCollectionRef);
  const arr = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return arr;
};

export const addNewsletter = async (data) => {
  await addDoc(newslettersCollectionRef, data);
};

export const addNotification = async (data) => {
  await addDoc(notificationssCollectionRef, data);
};

export const getAllNotification = async () => {
  const data = await getDocs(notificationssCollectionRef);
  const arr = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return arr;
};

// Function to delete documents with a specific property value
export const clearAllNotifications = async () => {
  getAllNotification().then((res) => {
    let notifications = res.filter((dt) => dt.commentText);
    console.log(notifications);
    notifications.forEach((data) => {
      deleteNotification(data.id);
    });
  });
};

export const deleteNotification = async (id) => {
  const userDoc = doc(db, "notifications", id);
  await deleteDoc(userDoc);
};

export const getUsers = async () => {
  const data = await getDocs(usrCollectionRef);
  const arr = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return arr;
};

export const deleteComments = async (id) => {
  const userDoc = doc(db, "comments", id);
  await deleteDoc(userDoc);
};
