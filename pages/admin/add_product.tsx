import { INewProduct } from "@/interfaces/products"
import { ChangeEvent, useState } from "react"
import { category } from "@prisma/client"

function AddProduct() {
    const [image, setImage] = useState<File | string>("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [createObjectURL, setCreateObjectURL] = useState("")
    const [selectedCategory, setCategory] = useState("")

    const uploadToClient = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0]

            setImage(i)
            console.log(event.target)
            console.log(i)
            setCreateObjectURL(URL.createObjectURL(i))
        }
    }

    const uploadToServer = async (_: any) => {
        if (name.length == 0) {
            alert("Falta incluir el nombre")
            return
        }
        if (description.length == 0) {
            alert("Falta incluir la descripcion")
            return
        }
        if (price <= 0) {
            alert("Falta incluir el precio")
            return
        }
        if (stock <= 0) {
            alert("Falta incluir el stock")
            return
        }
        if (image == "") {
            alert("Falta la imagen")
            return
        }

        const data = new FormData()
        data.append("image", image as File)
        data.append("name", name)
        data.append("price", price.toString())
        data.append("desc", description)
        data.append("stock", stock.toString())
        data.append("discount", discount.toString())
        data.append("category", selectedCategory)

        // const response = await fetch("/api/admin/add_product", {
        const response = await fetch("/api/admin/add_product", {
            method: "POST",
            body: data,
        })
        if (response.status == 401) {
            alert(
                "No tienes autorización para subir nuevos productos al sistema."
            )
        } else if (response.status !== 200) {
            alert("Ocurrió un error. Contacte al administrador.")
        } else {
            alert("OK")
        }
    }

    return (
        <div>
            <div>
                <img src={createObjectURL} />
                <h4>Select Image</h4>
                <input type="file" name="myImage" onChange={uploadToClient} />
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={uploadToServer}>
                    Send to server
                </button>
                <br />
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre del producto"
                />
                <br />
                <input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripcion"
                />
                <br />
                <input
                    type="number"
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    placeholder="Precio"
                />
                <br />
                <input
                    type="number"
                    onChange={(e) => setStock(parseFloat(e.target.value))}
                    placeholder="Stock"
                />
                <br />
                <input
                    type="number"
                    onChange={(e) => setDiscount(parseFloat(e.target.value))}
                    placeholder="Precio en oferta"
                />
                <br />
                <select value={selectedCategory}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value={category.figures}>Figuras</option>
                    <option value={category.cards}>Cartas</option>
                    <option value={category.clothes}>Ropa</option>
                    <option value={category.cosplay}>Cosplay</option>
                </select>
            </div>
        </div>
    )
}

export default AddProduct
