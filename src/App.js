import { Button, Container, Stack } from "react-bootstrap";
import { useBudgets } from "./context/BudgetContext";
import "bootstrap/dist/css/bootstrap.min.css";
import AddBudgetModal from "./components/AddBudgetModal";
import { useState } from "react";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";
import ShowExpensesModal from "./components/ShowExpensesModal";
import TotalCard from "./components/TotalCard";

function App() {
  const {
    addBudget,
    UNCATEGORISED_CATEGORY_ID,
    budgets,
    getBudgetExpenses,
    addExpense,
  } = useBudgets();

  const [defaultCategory, setDefaultCategory] = useState(
    UNCATEGORISED_CATEGORY_ID
  );

  const [showExpenses, setShowExpenses] = useState(false);
  function closeExpenses() {
    setShowExpenses(false);
    setDefaultCategory(UNCATEGORISED_CATEGORY_ID);
  }

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

  const uncategorizedExpenses = getBudgetExpenses(UNCATEGORISED_CATEGORY_ID);

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

              const expenses = getBudgetExpenses(budget._id);
              return (
                <BudgetCard
                  key={budget._id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                  addExpense={() => {
                    setDefaultCategory(budget._id);
                    openAddExpenseModal();
                  }}
                  displayExpenses={(expenses, name) => {
                    setShowExpenses(true);
                    setDefaultCategory(budget._id);
                  }}
                  expenses={[...expenses]}
                  id={budget._id}
                  showButtons
                />
              );
            })}

            {uncategorizedExpenses.length != 0 && (
              <BudgetCard
                name="Uncategorized"
                showButtons
                amount={getBudgetExpenses(UNCATEGORISED_CATEGORY_ID).reduce(
                  (total, expense) => total + expense.amount,
                  0
                )}
                addExpense={() => {
                  setDefaultCategory(UNCATEGORISED_CATEGORY_ID);
                  openAddExpenseModal();
                }}
                displayExpenses={(expenses, name) => {
                  setShowExpenses(true);
                  setDefaultCategory(UNCATEGORISED_CATEGORY_ID);
                }}
                expenses={getBudgetExpenses(UNCATEGORISED_CATEGORY_ID)}
              />
            )}

            {budgets.length != 0 && <TotalCard />}
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
          addExpense={addExpense}
        ></AddExpenseModal>

        <ShowExpensesModal
          show={showExpenses}
          expenses={getBudgetExpenses(defaultCategory)}
          handleClose={closeExpenses}
          budget={budgets.find((budget) => budget._id == defaultCategory)}
        ></ShowExpensesModal>
      </Container>
    </div>
  );
}

export default App;
