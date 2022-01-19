import React, { useContext, useState } from 'react'
import { v4 as uuidV4 } from 'uuid';

export const BudgetContext = React.createContext();

export const UNCATEGORISED_CATEGORY_ID = "Uncategorized";

export function useBudgets() {
    return useContext(BudgetContext)
  }

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = useState([])

    function addBudget( name, max ) {
        if (budgets.find((budget) => budget.name == name)) {
            console.log(budgets.map((budget) => {return budget}))
            setBudgets(budgets.map((budget) => budget.name==name?{...budget,max:budget.max+max}:budget))               
        }
        else {
            setBudgets([...budgets, { _id: uuidV4(), name, max }])
        }
    }

    function addExpense( name, amount, budgetId ) {
        
            setExpenses([...expenses, { _id: uuidV4(), name, amount, budgetId }])
        
    }

    function getBudgetExpenses(budgetId)
    {
        return(expenses.filter((expense) => expense.budgetId == budgetId))
    }

    function deleteBudget(budgetId)
    {
        setBudgets(budgets.filter((budget) => budget._id!=budgetId))
        setExpenses(expenses.map((expense) => expense.budgetId==budgetId?{...expense,budgetId:UNCATEGORISED_CATEGORY_ID}:expense))
    }

    function deleteExpense(expenseId)
    {
        setExpenses(expenses.filter((expense) => expense._id!= expenseId))
    }
    return (
        <BudgetContext.Provider value={{
            budgets,
            expenses,
            addBudget,
            addExpense,
            getBudgetExpenses,
            deleteBudget,
            deleteExpense,
            UNCATEGORISED_CATEGORY_ID
        }}>
            {children}
        </BudgetContext.Provider>
    )
}

