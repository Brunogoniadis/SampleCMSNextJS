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
  

    const jogos = rows.map(obj => {
      const [_nome, _imagem_capa] = obj._rawData; 
      return {
        nome: _nome,
        imagem_capa: _imagem_capa
      };
    });

  
    res.send({
      title: doc.title,
      games: jogos,
  
      
    })

  } catch (error) {
    console.error('Erro:', error);
    res.status(500).send('Erro interno do servidor');
  }
}