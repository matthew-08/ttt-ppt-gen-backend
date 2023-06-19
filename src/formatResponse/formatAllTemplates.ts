type ppt_template = {
    id: number
    name: string
    img: string
    slide_amount: number
}

const formatAllTemplates = (
    dbResponse: (ppt_template & {
        ppt_template_field: {
            field_type: {
                type: string
            }
        }[]
    })[]
) => {
    return dbResponse
        .map(({ id, name, img, ppt_template_field, slide_amount }) => {
            return {
                id,
                name,
                img,
                slideAmount: Number(slide_amount),
                templateFields: ppt_template_field.map(
                    (field) => field.field_type
                ),
            }
        })
        .filter((t) => t.id !== 3)
}

export default formatAllTemplates
