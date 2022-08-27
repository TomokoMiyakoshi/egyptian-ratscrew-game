import {useState} from "react"

const useQueue = (array = []) => {
    
    const [queue, setQueue] = useState(array)
    const enqueue = elem => {
        setQueue(queue => [...queue, elem])
    }

    const dequeue = () => {
        if (queue != []) {
            setQueue(queue => queue.slice(1, queue.length))
            return queue[0]
        }
    }

    const back = queue[queue.length - 1]

    const front = queue[0]

    return {queue, enqueue, dequeue, back, front}
}

export default useQueue