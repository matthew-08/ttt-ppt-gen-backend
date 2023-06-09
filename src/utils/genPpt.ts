import path from 'path'
import { Presentation } from 'ts_ppt_text'
import Slide from 'ts_ppt_text/dist/slide'

type UserTemplate = {
    readonly question?: string | undefined
    readonly answer?: string | undefined
    readonly additional?: string | undefined
}

const templates = [
    {
        id: 4,
        name: 'battleship',
        format: {
            question: 1,
            deleteField: 2,
            answer: 3,
            additional: 4,
        },
    },
    {
        id: 5,
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
        id: 1,
        name: 'kittens',
        format: {
            question: 1,
            answer: 2,
            additional: 3,
        },
    },
    {
        id: 2,
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

const reload = (pres: Presentation) => {
    pres.generateTempFile()
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

type Node = {
    text: string
    id: string
    startingIndex: number | null
}

const writeHandler = (
    template: (typeof templates)[number],
    Node: Node[],
    userTemplate: UserTemplate,
    slide: Slide
) => {
    const keys = Object.keys(userTemplate) as unknown as (keyof UserTemplate)[]
    keys.forEach((key) => {
        const id = template['format'][key]
        if (id) {
            slide.editTextNode(id.toString(), userTemplate[key] as string)
        }
    })
    if (template.id === 4) {
        slide.editTextNode('2', ' ')
    }
}

const writeToSlides = async (
    slides: Slide[],
    userTemplate: UserTemplate[],
    template: (typeof templates)[number]
) => {
    slides.forEach((slide, index) => {
        const nodes = Object.values(slide.textNodes)
        writeHandler(template, nodes, userTemplate[index], slide)
    })
}

export const handleGenTemplate = async <
    T extends (typeof templates)[number]['id']
>(
    templateId: T,
    userTemplate: UserTemplate[]
) => {
    const selectedTemplate = templates.find((t) => t.id === templateId)
    if (!selectedTemplate) {
        return
    }
    const presentation = loadTemplate(selectedTemplate.name)
    await presentation.generateTempFile()
    await presentation.extractSlides()

    presentation.getSlides().then((res) => {
        res.length
        res.forEach((s) => {})
    })
    const slides = await presentation
        .getSlides()
        .then((res) => extractQuestionSlides(res))
    writeToSlides(slides, userTemplate, selectedTemplate)
    slides.forEach((slide) => {})
    await presentation.applySlideChanges()
    await presentation.generateNewPPT(path.join(__dirname, '../output/temp'))
}
