import { workflow } from "../../data/workflow"

const Service = {
    getData: ({from,to}) => {
        return new Promise((resolve, reject) => {
            resolve({
                count: workflow.length,
                data: workflow.slice(from,to)
            })
        })
    }
}

export default Service