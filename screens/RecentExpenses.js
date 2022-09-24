// Packages Imports
import { useContext, useEffect, useState } from "react";

// Components Imports
import ExpensesOutput from "../components/ExpensesOutput";
import CustomSuccessLoader from "../components/CustomSuccessLoader";
import CustomErrorLoader from "../components/CustomErrorLoader";

// Context Imports
import { ExpensesContext } from "../store/expenses-context";

// Utils Imports
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";

const RecentExpenses = () => {
  const [isFetched, setIsFetched] = useState(true);
  const [error, setError] = useState("");

  const expensesCtx = useContext(ExpensesContext);

  // Fetching data from firebase
  useEffect(() => {
    const getExpenses = async () => {
      setIsFetched(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetched(false);
    };
    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const dateSevenDaysAgo = getDateMinusDays(today, 7);

    return expense.date >= dateSevenDaysAgo && expense.date <= today;
  });

  // Handle Error button on loader
  const handleError = () => {
    setError(null);
  };

  if (error && !isFetched) {
    return <CustomErrorLoader message={error} onConfirm={handleError} />;
  }

  if (isFetched) {
    return <CustomSuccessLoader />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod='Last 7 Days'
      fallbackText='No expenses registered for the last 7 days.'
    />
  );
};

export default RecentExpenses;
