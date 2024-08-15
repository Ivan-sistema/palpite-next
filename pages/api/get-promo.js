import { GoogleSpreadsheet } from 'google-spreadsheet'
import credentials from '../../credentials.json'

const doc = new GoogleSpreadsheet('1xis1pnT9hgp_MjgB4_0shCFtfShtkutgRjkv9R7YyVU')

export default async(req, res) => {

    try{
        await doc.useServiceAccountAuth(credentials)
        await doc.loadInfo()
    
        const sheet = doc.sheetsByIndex[2]
        await sheet.loadCells('A3:B3')
        
        const mostrarPromocaoCell = sheet.getCell(2, 0)    
        const mensagemPromocaoCell = sheet.getCell(2, 1)

        res.end(JSON.stringify({
            showCoupon: mostrarPromocaoCell.value === 'VERDADEIRO',
            message: mensagemPromocaoCell.value
        }))

    }catch(err){
        res.end(JSON.stringify({
            showCoupon: false,
            message: ''
        }))
    }

}