import { Modal, Form, Container, Button } from "react-bootstrap";
import React, { useRef } from "react";
import { useBudgets } from "../context/BudgetContext";

export default function AddExpenseModal({
  show,
  addExpense,
  handleClose,
  defaultCategory,
}) {
  const expenseNameRef = useRef();
  const amountRef = useRef();
  const categoryRef = useRef();
  const addButtonRef = useRef();

  const {budgets} = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
 
    handleClose();
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-3" controlId="BudgetName">
              <Form.Label>Expense name</Form.Label>
              <Form.Control type="text" required ref={expenseNameRef} />
            </Form.Group>
            <Form.Group className="my-3" controlId="">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" required step={1} ref={amountRef} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Category">
                Category
              </Form.Label>
              <Form.Select id="Category" ref={categoryRef}>
                <option>Uncategorized</option>
                {
                    budgets.map((budget)=> <option key={budget._Id} value={budget._Id}>{budget.name}</option>)
                }
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3" controlId="">
              <div className="d-flex justify-content-end">
                <Button
                  variant="primary"
                  type="submit"
                  className="float-right"
                  ref={addButtonRef}
                >
                  Add
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Container>
      </Modal>
    </>
  );
}
