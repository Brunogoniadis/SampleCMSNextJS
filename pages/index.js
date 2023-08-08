import Home from '../screens/Home';

export async function getServerSideProps() {



  const dadosDaAPI  = await fetch(`http://localhost:3000/api/jogos`)
        .then((res) => {
            if (res.ok) {
              console.log(res);
                return res.json();
            }
        })
        .then((res) => {
            return res
        })
    return {
        props: {
            jogos: dadosDaAPI
            
        }
    }
}
export default Home;