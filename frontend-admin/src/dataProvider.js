import { fetchUtils } from "react-admin";
const apiUrl = "http://localhost:5239/api";
const httpClient = fetchUtils.fetchJson;
const dataProvider = {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { filter } = params;
        
        // Calculate the offset based on the current page and items per page
        const offset = (page - 1) * perPage;
    
        // Create query parameters for pagination and offset
        let queryParams = `page=1&size=${offset + perPage}`;
    
        // Add filters to query parameters
        if (filter) {
            Object.keys(filter).forEach(key => {
                if (key === 'q') {
                    queryParams += `&${key}=${filter[key]}`;
                } else {
                    queryParams += `&filter.${key}=${filter[key]}`;
                }
            });
        }
    
        const url = `${apiUrl}/${resource}?${queryParams}`;
    
        return httpClient(url)
            .then(({ headers, json }) => {
                const startIndex = offset;
                const endIndex = offset + perPage - 1;
                const data = json.slice(startIndex, endIndex + 1); // Get the next 'perPage' items
    
                return {
                    data: data,
                    total: parseInt(headers.get("content-range").split("/").pop(), 10),
                };
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                throw new Error("Failed to fetch data");
            });
    },
    create: (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        return httpClient(url, {
            method: "POST",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
    update: (resource, params) => {
        const { id, data } = params;
        const url = `${apiUrl}/${resource}/${id}`;
    
        return httpClient(url, {
            method: "PUT",
            body: JSON.stringify(data),
        })
        .then(({ json }) => {
            return { data: json };
        })
        .catch((error) => {
            console.error("Error updating data:", error);
            throw new Error("Failed to update data");
        });
    },
    deleteMany: (resource, params) => {
        const { ids } = params;
        const deletePromises = ids.map(id => {
            const url = `${apiUrl}/${resource}/${id}`;
            return httpClient(url, {
                method: "DELETE",
            });
        });

        return Promise.all(deletePromises).then(responses => ({
            data: responses.map(({ json }) => json),
        }));
    },
    delete: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        return httpClient(url, {
            method: "DELETE",
        }).then(({ json }) => ({ data: json }));
    },
    getMany: (resource, params) => {
        const { ids } = params;
        const url = `${apiUrl}/${resource}?ids=${ids.join(",")}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },
getOne: (resource, params) => {
        const { id } = params;
        const url = `${apiUrl}/${resource}/${id}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },
};
export default dataProvider;