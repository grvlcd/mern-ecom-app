import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { productStore } from '../store/products';

const HomePage = () => {
  const { data, isLoading, fetchProducts } = productStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {!isLoading ? data.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        )) : <p>Loading...</p>}
      </Row>
    </>
  );
}

export default HomePage;
