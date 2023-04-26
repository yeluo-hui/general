import {toAsync} from "@/components/rdtable/tools/util";

export default class Traverse {

    constructor() {
        this.traverseMap = new Map()
    }

    init() {
        this.traverseMap.set('questionKey', this.traverse)
        return this
    }

    /**
     *  答题卡类型
     * @param tree
     * @param newTree
     */
    traverse( tree, newTree = []) {
        tree.map(item => {
            let node = {
                id: item.id,
                text: item.catalogName
            }
            if (item.children && item.children.length > 0) {
                node.children = []
                this.traverse(item.children, node.children)
            }
            newTree.push(node)
        })
        return  newTree
    }
}



