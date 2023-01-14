
import product_card from "./products_data";
import './product.scss';

const Products = ( ) => {
    console.log(product_card)
    const product_list = product_card.map((item) => 
        <div className="card" key={item.id}>
            <div className="card_img">
                <img src={item.thumb} width="150px"/>
            </div>
            <div className="card_header">
                <h2>{item.product_name}</h2>
                <p>{item.description}</p>
                <p className="price"><span>{item.Currency}</span>{item.price} per {item.quantity}</p>
                <div className="btn">Add to Cart</div>
            </div>
        </div>
    )

    return(
        <div>
            <div className="product_container">
                <h1>Oil Products</h1>
                {product_list}
            </div>
        </div>
    )
}

export default Products;