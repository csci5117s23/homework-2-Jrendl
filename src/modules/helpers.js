const backendURL = process.env.NEXT_COHO_API_ENDPOINT;


export async function fetchTodo(token, id, user_id){
    const url = backendURL + "/todos/?" + new URLSearchParams({"_id": id, "user_id": user_id});
    console.log("fetching todo %s", url);

    const response = await fetch(url, {
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
        "method": 'PATCH',
        "headers": {"Authorization": "Bearer " + token,
                    "Content-Type": "application/json"},
        "body": JSON.stringify(msg)
    });

    return await response;
}

export async function changeDescription(token, id, descVal){
    const msg = {"description": descVal};
    const response = await fetch(backendURL + "/todos/" + id, {
        "method": 'PATCH',
        "headers": {"Authorization": "Bearer " + token,
                    "Content-Type": "application/json"},
        "body": JSON.stringify(msg)
    });

    return await response;
}


export async function fetchAllInProgress(token, user_id){
    const url = backendURL + "/todos/?" + new URLSearchParams({"done": false, "user_id": user_id});
    console.log("fetching todo %s", url);

    const response = await fetch(url, {
        "method":"GET",
        "headers": {"Authorization": "Bearer " + token}
    });
    if(response.ok){
        console.log("got item");
    }
    return response.json();
}

export async function fetchAllDone(token, user_id){
    const url = backendURL + "/todos/?" + new URLSearchParams({"done": true, "user_id": user_id});
    console.log("fetching todo %s", url);

    const response = await fetch(url, {
        "method":"GET",
        "headers": {"Authorization": "Bearer " + token}
    });
    if(response.ok){
        console.log("got item");
    }
    return response.json();
}