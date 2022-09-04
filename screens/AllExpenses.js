// Packages Imports
import { useContext } from "react";

// Components Imports
import ExpensesOutput from "../components/ExpensesOutput";

// Context Imports
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod='Total'
      fallbackText='No registered expenses found!.'
    />
  );
};

export default AllExpenses;
