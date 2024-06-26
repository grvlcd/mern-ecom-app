import { isEmpty } from 'lodash';
import { Row, Col, Spinner } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import { useGetProductsQuery } from '../store/slices/productApiSlice';

const HomePage = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {
              data.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))
            }
          </Row>
        </>
      )}
    </>
  );
}

export default HomePage;
