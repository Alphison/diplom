export const useLessonCount = (count:number) => {
    if(count === 1){
        return '1 урок'
    }else if(count === 2 || count === 3 || count === 4){
        return `${count} урока`
    }else{
        return `${count} уроков`
    }
}