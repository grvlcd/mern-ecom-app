import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Row>
      <Col style={{ width: "100%" }}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {
          cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              Items
            </ListGroup>
          )
        }
      </Col>
    </Row>
  );
}

export default CartPage;
