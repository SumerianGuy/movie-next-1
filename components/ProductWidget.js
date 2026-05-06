import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductWidget = ({ country }) => {
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map countries to their language codes in the format 'de_DE', 'en_US', etc.
  const countryLanguages = {
    'US': 'en_US',  // United States
    'CA': 'en_CA',  // Canada (English)
    'FR': 'fr_FR',  // France
    'DE': 'de_DE',  // Germany
    'IT': 'it_IT',  // Italy
    'NL': 'nl_NL',  // Netherlands
    'PL': 'pl_PL',  // Poland
    'ES': 'es_ES',  // Spain
    'SE': 'sv_SE',  // Sweden
    'GB': 'en_GB',  // United Kingdom
  };

  const keywords = [
    'iPhone', 'Wireless earbuds', 'Smartwatch', 'Gaming headset', 'Bluetooth speaker',
    'Air fryer', 'Robot vacuum', 'Sneakers', 'Yoga mat', 'Dog bed', 'LEGO sets',
    'Hair dryer', 'Camping tent', 'Face moisturizer', 'Backpack', 'Instant Pot',
    'Action figures', 'USB-C cable', 'Mattress topper', 'Weighted blanket',
    'Laptop', 'Smartphone case', 'Tablet', 'Portable charger', 'Water bottle',
    'Running shoes', 'Skincare', 'Fitness tracker', 'Electric toothbrush', 'Coffee maker',
    'Smart light bulbs', 'Noise-cancelling headphones', 'Guitar', 'Camera', 'Drone',
    'Home security system', 'Cordless drill', 'Outdoor grill', 'Vitamix blender', 'Pressure cooker',
    'Hair straightener', 'Electric blanket', 'Air purifier', 'Vacuum cleaner', 'Juicer',
    'Bluetooth headphones', 'Fitness equipment', 'Smart thermostat', 'Electric bike', 'Smart lock',
    'Nespresso machine', 'Waffle maker', 'Sunglasses', 'Smart speakers', 'Robot lawn mower',
    'Massage gun', 'Luggage', 'Apple Watch', 'Smart doorbell', 'Dehumidifier',
    'Electric scooter', 'Treadmill', 'Apple TV', 'Wireless charger', 'PlayStation 5',
    'Xbox Series X', 'Nintendo Switch', 'OLED TV', 'AirPods Pro', 'GoPro camera',
    'Standing desk', 'Smartwatch bands', 'Laptop stand', 'Power bank', 'Wall charger'
  ];

  const getRandomKeyword = () => {
    return keywords[Math.floor(Math.random() * keywords.length)];
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!country) {
        setError('No country code provided');
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://amazon-api-psi.vercel.app/products`,
          {
            params: {
              keyword: getRandomKeyword(),
              country,
              number: 4, // Fetch more products in case we need to slice
            },
          }
        );
        // Slice the first 15 products to limit the display
        setProducts(response.data.result.slice(0, 5));
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError('Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [country]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const detailsPromises = products.map((product) =>
          axios.get(
            `https://amazon-api-psi.vercel.app/asin/${product.asin}`,
            {
              params: { country },
            }
          )
        );

        const detailsResults = await Promise.all(detailsPromises);
        setDetails(detailsResults.map((result) => result.data.result[0]));
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to fetch product details');
      }
    };

    if (products.length > 0) {
      fetchDetails();
    }
  }, [products, country]);

  return (
    <div className="product-widget">
      {details.map((detail, index) => (
        <div key={index} className="product-item">
          <a href={`${detail.url}?tag=ffx0d-20&language=${countryLanguages[country]}`} target="_blank" rel="noopener noreferrer">
            <img
              src={detail.main_image}
              alt={detail.title}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <div className="product-details">
              <h4>{detail.title}</h4>
              <p className="price">
                {detail.price?.current_price
                  ? `${detail.price.current_price} ${detail.price.currency}`
                  : 'Price not available'}
              </p>
            </div>
          </a>
        </div>
      ))}
      <style jsx>{`
        .product-widget {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          background-color: transparent;
          padding: 20px;
          border-radius: 10px;
        }
        .product-item {
          background-color: rgba(255, 255, 255, 0.1); /* Transparent background */
          border: 1px solid rgba(255, 255, 255, 0.3); /* Light border */
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-align: center;
        }
        .product-item img {
          width: 100%;
          height: auto;
          display: block;
        }
        .product-details {
          padding: 10px;
          color: white; /* White text color */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
        }
        .product-details h4 {
          font-size: 16px;
          margin: 0 0 5px;
          color: white; /* White text color */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .product-details .price {
          font-size: 16px;
          color: #00c9c9; /* Cool color for price */
          margin-top: auto;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
      `}</style>
    </div>
  );
};

export default ProductWidget;
