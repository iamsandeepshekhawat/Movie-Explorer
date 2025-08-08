export const translations = {
  en: {
    title: "Movie Explorer",
    subtitle: "Discover and explore movies and TV series",
    searchPlaceholder: "Search for movies or TV series...",
    searchButton: "Search",
    filters: {
      type: "Type",
      year: "Year",
      allTypes: "All Types",
      movies: "Movies",
      series: "TV Series",
      episodes: "Episodes"
    },
    results: {
      found: "Found",
      results: "results",
      noResults: "No results found",
      startSearch: "Start your search",
      startSearchDesc: "Enter a movie or TV series name in the search bar above to discover amazing content.",
      error: "Something went wrong",
      tryAgain: "Try Again"
    },
    details: {
      plot: "Plot",
      director: "Director",
      writer: "Writer",
      actors: "Actors",
      awards: "Awards",
      boxOffice: "Box Office",
      metascore: "Metascore"
    },
    recommendations: "People Also Searched For",
    loading: "Loading...",
    installApp: "Install App"
  },
  es: {
    title: "Explorador de Películas",
    subtitle: "Descubre y explora películas y series de TV",
    searchPlaceholder: "Buscar películas o series de TV...",
    searchButton: "Buscar",
    filters: {
      type: "Tipo",
      year: "Año",
      allTypes: "Todos los Tipos",
      movies: "Películas",
      series: "Series de TV",
      episodes: "Episodios"
    },
    results: {
      found: "Encontrado",
      results: "resultados",
      noResults: "No se encontraron resultados",
      startSearch: "Comienza tu búsqueda",
      startSearchDesc: "Ingresa el nombre de una película o serie de TV en la barra de búsqueda para descubrir contenido increíble.",
      error: "Algo salió mal",
      tryAgain: "Intentar de Nuevo"
    },
    details: {
      plot: "Trama",
      director: "Director",
      writer: "Escritor",
      actors: "Actores",
      awards: "Premios",
      boxOffice: "Taquilla",
      metascore: "Metascore"
    },
    recommendations: "La Gente También Buscó",
    loading: "Cargando...",
    installApp: "Instalar App"
  },
  hi: {
    title: "मूवी एक्सप्लोरर",
    subtitle: "फिल्में और टीवी सीरीज़ खोजें और एक्सप्लोर करें",
    searchPlaceholder: "फिल्में या टीवी सीरीज़ खोजें...",
    searchButton: "खोजें",
    filters: {
      type: "प्रकार",
      year: "साल",
      allTypes: "सभी प्रकार",
      movies: "फिल्में",
      series: "टीवी सीरीज़",
      episodes: "एपिसोड"
    },
    results: {
      found: "मिला",
      results: "परिणाम",
      noResults: "कोई परिणाम नहीं मिला",
      startSearch: "अपनी खोज शुरू करें",
      startSearchDesc: "अद्भुत सामग्री खोजने के लिए ऊपर सर्च बार में फिल्म या टीवी सीरीज़ का नाम दर्ज करें।",
      error: "कुछ गलत हुआ",
      tryAgain: "फिर कोशिश करें"
    },
    details: {
      plot: "कहानी",
      director: "निर्देशक",
      writer: "लेखक",
      actors: "अभिनेता",
      awards: "पुरस्कार",
      boxOffice: "बॉक्स ऑफिस",
      metascore: "मेटास्कोर"
    },
    recommendations: "लोगों ने यह भी खोजा",
    loading: "लोड हो रहा है...",
    installApp: "ऐप इंस्टॉल करें"
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;