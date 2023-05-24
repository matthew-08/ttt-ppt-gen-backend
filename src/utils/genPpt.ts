import path from 'path'
import { Presentation } from 'ts_ppt_text'
import Slide from 'ts_ppt_text/dist/slide'
import { forEachLeadingCommentRange } from 'typescript'

type PPT_Template = {
    name: string
    id: number
}

type UserTemplate = {
    question: string
    answer: string
    additional: string
}[]

const templates: readonly PPT_Template[] = [
    { id: 1, name: 'battleship' },
    { id: 2, name: 'blb' },
    { id: 3, name: 'connect4' },
    { id: 4, name: 'kittens' },
    { id: 5, name: 'mario' },
] as const

const loadTemplate = (name: string) => {
    return new Presentation(
        path.join(__dirname, `../ppt/${name}.pptx`),
        path.join(__dirname, `../ppt/tmp/${name}`)
    )
}

const extractQuestionSlides = (slides: Slide[]) => {
    return slides.filter((slide) => {
        const textNodes = Object.values(slide.textNodes).find(
            (node) =>
                node.text.toLowerCase().includes('instructions') ||
                node.text.toLowerCase().includes('goes here')
        )
        if (textNodes) {
            return slide
        } else {
            return false
        }
    })
}

const handleGenTemplate = async (
    templateId: keyof typeof templates,
    userTemplate: UserTemplate
) => {
    const selectedTemplate = templates.find((t) => t.id === templateId)
    if (!selectedTemplate) {
        return
    }
    const presentation = loadTemplate(selectedTemplate.name)
    setTimeout(async () => {
        const slides = await presentation.getSlides().then((slides) => {
            return extractQuestionSlides(slides)
        })
        console.log(slides.length)
    }, 1000)
}

const testArray: UserTemplate = Array(28).fill({
    question: 'hello',
    answer: 'test',
    additional: 'test123',
})

handleGenTemplate(1, testArray)
// 5 kittens = [0]:question [1]:answer [2]:additional
// 4 blb = [1]:question
// 3 connect4 = 7 individual text fields on one slides, all one field type
// 2 mario = [0]:question [1]: additional [2]: answer
// 1 battle = [0]:question [1]: extends question, needs to be deleted.
//            [2]: answer [3]: additional

/*
    function handleGenPpt(templateId) {
        const template = templateId
    }
 */
