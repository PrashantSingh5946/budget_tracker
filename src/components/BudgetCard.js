import React from "react";
import { Card,Stack,ProgressBar,Button} from "react-bootstrap";

export default function BudgetCard({
  name,
  max,
  amount,
  displayExpenses,
  addExpense,
  showButtons,
  gray
}) {

    const classNames = []
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10")
  } else if (gray) {
    classNames.push("bg-light")
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {amount}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {max}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {showButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={addExpense}
            >
              Add Expense
            </Button>
            <Button onClick={displayExpenses} variant="outline-secondary">
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
    
  );
}

function getProgressBarVariant(amount, max) {
    const ratio = amount / max
    if (ratio < 0.5) return "primary"
    if (ratio < 0.75) return "warning"
    return "danger"
  }
