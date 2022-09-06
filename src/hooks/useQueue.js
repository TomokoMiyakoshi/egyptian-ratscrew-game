import {useState} from "react"

const useQueue = (array = []) => {
    
    const [queue, setQueue] = useState(array)

    const enqueue = elem => {
        setQueue(queue => [...queue, elem])
    }

    const enqueueAll = array => {
        array.forEach(elem => enqueue(elem))
    }

    const dequeue = () => {
        if (queue != []) {
            const dequedElem = queue[0]
            setQueue(queue => queue.slice(1, queue.length))
            console.log("dequeing, queue length is", queue.length)
            return dequedElem
        }
    }

    const emptyQueue = () => {
        setQueue([])
    }

    const back = queue[queue.length - 1]

    const front = queue[0]

    return {queue, enqueueAll, enqueue, dequeue, back, front, emptyQueue}
}

export default useQueue