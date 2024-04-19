const fetchData = async (json_body_string) => {

    let url = 'http://127.0.0.1:8000/get_data'

    let resp = await fetch(url,
            {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: json_body_string
            }
        )

    if (!resp.ok) return []

    let j = await resp.json()
    return j
}