import "../css/ProductUpload.css";

const ProductUpload = () => {
  return (
    <div className="product-upload">
      <h2 className="product-upload-heading">Upload Product</h2>

      <form
        action="http://api.brilliantwear.se/upload-product"
        method="post"
        encType="multipart/form-data"
      >
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">
            Brand
          </label>
          <input type="text" className="form-control" name="brand" required />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            name="category"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <select
            className="form-select"
            name="type"
            aria-label="Default select example"
            required
          >
            <option selected value="Shoe">
              Shoes
            </option>
            <option value="Jacket">Jacket</option>
            <option value="Pants">Pants</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input type="number" className="form-control" name="price" required />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image of product
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
    </div>
  );
};

export default ProductUpload;
