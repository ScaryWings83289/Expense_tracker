// Packages Imports
import { useLayoutEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";

// Components Imports
import ExpenseForm from "../components/ExpenseForm";
import IconButton from "../components/IconButton";

// Context Imports
import { ExpensesContext } from "../store/expenses-context";

// Constanst Imports
import { GlobalStyles } from "../constants/styles";

const ManageExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  // Dynamically Setting Title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  // Delete Expenses
  const handleDeleteExpense = () => {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  };

  // Cancel Expenses
  const handleCancelExpense = () => {
    navigation.goBack();
  };

  // Confirm Expenses
  const handleConfirmExpense = (expenseData) => {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={handleCancelExpense}
        onSubmit={handleConfirmExpense}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={handleDeleteExpense}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
