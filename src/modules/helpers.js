const backendURL = process.env.NEXT_API_ENDPOINT;


export async function fetchTodo(token, id){
    console.log("fetching todo");
    const response = await fetch(backendURL + "/todos/" + id, {
        "method":"GET",
        "headers": {"Authorization": "Bearer " + token}
    });
    if(response.ok){
        console.log("got item");
    }
    return response.json();
}

export async function cohoSetDone(token, id, doneVal){
    const msg = {"done": doneVal};
    const response = await fetch(backendURL + "/todos/" + id, {
        "method": "PATCH",
        "headers": {"Authorization": "Bearer " + token,
                    "Content-Type": "application/json"},
        "method": JSON.stringify(msg)
    });

    return await response;
}