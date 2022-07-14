import { addFrontMatter, toStringFrontMatter } from "../src/frontmatter"
import { MicroBlogFrontMatter, MicroBlogStatus } from "../src/types";

describe('FrontMatter utilities', () => {
    test('Transform FrontMatter to string', () => {
        const input = {
            status: MicroBlogStatus.draft,
            previewUrl: 'https://google.com',
            publishedUrl: 'https://google.com',
        } as MicroBlogFrontMatter

        const output = toStringFrontMatter(input)

        const expectedString = "---\nstatus: draft\npreviewUrl: https://google.com\npublishedUrl: https://google.com\n---"
        expect(output).toEqual(expectedString)
    })

    test('Add object to existing FrontMatter', () => {
        const frontMatter = {
            status: MicroBlogStatus.draft,
        } as MicroBlogFrontMatter

        const input = {
            previewUrl: 'https://google.com',
            publishedUrl: 'https://google.com',
        }

        const output = addFrontMatter(frontMatter, input)

        expect(output.status).toEqual(MicroBlogStatus.draft)
        expect(output.previewUrl).toEqual('https://google.com')
        expect(output.publishedUrl).toEqual('https://google.com')
    })
})