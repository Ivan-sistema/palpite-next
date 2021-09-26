import { GoogleSpreadsheet } from 'google-spreadsheet'
import credentials from '../../credentials.json'

const doc = new GoogleSpreadsheet('1xis1pnT9hgp_MjgB4_0shCFtfShtkutgRjkv9R7YyVU')

export default async(req, res) => {
    try{
        await doc.useServiceAccountAuth(credentials)
        await doc.loadInfo()
        const sheet = doc.sheetsByIndex[1]

        const data = JSON.parse(req.body)
    
        await sheet.addRow({
            Nome:  data.Nome,
            Email: data.Email,
            Whatsapp: data.Whatsapp,
            Cupom: 'aaa111',
            Promo: '911'
        })
        res.end(req.body)
    } catch (err) {
        console.log(err),
        res.end('error')
    }
}