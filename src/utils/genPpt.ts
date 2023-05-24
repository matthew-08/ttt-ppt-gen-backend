import path from 'path'
import { Presentation } from 'ts_ppt_text'

const templates: {
    [key: number]: string
} = {
    1: 'battleship',
    2: 'mario',
    3: 'connect4',
    4: 'blb',
    5: 'kittens',
}

console.log(path.join(__dirname, '../ppt'))
const genPpt = async (templateId: number) => {
    console.log(templates[templateId])
    const presentation = new Presentation(
        path.join(__dirname, `../ppt/${templates[templateId]}.pptx`),
        path.join(__dirname, `../ppt/tmp/${templates[templateId]}`)
    )
    setTimeout(async () => {
        presentation.getSlides().then((res) => console.log(res))
    }, 1000)
}

genPpt(1)
