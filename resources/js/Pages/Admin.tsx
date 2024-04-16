import { useState } from "react";
import Category from "../Components/Category";
import { Button } from 'antd';
import Layout from "../Components/Layouts/Layout";
import Product from "../Components/Product";

const Admin = ({ categories }) => {
  const [isProduct, setIsProduct] = useState(true);

    return (
      <Layout>
        <div className="flex flex-col">
          {isProduct ? <Product categories={categories} /> : <Category />}
          <Button type="dashed" onClick={() => setIsProduct(!isProduct)} htmlType='button' className='mx-auto mt-2 w-32'>
            {isProduct ? 'create category' : 'create product'}
          </Button>
        </div>
      </Layout>
    )
}
  
export default Admin; 