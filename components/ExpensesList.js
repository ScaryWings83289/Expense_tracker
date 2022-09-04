// Packages Imports
import { FlatList, Text } from "react-native";

// Components Imports
import ExpenseItem from "./ExpenseItem";

// Get Individual Expenses
const renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />;
};

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
