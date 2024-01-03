describe("fetch calls to mock API server", () => {
  it("fetch to /api/products/latest and should return the correct number of products", async () => {
    const res = await fetch("http://localhost:3000/api/products/latest");
    const pagination = await res.json();

    expect(pagination.products).toHaveLength(1);
  });
});
