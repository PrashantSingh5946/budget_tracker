import React from 'react';
import { useBudgets } from '../context/BudgetContext';
import BudgetCard from './BudgetCard';




export default function TotalCard() {
    const {expenses,budgets} = useBudgets();
    const t1 = expenses.reduce((totalExpenses,expense)=>totalExpenses+expense.amount,0)
    const t2 = budgets.reduce((totalBudget,budget)=>totalBudget+budget.max,0)
  return (<BudgetCard name="Total" max={t2} amount={t1} gray/>);
}
