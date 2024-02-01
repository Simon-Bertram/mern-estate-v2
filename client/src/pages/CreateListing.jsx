const CreateListing = () => {
  return (
    <main>
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold text-center my-7">
          Create a Listing
        </h1>
        <form className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col flex-1 gap-4">
            <input
              id="name"
              type="text"
              maxLength="62"
              minLength="10"
              placeholder="Name"
              className="border p-3 rounded-lg"
              required
            />
            <textarea
              id="description"
              type="text"
              placeholder="Description"
              className="border p-3 rounded-lg"
              required
            />
            <input
              id="address"
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
              required
            />
            <div className="flex flex-wrap gap-6">
              <div className="flex gap-2">
                <input type="checkbox" name="" id="sale" className="w-5" />
                <label htmlFor="sale">Sell</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" name="" id="rent" className="w-5" />
                <label htmlFor="rent">Rent</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" name="" id="parking" className="w-5" />
                <label htmlFor="parking">Parking spot</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" name="" id="furnished" className="w-5" />
                <label htmlFor="furnished">Furnished</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" name="" id="offer" className="w-5" />
                <label htmlFor="offer">Offer</label>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="w-24 p-3 border border-gray-300 rounded-lg"
                />
                <label htmlFor="bedrooms">Bedrooms</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="w-24 p-3 border border-gray-300 rounded-lg"
                />
                <label htmlFor="bathrooms">Bathrooms</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  required
                  className="w-24 p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <label htmlFor="regularPrice">Regular Price</label>
                  <span className="text-sm">(£ / month)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  required
                  className="w-24 p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <label htmlFor="discountPrice">Discounted Price</label>
                  <span className="text-sm">(£ / month)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <p className="font-semibold">
              Images:{" "}
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                className="p-3 border border-gray-300 rounded w-full"
              />
              <button className="btn p-3 uppercase text-green-700 border-green-700 hover:shadow-lg disabled:opacity-80">
                Upload
              </button>
            </div>
            <button className="btn p-3 bg-slate-700 text-white uppercase">
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default CreateListing
