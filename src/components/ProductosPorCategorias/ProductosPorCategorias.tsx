import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CategoriaModel, ProductoModel } from "../AppViewEcommerce/AppView";
import { db } from "../firebaseConfig/firebase";
import { Link } from "react-router-dom";
import "./styles.scss";

//POR PROPS SE PASA EL ID DE LA CATEGORIA

interface ProductosPorCategoriasProps {
    categoria: CategoriaModel;
}

const ProductosPorCategorias = (props: ProductosPorCategoriasProps) => {
    const [sugerencias, setSugerencias] = useState<ProductoModel[]>([]);

    const productosCollection = collection(db, "listaProductos");

    useEffect(() => {
        traerProductosPorCategorias(props.categoria.id);
    }, []);

    const traerProductosPorCategorias = async (categoriaId: string) => {
        try {
            const categoriasDeProductos = await query(
                productosCollection,
                where("categoriaId", "==", categoriaId)
            );
            const data = await getDocs(categoriasDeProductos);
            const values: ProductoModel[] = data.docs.map((doc) => ({
                ...(doc.data() as ProductoModel),
                id: doc.id,
            }));
            setSugerencias(values);
        } catch {}
    };

    return (
        <div>
            <div
                style={{
                    textAlign: "center",
                    marginTop: "20px",
                    
                }}
            >
                <span
                    style={{
                        fontSize: "17px",
                        fontWeight: "100",
                        textAlign: "center",
                        marginLeft: "auto",
                    }}
                >
                    {props.categoria.categoria}
                </span>
                
            </div>
            <div className="contenedorProductoCategoria">
                {sugerencias.map((item) => {
                    return (
                        <div key={item.id}>
                            <Link
                                to={"/perfilProducto/" + item.id}
                                className="productoCategoria"
                            >
                                <img
                                    src={item.imgProducto}
                                    alt=""
                                    style={{ width: "100%" }}
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        // gap:"10px"
                                    }}
                                >
                                    <span
                                        style={{
                                            padding: "3px 10px",
                                            fontSize: "16px",
                                        }}
                                    >
                                        {item.name}
                                    </span>
                                    <span
                                        style={{
                                            padding: "3px 10px",
                                            fontSize: "20px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        ${item.price}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductosPorCategorias;
