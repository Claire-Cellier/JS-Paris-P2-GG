import type React from "react";
import { useEffect, useState } from "react";
import "./Suggestions.css";

interface Product {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
}

const Suggestions: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const excludedIds = [167];

	useEffect(() => {
		fetch("https://dummyjson.com/products?sortBy=title&order=asc")
			.then((res) => res.json())
			.then((data) => {
				const filteredProducts = data.products.filter(
					(product: Product) => !excludedIds.includes(product.id),
				);

				if (filteredProducts.length < 4) {
					const additionalProduct = data.products.find(
						(product: Product) => !excludedIds.includes(product.id),
					);
					if (additionalProduct) {
						filteredProducts.push(additionalProduct);
					}
				}

				setProducts(filteredProducts.slice(0, 4));
			});
	}, []);

	return (
		<div className="suggestions">
			<h1>
				Voici des merveilles, à peine plus coûteuses, mais qui pourraient
				enchanter tes souhaits
			</h1>
			<div className="suggestions-container">
				{products.map((product) => (
					<div key={product.id} className="suggestion-card">
						<img src={product.thumbnail} alt={product.title} />
						<h4>{product.title}</h4>
						<p>{product.price}€</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Suggestions;
