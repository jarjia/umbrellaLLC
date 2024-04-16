import {useState, useEffect} from 'react'
import { router, useForm } from "@inertiajs/react";
import { Input, Upload, Button, message, Select, Typography } from 'antd';
import DownloadIcon from "../Components/icons/DownloadIcon";

const Product: React.FC<{categories: {id: number, name: string}[]}> = ({categories}) => {
    const {TextArea} = Input;
    const { Title } = Typography;
    const { data, setData, post, errors, recentlySuccessful, reset } = useForm({
      name: '',
      price: 0,
      description: '',
      images: [],
      categories: []
    });
    const [search, setSearch] = useState('');

    useEffect(() => {
        if(recentlySuccessful) {
            router.get('/');
        }
    }, [recentlySuccessful])
    

    const baseCategories = categories.map(category => ({
        value: category.id,
        label: category.name
    }))

    const handleFileChange = (info) => {
        setData('images', info.fileList.map(item => item.originFileObj));
        message.success(`${info.file.name} file uploaded successfully`);
    };
      
    const handleCategories = (value: string[]) => {
        setData('categories', [...value]);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/api/product');
    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-5 justify-center items-center font-sans">
        <div className="shadow-2xl flex flex-col justify-center items-center p-2 max-w-[45%] px-4 rounded-xl">
            <Title level={2}>Create Product</Title>
            <div className="flex gap-10">
              <div className="flex flex-col">
                <label htmlFor="name">Name:</label>
                <Input type="text" id='name' value={data.name} onChange={(e) => setData("name", e.target.value)} />
                <p className="text-red-500 text-[13px]">{errors?.name}</p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="price">Price:</label>
                <Input type="number" id='price' value={data.price} onChange={(e) => setData("price", Math.abs(parseInt(e.target.value)))} />
                <p className="text-red-500 text-[13px]">{errors?.price}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="desc">Description:</label>
              <TextArea value={data.description} id="desc" className="w-[300px] max-h-[250px]" onChange={(e) => setData("description", e.target.value)}/>
              <p className="text-red-500 text-[13px] m-0">{errors?.description}</p>
            </div>
            <div className="my-4 flex flex-col justify-center items-center">
                <label htmlFor="files">Images:</label>
              <Upload action='#' beforeUpload={() => { return false; }} name="file" id='files' className="pt-2" onChange={handleFileChange} multiple>
                <Button icon={<DownloadIcon />}>Click to Upload</Button>
              </Upload>
              <p className="text-red-500 text-[13px] m-0">{errors?.images}</p>
            </div>
            <label htmlFor="categories" className='mb-2'>Categories:</label>
            <Select
              mode="multiple"
              id='categories'
              size='large'
              allowClear
              showSearch
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              placeholder="Please select categories"
              onChange={handleCategories}
              onSearch={(e) => setSearch(e)}
              style={{ width: '90%' }}
              className="my-0"
              options={baseCategories.filter(item => item.label.toLowerCase().includes(search.toLowerCase()))}
            />
            <p className="text-red-500 text-[13px] m-0">{errors?.categories}</p>
            <Button type="primary" htmlType='submit' className='mt-3'>Create Product</Button>
        </div>
    </form>
  )
}

export default Product