import React from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Spinner from "./Spinner";
import PageNotFound from './PageNotFound';

import useFetch from './services/useFetch';

export default function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: product, error, loading } = useFetch(
        "products/" + id
    );

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
                value={size}
                onChange={e => setSize(e.target.value)}>
                <option value="">What size?</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
            </select>
            <p>
                <button className="btn btn-primary" onClick={() => navigate("/cart")}>
                    Add to Cart
                </button>
            </p>
            <img src={`/images/${product.image}`} alt={product.category} />
        </div>
    );
}
