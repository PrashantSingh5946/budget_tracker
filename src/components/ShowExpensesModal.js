import { Modal, Form, Container, Button, Stack } from "react-bootstrap";
import React, { useRef } from "react";
import { useBudgets } from "../context/BudgetContext";

export default function ShowExpensesModal({
  show,
  handleClose,
  expenses,
  budget,
}) {
  const { deleteBudget } = useBudgets();
  function removeBudget(budgetId) {
    deleteBudget(budgetId);
    handleClose();
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Stack direction="horizontal" gap={2}>
            <Modal.Title>{budget ? budget.name : ""} - Expenses</Modal.Title>
            <Button variant="outline-danger" onClick={() => {removeBudget(budget._id)}}>
              Delete
            </Button>
          </Stack>
        </Modal.Header>
        <Modal.Body>
          <Stack direction="vertical" gap="3">
            {expenses.map((expense) => (
              <Stack direction="horizontal" gap="2" key={expense._id}>
                <div className="me-auto fs-4">{expense.name}</div>
                <div className="fs-5">{expense.amount}</div>
                <Button onClick={() => {}} size="sm" variant="outline-danger">
                  &times;
                </Button>
              </Stack>
            ))}
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  );
}
