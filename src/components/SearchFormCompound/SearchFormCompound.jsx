import React from 'react'
import { Input } from '../ui/input'
import { SearchIcon } from 'lucide-react'

const SearchFormCompound = ({searchPlaceholder,searchId, handleSearchSubmit}) => {
  return (
        <form onSubmit={handleSearchSubmit} className="relative">
                  <Input
                    id={searchId}
                    name="search"
                    className="peer h-8 ps-8 pe-2"
                    placeholder={searchPlaceholder}
                    type="search" />
                  <div
                    className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                    <SearchIcon size={16} />
                  </div>
                </form>
  )
}

export default SearchFormCompound