import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import "./styles.scss";
import { ProductoModel } from "../AppViewEcommerce/AppView";

type Params = {
    id: string;
};

const PerfilProducto = () => {
    const params = useParams<Params>();
    const [producto, setProducto] = useState<ProductoModel>();

    async function obtenerProductoPorId() {
        const docRef = doc(collection(db, "listaProductos"), params.id);

        try {
            const docSnap = await getDoc(docRef); 

            if (docSnap.exists()) {
                const productoActual = docSnap.data() as ProductoModel;
                console.log("Producto actual cargado:", productoActual);
                setProducto(productoActual);
            } else {
                console.log("No se encontró ningún producto con ese ID.");
                console.log(params.id, 'ESTE ES EL ID DEL DOCUMENTO');
            }
        } catch (error) {
            console.error("Error al obtener el producto:", error);
        }
    }
    useEffect(() => {
        if (params.id) {
            obtenerProductoPorId();
        }
    }, [params.id]);

    return (
        <div className="contenedor">
            {producto ? (
                <div className="contenedorPrincipal">
                    <div className="contenedorPerfil">
                        <img src={producto.imgProducto} alt="" />
                        <h3>{producto.name}</h3>
                        <p>Precio: {producto.price}</p>
                    </div>
                    {/* Agrega más detalles o características del producto aquí */}
                </div>
            ) : ( 
                <p>Cargando producto...</p>
            )}
            <h1>Perfil Producto</h1>
        </div>
    );
};

export default PerfilProducto;
