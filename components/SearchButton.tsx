import { AlgoliaButton } from 'pliny/search/AlgoliaButton'
import { KBarButton } from 'pliny/search/KBarButton'
import siteMetadata from '@/data/siteMetadata'

const SearchButton = () => {
  if (
    siteMetadata.search &&
    (siteMetadata.search.provider === 'algolia' || siteMetadata.search.provider === 'kbar')
  ) {
    const SearchButtonWrapper =
      siteMetadata.search.provider === 'algolia' ? AlgoliaButton : KBarButton

    return (
      <SearchButtonWrapper aria-label="Search">
        <div className="flex items-center bg-gray-100 rounded-full px-2 shadow-sm border border-white hover:border translation ease-in-out duration-300 hover:border-primary-500  opacity-70 hover:opacity-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:border-primary-500 dark:hover:opacity-100 dark:hover:bg-gray-300">
          <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input type="text" placeholder="Search"
            className="w-20 bg-transparent border-none flex-grow text-sm outline-none text-gray-700 placeholder-gray-500"
          />
          <div className="flex space-x-1">
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg shadow-outer dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">⌘</kbd>
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg shadow-outer dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">K</kbd>
          </div>
        </div>
      </SearchButtonWrapper>
    )
  }
}

export default SearchButton
