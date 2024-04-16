import { Carousel, Typography, Image } from 'antd'

type Product = {
    product: {
        name: string;
        id: number;
        price: number;
        description: string;
        thumbnail: {path: string; id: number}[];
        categories: {id: number; name: string}[];
    }
}

const BASE_URL = 'http://localhost:8000/storage/'

const Show: React.FC<Product> = ({product}) => {
    const {Title} = Typography;

    const numberWithCommas = (number: number | string) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

  return (
    <div className="grid grid-cols-2 gap-4 p-10 py-6">
        <div className='grid grid-cols-2 gap-4'>
            {product.thumbnail.map(img => {
                const firstImgPath = product.thumbnail.length > 0 ? (!img.path.includes('http') ? BASE_URL : '') + img.path : null;
                return <Image height={250} src={firstImgPath} className='w-full h-auto min-h-[250px]'/>
            })}
        </div>
        <div>
            <div className='flex items-center justify-between' style={{borderBottom: '2px solid black'}}>
                <Title level={2}>{product.name}</Title>
                <Title level={3}>${numberWithCommas(product.price)}</Title>
            </div>
            <Title level={5} className='text-center'>{product.description}</Title>
            <div className='flex gap-2 items-center'>
                <Title level={5}>Categories: </Title>
                {product.categories.map((category, index) => 
                    <Title level={5} className='relative top-1'>
                        {index === product.categories.length - 1 ? category.name : category.name + ', '}
                    </Title>
                )}
            </div>
        </div>
    </div>
  )
}

export default Show