import axios from "axios";
import Papa from "papaparse";
import { Product } from "./types";

export default {
    list: async (): Promise<Product[]> => {
        return axios.get(`https://docs.google.com/spreadsheets/d/e/2PACX-1vTmFeLTkkDq5crEZARobN3YM0Ly9EsXPQ7RTTB2Uuy1ZaoMbckymZZh0eLJjRsImtRkKgsKKuAGml47/pub?output=csv`, 
        {
            responseType: 'blob',
        },
    )
        .then((response) => 
            new Promise<Product[]>((resolve, reject) => {
                Papa.parse(response.data, {
                    header : true, //indica a papaparse que el primer elemento de nuestro array son los headers de nuestra tabla
                    complete : (results) => {
                        const products = results.data as Product[];
                        return resolve(
                            products.map((product) => ({
                                ...product,
                                price: Number(product.price),
                            })),
                        );
                    },
                    error: (error) => reject(error.message),   
                });
            }),
        );
    },
};