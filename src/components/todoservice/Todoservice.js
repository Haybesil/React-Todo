// todoService.js
import { db } from '../firebase/Firebase';

const saveTodoList = async (userId, todoList) => {
  try {
    await db.collection('users').doc(userId).set({ todoList });
  } catch (error) {
    console.error('Error saving todo list:', error);
  }
};

const loadTodoList = async (userId) => {
  try {
    const doc = await db.collection('users').doc(userId).get();
    return doc.exists ? doc.data().todoList : [];
  } catch (error) {
    console.error('Error loading todo list:', error);
    return [];
  }
};

export { saveTodoList, loadTodoList };