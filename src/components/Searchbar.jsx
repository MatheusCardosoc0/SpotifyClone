import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const Searchbar = () => {
  const navigate = useNavigate()
  const [SearchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    navigate(`/search/${SearchTerm}`)
  }


  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="p-2 text-gray-400 focus-within:text-gray-600"
    >
      <label htmlFor="search-field" className="sr-only">
        Buscar todos as musicas
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch size={20} className="ml-4" />
        <input name='search-field' 
        autoComplete='off'
        id='search-field'
        placeholder='Buscar'
        type={"search"}
        value={SearchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4"  />
      </div>
    </form>
  )
}

export default Searchbar
