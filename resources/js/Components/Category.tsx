import {useEffect} from 'react'
import { router, useForm } from "@inertiajs/react";
import {Input, Typography, Button } from 'antd'

const Category = () => {
  const { Title } = Typography;
  const { data, setData, post, errors, recentlySuccessful, reset } = useForm({
    name: '',
  });

  useEffect(() => {
    if(recentlySuccessful) {
      reset()
    }
  }, [recentlySuccessful])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/api/category');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-start items-center my-2 font-sans">
      <div className="shadow-2xl flex flex-col justify-center items-center p-6 rounded-xl">
        <Title level={2}>Create Category</Title>
        <div className="flex flex-col">
            <label htmlFor="name">Name:</label>
            <Input type="text" id='name' value={data.name} onChange={(e) => setData("name", e.target.value)} />
            <p className="text-red-500 text-[13px] m-0">{errors?.name}</p>
        </div>
        <Button type="primary" htmlType='submit' className='mt-6'>Create Category</Button>
      </div>
    </form>
  )
}

export default Category