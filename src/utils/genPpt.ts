import path from 'path'
import { Presentation } from 'ts_ppt_text'
import Slide from 'ts_ppt_text/dist/slide'
import { string } from 'zod'

type UserTemplate = {
    readonly question?: string | undefined
    readonly answer?: string | undefined
    readonly additional?: string | undefined
}

const templates = [
    {
        id: 1,
        name: 'battleship',
        format: {
            question: 1,
            deleteField: 2,
            answer: 3,
            additional: 4,
        },
    },
    {
        id: 2,
        name: 'blb',
        format: {
            question: 2,
        },
    },
    {
        id: 3,
        name: 'connect4',
        format: {
            question: 1,
        },
    },
    {
        id: 4,
        name: 'kittens',
        format: {
            question: 1,
            answer: 2,
            additional: 3,
        },
    },
    {
        id: 5,
        name: 'mario',
        format: {
            question: 1,
            answer: 3,
            additional: 2,
        },
    },
]

// 5 kittens = [0]:question [1]:answer [2]:additional
// 4 blb = [1]:question
// 3 connect4 = 7 individual text fields on one slides, all one field type
// 2 mario = [0]:question [1]: additional [2]: answer
// 1 battle = [0]:question [1]: extends question, needs to be deleted.
//            [2]: answer [3]: additional

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

const textIncludes = (nodeText: string, ...searchText: string[]) => {
    for (let text of searchText) {
        if (nodeText.toLowerCase().includes(text)) {
            return true
        }
    }
    return false
}

const writeToSlides = (slides: Slide[], userTemplate: UserTemplate[]) => {
    slides.forEach((slide, index) => {
        const nodes = Object.values(slide.textNodes)
        nodes.forEach(({ text, id }) => {
            if (
                textIncludes(
                    text,
                    'instructions',
                    'question',
                    'word or sentence'
                )
            ) {
                slide.editTextNode(id, userTemplate[index].question as string)
            }
            if (text === 'goes here' && id == '2') {
                slide.editTextNode(id, ' ')
            }
            if (textIncludes(text, 'answer')) {
                slide.editTextNode(id, userTemplate[index].answer as string)
            }
            if (textIncludes(text, 'additional')) {
                slide.editTextNode(id, userTemplate[index].additional as string)
            }
        })
    })
}

const handleGenTemplate = async <T extends (typeof templates)[number]['id']>(
    templateId: T,
    userTemplate: UserTemplate[]
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
        const { format } = selectedTemplate
        writeToSlides(slides, userTemplate)
        slides.forEach((slide) => console.log(slide.textNodes))
    }, 1000)
}

const testArray: UserTemplate[] = Array(30).fill({
    question: 'hello',
    answer: 'test',
    additional: 'test123',
})

handleGenTemplate(5, testArray)

/*
    function handleGenPpt(templateId) {
        const template = templateId
    }
 */
