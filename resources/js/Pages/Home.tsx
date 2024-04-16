import Layout from "../Components/Layouts/Layout"
import { Pagination, Input, Select} from "antd";
import { router, usePage } from '@inertiajs/react'
import {useState, useEffect, useRef} from 'react'
import ProductRow from "../Components/ProductRow";

const Home = ({products, categories: categoriesData}) => {
  const {url} = usePage()
  const [fname, setName] = useState('');
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [query, setQuery] = useState(null)
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([])
  const [showSelect, setShowSelect] = useState(false)
  let current = 1;

  useEffect(() => {
    handleQueries()
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowSelect(true)
    }, 400)
  }, [categories])

  const baseCategories = categoriesData.map(category => ({
    value: category.id,
    label: category.name
  }))

  const handleQueries = () => {
    const params = new URLSearchParams(url.substring(2));

    const queryParams = Object.fromEntries(Array.from(params.entries()));
    
    setQuery(queryParams)

    if(queryParams.categories) {
      setCategories(queryParams.categories.split('_').map(item => parseInt(item)))
    }

    if(queryParams.name) {
      setName(queryParams.name)
    }
    if(queryParams.min) {
      setMin(queryParams.min)
    }
    if(queryParams.max) {
      setMax(queryParams.max)
    }
  }
  
  const handlePagination = (page: string) => {
    const pageQueries = {...query}
    delete pageQueries.page;
    router.get('/', {page, ...pageQueries}, {replace: true})
  }

  const handleCategories = (value: number[]) => {
    setCategories([...value]);
    const queries = {...query}
    delete queries.page;
    router.get('/', { ...queries, categories: [...value].join('_') }, { replace: false, preserveState: true });
    setQuery({
      ...query,
      categories: [...value].join('_')
    })
  }

  const handleEnter = (e) => {
    const { key } = e;
    const queries = { ...query };
    delete queries.page;
  
    const updatedQuery = { ...queries };
  
    if (key === 'Enter') {
      updatedQuery.name = fname;
      updatedQuery.min = min;
      updatedQuery.max = max;
      router.get('/', { ...updatedQuery }, { replace: false, preserveState: true });
      setQuery(updatedQuery);
    }
  };
  
    return (
      <Layout>
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg font-sans mt-2">
              <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-gray-700 h-full bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className="h-full">
                          <th scope="col" className="px-6 py-3">
                            Image
                          </th>
                          <th scope="col" className="h-full flex items-center justify-between gap-2 px-6 py-0">
                            Name <Input type='text' onKeyPress={handleEnter} name='fname'
                              value={fname} onChange={e => setName(e.target.value)} 
                              placeholder='Filter by name' className='max-w-[50%]' 
                            />
                          </th> 
                          <th scope="col" className="px-6 py-3">
                            Description
                          </th>
                          <th scope="col" className="h-full flex items-center justify-between gap-2 px-6 py-0">
                            Price 
                            <div className="flex items-center gap-1">
                              <Input type='number' name='fmin' onKeyPress={handleEnter} 
                                 value={min} onChange={e => setMin(Math.abs(parseInt(e.target.value)).toString())} 
                                 placeholder='Min' className='max-w-[80px] min-w-[60px]'
                              />
                              -
                              <Input type='number' name='fmax' onKeyPress={handleEnter} 
                                 value={max} onChange={e => setMax(Math.abs(parseInt(e.target.value)).toString())} 
                                 placeholder='Max' className='max-w-[80px] min-w-[60px]' 
                              />
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center gap-2">
                              Category
                              {showSelect && <Select
                                mode="multiple"
                                id='categories'
                                size='small'
                                allowClear
                                showSearch
                                filterOption={(input, option) =>
                                  (option.label as string).toLowerCase().includes(input.toLowerCase())
                                }
                                placeholder="Please select categories"
                                defaultValue={categories}
                                onChange={handleCategories}
                                onSearch={(e) => setSearch(e)}
                                style={{ width: '200px', minWidth: '100px' }}
                                className="my-0"
                                options={baseCategories.filter(item => item.label.toLowerCase().includes(search.toLowerCase()))}
                              />}
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Actions
                          </th>
                      </tr>
                  </thead>
                  <ProductRow products={products.data}/>
              </table>
          </div>
          <Pagination 
            className="text-center my-8 mb-12"
            onChange={page => handlePagination(page.toString())}
            defaultCurrent={parseInt(url.split('page')[1]?.charAt(1)) || 1}
            total={products.total}
            defaultPageSize={100}
            pageSizeOptions={[100]}
          />
        </>
      </Layout>
      
    )
}
  
export default Home