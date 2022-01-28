import React, { useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

const BudgetsContext = React.createContext();

export const BudgetContext = () => {
  return useContext(BudgetContext);
};

export const BudgetsProvider = ({ children }) => {
  const [budget, setBudget] = useState([]);
  const { expenses, setExpenses } = useState([]);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function addExpenses({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }

  function addBudget({ name, max }) {
    setBudget((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }

  function deleteBudget({ id }) {
    setBudget((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budget,
        expenses,
        getBudgetExpenses,
        addExpenses,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
