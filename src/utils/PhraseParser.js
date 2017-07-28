
const positiveSet = ['want', 'like'];
const negtiveSet = ["don't", 'not'];

const tags = ['healthy', 'protein']

export function phraseParser(msg) {
    const msgAry = msg.split(" ");
    const neg = msgAry.filter( item => negtiveSet.includes(item.toLowerCase()) );
    const pos = msgAry.filter( item => positiveSet.includes(item.toLowerCase()) );

    const something = msgAry.filter( item => tags.includes(item.toLowerCase()) );

    return {
        positive: !(neg.length > 0),
        something: something
    }
}