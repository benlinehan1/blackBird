function toQuery(obj){
    let qString = Object.keys(obj)
        .map(key => `${key}=${obj[key]}`)
        .join('&')
    return ('?' + qString)
}