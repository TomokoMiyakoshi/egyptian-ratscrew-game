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
            setQueue(queue => queue.slice(1, queue.length))
            return queue[0]
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