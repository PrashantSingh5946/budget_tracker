import { Button, Container, Stack } from "react-bootstrap";
import { useBudgets } from "./context/BudgetContext";
import "bootstrap/dist/css/bootstrap.min.css";
import AddBudgetModal from "./components/AddBudgetModal";
import { useState } from "react";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";

function App() {
  const { addBudget, UNCATEGORISED_CATEGORY_ID, budgets, getBudgetExpenses, addExpense} =
    useBudgets();

  const [isAddBudgetModalVisible, setIsAddBudgetModalVisible] = useState(false);
  const closeAddBudgetModal = function () {
    setIsAddBudgetModalVisible(false);
  };
  const openAddBudgetModal = function () {
    setIsAddBudgetModalVisible(true);
  };

  const [isAddExpenseModalVisible, setIsAddExpenseModalVisible] =
    useState(false);
  const closeAddExpenseModal = function () {
    setIsAddExpenseModalVisible(false);
    setDefaultCategory(UNCATEGORISED_CATEGORY_ID);
  };
  const openAddExpenseModal = function () {
    setIsAddExpenseModalVisible(true);
  };

  const [defaultCategory, setDefaultCategory] = useState(
    UNCATEGORISED_CATEGORY_ID
  );

  return (
    <div className="App">
      <Container className="my-4">
        <Stack direction="horizontal" gap={2}>
          <h1 className="me-auto">Budget Tracker</h1>

          <Button variant="primary" onClick={openAddBudgetModal}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <Container className="my-3">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            {budgets.map((budget) => {
              const amount = getBudgetExpenses(budget._id).reduce(
                (total, expense) => total + expense.amount,
                0
              );
              return (
                <BudgetCard
                  key={budget._id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                  addExpense={() => {}}
                  onViewExpensesClick={() => {}}
                  showButtons
                />
              );
            })}
          </div>
        </Container>

        <AddBudgetModal
          show={isAddBudgetModalVisible}
          addBudget={addBudget}
          handleClose={closeAddBudgetModal}
        ></AddBudgetModal>
        <AddExpenseModal
          show={isAddExpenseModalVisible}
          defaultCategory={defaultCategory}
          handleClose={closeAddExpenseModal}
        ></AddExpenseModal>
      </Container>
    </div>
  );
}

export default App;
