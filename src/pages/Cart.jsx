import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addToCart } from "../store/slices/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const handleAddToCart = (item, value) => {
    dispatch(addToCart({ ...item, qty: value }))
  }

  return (
    <>
      <Row>
        <Col md={8}>
          <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
          <Link className='btn btn-light my-3' to='/'>
            Go Back
          </Link>
          {
            cartItems.length === 0 ? (
              <Message>
                Your cart is empty
              </Message>
            ) : (
              <ListGroup variant="flush">
                {
                  cartItems.map((item) => (
                    <ListGroupItem>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={2}>${item.price}</Col>
                        <Col md={2}>
                          <Form.Control
                            as='select'
                            value={item.qty}
                            onChange={(e) => handleAddToCart(item, parseInt(e.target.value))}
                          >
                            {[...Array(item.countInStock).keys()].map((count) => (
                              <option key={count + 1} value={count + 1}>
                                {count + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col md={2}>
                          <Button type='button' variant='light'>
                            <FaTrash />
                          </Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
            )
          }
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                </h2>
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
                <Button type='button' className="btn-block" disabled={cartItems.length === 0}>
                  Proceed to Checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CartPage;
