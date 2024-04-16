import { Link, router, useForm } from "@inertiajs/react";
import {Button} from 'antd'
import TrashBinIcon from "./icons/TrashBinIcon";
import EyeIcon from "./icons/EyeIcon";

type Products = {
    products: {
        id: number;
        name: string;
        price: number;
        description: string;
        categories: {
            id: number;
            name: string;
        }[];
        thumbnail: {
            path: string;
        }[]
    }[]
}

const BASE_URL = 'http://localhost:8000/storage/'

const ProductRow: React.FC<Products> = ({products}) => {
    const { delete: remove } = useForm();

    const numberWithCommas = (number: number | string) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleDelete = (id: number) => {
        remove(`/api/product/${id}`)
    }

  return (
    <tbody>
        {products.length > 0 ? products.map(product => {
            const firstImgPath = product.thumbnail.length > 0 ? (!product.thumbnail[0].path.includes('http') ? BASE_URL : '') + product.thumbnail[0].path : null;
            return <tr key={product.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">
                    <img 
                        src={firstImgPath ? firstImgPath : 'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg'} 
                        className="w-16 h-16"
                    />
                </td>
                <th scope="row" className="px-6 py-4">
                    {product.name}
                </th>
                <td className="px-6 py-4">
                    {product.description.length > 30 ? 
                        product.description.substring(0, 30) + '...' : product.description}
                </td>
                <td className="px-6 py-4">
                    ${numberWithCommas(product.price)}
                </td>
                <td className="px-6 py-4">
                    {product.categories.map(category => 
                        <span>{product.categories[product.categories.length - 1].id === category.id ? 
                    category.name : category.name + ', '}</span>)}
                </td>
                <td className="flex items-center h-full justify-center px-6">
                    <Button type="primary" title='Delete the product' onClick={() => handleDelete(product.id)} danger>
                        <TrashBinIcon />
                    </Button>
                    <Button onClick={() => router.get(`/product/${product.id}`)} type="primary" title='See more of the product' className='ml-2'>
                        <EyeIcon />
                    </Button>
                </td>
            </tr>
        }) : <div className="relative w-full p-2 text-2xl">No data</div>}
    </tbody>
  )
}

export default ProductRow