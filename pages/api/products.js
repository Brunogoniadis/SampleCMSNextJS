import credentials from '../../credentials/google-shets-api.json'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'


export default async function (req, res) {
  const doc = new GoogleSpreadsheet('1CHlYBt3kjVPh0IEEJcjRvzyRdBNkeWPiI_gzIleiUzY')

  try {
    const serviceAccountAuth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const doc = new GoogleSpreadsheet('1CHlYBt3kjVPh0IEEJcjRvzyRdBNkeWPiI_gzIleiUzY', serviceAccountAuth);
    await doc.loadInfo();


    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[0];
    
    const rows = await sheet.getRows()

    console.log(rows)
  

    const productData = rows.map(obj => {
      const [_nome_produto, _categoria_produto, _preco_produto, _tamanho_produto, _foto1_produto, _foto2_produto ] = obj._rawData; 
      return {
        nome: _nome_produto,
        categoriaProduto: _categoria_produto,
        precoProduto: _preco_produto, 
        tamanhoProduto: _tamanho_produto,
        foto1Produto: _foto1_produto,
        foto2Produto: _foto2_produto
      };
    });

  
    res.send({
      title: doc.title,
      products: productData,
    })

  } catch (error) {
    console.error('Erro:', error);
    res.status(500).send('Erro interno do servidor');
  }
}