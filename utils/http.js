// Packages Imports
import axios from "axios";

// Database URL
const BACKEND_URL =
  "https://expense-tracker-app-67058-default-rtdb.asia-southeast1.firebasedatabase.app/";

// Saving Data to Firebase
export const storeExpense = async (expenseData) => {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );
  const id = response?.data?.name;
  return id;
};

// Fetching Data from Firebase
export const fetchExpenses = async () => {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};

// Updating Data in Firebase
export const updateExpense = (id, expenseData) => {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
};

// Delete Data in Firebase
export const deleteExpense = (id) => {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
};
