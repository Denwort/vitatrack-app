const url = "http://localhost:3000";

const prueba : () => Promise<object> = async () : Promise<object> => {
    const response = await fetch(url.concat("/api"), {
        method: "GET",
    })

    if (response.status === 200) {
        return response.json();
    }
    else {
        return {message: "Error"}
    }
}

const api = {prueba};

export default api;