import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../store';
import * as ProductsStore from '../../store/List';
import './List.css';

// At runtime, Redux will merge together...
type ProductsProps =
  ProductsStore.ListState // ... state we've requested from the Redux store
  & typeof ProductsStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters



class List extends React.PureComponent<ProductsProps> {


  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.ensureDataFetched();
  }

  // This method is called when the route parameters change
  public componentDidUpdate() {
    this.ensureDataFetched();
  }

  public render() {
    return (
      <React.Fragment>
        <h1 id="tabelLabel">Products</h1>
        <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        {this.renderForecastsTable()}
        <Link to="/products-add"
          role="button"
          className="btn btn-primary btn-lg">
            Add Product
        </Link>
        {this.renderPagination()}
      </React.Fragment>
    );
  }

  private handleOnClick() {
    alert('ok');
    // const history = useHistory();
    // history.push('/product/add');
  }

  private ensureDataFetched() {
    const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
    this.props.requestProducts(startDateIndex);
  }

  private renderForecastsTable() {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Symbol</th>
            <th>Name</th>
            <th>Category Id</th>
          </tr>
        </thead>
        <tbody>
          {this.props.products.map((product: ProductsStore.Product) =>
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.symbol}</td>
              <td>{product.name}</td>
              <td>{product.categoryId}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  private renderPagination() {
    const prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
    const nextStartDateIndex = (this.props.startDateIndex || 0) + 5;

    return (
      <div className="d-flex justify-content-between">
        <Link className='btn btn-outline-secondary btn-sm' to={`/products/${prevStartDateIndex}`}>Previous</Link>
        {this.props.isLoading && <span>Loading...</span>}
        <Link className='btn btn-outline-secondary btn-sm' to={`/products/${nextStartDateIndex}`}>Next</Link>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.products, // Selects which state properties are merged into the component's props
  ProductsStore.actionCreators // Selects which action creators are merged into the component's props
)(List as any);
