import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'
import credentials from '../../credentials.json'

const doc = new GoogleSpreadsheet('1xis1pnT9hgp_MjgB4_0shCFtfShtkutgRjkv9R7YyVU')

export default async(req, res) => {
    try{
        await doc.useServiceAccountAuth(credentials)
        await doc.loadInfo()
        const sheet = doc.sheetsByIndex[1]

        const data = JSON.parse(req.body)

        
        const sheetConfig = doc.sheetsByIndex[2]
        await sheetConfig.loadCells('A3:B3')
        
        const mostrarPromocaoCell = sheetConfig.getCell(2, 0)    
        const mensagemPromocaoCell = sheetConfig.getCell(2, 1)

        let Cupom = ''
        let Promo = ''

        if(mostrarPromocaoCell.value === 'VERDADEIRO'){
            Cupom = 'temporario'
            Promo = mensagemPromocaoCell.value
        }
    
        await sheet.addRow({
            Nome:  data.Nome,
            Email: data.Email,
            Whatsapp: data.Whatsapp,
            Cupom,
            Promo,
            'Data Preenchimento': moment().format('DD/MM//YYYY HH:mm:ss'),
            Nota: 5
        })
        res.end(req.body)
    } catch (err) {
        console.log(err),
        res.end('error')
    }
}