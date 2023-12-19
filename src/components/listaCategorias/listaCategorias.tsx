import React, { useEffect, useState } from "react";
import "./styles.scss";
import { CategoriaModel, ProductoModel } from "../AppViewEcommerce/AppView";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const listaCategorias = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const [categorias, setCategorias] = useState<ProductoModel[]>([]);
    // // eslint-disable-next-line react-hooks/rules-of-hooks

    // const productosCollection = collection(db, "listaProductos");
    // const traerProductosPorId = async (productoId: string) => {
    //     try {
    //         const productoDoc = await getDoc(
    //             doc(productosCollection, productoId)
    //         );

    //         if (productoDoc.exists()) {
    //             const productoData = productoDoc.data() as ProductoModel;
    //             const productoConId = { ...productoData, id: productoId };
    //             setCategorias([productoConId]);
    //         } else {
    //             // Manejar el caso en que el producto no existe
    //             setCategorias([]);
    //         }
    //     } catch (error) {
    //         console.error("Error al obtener el producto por ID", error);
    //         // Manejar el error según sea necesario
    //     }
    // };
    // // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect(() => {
    //     traerProductosPorId(props.categoria.id);
    // }, []);

    return <div></div>;
};

export default listaCategorias;
