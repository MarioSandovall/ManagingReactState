import React from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Spinner from "./Spinner";
import PageNotFound from './PageNotFound';

import useFetch from './services/useFetch';
import { useCart } from './cartContext';

export default function DeatilWrapper() {
    const { id } = useParams();
    const { dispatch } = useCart();
    const fetchData = useFetch("products/" + id);

    return (
        <Detail
            id={id}
            fetchData={fetchData}
            navigate={useNavigate()}
            dispatch={dispatch}
        />
    )
};

class Detail extends React.Component {

    state = {
        sku: ""
    };


    render() {
        const { id, fetchData, navigate, dispatch } = this.props;
        const { data: product, error, loading } = fetchData;
        const { sku } = this.state;

        if (loading) return <Spinner />

        if (!product) return <PageNotFound />

        if (error) throw error

        return (
            <div id="detail">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p id="price">${product.price}</p>
                <select
                    id="size"
                    value={sku}
                    onChange={e => this.setState({ sku: e.target.value })}>
                    <option value="">What size?</option>
                    {
                        product.skus.map((s) => (
                            <option key={s.sku} value={s.sku}>
                                {s.size}
                            </option>
                        ))
                    }
                </select>
                <p>
                    <button disabled={!sku}
                        className="btn btn-primary"
                        onClick={() => {
                            dispatch({ type: "add", id, sku });
                            navigate("/cart");
                        }}>
                        Add to Cart
                </button>
                </p>
                <img src={`/images/${product.image}`} alt={product.category} />
            </div>
        );
    }
}
