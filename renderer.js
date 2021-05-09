// For fun very basic renderer. Simultaneously too barebones, and waaay overkill for this project.
const fs = require('fs/promises');
const path = require('path');

// Match custom tag (capitalized) = <([A-Z][a-zA-Z]*)* ?.*>.*<\/\1>|<[A-Z][a-zA-Z]* ?.*\/> | <Tag>Slot Content</Tag> <Tag />
// Match only tag name = /(?<=<)[A-Z][a-zA-z]*/
// Match replacable content tags = /{{.*?}}/ | {{ asd }} => {{ asd }}
// Clean content 'tags' = (?<={{ *?)\S.*?(?= *?}}) | {{ asd }} => asd, {{asd }} => asd.
class Renderer {
    async render(node, context) {
        node = await this.customs(node);
        node = await this.content(node, context);

        return node;
    }

    async customs(node) {
        const customs = node.match(/<([A-Z][a-zA-Z]*)* ?.*>.*<\/\1>|<[A-Z][a-zA-Z]* ?.*\/>/g);

        if (!customs) return node;

        const replace = async (customs) => {
            for (let i = 0; i < customs.length; i++) {
                const custom = customs[i];
                const tag = custom.match(/(?<=<)[A-Z][a-zA-z]*/);
                node = await node.replace(custom, await fs.readFile(path.join('shards', tag + ".html")));
            }
        }

        await replace(customs)

        return node;
    }

    async content(node, $ctx) {
        const tags = node.match(/{{.*?}}/g)
        console.log($ctx)
        if (!tags) return node;

        tags.forEach((tag) => {
            const cont = tag.match(/(?<={{ *?)\S.*?(?= *?}})/)
            node = node.replace(tag, eval(cont[0]));
            console.log(node)
        })

        return node;
    }
};

const renderer = new Renderer();

module.exports = renderer;