import { Modal,Form, Container, Button } from 'react-bootstrap'
import React,{useRef} from 'react'

export default function AddBudgetModal({show,addBudget,handleClose}) {

    const budgetNameRef = useRef()
    const maxExpensesRef = useRef()
    const addButtonRef = useRef()

    function handleSubmit(e)
    {
        e.preventDefault()
        addBudget(budgetNameRef.current.value,parseFloat(maxExpensesRef.current.value))
        handleClose()
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Budget</Modal.Title>
                </Modal.Header>
                <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="my-3" controlId="BudgetName">
                        <Form.Label>Budget name</Form.Label>
                        <Form.Control type="text" required ref={budgetNameRef}/>
                    </Form.Group>
                    <Form.Group className="my-3" controlId="">
                        <Form.Label>Maximum Expenses</Form.Label>
                        <Form.Control type="number" required step={1} ref={maxExpensesRef}/>
                    </Form.Group>
                    <Form.Group className="my-3" controlId="">
                        <div className="d-flex justify-content-end">
                        <Button variant="primary"  type="submit" className='float-right' ref={addButtonRef} >Add</Button>
                        </div>
                    </Form.Group>
                </Form>
                </Container>

            </Modal>
        </>

    )
}
