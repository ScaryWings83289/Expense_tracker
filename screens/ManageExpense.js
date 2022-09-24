// Packages Imports
import { useLayoutEffect, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

// Components Imports
import ExpenseForm from "../components/ExpenseForm";
import IconButton from "../components/IconButton";
import CustomSuccessLoader from "../components/CustomSuccessLoader";
import CustomErrorLoader from "../components/CustomErrorLoader";

// Context Imports
import { ExpensesContext } from "../store/expenses-context";

// Utils Imports
import { storeExpense, updateExpense, deleteExpense } from "../utils/http";

// Constants Imports
import { GlobalStyles } from "../constants/styles";

const ManageExpense = ({ route, navigation }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

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
  const handleDeleteExpense = async () => {
    setIsSubmitted(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later!");
      setIsSubmitted(false);
    }
  };

  // Cancel Expenses
  const handleCancelExpense = () => {
    navigation.goBack();
  };

  // Confirm Expenses
  const handleConfirmExpense = async (expenseData) => {
    setIsSubmitted(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later!");
      setIsSubmitted(false);
    }
  };

  // Handle Error button on loader
  const handleError = () => {
    setError(null);
  };

  if (error && !isSubmitted) {
    return <CustomErrorLoader message={error} onConfirm={handleError} />;
  }

  if (isSubmitted) {
    return <CustomSuccessLoader />;
  }

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
