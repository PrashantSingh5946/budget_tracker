import React,{useContext} from 'react'

export const BudgetContext = React.createContext();

export const useBudget  = () => useContext(BudgetContext);

