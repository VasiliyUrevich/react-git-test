
import { useAppDispatch } from './store'
import { useLazyGetRepositoriesQuery } from './services/api';
import Header from './components/Header';
import { useEffect, useState } from 'react';

function App() {
  const [query, setQuery]= useState("")
  const [quantityOfPage, setQuantityOfPage]= useState(5)
  const [fetchData, {data: Repositories, isLoading, error}] = useLazyGetRepositoriesQuery()

  useEffect(()=>{
    if(Repositories)
    fetchData({searchQuery: query, endCursor: "", repNumber: quantityOfPage})
  }, [quantityOfPage])

  if(isLoading) return (
    <>
    <Header 
      fetchData={fetchData}
      endCursor=""
      quantityOfPage={quantityOfPage} 
      query={query} 
      setQuery={setQuery}>
    </Header>
    <main style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
      <h1 style={{fontSize: '24px'}}>Loading...</h1>
    </main>
    <footer></footer>
    </>
  )
  if(error) return <div>error:</div>
  
  if(!Repositories) return(
    <>
    <Header 
      fetchData={fetchData}
      endCursor=""
      quantityOfPage={quantityOfPage} 
      query={query} 
      setQuery={setQuery}>
    </Header>
    <main style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
      <h1 style={{fontSize: '24px'}} onClick={()=>console.log(Repositories)}>Добро пожаловать</h1>
    </main>
    <footer></footer>
    </>
  )
  
  return (
    <>

      <Header 
        fetchData={fetchData}
        endCursor={Repositories.data.search.pageInfo.endCursor}
        quantityOfPage={quantityOfPage} 
        query={query} 
        setQuery={setQuery}>
      </Header>
      <main>
        <section className='table-section'>
          <div className="table-section__container">
            <h1 className='table-section__title'>Результаты поиска</h1>
            <table className='table'>
            <thead className='table__head'>
                <tr className='table__head-row'>
                  <th className='table__head-name active revers'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33337 9.99999L4.50837 11.175L9.16671 6.52499V16.6667H10.8334V6.52499L15.4834 11.1833L16.6667 9.99999L10 3.33333L3.33337 9.99999Z" fill="black" fillOpacity="0.56" />
                    </svg>
                    Name
                  </th>
                  <th className='table__head-name'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33337 9.99999L4.50837 11.175L9.16671 6.52499V16.6667H10.8334V6.52499L15.4834 11.1833L16.6667 9.99999L10 3.33333L3.33337 9.99999Z" fill="black" fillOpacity="0.56" />
                    </svg>
                    Language
                  </th>
                  <th className='table__head-name'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33337 9.99999L4.50837 11.175L9.16671 6.52499V16.6667H10.8334V6.52499L15.4834 11.1833L16.6667 9.99999L10 3.33333L3.33337 9.99999Z" fill="black" fillOpacity="0.56" />
                    </svg>
                    User
                  </th>
                  <th className='table__head-name'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33337 9.99999L4.50837 11.175L9.16671 6.52499V16.6667H10.8334V6.52499L15.4834 11.1833L16.6667 9.99999L10 3.33333L3.33337 9.99999Z" fill="black" fillOpacity="0.56" />
                    </svg>
                    Date
                  </th>
                </tr>
            </thead>
            <tbody className='table__body'>
            {Repositories.data.search.edges.map(rep => 
                <tr key={rep.node.id}>
                  <th>{rep.node.name}</th>
                  <th>{rep.node.primaryLanguage? rep.node.primaryLanguage.name:'Язык не указан'}</th>
                  <th>{rep.node.owner.login}</th>
                  <th>{rep.node.updatedAt.slice(0,10)}</th>
                </tr>
            )}
            </tbody>
            </table>
          </div>
        </section>

        <section className='pages'>
            <div className="page__container">
              <div className="page__quantity">
                <h3 className="page__quantity-title">Выбеерете количество страниц:</h3>
                <select name="" id="" value={quantityOfPage} onChange={e=>setQuantityOfPage(Number(e.target.value))}>
                  <option value="5">5</option>
                  <option value="7">7</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>

              <button onClick={()=>fetchData({searchQuery: query, endCursor: Repositories.data.search.pageInfo.endCursor, repNumber: quantityOfPage})}>Загрузить еще</button>
            </div>

        </section>
      </main>
      
      <footer className='footer'></footer>
    </>
  )
    
}

export default App
