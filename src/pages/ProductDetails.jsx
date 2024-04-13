import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating.jsx';
import { useGetProductByIdQuery } from '../store/slices/productApiSlice.js';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { addToCart } from '../store/slices/cartSlice.js';
import { useDispatch } from 'react-redux';

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty: parseInt(qty) }));
    navigate('/cart');
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </ListGroupItem>
              <ListGroupItem>
                {product.description}
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                {
                  product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map((count) => (
                              <option key={count + 1} value={count + 1}>
                                {count + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )
                }
                <ListGroupItem>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductDetailsPage;
