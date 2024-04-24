import { db } from '../firebase/Firebase';
import { collection, doc, addDoc, deleteDoc, getDocs } from 'firebase/firestore';

const saveTodoList = async (userId, todoList) => {
  try {
    if (!userId || !todoList || !Array.isArray(todoList)) {
      throw new Error('Invalid parameters: userId and todoList are required.');
    }

    const todosCollectionRef = collection(db, 'users', userId, 'todos');
    const querySnapshot = await getDocs(todosCollectionRef);
    const existingTodoIds = new Set();

    querySnapshot.forEach(doc => {
      existingTodoIds.add(doc.id);
    });

    await Promise.all(todoList.map(async todo => {
      if (todo.id) {
        existingTodoIds.delete(todo.id); // Remove existing todo from set if it's still in todoList
      } else {
        await addDoc(todosCollectionRef, todo); // Add new todo to Firestore
      }
    }));

    // Delete todos that are not in the updated todoList
    await Promise.all([...existingTodoIds].map(id => deleteDoc(doc(todosCollectionRef, id))));

    console.log('Todo list saved successfully.');
  } catch (error) {
    console.error('Error saving todo list:', error.message);
    throw error;
  }
};

// The loadTodoList function remains the same
const loadTodoList = async (userId) => {
  try {
    if (!userId) {
      throw new Error('Invalid parameter: userId is required.');
    }

    const todosCollectionRef = collection(db, 'users', userId, 'todos');
    const querySnapshot = await getDocs(todosCollectionRef);

    const todoList = [];
    querySnapshot.forEach(doc => {
      const { text, completed } = doc.data();
      todoList.push({ id: doc.id, text, completed });
    });

    return todoList;
  } catch (error) {
    console.error('Error loading todo list:', error.message);
    throw error;
  }
};

export { saveTodoList, loadTodoList };
