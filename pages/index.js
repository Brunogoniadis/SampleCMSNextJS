import Home from '../screens/Home';

export async function getServerSideProps() {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const dadosDaAPI = await response.json();
  
      console.log(dadosDaAPI); 
  
      return {
        props: {
          products: dadosDaAPI.products,
        },
      };
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      return {
        props: {
          products: [],
        },
      };
    }
  }
export default Home;