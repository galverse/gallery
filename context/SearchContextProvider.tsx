import React from 'react';

type SearchContextType = {
  tokenSearchQuery: string;
  setTokenSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = React.createContext<SearchContextType | undefined>(
  undefined
);

type SearchProviderProps = {
    children: React.ReactNode;
  };
  
  export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
const [tokenSearchQuery, setTokenSearchQuery] = React.useState<string>('');

return (
    <SearchContext.Provider value={{ tokenSearchQuery, setTokenSearchQuery }}>
    {children}
    </SearchContext.Provider>
    );
};
  
  export function useSearch() {
    const context = React.useContext(SearchContext);
    if (context === undefined) {
      throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
  }
  